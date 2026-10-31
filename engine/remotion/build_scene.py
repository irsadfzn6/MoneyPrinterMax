"""
build_scene.py - Automated Remotion Scene Data Builder
MoneyPrinterMax Studio Pipeline
"""

import json
import os
import re
import shutil
import subprocess
import sys

FPS = 30
PAUSE_FRAMES = 20

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(os.path.dirname(here)) # MoneyPrinterMax root

def get_audio_duration(audio_path):
    if not os.path.exists(audio_path):
        return None
    try:
        out = subprocess.check_output(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", audio_path]
        ).decode().strip()
        data = json.loads(out)
        return float(data["format"]["duration"])
    except Exception:
        pass
    try:
        size = os.path.getsize(audio_path) - 44
        return size / 88200.0
    except Exception:
        return None

def process_single_scene(project_dir, scene_no):
    print(f"\n==========================================")
    print(f" Memproses Adegan {scene_no:02d}...")
    print(f"==========================================")

    shots = []
    cur_scene = 0
    shot_list_path = os.path.join(project_dir, "shot-list.md")

    if not os.path.exists(shot_list_path):
        print(f"[ERROR] shot-list.md tidak ditemukan di {shot_list_path}")
        return False

    with open(shot_list_path, encoding="utf-8") as f:
        for line in f:
            m_scene = re.match(r"^##+\s*Adegan\s*(\d+)", line, re.IGNORECASE)
            if m_scene:
                cur_scene = int(m_scene.group(1))
                continue
            m_row = re.match(r"^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|$", line)
            if m_row and cur_scene == scene_no:
                num = int(m_row.group(1))
                gerak_raw = m_row.group(2).strip()
                frames_raw = int(m_row.group(3).strip())
                narasi = m_row.group(4).strip()
                visual = m_row.group(5).strip()
                karakter = m_row.group(6).strip()
                kind = "video" if gerak_raw.startswith("V:") or "video" in gerak_raw.lower() else "image"
                shots.append({
                    "num": num,
                    "gerak": gerak_raw,
                    "frames": frames_raw,
                    "narasi": narasi,
                    "visual": visual,
                    "karakter": karakter,
                    "kind": kind
                })

    if not shots:
        print(f"[WARNING] Tidak ada shot ditemukan untuk adegan {scene_no}.")
        return False

    asset_dir = os.path.join(project_dir, "visual", f"adegan{scene_no}")
    pub_dir = os.path.join(here, "public", f"adegan{scene_no}")
    os.makedirs(pub_dir, exist_ok=True)
    os.makedirs(os.path.join(here, "public", "audio"), exist_ok=True)

    # Audio handling: check WAV or MP3
    audio_found = None
    audio_rel = None
    for ext in [".wav", ".mp3", ".ogg"]:
        name = f"{scene_no:02d}{ext}"
        candidate = os.path.join(project_dir, "audio", name)
        if not os.path.exists(candidate):
            candidate = os.path.join(project_dir, "audio_original", name)
        if os.path.exists(candidate):
            audio_found = candidate
            audio_rel = f"audio/{name}"
            shutil.copy2(candidate, os.path.join(here, "public", "audio", name))
            break

    dur = get_audio_duration(audio_found) if audio_found else None
    if dur is not None:
        audio_frames = int(dur * FPS)
    else:
        audio_frames = sum(s["frames"] for s in shots)

    total_frames = max(audio_frames, sum(s["frames"] for s in shots)) + PAUSE_FRAMES
    shots[-1]["frames"] += PAUSE_FRAMES

    payload_shots = []
    current_from = 0

    for s in shots:
        found_file = None
        chosen_kind = s["kind"]
        chosen_ext = ".mp4" if s["kind"] == "video" else ".png"

        if os.path.exists(asset_dir):
            if s["kind"] == "video":
                for fname in os.listdir(asset_dir):
                    if (fname.startswith(f"{s['num']:03d}") or 
                        fname.startswith(f"shot{s['num']:03d}") or 
                        fname.startswith(f"shot_{s['num']:03d}")) and fname.endswith(".mp4"):
                        found_file = fname
                        chosen_kind = "video"
                        chosen_ext = ".mp4"
                        break
            
            if not found_file:
                for fname in os.listdir(asset_dir):
                    if (fname.startswith(f"{s['num']:03d}") or 
                        fname.startswith(f"shot{s['num']:03d}") or 
                        fname.startswith(f"shot_{s['num']:03d}")) and (fname.endswith(".png") or fname.endswith(".jpg") or fname.endswith(".webp")):
                        found_file = fname
                        chosen_kind = "image"
                        chosen_ext = ".png"
                        break

        target_name = f"{s['num']:03d}{chosen_ext}"
        pub_rel = f"adegan{scene_no}/{target_name}"

        if found_file:
            shutil.copy2(os.path.join(asset_dir, found_file), os.path.join(pub_dir, target_name))
            print(f"    [Asset Sync] {found_file} -> {pub_rel} ({chosen_kind})")

        payload_shots.append({
            "num": s["num"],
            "narasi": s["narasi"],
            "gerak": s["gerak"],
            "file": pub_rel,
            "kind": chosen_kind,
            "from": current_from,
            "frames": s["frames"]
        })
        current_from += s["frames"]

    out_json = {
        "scene": scene_no,
        "fps": FPS,
        "audio": audio_rel or "",
        "totalFrames": total_frames,
        "shots": payload_shots
    }

    data_dir = os.path.join(here, "src", "data")
    os.makedirs(data_dir, exist_ok=True)
    json_path = os.path.join(data_dir, f"adegan{scene_no}.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(out_json, f, indent=2, ensure_ascii=False)

    print(f"  [OK] src/data/adegan{scene_no}.json siap ({total_frames} frames / {total_frames/FPS:.1f}s)")
    return True

def main():
    if len(sys.argv) < 2:
        print("Penggunaan: python build_scene.py <project_dir> [scene_num|all]")
        sys.exit(1)

    project_dir = os.path.abspath(sys.argv[1])
    target = sys.argv[2].lower() if len(sys.argv) > 2 else "all"

    if target == "all":
        count = 0
        for i in range(1, 30):
            if process_single_scene(project_dir, i):
                count += 1
            else:
                break
        print(f"\n[SUKSES] Berhasil memproses {count} adegan!")
    else:
        try:
            num = int(target)
            process_single_scene(project_dir, num)
        except ValueError:
            print("Scene number harus angka atau 'all'")

if __name__ == "__main__":
    main()

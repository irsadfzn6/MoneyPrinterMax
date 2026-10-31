---
name: makevideoshorts
description: Autonomous end-to-end production pipeline for YouTube Shorts, TikTok & Reels (Vertical 9:16, 30-60s) using Google Flow (Nano Banana 2.1 & Omni Flash 4s with 2K/1080p auto-upscale), Multi-TTS, and Remotion. Triggered by /makevideoshorts or requests to create viral vertical short videos.
---

# Skill: /makevideoshorts (Viral Vertical Shorts Production)

Skill ini menjalankan alur kerja otomatis untuk memproduksi video vertikal (**9:16**, resolusi 1080x1920, durasi 30–60 detik) dengan pacing super cepat, hook memikat pada 3 detik pertama, dan animasi subtitle memantul di tengah layar.

---

## ⚡ Karakteristik Khusus Format Shorts

1. **Rasio Aspek:** 9:16 (Vertikal / Portrait).
2. **Pacing Visual:** Visual berganti setiap **1.5 hingga 3 detik** (~15–20 shot dalam 45 detik) untuk mempertahankan retensi penonton 100%+.
3. **Hook 3 Detik Pertama:** Langsung memulai dengan kalimat mengejutkan atau pertanyaan kontroversial.
4. **Captions Viral:** Teks subtitle besar di tengah layar bergaya *bouncing word-by-word* dengan warna kuning/putih dan stroke hitam pekat.

---

## 🛑 9 Tahapan Baku & Aturan Mutlak

### Tahap 1: Ideation (Hook Pendek & Cepat)
- Berikan 5 ide shorts berpotensi viral tinggi atau konfirmasi topik dari user.

### Tahap 2: Naskah Narasi Shorts (30–60 Detik)
- Tulis naskah narasi cepat, padat, tanpa basa-basi (sekitar 80–140 kata).
- **🛑 GERBANG REVIEW 1:** Tampilkan naskah narasi shorts kepada user dan tunggu konfirmasi sebelum melanjutkan.

### Tahap 3: Prompt Karakter Referensi
- Buat karakter acuan bergaya 2D minimalist vector stickman dengan latar polos netral:
  `Simple black stickman character with round white head, thick black outline, flat 2D vector animation style, [tema], minimal details, vertical 9:16, no text, full body, plain neutral beige background.`

### Tahap 4: Prompt Shot Vertikal (9:16)
- Susun 15–20 shot dinamis (aspek 9:16).
- Sertakan **📌 Referensi Karakter:** pada setiap shot.

### Tahap 5: Review Seluruh Prompt oleh User
- **🛑 GERBANG REVIEW 2:** Tampilkan daftar prompt kepada user untuk diperiksa dan disetujui.

### Tahap 6: Eksekusi Google Flow & Auto-Upscale
- Jalankan generasi dengan aspek **9:16**:
  - Gambar: Nano Banana 2.1 (Auto-upscale ke 2K)
  - Video: Omni Flash 1.1 durasi 4s (Auto-upscale ke 1080p)
  - Fallback otomatis ke gambar jika kuota video habis.

### Tahap 7: Editing & Rendering di Remotion (Shorts Mode)
- Dubbing narasi cepat via Multi-TTS.
- Jalankan `build_scene.py` dan render dengan mode shorts:
  `node engine/remotion/render_all.js shorts`
- Menghasilkan `final_video_shorts.mp4` (1080x1920) dengan subtitle memantul di tengah.

### Tahap 8: Cover / Thumbnail Shorts
- Generate frame cover vertikal 9:16 via Nano Banana 2.1 dengan teks tipografi terintegrasi.

### Tahap 9: YouTube Shorts Metadata
- Judul pendek catchy (<50 karakter) diakhiri `#shorts`.
- Deskripsi singkat dan 5–10 hashtag viral (`#shorts #sains #faktamenarik`).

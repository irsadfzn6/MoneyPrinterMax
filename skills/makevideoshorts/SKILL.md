---
name: makevideoshorts
description: Autonomous end-to-end production pipeline for viral YouTube Shorts, TikTok & Reels (Vertical 9:16, 30-60s) using 100% Nano Banana 2.1 static images (ZERO video credit burn), rapid visual shifts every 2-3s matching narration, Multi-TTS with API key, and Remotion. Triggered by /makevideoshorts or requests to create vertical short videos.
---

# Skill: /makevideoshorts (Viral Vertical Shorts Production)

Skill ini menjalankan alur kerja otomatis untuk memproduksi video vertikal (**9:16**, resolusi 1080x1920, durasi 30–60 detik) dengan **100% GAMBAR (Nano Banana 2.1)**—**TIDAK MENGGUNAKAN VIDEO OMNI FLASH SEHINGGA ZERO CREDIT BURN (HEMAT 100% KREDIT VIDEO)**.

---

## 🌐 Prinsip Open Source & Netralitas Channel
- Sistem ini bersifat open-source dan dapat digunakan untuk channel apa pun.
- **JANGAN PERNAH** mengasumsikan atau mencantumkan nama channel tertentu secara default dalam sambutan, skrip, atau watermark.
- Gunakan konfigurasi `.env` / `config/default.json` (`CHANNEL_NAME`) atau tanyakan kepada pengguna. Secara default gunakan placeholder netral seperti `Channel Anda` atau `@yourchannel`.

---

## 🛑 ATURAN BATCH: WAJIB x1 (1 VARIASI SAJA)!
- **DILARANG KERAS** menggunakan atau mengubah pengaturan Google Flow ke `x2`, `x3`, atau `x4`.
- **DILARANG KERAS** membuat script ad-hoc seperti `set_x2.js` atau sejenisnya!
- Seluruh generasi GAMBAR dan VIDEO **WAJIB 1 VARIASI (x1)**.
  - Video Omni Flash 1.1: 1 variasi x 4 detik = hanya 7 kredit (x2 membakar 24+ kredit!).
  - Gambar Nano Banana 2.1: 1 variasi (cepat, efisien, dan hemat waktu).

---

## ⚡ Karakteristik & Aturan Mutlak Format Shorts

1. **Rasio Aspek:** 9:16 (Vertikal / Portrait).
2. **100% Gambar (Nano Banana 2.1):** Seluruh shot **HANYA menggunakan gambar** Nano Banana 2.1 (gratis kuota tanpa membakar kredit video). Jangan gunakan video!
3. **Pacing Visual Cepat (2–3 Detik):** Gambar wajib berganti setiap **2 hingga 3 detik** (~15–20 gambar untuk durasi 45 detik).
4. **Visual Selaras Narasi:** Setiap gambar wajib mengilustrasikan secara spesifik penggalan kalimat narasi yang sedang diucapkan saat itu juga.
5. **Karakter Stickman Konsisten:** Karakter stickman acuan dibuat di awal dan diunggah sebagai *ingredient* di Google Flow pada shot-shot yang memunculkan karakter.
6. **Gerak Kamera Remotion:** Gambar statis diberi efek gerak dinamis *Ken Burns* (zoom in/out, pan, shake, tilt) di Remotion agar visual tampak hidup seperti animasi penuh.
7. **Captions Viral:** Teks subtitle memantul di tengah layar per kata (*bouncing word-by-word*) dengan warna kuning/putih dan stroke hitam tebal.
8. **Narasi Wajib API Key & Voice ID:** Menggunakan Cartesia AI (suara Victor) atau ElevenLabs.

---

## 🛑 9 Tahapan Baku yang Ditegakkan Secara Ketat

### Tahap 1: Ideation (Hook Pendek & Mengejutkan)
- Berikan 5 ide shorts berpotensi viral tinggi dengan hook kontroversial/penasaran pada 3 detik pertama, atau konfirmasi topik dari user.

### Tahap 2: Naskah Narasi Shorts (30–60 Detik)
- Tulis naskah narasi cepat, padat, tanpa basa-basi (sekitar 75–130 kata).
- Bagi narasi menjadi penggalan kalimat pendek berdurasi 2–3 detik per kalimat.
- **🛑 GERBANG REVIEW 1 (WAJIB):** Tampilkan naskah narasi shorts kepada user dan **STOP**. Tunggu konfirmasi/revisi teks sebelum lanjut!

### Tahap 3: Prompt Karakter Referensi
- Buat karakter acuan bergaya *2D minimalist vector stickman* dengan latar polos netral (`plain neutral off-white beige background`, full body, neutral pose):
  ```text
  Simple black stickman character with round white head, thick black outline, flat 2D vector animation style, [tema], minimal details, vertical 9:16, no text, full body, plain neutral beige background.
  ```
- Generate karakter pertama kali dan simpan di `visual/karakter/<nama>.png`.

### Tahap 4: Prompt Shot Vertikal (9:16 - 100% GAMBAR)
- Susun 15–20 shot gambar (aspek 9:16, durasi 2–3 detik per shot).
- Format setiap shot:
  - **Model:** `Nano Banana 2.1` (GAMBAR STATIS)
  - **Narasi:** Penggalan kalimat 2–3 detik
  - **Visual:** Aksi visual spesifik yang mencerminkan kalimat narasi
  - **📌 Referensi Karakter:** File karakter acuan yang relevan (misal `budi-panik.png`) atau `Tanpa Karakter`
- Contoh:
  ```text
  ### Shot 001 [🖼️ GAMBAR 2.5s - Ken Burns Zoom In]
  - **Narasi:** "Tepat jam 12 siang, Matahari tiba-tiba padam total!"
  - **📌 Referensi Karakter:** budi-panik.png
  Simple black stickman character with round white head, thick black outline, flat 2D vector animation style, vertical 9:16, no text. Stickman looking up at a black void where the sun used to be, holding his head in pure panic, city street background turning pitch black with starry sky.
  ```

### Tahap 5: Review Seluruh Prompt oleh User
- **🛑 GERBANG REVIEW 2 (WAJIB):** Tampilkan seluruh daftar prompt shot kepada user untuk diperiksa dan disetujui sebelum dikirim ke Google Flow.

### Tahap 6: Eksekusi Google Flow & Auto-Upscale 2K (Wajib Autonomous oleh AI)
- ⚠️ **ATURAN MUTLAK:** AI **WAJIB LANGSUNG MENGEKSEKUSI** pembuatan visual secara otomatis di latar belakang menggunakan skrip automation CDP port 9222:
  ```bash
  node engine/flow/batch.js <folder_proyek> --aspect 9:16
  ```
- 🛑 **DILARANG KERAS** memberikan instruksi manual kepada user untuk membuka browser atau copy-paste prompt! Pengguna meminta sistem ini agar semuanya berjalan otomatis (*end-to-end autonomous*).
- **Strict 1 Variasi (x1):** Otomatis terkunci pada `x1` (1 variasi gambar saja, bukan 2) agar proses cepat dan efisien.
- **Model:** `Nano Banana 2.1` (100% GAMBAR STATIS vertikal 9:16).
- **Auto-Upscale 2K:** Hasil gambar otomatis diunduh dalam resolusi tinggi 2K ke folder proyek.
- Laporkan progres secara berkala (misal tiap beberapa shot selesai).

### Tahap 7: Editing & Rendering di Remotion (Shorts Mode)
- Dubbing narasi via Cartesia AI (`engine/tts`) menggunakan API Key & Voice ID.
- Remotion memotong audio dan menyinkronkan pergantian gambar setiap 2–3 detik sesuai naskah.
- Terapkan animasi Ken Burns dinamis pada gambar dan subtitle memantul di tengah.
- Render via:
  `node engine/remotion/render_all.js shorts`
- Menghasilkan `final_video_shorts.mp4` (1080x1920) Full HD tanpa freeze.

### Tahap 8: Cover / Thumbnail Shorts
- Generate frame cover vertikal 9:16 via Nano Banana 2.1 dengan tipografi teks judul tebal langsung di-prompt ke dalam gambar AI.

### Tahap 9: YouTube Shorts SEO Packaging
- Judul pendek catchy (<50 karakter) diakhiri `#shorts`.
- Deskripsi singkat dan 5–10 hashtag viral (`#shorts #sains #faktamenarik`).

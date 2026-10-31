---
name: makevideolong
description: Autonomous end-to-end production pipeline for YouTube Long Videos (16:9, ~5-10 min) using Google Flow (Nano Banana 2.1 & Omni Flash 4s with 2K/1080p auto-upscale), Multi-TTS (Cartesia/ElevenLabs with API Key & Voice ID), and Remotion. Triggered by /makevideolong or requests to create full-length YouTube videos.
---

# Skill: /makevideolong (YouTube Long-Form Video Production)

Skill ini menjalankan alur kerja otomatis untuk memproduksi video YouTube panjang (**16:9**, durasi ~5–10 menit, 8–12 adegan) dengan gaya visual konsisten 2D flat minimalist vector stickman animation (*Kurzgesagt / Kok Bisa style*).

---

## 🌐 Prinsip Open Source & Netralitas Channel
- Sistem ini bersifat open-source dan dapat digunakan untuk channel apa pun.
- **JANGAN PERNAH** mengasumsikan atau mencantumkan nama channel tertentu secara default.
- Tanyakan nama channel kepada user jika belum didefinisikan, atau baca dari konfigurasi `.env` / `config/default.json` (`CHANNEL_NAME`). Secara default gunakan placeholder netral seperti `Channel Anda` atau `@yourchannel`.

---

## 🛑 9 Tahapan Baku & Aturan Mutlak

Anda **WAJIB** mengeksekusi tahapan ini secara berurutan tanpa melewatkan gerbang review pengguna:

### Tahap 1: Ideation (Brainstorming Konsep)
- Tanyakan topik apa yang ingin diangkat ATAU sajikan **10 ide cerita berpotensi viral & high-retention** dengan hook memikat.
- Tunggu pilihan user.

### Tahap 2: Naskah & Narasi Per Adegan
- Tulis naskah narasi lengkap dibagi per adegan (misal 8–12 adegan).
- **🛑 GERBANG REVIEW 1 (STOP & TUNGGU):** Tampilkan naskah narasi secara transparan kepada user. **JANGAN LANJUT** membuat prompt sebelum user menyetujui teks atau memberikan revisi!

### Tahap 3: Prompt Karakter Referensi Konsisten
- Buat 4–6 karakter acuan dengan format baku (sesuai conversation `f6935784-c606-441d-87fd-2e4df8c517f3`):
  ```text
  Simple black stickman character with round white head, thick black outline, flat 2D vector animation style, [setting/tema], minimal details, cinematic 16:9, no text, full body, standing neutral pose, solid plain neutral off-white beige background.
  ```
- Simpan file karakter di `visual/karakter/<nama_karakter>.png`.

### Tahap 4: Penyusunan Prompt Shot & Karakter Acuan
- Pecah setiap adegan menjadi shot-shot berdurasi 3–5 detik.
- Tentukan jenis media:
  - **GAMBAR:** Model `Nano Banana 2.1`
  - **VIDEO:** Model `Omni Flash 1.1` berdurasi **wajib 4 detik**
- Cantumkan baris penjelas eksplisit pada setiap shot:
  `📌 Referensi Karakter: <nama_file_karakter.png>` (atau `Tanpa Karakter`).

### Tahap 5: Review Seluruh Prompt oleh User
- **🛑 GERBANG REVIEW 2 (STOP & TUNGGU):** Tampilkan daftar prompt shot lengkap kepada user. Hanya lanjutkan ke Google Flow setelah user menyatakan setuju!

### Tahap 6: Eksekusi Google Flow & Auto-Upscale
- Jalankan modul `engine/flow/batch.js` terhubung ke Chrome CDP port 9222.
- **Auto-Upscale:** Gambar wajib di-download dengan memilih opsi **2K**, dan video wajib memilih opsi **1080p**.
- **Credit Exhaustion Fallback:** Jika kuota video habis ("Peringatan poin tidak cukup"), sistem otomatis beralih membuat gambar dengan Nano Banana 2.1 untuk sisa shot.

### Tahap 7: Editing & Rendering di Remotion
- Dubbing narasi per adegan via `engine/tts` (Cartesia AI atau ElevenLabs dengan API Key & Voice ID).
- Jalankan `python engine/remotion/build_scene.py <project_dir> all`.
- Gerak kamera dinamis *Ken Burns* pada gambar statis.
- *Dynamic playbackRate* pada klip video agar video 4s tidak pernah freeze.
- Subtitle kata-per-kata di bagian bawah dan watermark `@yourchannel`.
- Render per adegan via `node engine/remotion/render_all.js long` dan gabung menjadi video utuh via ffmpeg.

### Tahap 8: Pembuatan Thumbnail AI (Nano Banana 2.1)
- Generate thumbnail 16:9 via Nano Banana 2.1 di Google Flow.
- **Teks langsung dari gambar:** Masukkan instruksi tipografi tebal langsung ke dalam prompt gambar AI (contoh: *featuring bold comic vector title reading "JUDUL BESAR?!" in bright yellow with black stroke*). Jangan diedit manual terpisah.

### Tahap 9: YouTube SEO Packaging
- Sajikan 4 opsi judul High-CTR.
- Deskripsi lengkap dengan Timestamps babak video.
- Tag kata kunci relevan.
- Pinned Comment penarik interaksi.

# 🎬 MoneyPrinterMax Studio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Remotion](https://img.shields.io/badge/Rendered_with-Remotion-blue.svg)](https://remotion.dev)
[![Google Flow](https://img.shields.io/badge/AI_Engine-Google_Flow-orange.svg)](https://flow.google.com)
[![TTS Support](https://img.shields.io/badge/TTS-Cartesia%20%7C%20ElevenLabs%20%7C%20Free%20Edge--TTS-brightgreen.svg)]()

> **Autonomous YouTube Long & Shorts Video Production Engine.**  
> Menggabungkan otomasi browser Google Flow (Nano Banana 2.1 & Omni Flash 4s), multi-provider voice synthesis, auto-upscale 2K/1080p, dan rendering video berbasis Remotion dengan gaya visual konsisten ala *Kurzgesagt / Kok Bisa*.

---

## ⚡ Fitur Utama

- **Autonomous Google Flow Automation**: Mengontrol browser Google Chrome via CDP (port 9222) untuk generasi video (Omni Flash 1.1 4s) dan gambar (Nano Banana 2.1).
- **Auto-Upscale on Download**: Otomatis memilih resolusi **2K** untuk gambar dan **1080p** untuk video saat mengunduh dari Google Flow.
- **Credit Exhaustion Guard**: Otomatis mendeteksi kehabisan poin video dan beralih ke generasi gambar gratis Nano Banana 2.1 tanpa interupsi.
- **100% Karakter Konsisten**: Menghasilkan lembar karakter acuan di awal dan otomatis mengunggahnya sebagai *ingredient* pada setiap prompt shot.
- **Multi-TTS Engine**:
  - **Microsoft Edge-TTS**: 100% Gratis, tanpa API key (suara natural `id-ID-ArdiNeural` & `id-ID-GadisNeural`).
  - **Cartesia AI**: Latensi sangat rendah dengan ekspresi emosional tinggi (suara Victor).
  - **ElevenLabs**: Kualitas kloning suara papan atas.
- **Remotion Video Rendering**:
  - Format Landscape 16:9 (`LongVideo` Full HD 1920x1080).
  - Format Portrait 9:16 (`ShortsVideo` Full HD 1080x1920).
  - Animasi teks caption kata-per-kata yang bergerak dinamis.
  - Pergerakan kamera *Ken Burns* (zoom in/out, pan, tilt, shake) pada gambar statis.
  - *Dynamic playbackRate* pada klip video agar tidak pernah freeze.
  - Watermark channel dan jeda transisi antar adegan.
- **AI Thumbnail Generator**: Menghasilkan thumbnail YouTube High-CTR langsung via Nano Banana 2.1 dengan teks tipografi tebal terintegrasi di dalam gambar.
- **Antigravity Slash Commands**: Terintegrasi langsung dengan perintah `/makevideolong` dan `/makevideoshorts`.

---

## 🏗️ Struktur Repositori

```text
MoneyPrinterMax/
├── bin/
│   └── cli.js                     # CLI executable standalone
├── config/
│   ├── default.json               # Konfigurasi default (channel, resolusi, model)
│   └── env.example                # Template konfigurasi environment / API keys
├── docs/
│   ├── LOGIN_GOOGLE_FLOW.md       # Panduan login Google Flow sekali pakai via CDP
│   ├── TTS_PROVIDERS.md           # Panduan memilih Cartesia, ElevenLabs, atau Edge-TTS
│   └── WORKFLOW_GUIDE.md          # Panduan 9 tahapan alur baku & gerbang review
├── engine/
│   ├── flow/                      # Engine otomasi Google Flow (client, dom, batch)
│   ├── remotion/                  # Engine video Remotion (compositions, components, render)
│   ├── thumbnail/                 # Generator thumbnail AI dengan teks embedded
│   └── tts/                       # Multi-TTS engine (Cartesia, Edge-TTS, ElevenLabs)
├── skills/
│   ├── makevideolong/             # Antigravity skill untuk video 16:9 (~5-10 menit)
│   └── makevideoshorts/           # Antigravity skill untuk video vertikal 9:16 (30-60 detik)
├── package.json
└── README.md
```

---

## 🚀 Memulai Cepat (Quick Start)

### 1. Prasyarat Sistem
- **Node.js** (v18 atau lebih baru)
- **Python** (v3.10 atau lebih baru dengan `edge-tts` dan `pillow`)
- **FFmpeg** terpasang pada system PATH
- **Google Chrome**

### 2. Instalasi Dependensi
```bash
git clone https://github.com/irsadfzn6/MoneyPrinterMax.git
cd MoneyPrinterMax

# Install dependensi Node.js
npm install
cd engine/remotion && npm install && cd ../..

# Install dependensi Python TTS gratis
pip install edge-tts pillow
```

### 3. Setup Lingkungan & Login Google Flow
1. Salin konfigurasi environment:
   ```bash
   cp config/env.example .env
   ```
2. Buka Google Chrome dengan remote debugging port 9222 (lihat [Panduan Login](docs/LOGIN_GOOGLE_FLOW.md)):
   ```powershell
   & "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\Users\Dragon\.gemini\antigravity\chrome_flow_profile"
   ```
3. Buka `https://labs.google/fx/tools/flow` dan login akun Google Anda satu kali.

---

## 🤖 Menjalankan via Antigravity Slash Commands

Setelah skill dipasang, Anda dapat langsung mengetik di chat IDE:

- **`/makevideolong`**: Menjalankan pembuatan video panjang landscape 16:9 (~5-10 menit).
- **`/makevideoshorts`**: Menjalankan pembuatan video vertikal portrait 9:16 (30-60 detik).

### 9 Tahapan Baku yang Dijalankan:
1. **Ideation**: Memberikan 10 ide cerita atau menanyakan topik pilihan Anda.
2. **Naskah Narasi**: Membuat narasi per adegan. *(Berhenti untuk Review Anda)*
3. **Karakter Referensi**: Menghasilkan gambar karakter acuan konsisten dengan latar polos.
4. **Prompt Shot**: Menyusun prompt shot lengkap dengan mapping karakter. *(Berhenti untuk Review Anda)*
5. **Generasi Google Flow**: Mengunduh video Omni Flash 4s dan gambar Nano Banana 2.1 dengan **auto-upscale 2K/1080p**.
6. **Editing Remotion**: Sinkronisasi audio TTS, Ken Burns, caption kata per kata, dan watermark.
7. **Render Video**: Merender per adegan dan menggabungkan video final tanpa freeze.
8. **Thumbnail AI**: Menghasilkan thumbnail High-CTR dengan tipografi teks langsung dari gambar AI.
9. **YouTube SEO**: Menyiapkan judul penarik klik, deskripsi dengan timestamps, tag, dan pinned comment.

---

## 📜 Lisensi
Didistribusikan di bawah lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

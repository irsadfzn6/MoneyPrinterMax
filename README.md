# 🎬 MoneyPrinterMax Studio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Remotion](https://img.shields.io/badge/Rendered_with-Remotion-blue.svg)](https://remotion.dev)
[![Google Flow](https://img.shields.io/badge/AI_Engine-Google_Flow-orange.svg)](https://flow.google.com)
[![TTS Support](https://img.shields.io/badge/TTS-Cartesia%20AI%20%7C%20ElevenLabs-brightgreen.svg)]()

> **Autonomous YouTube Long & Shorts Video Production Engine.**  
> Menggabungkan otomasi browser Google Flow (Nano Banana 2.1 & Omni Flash 4s), voice synthesis Cartesia AI / ElevenLabs, auto-upscale 2K/1080p, dan rendering video berbasis Remotion dengan gaya visual konsisten ala *Kurzgesagt / Kok Bisa*.

---

## ⚡ Fitur Utama

- **Autonomous Google Flow Automation**: Mengontrol browser Google Chrome via CDP (port 9222) untuk generasi video (Omni Flash 1.1 4s) dan gambar (Nano Banana 2.1).
- **Auto-Upscale on Download**: Otomatis memilih resolusi **2K** untuk gambar dan **1080p** untuk video saat mengunduh dari Google Flow.
- **Credit-Saving Strategy**:
  - **Video Panjang (16:9):** Menggunakan kombinasi video Omni Flash 4s & gambar Nano Banana 2.1 dengan *Credit Exhaustion Guard* (otomatis beralih ke gambar bila poin video habis).
  - **Shorts (9:16):** **100% Menggunakan Gambar (Nano Banana 2.1)** dengan pergantian gambar cepat tiap 2–3 detik sesuai narasi sehingga **hemat 100% kredit video** tanpa mengurangi kedinamisan visual!
- **100% Karakter Konsisten**: Menghasilkan lembar karakter acuan di awal dan otomatis mengunggahnya sebagai *ingredient* pada setiap prompt shot.
- **TTS Engine Resmi (Wajib API Key & Voice ID)**:
  - **Cartesia AI (Default)**: Latensi sangat rendah dengan suara Victor yang ekspresif.
  - **ElevenLabs**: Kualitas kloning suara dan library voice internasional.
- **Remotion Video Rendering**:
  - Format Landscape 16:9 (`LongVideo` Full HD 1920x1080).
  - Format Portrait 9:16 (`ShortsVideo` Full HD 1080x1920).
  - Animasi teks caption kata-per-kata (bouncing di tengah untuk Shorts, lower-third untuk Long Video).
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
│   ├── TTS_PROVIDERS.md           # Panduan konfigurasi Cartesia AI & ElevenLabs
│   └── WORKFLOW_GUIDE.md          # Panduan 9 tahapan alur baku & gerbang review
├── engine/
│   ├── flow/                      # Engine otomasi Google Flow (client, dom, batch)
│   ├── remotion/                  # Engine video Remotion (compositions, components, render)
│   ├── thumbnail/                 # Generator thumbnail AI dengan teks embedded
│   └── tts/                       # TTS engine (Cartesia & ElevenLabs dengan API Key)
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
- **Python** (v3.10 atau lebih baru dengan `pillow`)
- **FFmpeg** terpasang pada system PATH
- **Google Chrome**

### 2. Instalasi Dependensi
```bash
git clone https://github.com/irsadfzn6/MoneyPrinterMax.git
cd MoneyPrinterMax

# Install dependensi Node.js
npm install
cd engine/remotion && npm install && cd ../..
```

### 🔄 Sinkronisasi Engine Google Flow (Upstream Updates)
Jika ada pembaruan model baru atau perbaikan DOM dari `google-flow-automation`, perbarui engine secara otomatis dengan satu perintah:
```bash
npm run sync:flow
```
Perintah ini akan secara otomatis menarik file terbaru dari `upstream/main` (`irsadfzn6/google-flow-automation`) ke dalam `engine/flow/`.

### 3. Setup Konfigurasi & API Key
Salin konfigurasi environment dan masukkan API key Cartesia / ElevenLabs Anda:
```bash
cp config/env.example .env
```
Edit file `.env`:
```env
TTS_PROVIDER=cartesia
CARTESIA_API_KEY=sk_car_xxxxxxxxxxxxxxxxxxxx
CARTESIA_VOICE_ID=b2a6771c-0f34-432b-9cf2-fd22efd32e3b
```

### 4. Buka Google Chrome Debugging (Port 9222)
Lihat [Panduan Login Google Flow](docs/LOGIN_GOOGLE_FLOW.md):
```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\Users\Dragon\.gemini\antigravity\chrome_flow_profile"
```
Buka `https://labs.google/fx/tools/flow` dan login akun Google Anda satu kali.

---

## 🤖 Menjalankan via Antigravity Slash Commands

- **`/makevideolong`**: Menjalankan pembuatan video panjang landscape 16:9 (~5–10 menit).
- **`/makevideoshorts`**: Menjalankan pembuatan video vertikal portrait 9:16 (30–60 detik, 100% gambar Nano Banana 2.1, zero credit burn).

### 9 Tahapan Baku yang Dijalankan:
1. **Ideation**: Memberikan ide cerita berpotensi viral atau menanyakan topik pilihan Anda.
2. **Naskah Narasi**: Membuat narasi per adegan/shot. *(Berhenti untuk Review Anda)*
3. **Karakter Acuan**: Menghasilkan gambar karakter acuan konsisten dengan latar polos.
4. **Prompt Shot**: Menyusun prompt shot lengkap dengan mapping karakter. *(Berhenti untuk Review Anda)*
5. **Generasi Google Flow**: Mengunduh aset dengan **auto-upscale 2K/1080p**.
6. **Editing Remotion**: Sinkronisasi audio Cartesia/ElevenLabs, Ken Burns dinamis, caption kata per kata, dan watermark.
7. **Render Video**: Merender per adegan dan menggabungkan video final tanpa freeze.
8. **Thumbnail AI**: Menghasilkan thumbnail High-CTR dengan tipografi teks langsung dari gambar AI.
9. **YouTube SEO**: Menyiapkan judul penarik klik, deskripsi dengan timestamps, tag, dan pinned comment.

---

## 📜 Lisensi
Didistribusikan di bawah lisensi MIT.

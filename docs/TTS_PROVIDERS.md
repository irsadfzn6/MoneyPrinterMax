# Panduan Konfigurasi Multi-TTS Engine

MoneyPrinterMax dirancang modular agar dapat digunakan oleh siapa saja, baik yang memiliki langganan AI voice berbayar maupun yang menginginkan solusi **100% gratis tanpa API key**.

---

## 🎙️ Pilihan Provider Suara (TTS)

| Provider | Kelebihan | Biaya | Setup API Key |
| :--- | :--- | :---: | :--- |
| **Microsoft Edge-TTS** | Kualitas suara natural Bahasa Indonesia (`id-ID-ArdiNeural` & `id-ID-GadisNeural`), sangat stabil. | **100% GRATIS** | **Tidak Perlu API Key** (Langsung Jalan) |
| **Cartesia AI** | Suara Victor yang sangat ekspresif, latensi sangat rendah (<200ms), intonasi dinamis. | Berbayar (Freemium) | Butuh `CARTESIA_API_KEY` |
| **ElevenLabs** | Kualitas kloning suara papan atas, banyak pilihan voice id internasional. | Berbayar | Butuh `ELEVENLABS_API_KEY` |

---

## ⚙️ Cara Mengatur di File `.env`

Salin file `config/env.example` menjadi `.env` di root project:

```bash
cp config/env.example .env
```

### 1. Jika Ingin Gratis (Edge-TTS)
Cukup biarkan atau kosongkan API key:
```env
TTS_PROVIDER=edge-tts
EDGE_TTS_VOICE=id-ID-ArdiNeural
```

### 2. Jika Menggunakan Cartesia AI
```env
TTS_PROVIDER=cartesia
CARTESIA_API_KEY=sk_car_xxxxxxxxxxxxxxxxxxxx
CARTESIA_VOICE_ID=b2a6771c-0f34-432b-9cf2-fd22efd32e3b
```

### 3. Mode Otomatis (`auto`)
Jika Anda menyetel `TTS_PROVIDER=auto`, sistem akan memeriksa apakah `CARTESIA_API_KEY` atau `ELEVENLABS_API_KEY` tersedia. Jika ada, sistem akan memakainya; jika tidak ada, sistem akan otomatis menggunakan **Edge-TTS gratis**.

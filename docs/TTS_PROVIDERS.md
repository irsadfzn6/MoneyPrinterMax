# Panduan Konfigurasi TTS Engine (Wajib API Key & Voice ID)

MoneyPrinterMax mendukung integrasi Text-to-Speech (TTS) berkualitas tinggi yang menghasilkan suara natural dan ekspresif. **Seluruh narasi wajib menggunakan API Key dan Voice ID resmi.**

---

## 🎙️ Pilihan Provider Suara (TTS)

| Provider | Kelebihan | Rekomendasi Penggunaan | Pengaturan Wajib |
| :--- | :--- | :---: | :--- |
| **Cartesia AI** | Suara Victor yang sangat ekspresif, latensi sangat cepat (<200ms), intonasi dinamis bahasa Indonesia. | **Pilihan Utama (Default)** | `CARTESIA_API_KEY` & `CARTESIA_VOICE_ID` |
| **ElevenLabs** | Kualitas kloning suara papan atas, voice library internasional. | Pilihan Alternatif | `ELEVENLABS_API_KEY` & `ELEVENLABS_VOICE_ID` |

---

## ⚙️ Cara Mengatur di File `.env`

Salin file `config/env.example` menjadi `.env` di root project:

```bash
cp config/env.example .env
```

### 1. Konfigurasi Cartesia AI (Default)
```env
TTS_PROVIDER=cartesia
CARTESIA_API_KEY=sk_car_xxxxxxxxxxxxxxxxxxxx
CARTESIA_VOICE_ID=b2a6771c-0f34-432b-9cf2-fd22efd32e3b
```

### 2. Konfigurasi ElevenLabs
```env
TTS_PROVIDER=elevenlabs
ELEVENLABS_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ELEVENLABS_VOICE_ID=xxxxxxxxxxxxxxxxxxxx
```

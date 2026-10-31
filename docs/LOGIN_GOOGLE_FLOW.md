# Panduan Login & Menyiapkan Google Flow (CDP Port 9222)

Untuk memungkinkan otomasi browser mengontrol Google Flow secara aman tanpa risiko pemblokiran bot atau kendala captcha, **MoneyPrinterMax** menggunakan **Chrome DevTools Protocol (CDP)** yang terhubung langsung ke browser Google Chrome asli Anda.

---

## 🚀 Langkah 1: Jalankan Chrome dengan Port Debugging 9222

Tutup seluruh jendela Google Chrome biasa terlebih dahulu, lalu buka terminal (PowerShell / Command Prompt) dan jalankan:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\Users\Dragon\.gemini\antigravity\chrome_flow_profile"
```

> **Tips Windows:** Anda juga dapat membuat shortcut desktop atau file `.bat` dengan isi perintah di atas agar bisa dibuka dengan sekali klik kapan saja.

---

## 🔑 Langkah 2: Login Akun Google Sekali Saja

1. Di jendela Chrome yang baru saja terbuka, buka situs:  
   👉 **`https://labs.google/fx/tools/flow`** (atau `https://flow.google.com/`)
2. Masuk (*Sign in*) dengan Akun Google Anda.
3. Karena profil disimpan permanen di `--user-data-dir`, Anda **hanya perlu login satu kali saja**. Sesi login akan tetap aktif untuk pembuatan video berikutnya tanpa perlu login ulang!

---

## ✅ Langkah 3: Verifikasi Koneksi CDP

Untuk memastikan koneksi remote debugging aktif dan siap menerima perintah, buka PowerShell dan ketik:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:9222/json/version"
```

Jika muncul informasi `Browser: Chrome/...` dan `webSocketDebuggerUrl`, artinya sistem siap digunakan!

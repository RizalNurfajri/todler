# ⚠️ Perubahan Penting - Backend API

## Update Terbaru (v2)

Backend sekarang menggunakan **TikWM API** (tikwm.com) yang merupakan public API untuk download TikTok.

### Keuntungan:
- ✅ **Tidak ada dependency eksternal** selain axios
- ✅ **Tidak perlu kompilasi native**
- ✅ **Instalasi super cepat**
- ✅ **Support HD video**
- ✅ **Gratis dan reliable**

## Riwayat Perubahan

### v2.0 - TikWM API
- Menggunakan tikwm.com public API
- Hanya memerlukan axios, express, cors, dotenv
- Instalasi tanpa error

### v1.1 - @tobyg74/tiktok-api-dl
- Mengganti tiktok-scraper dengan library pure JavaScript
- Masih memerlukan dependency tambahan

### v1.0 - tiktok-scraper (deprecated)
- Library awal yang memerlukan Visual Studio build tools
- Menyebabkan error instalasi

## Cara Install

```bash
cd backend
npm install
npm start
```

Seharusnya tidak ada error! 🎉

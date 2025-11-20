# ✅ Cara Menjalankan Todler

## � Checklist Sebelum Mulai

- [ ] Node.js sudah terinstall
- [ ] Dependencies sudah terinstall (`npm install`)
- [ ] File `.env.local` sudah dibuat

## 🚀 Langkah-langkah

### 1. Setup Environment Variable

**PENTING!** Buat file `.env.local` di root folder dengan isi:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Cara membuat:**
```bash
# Di root folder tdown
copy .env.local.example .env.local
```

Atau manual: buat file baru bernama `.env.local` (perhatikan titik di depan)

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### 3. Jalankan Backend (Terminal 1)

```bash
cd backend
npm start
```

**Harus muncul:**
```
🚀 Todler Backend API running on port 3001
📡 Frontend URL: http://localhost:3000
```

**Jangan tutup terminal ini!**

### 4. Jalankan Frontend (Terminal 2)

Buka terminal baru:

```bash
npm run dev
```

**Harus muncul:**
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
```

### 5. Buka Browser

Akses: **http://localhost:3000**

### 6. Test Download

1. Copy link TikTok (contoh: `https://www.tiktok.com/@username/video/1234567890`)
2. Paste di input field
3. Klik "Download Sekarang"
4. Tunggu beberapa detik
5. Klik tombol "Download MP4" atau "Download MP3"

## ❌ Troubleshooting

### Error: "Tidak dapat terhubung ke server"

**Penyebab:** Backend belum running atau file `.env.local` tidak ada

**Solusi:**
1. Pastikan backend running di terminal 1
2. Pastikan file `.env.local` ada dengan isi yang benar
3. Restart frontend (Ctrl+C lalu `npm run dev` lagi)

### Error: "Terjadi kesalahan. Pastikan koneksi internet Anda stabil"

**Penyebab:** Semua API eksternal gagal

**Solusi:**
1. Cek koneksi internet
2. Coba URL TikTok lain
3. Tunggu beberapa menit lalu coba lagi
4. Lihat log di terminal backend untuk detail error

### Backend tidak mau start

**Solusi:**
```bash
cd backend
rm -rf node_modules
npm install
npm start
```

### Frontend tidak mau start

**Solusi:**
```bash
rm -rf node_modules .next
npm install
npm run dev
```

## 📝 Catatan Penting

1. **Selalu jalankan backend dulu**, baru frontend
2. **Jangan tutup terminal backend** saat menggunakan aplikasi
3. **File `.env.local` wajib ada** di root folder
4. **Port 3000 dan 3001 harus kosong** (tidak dipakai aplikasi lain)

## 🎯 Quick Test

Setelah semua running, test dengan:

1. Buka http://localhost:3001/health → harus tampil `{"status":"ok"}`
2. Buka http://localhost:3000 → harus tampil website Todler
3. Coba download video TikTok

Jika semua berhasil, selamat! Todler sudah siap digunakan! 🎉

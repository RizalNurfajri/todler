# 🔧 Troubleshooting Guide - Todler

## Error: "Terjadi kesalahan. Pastikan koneksi internet Anda stabil."

### Kemungkinan Penyebab:

1. **Backend belum berjalan**
   - Pastikan backend server sudah running di port 3001
   - Cek terminal backend untuk melihat pesan error

2. **Frontend tidak terhubung ke backend**
   - Periksa file `.env.local` di root folder
   - Pastikan `NEXT_PUBLIC_API_URL=http://localhost:3001`

3. **CORS issue**
   - Backend harus allow request dari `http://localhost:3000`
   - Sudah dikonfigurasi di `backend/server.js`

4. **API eksternal down**
   - Backend sekarang menggunakan 4 API fallback
   - Jika semua API gagal, akan muncul error ini

## ✅ Cara Mengecek

### 1. Cek Backend Running

Buka terminal di folder `backend` dan jalankan:
```bash
npm start
```

Anda harus melihat:
```
🚀 Todler Backend API running on port 3001
📡 Frontend URL: http://localhost:3000
```

### 2. Test Backend API

Buka browser dan akses:
```
http://localhost:3001/health
```

Harus menampilkan:
```json
{"status":"ok","message":"Todler API is running"}
```

### 3. Test dengan URL TikTok

Gunakan Postman atau curl:
```bash
curl -X POST http://localhost:3001/api/download \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"https://www.tiktok.com/@username/video/1234567890\"}"
```

### 4. Cek Console Log

**Backend Terminal:**
- Lihat log untuk melihat API mana yang berhasil/gagal
- Contoh: `Trying TikWM API...`, `✅ Successfully fetched video!`

**Browser Console (F12):**
- Lihat network tab untuk melihat request ke `/api/download`
- Periksa response status dan error message

## 🔄 Solusi Umum

### Restart Backend
```bash
cd backend
# Ctrl+C untuk stop
npm start
```

### Restart Frontend
```bash
# Di root folder
# Ctrl+C untuk stop
npm run dev
```

### Clear Cache & Reinstall
```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Frontend
cd ..
rm -rf node_modules .next
npm install
```

## 📝 Format URL yang Benar

Pastikan URL TikTok dalam format:
- ✅ `https://www.tiktok.com/@username/video/1234567890`
- ✅ `https://m.tiktok.com/v/1234567890`
- ✅ `https://vm.tiktok.com/ZGxxxxx/`
- ✅ `https://vt.tiktok.com/ZSxxxxx/`

## 🆘 Masih Error?

1. **Cek koneksi internet** - Pastikan stabil
2. **Coba URL TikTok lain** - Mungkin video specific issue
3. **Tunggu beberapa saat** - API mungkin sedang overload
4. **Restart komputer** - Sometimes it just works™

## 🐛 Debug Mode

Untuk melihat detail error, buka browser console (F12) dan lihat:
- Network tab → klik request `/api/download` → lihat Response
- Console tab → lihat error messages

Jika masih bermasalah, copy error message dan tanyakan!

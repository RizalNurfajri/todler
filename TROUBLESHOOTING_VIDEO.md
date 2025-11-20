# 🔧 Troubleshooting - Output Bukan Video

## Masalah: Download menghasilkan file HTML atau bukan video

### Penyebab Umum:

1. **API mengembalikan HTML error page** - Server API down atau rate limited
2. **Video sudah dihapus** - Link valid tapi video tidak ada lagi
3. **Video private/region locked** - Tidak bisa diakses publik
4. **Short URL tidak ter-resolve** - vm.tiktok.com/vt.tiktok.com gagal redirect

### Solusi yang Sudah Diterapkan:

✅ **Validasi URL Video** - Backend sekarang mengecek:
- URL harus mengandung `.mp4` atau kata `video`
- URL tidak boleh mengandung `<html>` atau `<!DOCTYPE>`
- Response API harus valid dengan `code: 0`

✅ **Logging Detail** - Backend log response lengkap untuk debugging

✅ **Error Messages** - Pesan error lebih spesifik

### Cara Debug:

1. **Cek Terminal Backend** - Lihat log response dari TikWM API:
   ```
   TikWM Response: { code: 0, data: {...} }
   ```

2. **Cek Console Browser** (F12):
   - Network tab → lihat response `/api/download`
   - Console tab → lihat error messages

3. **Test URL Langsung**:
   ```bash
   curl -X POST https://www.tikwm.com/api/ \
     -d "url=YOUR_TIKTOK_URL&hd=1"
   ```

### Solusi Manual:

Jika masalah persist:

1. **Coba URL TikTok lain** - Pastikan video masih ada
2. **Gunakan desktop URL** - Hindari short link (vm/vt)
3. **Tunggu beberapa menit** - API mungkin rate limited
4. **Restart backend** - Clear cache dan reconnect

### Format URL yang Paling Reliable:

✅ **Recommended:**
```
https://www.tiktok.com/@username/video/1234567890
```

⚠️ **Kurang Reliable:**
```
https://vm.tiktok.com/ZGxxxxx/  (short link)
https://vt.tiktok.com/ZSxxxxx/  (short link)
```

### Jika Masih Bermasalah:

Kemungkinan TikWM API sedang down. Alternatif:
1. Coba lagi nanti (15-30 menit)
2. Gunakan TikTok downloader lain sementara
3. Check status TikWM API di browser: https://www.tikwm.com/

---

**Update Terbaru:**
- ✅ Added URL validation
- ✅ Added response logging
- ✅ Better error messages
- ✅ HTML content detection

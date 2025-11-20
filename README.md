# Todler - TikTok Video Downloader

Download video TikTok tanpa watermark. Gratis, cepat, dan mudah.

## ✨ Features

- 🎥 Download video tanpa watermark
- 🎵 Download audio MP3
- � Support semua format URL TikTok (desktop, mobile, short link)
- 🌙 Dark theme professional
- ⚡ Fast & simple UI

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/todler.git
cd todler

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Setup environment variables
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Running Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Open http://localhost:3000

## � Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- DaisyUI (Custom themes: todlerLight, todlerDark)
- Inter font

### Backend
- Express.js
- @tobyg74/tiktok-api-dl (SSSTik wrapper)
- CORS
- Axios

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
- Frontend: Vercel (recommended)
- Backend: Railway / Render (free tier available)

## 📝 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (backend/.env)
```env
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 🎨 Design System

- **Primary Color**: #FF8C42 (Orange)
- **Font**: Inter
- **Border Radius**: rounded-2xl
- **Spacing**: 4/8/12/16/24/32px scale
- **Themes**: todlerLight, todlerDark

## � Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues

## 🤝 Contributing

Contributions welcome! Please read the contributing guidelines first.

## 📄 License

MIT License - For educational purposes

## ⚠️ Disclaimer

This tool is for educational purposes only. Respect content creators' rights.

---

**Made with ❤️ for learning**

# 🚀 Deployment Guide - Vercel

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Backend deployed somewhere (Railway, Render, VPS, etc.)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/todler.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.com`
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live! 🎉

---

## Backend Deployment Options

### Option 1: Railway (Recommended - Free Tier)

1. **Sign up at [railway.app](https://railway.app)**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `backend` folder as root

3. **Configure**
   - Railway will auto-detect Node.js
   - Add environment variables:
     - `PORT` = `3001` (Railway will override this)
     - `FRONTEND_URL` = `https://your-vercel-app.vercel.app`

4. **Deploy**
   - Railway will auto-deploy
   - Copy the generated URL
   - Use this URL in Vercel's `NEXT_PUBLIC_API_URL`

### Option 2: Render (Free Tier)

1. **Sign up at [render.com](https://render.com)**

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**
   - Add `FRONTEND_URL` = `https://your-vercel-app.vercel.app`

4. **Deploy**
   - Render will auto-deploy
   - Copy the service URL
   - Use in Vercel's `NEXT_PUBLIC_API_URL`

### Option 3: Vercel Serverless Functions

**Note:** Backend menggunakan Express.js yang perlu dikonversi ke serverless functions.

1. **Create API Routes**
   - Move backend logic to `app/api/download/route.ts`
   - Convert Express routes to Next.js API routes

2. **Example:**
   ```typescript
   // app/api/download/route.ts
   import { NextRequest, NextResponse } from 'next/server'
   import TiktokDL from '@tobyg74/tiktok-api-dl'

   export async function POST(request: NextRequest) {
     const { url } = await request.json()
     // ... backend logic here
     return NextResponse.json({ status: 'success', data: result })
   }
   ```

3. **Update Frontend**
   - Change API URL to `/api/download` (relative)
   - Remove `NEXT_PUBLIC_API_URL` environment variable

---

## Post-Deployment Checklist

- [ ] Frontend accessible via Vercel URL
- [ ] Backend accessible and responding
- [ ] CORS configured correctly (FRONTEND_URL matches Vercel URL)
- [ ] Environment variables set correctly
- [ ] Test download functionality
- [ ] Check error handling
- [ ] Monitor logs for issues

---

## Troubleshooting

### CORS Error
- Check `FRONTEND_URL` in backend matches your Vercel URL exactly
- Include `https://` in the URL

### API Connection Failed
- Verify `NEXT_PUBLIC_API_URL` is set in Vercel
- Check backend is running and accessible
- Test backend health endpoint: `https://your-backend-url.com/health`

### Build Failed
- Check Node.js version (use 18+)
- Verify all dependencies in package.json
- Check build logs in Vercel dashboard

---

## Custom Domain (Optional)

1. **Buy domain** (Namecheap, GoDaddy, etc.)
2. **Add to Vercel**
   - Vercel Dashboard → Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions
3. **Update environment variables**
   - Update `FRONTEND_URL` in backend to your custom domain

---

## Monitoring

- **Vercel Analytics**: Built-in analytics in Vercel dashboard
- **Backend Logs**: Check Railway/Render logs for errors
- **Uptime Monitoring**: Use UptimeRobot (free) to monitor both frontend and backend

---

**Your app is now live! 🚀**

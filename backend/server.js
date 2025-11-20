const express = require('express');
const cors = require('cors');
const TiktokDL = require('@tobyg74/tiktok-api-dl');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// TikTok URL validation regex
const TIKTOK_URL_REGEX = /^(https?:\/\/)?(www\.|m\.|vm\.|vt\.)?tiktok\.com\/.+$/;

// Helper function to resolve short URLs
async function resolveShortUrl(url) {
    try {
        if (url.includes('vm.tiktok.com') || url.includes('vt.tiktok.com')) {
            const axios = require('axios');
            const response = await axios.get(url, {
                maxRedirects: 5,
                timeout: 10000,
                validateStatus: function (status) {
                    return status >= 200 && status < 400;
                }
            });
            return response.request.res.responseUrl || url;
        }
        return url;
    } catch (error) {
        console.error('Error resolving short URL:', error.message);
        return url;
    }
}

// Download TikTok video using @tobyg74/tiktok-api-dl v2 (SSSTik)
async function getTikTokVideo(url) {
    try {
        console.log('Downloading from TikTok using SSSTik (v2)...');
        console.log('URL:', url);

        // Use v2 which uses SSSTik internally
        const result = await TiktokDL.Downloader(url, {
            version: "v2"
        });

        console.log('API Response:', JSON.stringify(result, null, 2));

        if (result.status === 'error') {
            console.error('API returned error:', result.message);
            return { success: false, error: result.message };
        }

        if (!result.result) {
            console.error('No result data');
            return { success: false, error: 'No data returned from API' };
        }

        const data = result.result;

        // v2 response structure
        let videoUrl = null;
        let thumbnail = null;
        let audioUrl = null;
        let title = 'TikTok Video';
        let author = { username: 'Unknown', nickname: null, avatar: null };
        let stats = { likes: 0, comments: 0, shares: 0, views: 0 };

        if (data.type === 'video' && data.video) {
            videoUrl = data.video.playAddr || data.direct || null;
            thumbnail = data.author?.avatar || null;
            title = data.desc || 'TikTok Video';

            author = {
                username: data.author?.nickname || 'Unknown',
                nickname: data.author?.nickname || null,
                avatar: data.author?.avatar || null
            };

            if (data.statistics) {
                stats = {
                    likes: parseInt(data.statistics.likeCount) || 0,
                    comments: parseInt(data.statistics.commentCount) || 0,
                    shares: parseInt(data.statistics.shareCount) || 0,
                    views: 0
                };
            }

            audioUrl = data.music?.playUrl || null;
        }

        return {
            success: true,
            data: {
                video_url: videoUrl,
                audio_url: audioUrl,
                thumbnail: thumbnail,
                title: title,
                author: author,
                stats: stats,
                duration: data.video?.duration || 0,
                created_at: data.createTime || null,
                images: data.images || null,
                type: data.type || 'video'
            }
        };

    } catch (error) {
        console.error('TikTok Download error:', error);
        return { success: false, error: error.message };
    }
}

// POST /api/download - Download TikTok video
app.post('/api/download', async (req, res) => {
    try {
        const { url } = req.body;

        // Validate URL presence
        if (!url) {
            return res.status(400).json({
                status: 'error',
                message: 'URL TikTok tidak boleh kosong.'
            });
        }

        // Validate TikTok URL format
        if (!TIKTOK_URL_REGEX.test(url)) {
            return res.status(400).json({
                status: 'error',
                message: 'Link TikTok tidak valid. Coba periksa lagi.'
            });
        }

        // Resolve short URLs if needed
        console.log('Original URL:', url);
        const resolvedUrl = await resolveShortUrl(url);
        console.log('Resolved URL:', resolvedUrl);

        // Try to get video
        const result = await getTikTokVideo(resolvedUrl);

        if (!result.success) {
            console.error('Failed to fetch video:', result.error);
            return res.status(404).json({
                status: 'error',
                message: result.error || 'Video tidak ditemukan. Pastikan link valid dan video tidak private.'
            });
        }

        if (!result.data || (!result.data.video_url && !result.data.images)) {
            return res.status(404).json({
                status: 'error',
                message: 'Video tidak ditemukan. Pastikan link valid dan video tidak private.'
            });
        }

        return res.json({
            status: 'success',
            data: result.data
        });

    } catch (error) {
        console.error('Download error:', error);

        // Handle specific errors
        if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
            return res.status(504).json({
                status: 'error',
                message: 'Koneksi timeout. Coba lagi dalam beberapa saat.'
            });
        }

        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            return res.status(503).json({
                status: 'error',
                message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
            });
        }

        // Generic error
        return res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan. Pastikan koneksi internet Anda stabil.'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Todler API is running with SSSTik (v2)' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Todler Backend API running on port ${PORT}`);
    console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    console.log(`📦 Using @tobyg74/tiktok-api-dl v2 (SSSTik wrapper)`);
});

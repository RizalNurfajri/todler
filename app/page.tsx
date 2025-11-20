"use client"

import { useState } from "react"

interface DownloadResult {
    video_url?: string
    audio_url?: string
    thumbnail?: string
    title?: string
    author?: {
        username?: string
    }
    stats?: {
        likes?: number
        comments?: number
        views?: number
    }
}

export default function Home() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [result, setResult] = useState<DownloadResult | null>(null)

    const handleDownload = async () => {
        setError("")
        setResult(null)

        if (!url.trim()) {
            setError("URL masih kosong.")
            return
        }

        const tiktokRegex = /^(https?:\/\/)?(www\.|m\.|vm\.|vt\.)?tiktok\.com\/.+$/
        if (!tiktokRegex.test(url)) {
            setError("Link TikTok tidak valid. Coba periksa lagi.")
            return
        }

        setLoading(true)

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
            const response = await fetch(`${apiUrl}/api/download`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            })

            const data = await response.json()

            if (!response.ok || data.status === "error") {
                setError(data.message || "Server sedang sibuk. Coba beberapa saat lagi.")
                return
            }

            setResult(data.data)
        } catch (err) {
            setError("Server sedang sibuk. Coba beberapa saat lagi.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-base-200">
            {/* Navbar */}
            <header className="fixed top-0 inset-x-0 z-50 bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60 border-b border-base-300">
                <div className="navbar px-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex-1">
                        <a className="text-xl font-semibold tracking-tight">Todler</a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-20 pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Hero */}
                    <section className="text-center space-y-6 max-w-2xl mx-auto py-12 sm:py-16">
                        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                            Download Video TikTok Tanpa Watermark
                        </h1>
                        <p className="text-base sm:text-lg text-base-content/70">
                            Tempel link TikTok kamu — selesai dalam hitungan detik.
                        </p>
                    </section>

                    {/* URL Form */}
                    <section className="max-w-2xl mx-auto mb-12">
                        <div className="card bg-base-100 border border-base-300 shadow-md rounded-2xl p-4 sm:p-6">
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="https://vm.tiktok.com/ZGxxxxx/ atau https://www.tiktok.com/@user/video/123..."
                                    className="input input-bordered w-full h-12 rounded-2xl"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && !loading && handleDownload()}
                                    disabled={loading}
                                    aria-invalid={!!error}
                                    aria-busy={loading}
                                />
                                <button
                                    className="btn btn-primary h-12 w-full rounded-2xl"
                                    onClick={handleDownload}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Mengambil video dari TikTok…
                                        </>
                                    ) : (
                                        "Download sekarang"
                                    )}
                                </button>

                                {error && (
                                    <div role="alert" className="alert alert-error rounded-2xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm">{error}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Result Card */}
                    {result && (
                        <section className="max-w-2xl mx-auto mb-12">
                            <div className="card bg-base-100 border border-base-300 shadow-md rounded-2xl overflow-hidden">
                                {result.thumbnail && (
                                    <figure className="aspect-video w-full bg-base-200">
                                        <img src={result.thumbnail} alt="Video preview" className="w-full h-full object-cover" />
                                    </figure>
                                )}

                                <div className="card-body p-4 sm:p-6 space-y-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">Video ditemukan 🎉</h2>
                                        {result.title && (
                                            <p className="text-sm text-base-content/70 mt-1">{result.title}</p>
                                        )}
                                        {result.author?.username && (
                                            <p className="text-sm text-base-content/70">@{result.author.username}</p>
                                        )}
                                    </div>

                                    <p className="text-sm text-base-content/70">
                                        Pilih format yang ingin kamu unduh:
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {result.video_url && (
                                            <a
                                                href={result.video_url}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary btn-md rounded-2xl flex-1"
                                            >
                                                Download MP4
                                            </a>
                                        )}
                                        {result.audio_url && (
                                            <a
                                                href={result.audio_url}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-secondary btn-outline btn-md rounded-2xl flex-1"
                                            >
                                                Download Audio
                                            </a>
                                        )}
                                    </div>

                                    <p className="text-xs text-base-content/60">
                                        Video akan diunduh tanpa watermark TikTok
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* How It Works */}
                    <section className="max-w-4xl mx-auto py-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Cara Menggunakan</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="card bg-base-100 border border-base-300 rounded-2xl p-4">
                                <div className="text-center space-y-2">
                                    <div className="text-3xl font-bold text-primary">1</div>
                                    <h3 className="font-semibold">Salin link video TikTok</h3>
                                    <p className="text-sm text-base-content/70">Dari aplikasi atau browser</p>
                                </div>
                            </div>
                            <div className="card bg-base-100 border border-base-300 rounded-2xl p-4">
                                <div className="text-center space-y-2">
                                    <div className="text-3xl font-bold text-primary">2</div>
                                    <h3 className="font-semibold">Tempel di Todler</h3>
                                    <p className="text-sm text-base-content/70">Paste URL di form di atas</p>
                                </div>
                            </div>
                            <div className="card bg-base-100 border border-base-300 rounded-2xl p-4">
                                <div className="text-center space-y-2">
                                    <div className="text-3xl font-bold text-primary">3</div>
                                    <h3 className="font-semibold">Klik Download</h3>
                                    <p className="text-sm text-base-content/70">Video siap diunduh</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="max-w-2xl mx-auto py-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">FAQ</h2>
                        <div className="join join-vertical w-full">
                            <div className="collapse collapse-arrow join-item bg-base-100 border border-base-300 rounded-2xl mb-2">
                                <input type="radio" name="faq-accordion" defaultChecked />
                                <div className="collapse-title font-semibold">
                                    Apakah mendukung link pendek vm/vt?
                                </div>
                                <div className="collapse-content text-sm text-base-content/70">
                                    <p>Ya, Todler mendukung vm.tiktok.com dan vt.tiktok.com serta semua format URL TikTok.</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item bg-base-100 border border-base-300 rounded-2xl">
                                <input type="radio" name="faq-accordion" />
                                <div className="collapse-title font-semibold">
                                    Bagaimana jika video private?
                                </div>
                                <div className="collapse-content text-sm text-base-content/70">
                                    <p>Video private tidak dapat diunduh karena tidak dapat diakses dari API eksternal.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-base-300 bg-base-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-sm text-base-content/70 text-center">
                        Todler — TikTok Downloader. Untuk edukasi.
                    </p>
                </div>
            </footer>
        </div>
    )
}

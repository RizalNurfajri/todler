import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "Todler - Download Video TikTok Tanpa Watermark",
    description: "Download video TikTok tanpa watermark. Gratis, cepat, dan mudah. Support semua format link TikTok.",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" data-theme="todlerDark">
            <body className="antialiased">{children}</body>
        </html>
    )
}

import Link from "next/link"

export function Navbar() {
    return (
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5 text-primary-foreground"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold">Todler</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <Link
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Cara Pakai
                    </Link>
                    <Link
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        FAQ
                    </Link>
                </div>
            </div>
        </nav>
    )
}

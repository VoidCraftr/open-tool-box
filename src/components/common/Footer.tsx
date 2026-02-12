import Link from "next/link"
import { TimeDisplay } from "@/components/common/TimeDisplay"

export function Footer() {
    return (
        <footer className="py-6 md:px-8 md:py-0 border-t border-border/50 mt-12">
            <div className="container flex flex-col items-center justify-between gap-6 md:h-auto md:py-8 md:flex-row">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <Link
                            href="https://voidcraftr.com"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            VoidCraftr
                        </Link>
                        . Open source on{" "}
                        <Link
                            href="https://github.com/voidcraftr"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </Link>
                        .
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                        © {new Date().getFullYear()} OpenToolBox. All tools process locally in your browser.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <TimeDisplay />
                    <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <Link href="/tools" className="hover:text-foreground transition-colors">All Tools</Link>
                        <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                        <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                        <Link href="/sitemap.xml" className="hover:text-foreground transition-colors">Sitemap</Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

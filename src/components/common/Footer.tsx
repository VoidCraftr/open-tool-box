import Link from "next/link"
import { TimeDisplay } from "@/components/common/TimeDisplay"

export function Footer() {
    return (
        <footer className="py-6 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
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
                    . The source code is available on{" "}
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
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <TimeDisplay />
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                        <Link href="/terms" className="hover:underline">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

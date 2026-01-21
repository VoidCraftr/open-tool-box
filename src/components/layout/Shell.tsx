"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Footer } from "@/components/common/Footer"
import { MobileNav } from "@/components/layout/MobileNav"
import { ModeToggle } from "@/components/common/ModeToggle"
import { Button } from "@/components/ui/button"
import { Coffee } from "lucide-react"
import { SidebarAd } from "@/components/ads/AdContainer"

import { CommandMenu } from "@/components/common/CommandMenu"
import { Search, Github, Package2 } from "lucide-react"

export function Shell({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [commandOpen, setCommandOpen] = useState(false)
    const pathname = usePathname()

    // Only show sidebar ad on individual tool pages (e.g., /tools/json-formatter)
    // Exclude: homepage (/), tools listing (/tools), static pages (/about, /contact, /support, etc.)
    const showSidebarAd = pathname?.startsWith('/tools/') && pathname !== '/tools' && pathname !== '/tools/'

    return (
        <div className="relative flex min-h-screen">
            <AppSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <div
                className={cn(
                    "flex-1 flex flex-col transition-all duration-300 ease-in-out",
                    isCollapsed ? "md:pl-[60px]" : "md:pl-64 lg:pl-72"
                )}
            >
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-background/60 backdrop-blur-2xl border-b border-foreground/5 px-4 md:px-6 transition-all supports-[backdrop-filter]:bg-background/60">
                    <div className="flex items-center gap-2 mr-4">
                        <MobileNav />
                        <Link href="/" className="flex items-center gap-2 group md:hidden">
                            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
                                <Image
                                    src="/assets/OpenToolBox_Logo.png"
                                    alt="OpenToolBox"
                                    width={32}
                                    height={32}
                                    sizes="100vw"
                                    className="w-auto h-8 shrink-0 rounded-sm"
                                />
                            </div>
                            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">OpenToolBox</span>
                        </Link>
                    </div>

                    {/* Search Trigger */}
                    <div className="hidden md:flex flex-1 max-w-sm">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-muted-foreground bg-muted/20 hover:bg-muted/30 border-primary/10 h-9 transition-all active:scale-95 shadow-sm"
                            onClick={() => setCommandOpen(true)}
                        >
                            <Search className="h-4 w-4 mr-2 opacity-50" />
                            <span className="inline-flex">Search tools...</span>
                            <kbd className="pointer-events-none ml-auto h-5 select-none items-center gap-1 rounded border bg-background/50 px-1.5 font-mono text-[10px] font-medium opacity-100 flex shadow-sm">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </Button>
                    </div>

                    <div className="flex-1 flex justify-center md:justify-end lg:justify-center">
                        <nav className="hidden md:flex items-center gap-1 bg-muted/20 p-1 rounded-full border border-white/5 backdrop-blur-sm">
                            <Link href="/tools" className="px-4 py-1.5 text-sm font-medium rounded-full transition-all hover:bg-background/50 hover:text-foreground text-muted-foreground hover:shadow-sm">
                                All Tools
                            </Link>
                            <Link href="/about" className="px-4 py-1.5 text-sm font-medium rounded-full transition-all hover:bg-background/50 hover:text-foreground text-muted-foreground hover:shadow-sm">
                                About
                            </Link>
                            <Link href="/contact" className="px-4 py-1.5 text-sm font-medium rounded-full transition-all hover:bg-background/50 hover:text-foreground text-muted-foreground hover:shadow-sm">
                                Contact
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <Link href="/support" className="hidden md:block">
                            <Button variant="outline" size="sm" className="h-9 gap-2 border-orange-200/50 bg-orange-50/50 text-orange-600 hover:bg-orange-100 hover:text-orange-700 dark:border-orange-900/50 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/40 shadow-sm transition-all hover:-translate-y-0.5">
                                <Coffee className="h-4 w-4" />
                                <span>Buy Coffee</span>
                            </Button>
                        </Link>
                        <div className="h-8 w-px bg-border/50 mx-1 hidden md:block" />
                        <ModeToggle />
                    </div>
                </header>

                <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
                <main className="flex-1 container py-2 md:py-6 max-w-7xl mx-auto animate-fade-in">
                    {showSidebarAd ? (
                        <div className="flex gap-6">
                            {/* Main Content */}
                            <div className="flex-1 min-w-0">
                                {children}
                            </div>

                            {/* Sidebar Ad - Desktop Only, Tool Pages Only */}
                            <aside className="hidden xl:block w-[300px] shrink-0">
                                <SidebarAd className="sticky top-20" />
                            </aside>
                        </div>
                    ) : (
                        // No sidebar ad for homepage and static pages
                        children
                    )}
                </main>
                <Footer />
            </div>
        </div>
    )
}

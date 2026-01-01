"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import Link from "next/link"
import { Search, Sparkles, Command } from "lucide-react"
import { tools, categories } from "@/config/tools"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function ToolsDashboard() {
    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState("all")
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const updateMousePosition = (ev: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            setMousePosition({
                x: ev.clientX - rect.left,
                y: ev.clientY - rect.top,
            })
        }

        container.addEventListener("mousemove", updateMousePosition)
        return () => {
            container.removeEventListener("mousemove", updateMousePosition)
        }
    }, [])

    const filteredTools = useMemo(() => {
        return tools.filter(tool => {
            const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                tool.description.toLowerCase().includes(search.toLowerCase())
            const matchesCategory = activeCategory === "all" || tool.category === activeCategory
            return matchesSearch && matchesCategory
        })
    }, [search, activeCategory])

    const allCategories = [{ id: "all", label: "All", icon: Sparkles }, ...categories]

    return (
        <div className="relative min-h-screen w-full">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="space-y-10 pb-20">
                {/* Hero / Header Section */}
                <div className="flex flex-col items-center text-center space-y-6 pt-8">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        {tools.length} Developer Utilities Available
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                        What would you like to build?
                    </h1>

                    {/* Floating Search Bar */}
                    <div className="relative w-full max-w-xl group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex items-center bg-background/80 backdrop-blur-xl border rounded-xl shadow-sm ring-offset-background transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                            <Search className="ml-4 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search tools (e.g., 'json', 'pdf')..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border-0 bg-transparent h-14 text-lg focus-visible:ring-0 placeholder:text-muted-foreground/50"
                            />
                            <div className="mr-4 hidden md:flex h-6 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <Command className="h-3 w-3" /> F
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex justify-center">
                    <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl border backdrop-blur-sm max-w-4xl mx-auto">
                        {allCategories.map(cat => {
                            const count = cat.id === "all"
                                ? tools.length
                                : tools.filter(t => t.category === cat.id).length

                            if (count === 0) return null

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2",
                                        activeCategory === cat.id
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    <span>{cat.label}</span>
                                    <span className={cn(
                                        "text-[10px] px-1.5 py-0.5 rounded-full",
                                        activeCategory === cat.id
                                            ? "bg-primary-foreground/20 text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                    )}>
                                        {count}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Spotlight Grid */}
                <div
                    ref={containerRef}
                    className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                >
                    {filteredTools.map((tool) => (
                        <ToolCard key={tool.slug} tool={tool} mousePosition={mousePosition} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredTools.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
                        <div className="h-20 w-20 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-xl font-bold">No results found</h3>
                        <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                            Try adjusting your search terms or browsing "All" categories.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

function ToolCard({ tool, mousePosition }: { tool: any, mousePosition: { x: number, y: number } }) {
    const cardRef = useRef<HTMLAnchorElement>(null)
    const [offset, setOffset] = useState({ left: 0, top: 0 })
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (cardRef.current) {
            setOffset({
                left: cardRef.current.offsetLeft,
                top: cardRef.current.offsetTop
            })
        }
    }, [])

    const x = mousePosition.x - offset.left
    const y = mousePosition.y - offset.top

    const Icon = tool.icon

    return (
        <Link
            ref={cardRef}
            href={`/tools/${tool.slug}`}
            className="group relative rounded-xl border bg-card/50 px-6 py-6 transition-all hover:bg-card/80 overflow-hidden"
        >
            {/* Spotlight Effect - Client Side Only */}
            {mounted && (
                <>
                    <div
                        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10 [--spotlight-color:rgba(0,0,0,0.05)] dark:[--spotlight-color:rgba(255,255,255,0.06)]"
                        style={{
                            background: `radial-gradient(600px circle at ${x}px ${y}px, var(--spotlight-color), transparent 40%)`,
                            maskImage: `radial-gradient(300px circle at ${x}px ${y}px, black, transparent)`,
                            WebkitMaskImage: `radial-gradient(300px circle at ${x}px ${y}px, black, transparent)`
                        }}
                    />

                    {/* Border Glow */}
                    <div
                        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 [--spotlight-border:rgba(0,0,0,0.1)] dark:[--spotlight-border:rgba(255,255,255,0.3)]"
                        style={{
                            background: `radial-gradient(600px circle at ${x}px ${y}px, var(--spotlight-border), transparent 40%)`,
                        }}
                    />
                </>
            )}

            <div className="relative flex flex-col gap-4 z-20">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="rounded-lg border bg-background/50 p-2.5 shadow-sm transition-colors group-hover:bg-primary/5">
                        <Icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex gap-2">
                        {tool.isNew && <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" title="New Code"></span>}
                        {tool.isPopular && <span className="flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" title="Popular"></span>}
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-1">
                    <h3 className="font-semibold leading-none tracking-tight text-foreground">
                        {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {tool.description}
                    </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </Link>
    )
}


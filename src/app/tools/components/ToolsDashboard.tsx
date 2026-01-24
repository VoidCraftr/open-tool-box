"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import Link from "next/link"
import { Search, Sparkles, Command, ArrowRight, Star, Globe, Shield, Zap, LayoutGrid, ListFilter } from "lucide-react"
import { tools, categories } from "@/config/tools"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function ToolsDashboard() {
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null) // null = all
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

    const getToolsByCategory = (category: string) => {
        return tools.filter(tool => {
            const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                tool.description.toLowerCase().includes(search.toLowerCase())
            const matchesCategory = tool.category === category
            const matchesFilter = !selectedCategory || tool.category === selectedCategory
            return matchesSearch && matchesCategory && matchesFilter
        })
    }

    const hasResults = categories.some(cat => getToolsByCategory(cat.id).length > 0)

    // Get filtered categories to display (only show "All" if no category is selected)
    const visibleCategories = selectedCategory
        ? categories.filter(cat => cat.id === selectedCategory)
        : categories

    return (
        <div className="relative min-h-screen w-full">
            {/* Ambient Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="space-y-12 pb-24" ref={containerRef}>
                {/* Hero Stage */}
                <div className="flex flex-col items-center text-center space-y-8 pt-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-[0.2em] backdrop-blur-xl"
                    >
                        <Zap className="w-3 h-3 mr-2 animate-pulse" />
                        {tools.length} Professional Utilities Online
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground max-w-4xl leading-[1.1]">
                        The Ultimate <br />
                        <span className="bg-gradient-to-r from-primary via-blue-500 to-emerald-500 bg-clip-text text-transparent italic animate-gradient">Developer Arsenal</span>
                    </h1>

                    {/* Master Searchbar */}
                    <div className="relative w-full max-w-2xl group px-4">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-3xl blur-xl opacity-20 group-hover:opacity-60 transition duration-1000" />
                        <div className="relative flex items-center bg-background/40 backdrop-blur-3xl border-2 border-white/10 rounded-[2rem] shadow-2xl transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                            <Search className="ml-6 h-6 w-6 text-primary/60 group-hover:text-primary transition-colors" />
                            <Input
                                placeholder="Search by name, category, or keyword..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border-0 bg-transparent h-16 text-xl focus-visible:ring-0 placeholder:text-muted-foreground/30 font-medium px-4"
                            />
                            <div className="mr-6 hidden md:flex h-8 items-center gap-1.5 rounded-xl border-white/10 bg-white/5 border px-3 font-mono text-[10px] font-black text-muted-foreground uppercase">
                                <Command className="h-3 w-3" /> K
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex justify-center px-4">
                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={cn(
                                "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                !selectedCategory
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20"
                            )}
                        >
                            <LayoutGrid className="w-3 h-3 inline mr-1.5" />
                            All Tools
                        </button>
                        {categories.map((cat) => {
                            const CatIcon = cat.icon
                            const count = tools.filter(t => t.category === cat.id).length
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                        selectedCategory === cat.id
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                            : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20"
                                    )}
                                >
                                    <CatIcon className="w-3 h-3 inline mr-1.5" />
                                    {cat.label}
                                    <span className="ml-1.5 opacity-50">({count})</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Categorized Grid */}
                <div className="container max-w-[1400px] mx-auto px-4 space-y-20">
                    <AnimatePresence>
                        {visibleCategories.map((category) => {
                            const categoryTools = getToolsByCategory(category.id);
                            if (categoryTools.length === 0) return null;
                            const CatIcon = category.icon || LayoutGrid;

                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-8"
                                >
                                    {/* Category Header */}
                                    <div className="flex items-center gap-4 border-b border-border/40 pb-4">
                                        <div className="p-3 bg-primary/10 rounded-2xl">
                                            <CatIcon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black uppercase tracking-tight">{category.label}</h2>
                                            <p className="text-sm text-muted-foreground font-medium">{categoryTools.length} Tools Available</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {categoryTools.map((tool) => (
                                            <ToolEntry
                                                key={tool.slug}
                                                tool={tool}
                                                x={mousePosition.x}
                                                y={mousePosition.y}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Null Result */}
                    {!hasResults && (
                        <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-500">
                            <div className="h-24 w-24 rounded-[2rem] bg-primary/5 flex items-center justify-center mb-6 animate-bounce">
                                <Search className="h-10 w-10 text-primary/20" />
                            </div>
                            <h3 className="text-3xl font-black tracking-tight">Access Violation</h3>
                            <p className="text-muted-foreground mt-3 max-w-sm mx-auto text-lg leading-relaxed">
                                No utilities matching your search vector. Try searching for a broad category like <span className="text-primary font-bold">"Design"</span>.
                            </p>
                            <Button variant="outline" onClick={() => setSearch("")} className="mt-8 rounded-2xl h-12 px-8 font-black border-primary/20 hover:bg-primary/5 transition-all">
                                RESET SEARCH
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function ToolEntry({ tool, x, y }: { tool: any, x: number, y: number }) {
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

    const Icon = tool.icon

    return (
        <Link
            ref={cardRef}
            href={`/tools/${tool.slug}`}
            className="group relative rounded-[2rem] border-white/5 border bg-white/[0.03] p-8 transition-all hover:bg-white/[0.07] overflow-hidden flex flex-col gap-6 active:scale-95 liquid-shadow h-full"
        >
            {/* Holographic Spotlight */}
            {mounted && (
                <div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-10"
                    style={{
                        background: `radial-gradient(400px circle at ${x - offset.left}px ${y - offset.top}px, rgba(var(--primary-rgb), 0.1), transparent 70%)`,
                    }}
                />
            )}

            <div className="relative z-20 flex flex-col gap-6 h-full">
                {/* Visual Identity */}
                <div className="flex items-start justify-between">
                    <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 shadow-sm transition-all group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:-translate-y-1">
                        <Icon className="h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110" />
                    </div>
                    <div className="flex flex-col items-end gap-1.5 pt-1">
                        {tool.isPremium && (
                            <div className="flex items-center bg-violet-500/10 text-violet-500 border border-violet-500/20 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                                <Star className="w-2.5 h-2.5 mr-1 fill-current" /> PREMIUM
                            </div>
                        )}
                        {tool.isNew && (
                            <div className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                                UNLOCK
                            </div>
                        )}
                        {tool.isPopular && (
                            <div className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                                FIRE
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Matrix */}
                <div className="space-y-2.5 flex-1">
                    <h3 className="text-xl font-black leading-none tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground/60 line-clamp-2 leading-relaxed font-medium group-hover:text-muted-foreground transition-colors">
                        {tool.description}
                    </p>
                </div>

                {/* Footer Insight */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase text-primary/60 tracking-wider">
                            {categories.find(c => c.id === tool.category)?.label || tool.category}
                        </span>
                    </div>
                    <div className="opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

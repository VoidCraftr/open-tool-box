"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package2, PanelLeftClose, PanelLeftOpen, ChevronRight, ChevronDown } from "lucide-react"

import { categories, tools } from "@/config/tools"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction, useState, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AppSidebarProps {
    isCollapsed: boolean
    setIsCollapsed: Dispatch<SetStateAction<boolean>>
}

export function AppSidebar({ isCollapsed, setIsCollapsed }: AppSidebarProps) {
    const pathname = usePathname()
    const [expandedCategories, setExpandedCategories] = useState<string[]>([])

    // Initialize expanded categories based on current path
    useEffect(() => {
        const activeTool = tools.find(t => pathname.includes(t.slug))
        if (activeTool) {
            setExpandedCategories(prev => {
                if (!prev.includes(activeTool.category)) {
                    return [...prev, activeTool.category]
                }
                return prev
            })
        }
    }, [pathname])

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(c => c !== categoryId)
                : [...prev, categoryId]
        )
    }

    return (
        <TooltipProvider delayDuration={0}>
            <div
                className={cn(
                    "hidden border-r border-white/5 md:flex h-screen flex-col fixed left-0 top-0 overflow-hidden transition-all duration-300 ease-in-out z-40 bg-background/60 backdrop-blur-xl",
                    isCollapsed ? "w-[60px]" : "w-64 lg:w-72"
                )}
            >
                <div className={cn("flex h-14 items-center border-b border-white/5 px-4 lg:h-[60px]", isCollapsed ? "justify-center px-2" : "px-6")}>
                    {!isCollapsed && (
                        <Link href="/" className="flex items-center gap-2 font-semibold truncate hover:text-primary transition-colors">
                            <Package2 className="h-6 w-6 shrink-0 text-primary" />
                            <span className="tracking-tight">OpenToolBox</span>
                        </Link>
                    )}
                    {isCollapsed && (
                        <Link href="/" className="flex items-center justify-center">
                            <Package2 className="h-6 w-6 shrink-0 text-primary" />
                        </Link>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("ml-auto h-8 w-8 text-muted-foreground hover:text-foreground", isCollapsed && "hidden")}
                        onClick={() => setIsCollapsed(true)}
                    >
                        <PanelLeftClose className="h-4 w-4" />
                    </Button>
                </div>
                {/* 14 is 3.5rem (56px) - lg is 60px */}
                <ScrollArea className="h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-60px)]">
                    <div className="flex flex-col gap-2 p-2">
                        {isCollapsed && (
                            <div className="flex flex-col gap-2 items-center pt-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 mb-2"
                                    onClick={() => setIsCollapsed(false)}
                                >
                                    <PanelLeftOpen className="h-4 w-4" />
                                </Button>
                                {categories.map(cat => (
                                    <div key={cat.id} className="pt-1">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-md cursor-pointer transition-colors"
                                                    onClick={() => {
                                                        setIsCollapsed(false)
                                                        if (!expandedCategories.includes(cat.id)) {
                                                            toggleCategory(cat.id)
                                                        }
                                                    }}
                                                >
                                                    <cat.icon className="h-4 w-4" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">
                                                {cat.label}
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!isCollapsed && (
                            <>
                                <div className="py-2">
                                    <Link href="/tools">
                                        <Button variant={pathname === "/tools" ? "secondary" : "ghost"} className="w-full justify-start font-medium text-sm h-9">
                                            <Package2 className="mr-2 h-4 w-4" />
                                            All Tools
                                        </Button>
                                    </Link>
                                </div>

                                {categories.map((category) => {
                                    const isExpanded = expandedCategories.includes(category.id)
                                    const categoryTools = tools.filter(t => t.category === category.id)
                                    if (categoryTools.length === 0) return null

                                    return (
                                        <div key={category.id} className="mb-1">
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-between hover:bg-muted/50 h-9 px-2 group"
                                                onClick={() => toggleCategory(category.id)}
                                            >
                                                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                                                    <category.icon className="h-4 w-4" />
                                                    <span className="font-medium text-sm">{category.label}</span>
                                                </div>
                                                {isExpanded ?
                                                    <ChevronDown className="h-3 w-3 text-muted-foreground/50" /> :
                                                    <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                                                }
                                            </Button>

                                            {isExpanded && (
                                                <div className="mt-1 ml-4 border-l border-border/50 pl-2 space-y-0.5 animate-in slide-in-from-left-1 fade-in duration-200">
                                                    {categoryTools.map((tool) => (
                                                        <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                                                            <Button
                                                                variant="ghost"
                                                                className={cn(
                                                                    "w-full justify-start font-normal h-8 text-sm",
                                                                    pathname.includes(tool.slug) ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground/80 hover:text-foreground"
                                                                )}
                                                                onClick={() => setIsCollapsed(true)} // Auto-collapse on selection for focus
                                                            >
                                                                <span className="truncate">{tool.name}</span>
                                                                {tool.isNew && <span className="ml-auto text-[9px] uppercase font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded-full">New</span>}
                                                            </Button>
                                                        </Link>
                                                    ))}
                                                    {/* Add hints for future tools if needed */}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </>
                        )}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-muted/5">
                    {!isCollapsed && (
                        <div className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-lg p-3 border border-pink-500/20">
                            <p className="text-xs font-medium text-pink-600 dark:text-pink-400 mb-2">Support This Project</p>
                            <Link href="https://buymeacoffee.com/voidcraftr" target="_blank">
                                <Button size="sm" variant="outline" className="w-full h-7 text-xs border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-950/30">
                                    Donate
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </TooltipProvider>
    )
}

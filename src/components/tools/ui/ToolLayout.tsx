"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ToolLayoutProps {
    sidebar: ReactNode
    children: ReactNode
    className?: string
}

export function ToolLayout({ sidebar, children, className }: ToolLayoutProps) {
    return (
        <div className={cn("grid lg:grid-cols-[380px_1fr] gap-8 animate-fade-in", className)}>
            {/* Sidebar Control Panel */}
            <div className="space-y-6 shrink-0">
                {sidebar}
            </div>

            {/* Main Content Area */}
            <div className="min-w-0 space-y-6">
                {children}
            </div>
        </div>
    )
}

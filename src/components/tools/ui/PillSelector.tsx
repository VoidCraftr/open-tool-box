"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PillSelectorProps<T extends string> {
    options: { value: T; label: string; icon?: React.ReactNode }[]
    value: T
    onChange: (value: T) => void
    className?: string
}

export function PillSelector<T extends string>({ options, value, onChange, className }: PillSelectorProps<T>) {
    return (
        <div className={cn("flex p-1 bg-black/5 dark:bg-white/5 rounded-full relative", className)}>
            {options.map((option) => {
                const isActive = value === option.value
                return (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={cn(
                            "relative flex items-center justify-center gap-2 flex-1 px-4 py-2 text-xs font-bold transition-all duration-200 z-10",
                            isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="pill-active"
                                className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/25"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            {option.icon}
                            {option.label}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}

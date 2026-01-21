"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
    href: string;
    icon: React.ElementType;
    title: string;
    description: string;
    isNew?: boolean;
    isPopular?: boolean;
    isPremium?: boolean;
}

export const PremiumCard = ({
    href,
    icon: Icon,
    title,
    description,
    isNew,
    isPopular,
    isPremium,
}: PremiumCardProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <Link href={href} className="block h-full">
            <div
                ref={divRef}
                onMouseMove={handleMouseMove}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-background/50 backdrop-blur-md px-6 py-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 group"
                )}
            >
                <div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                    style={{
                        opacity,
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.1), transparent 40%)`,
                    }}
                />

                <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex gap-2">
                            {isNew && (
                                <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-blue-500 ring-1 ring-inset ring-blue-500/20">
                                    NEW
                                </span>
                            )}
                            {isPopular && (
                                <span className="inline-flex items-center rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-orange-500 ring-1 ring-inset ring-orange-500/20">
                                    POPULAR
                                </span>
                            )}
                            {isPremium && (
                                <span className="inline-flex items-center rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-purple-500 ring-1 ring-inset ring-purple-500/20">
                                    PREMIUM
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

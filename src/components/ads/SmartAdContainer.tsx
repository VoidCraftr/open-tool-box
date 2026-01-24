"use client";

import { AdSense } from './AdSense';
import { adsConfig } from '@/config/ads.config';
import { Sparkles } from "lucide-react";

interface SmartAdContainerProps {
    slot: keyof typeof adsConfig.adSlots;
    className?: string;
}

export function SmartAdContainer({
    slot,
    className = '',
}: SmartAdContainerProps) {
    const adSlotId = adsConfig.adSlots[slot];

    return (
        <div className={`relative overflow-hidden group liquid-glass border border-primary/10 rounded-2xl p-6 my-8 ${className}`}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 uppercase tracking-widest">
                    <Sparkles className="h-4 w-4" />
                    <span>Recommended for You</span>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <AdSense
                        slot={adSlotId}
                        responsive={true}
                        lazyLoad={true}
                    />
                </div>

                <p className="text-xs text-muted-foreground italic text-center">
                    Hand-picked tools to supercharge your workflow. Supporting OpenToolBox.
                </p>
            </div>
        </div>
    );
}

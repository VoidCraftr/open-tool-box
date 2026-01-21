'use client';

import { AdSense } from './AdSense';
import { adsConfig } from '@/config/ads.config';

interface AdContainerProps {
    /**
     * Ad slot key from ads.config.ts
     */
    slot: keyof typeof adsConfig.adSlots;

    /**
     * Ad placement position
     */
    position?: 'header' | 'sidebar' | 'footer' | 'inline';

    /**
     * Custom class name
     */
    className?: string;

    /**
     * Show ad label
     */
    showLabel?: boolean;
}

/**
 * Reusable Ad Container Component
 * Wraps AdSense with consistent styling and labeling
 */
export function AdContainer({
    slot,
    position = 'inline',
    className = '',
    showLabel = true,
}: AdContainerProps) {
    const adSlotId = adsConfig.adSlots[slot];

    // Position-specific styling
    const positionStyles: Record<string, string> = {
        header: 'w-full max-w-7xl mx-auto my-4',
        sidebar: 'w-full lg:sticky lg:top-4',
        footer: 'w-full max-w-7xl mx-auto my-8',
        inline: 'w-full my-4',
    };

    return (
        <div className={`ad-container ${positionStyles[position]} ${className}`}>
            {showLabel && (
                <div className="text-xs text-muted-foreground text-center mb-2 uppercase tracking-wider">
                    Advertisement
                </div>
            )}

            <div className="flex items-center justify-center bg-muted/10 rounded-lg p-2 border border-border/50">
                <AdSense
                    slot={adSlotId}
                    responsive={true}
                    lazyLoad={position !== 'header'} // Don't lazy load header ads
                />
            </div>

            {/* Privacy Notice (optional, can be hidden after first view) */}
            {position === 'footer' && (
                <div className="text-xs text-muted-foreground text-center mt-2">
                    <p>
                        We show ads to keep OpenToolBox free.{' '}
                        <a href="/privacy" className="underline hover:text-foreground">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}

/**
 * Responsive Sidebar Ad
 */
export function SidebarAd({ className = '' }: { className?: string }) {
    return (
        <AdContainer
            slot="sidebarSquare"
            position="sidebar"
            className={className}
        />
    );
}

/**
 * Header Banner Ad
 */
export function HeaderAd({ className = '' }: { className?: string }) {
    return (
        <AdContainer
            slot="headerBanner"
            position="header"
            className={className}
            showLabel={false}
        />
    );
}

/**
 * Footer Banner Ad
 */
export function FooterAd({ className = '' }: { className?: string }) {
    return (
        <AdContainer
            slot="footerBanner"
            position="footer"
            className={className}
        />
    );
}

/**
 * Tool Page Inline Ad
 */
export function ToolPageAd({ className = '' }: { className?: string }) {
    return (
        <AdContainer
            slot="toolPageBanner"
            position="inline"
            className={className}
        />
    );
}

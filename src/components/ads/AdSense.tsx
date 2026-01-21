'use client';

import { useEffect, useState } from 'react';
import { adsConfig, getAdSenseClientId, shouldShowAds, isDNTEnabled } from '@/config/ads.config';

interface AdSenseProps {
    /**
     * Ad slot ID from AdSense dashboard
     */
    slot: string;

    /**
     * Ad format/size
     */
    format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';

    /**
     * Responsive ad (adapts to container)
     */
    responsive?: boolean;

    /**
     * Custom width (for non-responsive ads)
     */
    width?: number;

    /**
     * Custom height (for non-responsive ads)
     */
    height?: number;

    /**
     * Custom class name
     */
    className?: string;

    /**
     * Enable lazy loading
     */
    lazyLoad?: boolean;
}

/**
 * Google AdSense Component
 * Privacy-respecting ad integration with lazy loading support
 */
export function AdSense({
    slot,
    format = 'auto',
    responsive = true,
    width,
    height,
    className = '',
    lazyLoad = adsConfig.performance.lazyLoad,
}: AdSenseProps) {
    const [isVisible, setIsVisible] = useState(!lazyLoad);
    const [adLoaded, setAdLoaded] = useState(false);

    useEffect(() => {
        // Check if ads should be shown
        if (typeof window === 'undefined') return;

        const pathname = window.location.pathname;
        if (!shouldShowAds(pathname)) return;

        // Respect Do Not Track
        if (adsConfig.privacy.respectDNT && isDNTEnabled()) {
            console.log('AdSense: DNT enabled, skipping ad load');
            return;
        }

        // Lazy load implementation
        if (lazyLoad && !isVisible) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsVisible(true);
                            observer.disconnect();
                        }
                    });
                },
                {
                    rootMargin: `${adsConfig.performance.lazyLoadOffset}px`,
                }
            );

            const adElement = document.querySelector(`[data-ad-slot="${slot}"]`);
            if (adElement) {
                observer.observe(adElement);
            }

            return () => observer.disconnect();
        }
    }, [lazyLoad, isVisible, slot]);

    useEffect(() => {
        if (!isVisible || adLoaded) return;

        try {
            // Load AdSense script if not already loaded
            if (typeof window !== 'undefined') {
                const adsbygoogle = (window as any).adsbygoogle || [];
                adsbygoogle.push({});
                setAdLoaded(true);
            }
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, [isVisible, adLoaded]);

    // Don't render anything if ads shouldn't be shown
    if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        if (!shouldShowAds(pathname)) return null;

        if (adsConfig.privacy.respectDNT && isDNTEnabled()) return null;
    }

    const adStyle = responsive
        ? { display: 'block' }
        : {
            display: 'inline-block',
            width: width ? `${width}px` : 'auto',
            height: height ? `${height}px` : 'auto',
        };

    return (
        <div
            className={`adsense-container ${className}`}
            data-ad-slot={slot}
            aria-label="Advertisement"
        >
            {isVisible ? (
                <ins
                    className="adsbygoogle"
                    style={adStyle}
                    data-ad-client={getAdSenseClientId()}
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive={responsive ? 'true' : 'false'}
                />
            ) : (
                <div
                    style={{
                        width: width || '100%',
                        height: height || 250,
                        background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.5) 100%)',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span className="text-muted-foreground text-sm">Advertisement Loading...</span>
                </div>
            )}
        </div>
    );
}

/**
 * Load AdSense Script
 * Call this in your root layout or _app
 */
export function AdSenseScript() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check if script already exists
        const existingScript = document.querySelector(
            `script[src*="pagead2.googlesyndication.com"]`
        );

        if (existingScript) return;

        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${getAdSenseClientId()}`;
        script.async = true;
        script.crossOrigin = 'anonymous';

        // Add error handling
        script.onerror = () => {
            console.error('Failed to load AdSense script');
        };

        document.head.appendChild(script);
    }, []);

    return null;
}

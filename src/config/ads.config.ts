/**
 * Google AdSense Configuration for OpenToolBox
 * Privacy-respecting ad integration
 */

export const adsConfig = {
    // Google AdSense Publisher ID (replace with your actual ID)
    publisherId: 'ca-pub-7580545209042591',

    // Ad Unit IDs (create these in your AdSense dashboard)
    adSlots: {
        headerBanner: '1234567890', // TODO: Replace
        sidebarSquare: '1234567891', // TODO: Replace
        footerBanner: '1234567892', // TODO: Replace
        inArticle: '1234567893', // TODO: Replace
        toolPageBanner: '1196989297', // opentoolbox_horizontal_ad_unit
    },

    // Ad Formats
    formats: {
        banner: {
            width: 728,
            height: 90,
        },
        leaderboard: {
            width: 970,
            height: 90,
        },
        mediumRectangle: {
            width: 300,
            height: 250,
        },
        largeRectangle: {
            width: 336,
            height: 280,
        },
        skyscraper: {
            width: 160,
            height: 600,
        },
        responsive: 'auto' as const,
    },

    // Privacy Settings
    privacy: {
        // Enable privacy-friendly personalized ads (GDPR/CCPA compliant)
        nonPersonalizedAds: false,

        // Respect Do Not Track (DNT) browser setting
        respectDNT: true,

        // Disable ads for users with ad blockers (graceful degradation)
        detectAdBlock: true,
    },

    // Performance Settings
    performance: {
        // Lazy load ads (load when visible in viewport)
        lazyLoad: true,

        // Lazy load offset (pixels before viewport)
        lazyLoadOffset: 200,

        // Maximum ads per page
        maxAdsPerPage: 4,

        // Minimum time between ad refreshes (seconds)
        refreshInterval: 0, // 0 = no auto-refresh
    },

    // Display Rules
    display: {
        // Show ads on mobile devices
        showOnMobile: true,

        // Show ads on tablet devices
        showOnTablet: true,

        // Show ads on desktop
        showOnDesktop: true,

        // Minimum screen width to show ads (pixels)
        minScreenWidth: 320,

        // Pages where ads should NOT be displayed
        excludePages: [
            '/privacy',
            '/terms',
        ],
    },

    // Testing
    test: {
        // Enable test mode (shows test ads, no real impressions)
        // Set to false to show real ads in development
        enabled: false,

        // Test ad client ID
        testClientId: 'ca-pub-0000000000000000',
    },
};

/**
 * Check if ads should be shown on current page
 */
export function shouldShowAds(pathname: string): boolean {
    // Check if page is excluded
    if (adsConfig.display.excludePages.some(page => pathname.startsWith(page))) {
        return false;
    }

    return true;
}

/**
 * Get AdSense client ID (test or production)
 */
export function getAdSenseClientId(): string {
    if (adsConfig.test.enabled) {
        return adsConfig.test.testClientId;
    }
    return adsConfig.publisherId;
}

/**
 * Check if user has Do Not Track enabled
 */
export function isDNTEnabled(): boolean {
    if (typeof window === 'undefined') return false;

    const dnt = navigator.doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack;
    return dnt === '1' || dnt === 'yes';
}

/**
 * Responsive ad sizes based on screen width
 */
export function getResponsiveAdSize(): { width: number; height: number } | 'auto' {
    if (typeof window === 'undefined') return 'auto';

    const width = window.innerWidth;

    if (width >= 970) {
        return adsConfig.formats.leaderboard; // Large desktop
    } else if (width >= 728) {
        return adsConfig.formats.banner; // Desktop
    } else if (width >= 468) {
        return { width: 468, height: 60 }; // Tablet
    } else if (width >= 320) {
        return { width: 320, height: 50 }; // Mobile
    }

    return 'auto';
}

/**
 * Ad placement strategies
 */
export const adPlacements = {
    homepage: ['headerBanner', 'sidebarSquare', 'footerBanner'],
    toolPage: ['toolPageBanner', 'sidebarSquare'],
    aboutPage: ['headerBanner', 'footerBanner'],
    default: ['headerBanner', 'footerBanner'],
};


/**
 * Get ad slots for specific page type
 */
export function getAdSlotsForPage(pageType: keyof typeof adPlacements): string[] {
    return adPlacements[pageType] || adPlacements.default;
}

/**
 * SEO Configuration for OpenToolBox
 * Centralized SEO utilities and schema generators
 */

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://opentoolbox.online';
const SITE_NAME = 'OpenToolBox';
const TWITTER_HANDLE = '@voidcraftr';

export const seoConfig = {
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    defaultTitle: 'OpenToolBox - Simple Tools for Everyday Tasks | Secure & Free',
    defaultDescription: 'OpenToolBox: 56 simple online tools to fix text, edit photos, and secure your data. 100% private, no uploads, runs entirely in your browser. No registration required.',
    twitterHandle: TWITTER_HANDLE,
    ogImage: `${SITE_URL}/assets/og-image.png`,
    locale: 'en_US',
};

/**
 * Generate Organization JSON-LD Schema
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'OpenToolBox',
        legalName: 'VoidCraftr',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/OpenToolBox_Logo.png`,
        foundingDate: '2024',
        founders: [
            {
                '@type': 'Person',
                name: 'VoidCraftr',
                url: 'https://github.com/voidcraftr',
            },
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            url: `${SITE_URL}/contact`,
        },
        sameAs: [
            'https://github.com/voidcraftr',
            'https://twitter.com/Satyam_Agarwal_',
            'https://linkedin.com/in/voidcraftr',
            'https://instagram.com/voidcraftr',
            'https://facebook.com/voidcraftr',
            'https://peerlist.io/satyamagarwalin/project/opentoolbox',
            'https://producthunt.com/products/opentoolbox',
            'https://saashub.com/opentoolbox-alternatives',
            'https://devhunt.org/tool/opentoolbox',
        ],
    };
}

/**
 * Generate WebApplication JSON-LD Schema
 */
export function generateWebApplicationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'OpenToolBox',
        url: SITE_URL,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any (Web Browser)',
        browserRequirements: 'Requires JavaScript. Modern browser with ES6+ support.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '1250',
            bestRating: '5',
            worstRating: '1',
        },
        featureList: [
            '56 Free Online Tools',
            '100% Client-Side Processing',
            'Privacy-Focused Architecture',
            'No Registration Required',
            'Developer Tools (JSON, SQL, JWT, Base64, etc.)',
            'Business Documents (Invoice, Quote, Receipt, Estimate)',
            'Media Tools (Image/Video Enhancement, Conversion)',
            'Security Tools (Password Generator, Strength Checker)',
            'Design Tools (Box Shadow, Gradient, Flexbox)',
            'PDF Tools (Sign, Convert, Image to PDF)',
            'Social Media Tools (Post Generators, Preview)',
            'Text Tools (Word Counter, Markdown, Diff Viewer)',
        ],
        screenshot: `${SITE_URL}/assets/screenshot.png`,
    };
}

/**
 * Generate SoftwareApplication Schema for Individual Tools
 */
export function generateToolSchema(tool: {
    name: string;
    description: string;
    slug: string;
    category: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.name,
        applicationCategory: getCategoryType(tool.category),
        operatingSystem: 'Any (Web Browser)',
        url: `${SITE_URL}/tools/${tool.slug}`,
        description: tool.description,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        browserRequirements: 'Requires JavaScript',
        featureList: [tool.description],
    };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Generate HowTo Schema for Tool Usage
 */
export function generateHowToSchema(tool: {
    name: string;
    slug: string;
    steps: string[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to use ${tool.name}`,
        step: tool.steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            text: step,
        })),
        url: `${SITE_URL}/tools/${tool.slug}`,
    };
}

/**
 * Generate FAQPage Schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

/**
 * Map tool category to schema.org category
 */
function getCategoryType(category: string): string {
    const categoryMap: Record<string, string> = {
        developer: 'DeveloperApplication',
        design: 'DesignApplication',
        media: 'MultimediaApplication',
        security: 'SecurityApplication',
        text: 'UtilitiesApplication',
        social: 'SocialNetworkingApplication',
        math: 'EducationalApplication',
        finance: 'FinanceApplication',
        health: 'HealthApplication',
        pdf: 'UtilitiesApplication',
        general: 'UtilitiesApplication',
    };
    return categoryMap[category] || 'WebApplication';
}

/**
 * Generate enhanced meta tags for a tool
 */
export function generateToolMetaTags(tool: {
    name: string;
    description: string;
    slug: string;
    keywords?: string[];
}) {
    return {
        title: `${tool.name} - Free Online Tool | OpenToolBox`,
        description: tool.description,
        keywords: tool.keywords || [tool.name.toLowerCase()],
        canonical: `${SITE_URL}/tools/${tool.slug}`,
        openGraph: {
            title: `${tool.name} - Free Online Tool`,
            description: tool.description,
            url: `${SITE_URL}/tools/${tool.slug}`,
            type: 'website',
            siteName: SITE_NAME,
            images: [
                {
                    url: `${SITE_URL}/assets/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: `${tool.name} - OpenToolBox`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${tool.name} - Free Online Tool`,
            description: tool.description,
            creator: TWITTER_HANDLE,
            images: [`${SITE_URL}/assets/og-image.png`],
        },
    };
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
    return `${SITE_URL}${path}`;
}

/**
 * Common SEO keywords across all tools
 */
export const commonKeywords = [
    'fix my text',
    'clean up messy list',
    'how to format json',
    'free online helper',
    'securely hide data',
    'privacy-first online tools',
    'no registration required',
    'fix blurry photos',
    'client-side processing',
    'offline safe tools',
    'how to resize image for instagram',
    'convert photo for whatsapp'
];

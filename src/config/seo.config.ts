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
 * Includes long-tail, conversational, and question-based queries
 */
export const commonKeywords = [
    // Conversational & Question-based (Primary)
    'how to format json online free',
    'how do i validate json without installing anything',
    'what is the best free password generator',
    'can i remove watermarks from images without photoshop',
    'how to convert jpg to png without losing quality',
    'best free online photo editor no download',
    'how to enhance video quality for free online',
    'where can i sign pdf documents online for free',
    'free ai image enhancer no watermark',
    'how to create qr code with logo free',
    'what tool can i use to format sql queries',
    'how do i decode jwt token online',
    'best way to generate secure passwords online',
    'can i edit images in browser without upload',
    'how to make invoice with gst in india',
    'free tools that work offline in browser',

    // Competitor Comparisons
    'alternative to smallpdf free',
    'better than canva for free',
    'free json formatter like jsonlint',
    'tinypng alternative free',
    'photopea alternative online',
    'remove.bg alternative free no watermark',
    'grammarly alternative for free',
    'figma alternative free',

    // Use-case Specific
    'developer tools for debugging api',
    'social media tools for content creators',
    'business document generator for freelancers',
    'image tools for instagram marketers',
    'pdf tools for students',
    'security tools for developers',
    'design tools for non-designers',
    'text tools for writers',
    'invoice generator india gst',
    'tools for remote workers',

    // Privacy & Security focused
    'privacy-first online tools',
    'secure online tools no data collection',
    'client-side processing tools',
    'offline tools that work in browser',
    'no registration required tools',
    'no sign up needed online tools',
    'tools that dont upload my files',
    'safe online tools for sensitive data',

    // Problem-solving queries
    'fix my text online',
    'clean up messy list quickly',
    'fix blurry photos free',
    'remove background from image free',
    'resize image for instagram story',
    'convert photo for whatsapp dp',
    'make pdf smaller online',
    'compress image without losing quality'
];

/**
 * FAQ schema data for top 10 most popular tools
 */
export const toolFAQs: Record<string, Array<{ question: string; answer: string }>> = {
    'json-formatter': [
        {
            question: 'Is OpenToolBox JSON Formatter free to use?',
            answer: 'Yes! Our JSON formatter is completely free with no limits, registration, or hidden costs. It runs entirely in your browser for privacy.'
        },
        {
            question: 'Can I validate large JSON files?',
            answer: 'Yes, you can validate JSON files of any size. Since processing happens locally in your browser, there are no file size limits imposed by us.'
        },
        {
            question: 'Does the JSON formatter work offline?',
            answer: 'Yes! Once the page loads, the JSON formatter works completely offline since all processing happens in your browser.'
        },
        {
            question: 'Is my JSON data secure when using this tool?',
            answer: 'Absolutely. Your JSON data never leaves your browser. All validation and formatting happens client-side, ensuring complete privacy.'
        }
    ],
    'password-generator': [
        {
            question: 'Are the passwords generated truly random?',
            answer: 'Yes, we use cryptographically secure random number generation (Web Crypto API) to ensure passwords are genuinely unpredictable.'
        },
        {
            question: 'How long should my password be?',
            answer: 'We recommend at least 16 characters for strong security. Longer passwords with mixed characters are exponentially harder to crack.'
        },
        {
            question: 'Do you store the passwords I generate?',
            answer: 'No, never. All password generation happens in your browser. We have zero access to or record of any passwords you create.'
        }
    ],
    'image-converter': [
        {
            question: 'What image formats can I convert?',
            answer: 'You can convert between JPG, PNG, WebP, AVIF, and GIF. We support both modern and legacy formats for maximum compatibility.'
        },
        {
            question: 'Is there a file size limit for image conversion?',
            answer: 'No server-imposed limits! Since conversion happens in your browser, the only limit is your device\'s available memory.'
        },
        {
            question: 'Do converted images lose quality?',
            answer: 'We preserve maximum quality during conversion. However, some formats (like JPG) are lossy. PNG and WebP offer lossless options.'
        }
    ],
    'photo-enhancer': [
        {
            question: 'How does AI photo enhancement work?',
            answer: 'Our AI analyzes your photo and automatically applies color correction, sharpening, denoising, and upscaling to improve overall quality.'
        },
        {
            question: 'Will enhancing add a watermark to my photos?',
            answer: 'No watermarks, ever. Your enhanced photos are completely yours to use however you want.'
        },
        {
            question: 'Can I enhance photos on mobile?',
            answer: 'Yes! Our photo enhancer works on any device with a modern browser, including smartphones and tablets.'
        }
    ],
    'qr-code-generator': [
        {
            question: 'Can I add a logo to my QR code?',
            answer: 'Yes! You can upload your logo and customize the QR code colors to match your brand while maintaining scannability.'
        },
        {
            question: 'What can I encode in a QR code?',
            answer: 'URLs, text, contact info, WiFi credentials, location coordinates, and more. Our generator supports all standard QR code types.'
        },
        {
            question: 'Are generated QR codes permanent?',
            answer: 'Yes, once generated and downloaded, your QR code will work forever. Unlike dynamic QR services, there\'s no expiration.'
        }
    ],
    'watermark-remover': [
        {
            question: 'How does watermark removal work?',
            answer: 'We use AI-powered inpainting to intelligently fill in the watermarked area based on surrounding pixels. You can also manually select areas.'
        },
        {
            question: 'Is watermark removal legal?',
            answer: 'Only remove watermarks from images you own or have permission to modify. Removing copyright protection may be illegal.'
        },
        {
            question: 'Does removal leave traces?',
            answer: 'Our AI does its best to seamlessly blend the area, but results vary based on background complexity and watermark size.'
        }
    ],
    'video-enhancer': [
        {
            question: 'Can I enhance 4K videos?',
            answer: 'Yes, our enhancer supports various resolutions including 4K. Processing time depends on video length and your device capabilities.'
        },
        {
            question: 'How long does video enhancement take?',
            answer: 'It depends on video length and quality settings. Typically 2-10 minutes for short clips. All processing is local, so speed varies by device.'
        }
    ],
    'sign-pdf': [
        {
            question: 'Is it safe to sign PDFs online?',
            answer: 'Yes! Your PDF never leaves your browser. All signing happens client-side, ensuring your documents remain completely private.'
        },
        {
            question: 'Can I save my signature for reuse?',
            answer: 'Yes, you can save your signature as an image and reuse it across multiple documents without redrawing each time.'
        }
    ],
    'invoice-generator': [
        {
            question: 'Does the invoice generator support Indian GST?',
            answer: 'Yes! We support Indian GST with automatic CGST/SGST splitting for intra-state and IGST for inter-state transactions.'
        },
        {
            question: 'Can I add my company logo to invoices?',
            answer: 'Absolutely! Upload your logo and customize colors, fonts, and themes to match your brand identity.'
        },
        {
            question: 'Are invoices legally valid?',
            answer: 'Yes, our invoices include all required fields for business documentation. However, consult local regulations for specific requirements.'
        }
    ],
    'sql-formatter': [
        {
            question: 'Which SQL dialects are supported?',
            answer: 'We support MySQL, PostgreSQL, SQL Server, Oracle, and standard SQL. The formatter handles most common SQL syntax variations.'
        },
        {
            question: 'Can I format stored procedures and functions?',
            answer: 'Yes! Our formatter handles complex SQL including stored procedures, triggers, and multi-statement queries.'
        }
    ]
};

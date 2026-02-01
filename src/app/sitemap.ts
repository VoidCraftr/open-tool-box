import { tools } from '@/config/tools';
import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://opentoolbox.online';

// Priority levels based on tool popularity and strategic importance
const highPriorityTools = [
    'json-formatter',
    'password-generator',
    'qr-code-generator',
    'image-converter',
    'photo-enhancer',
    'watermark-remover'
];

const mediumPriorityTools = [
    'video-enhancer',
    'sign-pdf',
    'invoice-generator',
    'sql-formatter',
    'image-resizer',
    'jwt-decoder',
    'uuid-generator',
    'base64-encoder',
    'image-editor',
    'word-counter'
];

function getToolPriority(slug: string): number {
    if (highPriorityTools.includes(slug)) return 0.9;
    if (mediumPriorityTools.includes(slug)) return 0.85;
    return 0.8; // Default for all other tools
}

export default function sitemap(): MetadataRoute.Sitemap {
    const toolUrls = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: getToolPriority(tool.slug),
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/tools`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/support`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/llms.txt`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/robots.txt`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        ...toolUrls,
    ];
}

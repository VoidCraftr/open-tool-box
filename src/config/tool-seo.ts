/**
 * Tool-Specific SEO Configuration
 * Per-tool keywords, FAQs, use-cases, and related searches
 */

export interface ToolSEOConfig {
    longTailKeywords: string[];
    useCases: string[];
    relatedSearches: string[];
}

/**
 * Tool-specific SEO data for enhanced discoverability
 */
export const toolSEO: Record<string, ToolSEOConfig> = {
    'json-formatter': {
        longTailKeywords: [
            'validate json online free',
            'format json with syntax highlighting',
            'json beautifier real-time',
            'minify json for api',
            'json validator with line numbers',
            'fix invalid json syntax',
            'json formatter with error detection',
            'prettify json response',
            'json linter online',
            'format nested json objects'
        ],
        useCases: [
            'API response debugging',
            'Config file validation',
            'Data transformation',
            'JSON schema testing'
        ],
        relatedSearches: [
            'xml formatter',
            'yaml validator',
            'json to csv'
        ]
    },
    'password-generator': {
        longTailKeywords: [
            'cryptographically secure password generator',
            'random password with symbols',
            'strong password 16 characters',
            'password generator no tracking',
            'custom length password creator',
            'password with special characters',
            'secure password offline',
            'password generator client side',
            'pronounceable password generator',
            'bulk password generation'
        ],
        useCases: [
            'Account security',
            'Developer credentials',
            'Enterprise password policies',
            'Password manager setup'
        ],
        relatedSearches: [
            'password strength checker',
            'password manager',
            'two factor authentication'
        ]
    },
    'image-converter': {
        longTailKeywords: [
            'convert jpg to png transparent',
            'webp converter batch',
            'avif image format converter',
            'gif to png online',
            'lossless image conversion',
            'convert heic to jpg',
            'image format converter free',
            'bulk image convert',
            'png to jpg without quality loss',
            'convert raw to jpeg'
        ],
        useCases: [
            'Website optimization',
            'Print preparation',
            'Social media formatting',
            'Email attachments'
        ],
        relatedSearches: [
            'image resizer',
            'image compressor',
            'photo editor'
        ]
    },
    'photo-enhancer': {
        longTailKeywords: [
            'ai photo enhancement free',
            'improve old photo quality',
            'auto enhance blurry photos',
            'photo upscaler ai',
            'denoise image online',
            'sharpen photo automatically',
            'color correction ai',
            'enhance low resolution photo',
            'ai photo restoration',
            'improve selfie quality'
        ],
        useCases: [
            'Social media posts',
            'Profile pictures',
            'Old photo restoration',
            'Product photography'
        ],
        relatedSearches: [
            'photo editor',
            'image upscaler',
            'background remover'
        ]
    },
    'qr-code-generator': {
        longTailKeywords: [
            'qr code with logo center',
            'custom color qr code',
            'high resolution qr generator',
            'vcard qr code generator',
            'wifi qr code maker',
            'whatsapp qr code',
            'url shortener qr code',
            'qr code for business card',
            'scannable qr code generator',
            'dynamic qr code free'
        ],
        useCases: [
            'Marketing materials',
            'Business cards',
            'Event tickets',
            'Product packaging'
        ],
        relatedSearches: [
            'barcode generator',
            'nfc tag',
            'short url creator'
        ]
    },
    'watermark-remover': {
        longTailKeywords: [
            'remove watermark from photo free',
            'ai watermark eraser',
            'delete logo from image',
            'remove text from picture',
            'watermark removal tool online',
            'erase watermark without blur',
            'remove shutterstock watermark',
            'clean up image watermark',
            'photo watermark remover ai',
            'remove timestamp from photo'
        ],
        useCases: [
            'Personal photo cleanup',
            'Stock image editing',
            'Screenshot cleaning',
            'Old photo restoration'
        ],
        relatedSearches: [
            'background remover',
            'object remover',
            'photo retouching'
        ]
    },
    'video-enhancer': {
        longTailKeywords: [
            'upscale video to 4k',
            'ai video quality improver',
            'denoise video online',
            'stabilize shaky video',
            'enhance old video quality',
            'video upscaler free',
            'improve video resolution ai',
            'video enhancement software',
            'restore vintage video',
            'sharpen blurry video'
        ],
        useCases: [
            'YouTube uploads',
            'Social media content',
            'Old footage restoration',
            'Surveillance videos'
        ],
        relatedSearches: [
            'video editor',
            'video converter',
            'video compressor'
        ]
    },
    'sign-pdf': {
        longTailKeywords: [
            'digitally sign pdf online',
            'esign pdf without adobe',
            'add signature to pdf free',
            'pdf signature tool browser',
            'sign document online secure',
            'electronic signature pdf',
            'sign contract pdf',
            'pdf signer no email',
            'handwritten signature pdf',
            'sign multiple pdfs'
        ],
        useCases: [
            'Contract signing',
            'Form completion',
            'Document approval',
            'Legal paperwork'
        ],
        relatedSearches: [
            'pdf editor',
            'docusign alternative',
            'signature generator'
        ]
    },
    'invoice-generator': {
        longTailKeywords: [
            'invoice generator with gst india',
            'professional invoice template free',
            'cgst sgst invoice maker',
            'igst invoice generator',
            'customize invoice with logo',
            'invoice pdf generator',
            'business invoice template',
            'tax invoice generator',
            'freelance invoice maker',
            'branded invoice creator'
        ],
        useCases: [
            'Freelance billing',
            'Small business invoicing',
            'Tax compliance',
            'Client billing'
        ],
        relatedSearches: [
            'receipt generator',
            'quote generator',
            'accounting software'
        ]
    },
    'sql-formatter': {
        longTailKeywords: [
            'format sql query online',
            'sql beautifier with syntax',
            'prettify complex sql',
            'sql code formatter',
            'format stored procedure',
            'postgresql query formatter',
            'mysql query beautifier',
            'sql indentation tool',
            'format sql joins',
            'sql syntax highlighter'
        ],
        useCases: [
            'Query debugging',
            'Code review preparation',
            'Documentation',
            'Learning SQL'
        ],
        relatedSearches: [
            'sql validator',
            'database design tool',
            'query optimizer'
        ]
    },
    'image-resizer': {
        longTailKeywords: [
            'resize image for instagram',
            'batch resize photos',
            'resize without losing quality',
            'image dimensions changer',
            'resize photo for email',
            'compress and resize image',
            'resize image by percentage',
            'maintain aspect ratio resize',
            'resize for whatsapp dp',
            'thumbnail generator'
        ],
        useCases: [
            'Social media optimization',
            'Email attachments',
            'Website images',
            'Profile pictures'
        ],
        relatedSearches: [
            'image compressor',
            'crop image',
            'image converter'
        ]
    },
    'jwt-decoder': {
        longTailKeywords: [
            'decode jwt token online',
            'jwt debugger tool',
            'inspect jwt payload',
            'jwt token parser',
            'verify jwt signature',
            'jwt header decoder',
            'jwt claims viewer',
            'json web token analyzer',
            'jwt validation tool',
            'decode bearer token'
        ],
        useCases: [
            'API authentication debugging',
            'Token inspection',
            'Security auditing',
            'Integration testing'
        ],
        relatedSearches: [
            'jwt generator',
            'oauth debugger',
            'base64 decoder'
        ]
    },
    'uuid-generator': {
        longTailKeywords: [
            'uuid v4 generator bulk',
            'guid generator online',
            'random uuid creator',
            'unique id generator',
            'uuid for database',
            'generate multiple uuids',
            'uuid generator api',
            'universally unique identifier',
            'uuid without hyphens',
            'uuid for testing'
        ],
        useCases: [
            'Database primary keys',
            'API testing',
            'Unique identifiers',
            'Session IDs'
        ],
        relatedSearches: [
            'random string generator',
            'hash generator',
            'id generator'
        ]
    }
};

/**
 * Priority levels for sitemap optimization
 * Based on tool popularity and strategic importance
 */
export const toolPriorities = {
    high: [
        'json-formatter',
        'password-generator',
        'qr-code-generator',
        'image-converter',
        'photo-enhancer',
        'watermark-remover'
    ],
    medium: [
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
    ],
    normal: [] // All others default to normal (0.8)
};

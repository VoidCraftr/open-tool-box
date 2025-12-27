import {
    Code,
    FileImage,
    Lock,
    Type,
    QrCode,
    Scale,
    Timer,
    BoxSelect,
    Palette,
    Fingerprint,
    Keyboard,
    Database,
    RefreshCcw,
    Binary,
    Clock,
    LucideIcon
} from "lucide-react"

export type ToolCategory = "developer" | "design" | "security" | "media" | "text" | "social" | "general"

export interface ToolMetadata {
    slug: string
    name: string
    description: string
    category: ToolCategory
    icon: LucideIcon
    isNew?: boolean
    isPopular?: boolean
    isPremium?: boolean
}

export const tools: ToolMetadata[] = [
    // --- Developer Tools ---
    {
        slug: "json-formatter",
        name: "JSON Formatter",
        description: "Format, minify, and validate JSON data.",
        category: "developer",
        icon: Code,
        isPopular: true,
    },
    {
        slug: "sql-formatter",
        name: "SQL Formatter",
        description: "Prettify and standardise SQL queries.",
        category: "developer",
        icon: Database,
        isNew: true,
    },
    {
        slug: "jwt-decoder",
        name: "JWT Decoder",
        description: "Decode JSON Web Tokens without sending data to a server.",
        category: "developer",
        icon: Lock,
        isNew: true,
    },
    {
        slug: "uuid-generator",
        name: "UUID Generator",
        description: "Generate random UUIDs (v4) in bulk.",
        category: "developer",
        icon: Fingerprint,
        isNew: true,
    },
    {
        slug: "cron-generator",
        name: "Cron Generator",
        description: "Create and explain cron schedules with next run dates preview.",
        category: "developer",
        icon: Clock,
        isNew: true,
    },
    {
        slug: "keycode-info",
        name: "Keycode Info",
        description: "Find JavaScript key codes and event data.",
        category: "developer",
        icon: Keyboard,
        isNew: true,
    },

    // --- Design Tools ---
    {
        slug: "image-converter",
        name: "Image Converter",
        description: "Convert between JPG, PNG, and WebP formats.",
        category: "media",
        icon: FileImage,
        isPopular: true,
    },
    {
        slug: "box-shadow-generator",
        name: "Box Shadow Generator",
        description: "Create beautiful CSS box shadows visually.",
        category: "design",
        icon: BoxSelect,
        isNew: true,
    },
    {
        slug: "gradient-generator",
        name: "Gradient Generator",
        description: "Design CSS gradients and copy the code.",
        category: "design",
        icon: Palette,
        isNew: true,
    },

    // --- Security Tools ---
    {
        slug: "password-generator",
        name: "Password Generator",
        description: "Create strong, secure passwords.",
        category: "security",
        icon: Lock,
        isPopular: true,
    },

    // --- Text Tools ---
    {
        slug: "word-counter",
        name: "Word Counter",
        description: "Count words, characters, and sentences.",
        category: "text",
        icon: Type,
    },
    {
        slug: "diff-viewer",
        name: "Diff Viewer",
        description: "Compare two text blocks and highlight differences.",
        category: "text",
        icon: RefreshCcw,
        isNew: true,
    },

    // --- General/Consumer Tools ---
    {
        slug: "qr-code-generator",
        name: "QR Code Generator",
        description: "Create customizable QR codes.",
        category: "general",
        icon: QrCode,
        isNew: true,
    },
    {
        slug: "unit-converter",
        name: "Unit Converter",
        description: "Convert common units of measurement.",
        category: "general",
        icon: Scale,
        isNew: true,
    },
    {
        slug: "stopwatch",
        name: "Stopwatch & Timer",
        description: "Simple online stopwatch and countdown timer.",
        category: "general",
        icon: Timer,
        isNew: true,
    },
]

export const categories: { id: ToolCategory; label: string; icon: LucideIcon }[] = [
    { id: "developer", label: "Developer", icon: Code },
    { id: "design", label: "Design", icon: Palette },
    { id: "media", label: "Media", icon: FileImage },
    { id: "security", label: "Security", icon: Lock },
    { id: "text", label: "Text", icon: Type },
    { id: "general", label: "General", icon: RefreshCcw },
]

import {
    Code,
    Pen,
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
    LucideIcon,
    Youtube,
    ALargeSmall,
    Percent,
    Calendar,
    Scaling,
    Calculator,
    CircleDollarSign,
    Activity,
    FileUp,
    ShieldCheck,
    MessageCircle,
    TimerReset
} from "lucide-react"

export type ToolCategory = "developer" | "design" | "security" | "media" | "text" | "social" | "general" | "math" | "finance" | "health" | "pdf"

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
        description: "Free Online JSON Formatter, Minifier & Validator.",
        category: "developer",
        icon: Code,
        isPopular: true,
    },
    {
        slug: "sql-formatter",
        name: "SQL Formatter",
        description: "Free Online SQL Formatter & Prettifier for developers.",
        category: "developer",
        icon: Database,
        isNew: true,
    },
    {
        slug: "jwt-decoder",
        name: "JWT Decoder",
        description: "Free Online JWT Decoder. Debug tokens securely in your browser.",
        category: "developer",
        icon: Lock,
        isNew: true,
    },
    {
        slug: "uuid-generator",
        name: "UUID Generator",
        description: "Free Bulk UUID Generator (v4). Create unique IDs instantly.",
        category: "developer",
        icon: Fingerprint,
        isNew: true,
    },
    {
        slug: "cron-generator",
        name: "Cron Generator",
        description: "Free Cron Expression Generator with next run preview.",
        category: "developer",
        icon: Clock,
        isNew: true,
    },
    {
        slug: "keycode-info",
        name: "Keycode Info",
        description: "Online Keycode Finder. Get JavaScript event key codes visually.",
        category: "developer",
        icon: Keyboard,
        isNew: true,
    },

    // --- Design Tools ---
    {
        slug: "image-converter",
        name: "Image Converter",
        description: "Free Image Converter. Convert JPG, PNG to WebP securely.",
        category: "media",
        icon: FileImage,
        isPopular: true,
    },
    {
        slug: "box-shadow-generator",
        name: "Box Shadow Generator",
        description: "Free CSS Box Shadow Generator. Visual design tool for developers.",
        category: "design",
        icon: BoxSelect,
        isNew: true,
    },
    {
        slug: "gradient-generator",
        name: "Gradient Generator",
        description: "Free CSS Gradient Generator. Create beautiful linear & radial gradients.",
        category: "design",
        icon: Palette,
        isNew: true,
    },

    // --- Security Tools ---
    {
        slug: "password-generator",
        name: "Password Generator",
        description: "Free Strong Password Generator. Create secure passwords instantly.",
        category: "security",
        icon: Lock,
        isPopular: true,
    },

    // --- Text Tools ---
    {
        slug: "word-counter",
        name: "Word Counter",
        description: "Free Online Word Counter & Character Count Tool.",
        category: "text",
        icon: Type,
    },
    {
        slug: "diff-viewer",
        name: "Diff Viewer",
        description: "Free Text Diff Viewer. Compare strings and find differences online.",
        category: "text",
        icon: RefreshCcw,
        isNew: true,
    },

    // --- General/Consumer Tools ---
    {
        slug: "qr-code-generator",
        name: "QR Code Generator",
        description: "Free QR Code Generator with Logo support. High-quality PNG download.",
        category: "general",
        icon: QrCode,
        isNew: true,
    },
    {
        slug: "unit-converter",
        name: "Unit Converter",
        description: "Free Unit Converter. Convert Length, Weight, Temperature with formulas.",
        category: "general",
        icon: Scale,
        isNew: true,
    },
    {
        slug: "stopwatch",
        name: "Stopwatch & Timer",
        description: "Free Online Stopwatch with Laps and Countdown Timer.",
        category: "general",
        icon: Timer,
        isNew: true,
    },
    // --- Social Tools ---
    {
        slug: "youtube-thumbnail",
        name: "YouTube Thumbnail",
        description: "Download high-quality YouTube thumbnails and images.",
        category: "social",
        icon: Youtube,
        isNew: true,
    },

    // --- Math Tools ---
    {
        slug: "percentage-calculator",
        name: "Percentage Calculator",
        description: "Calculate percentages, percentage increase/decrease, and more.",
        category: "math",
        icon: Percent,
        isNew: true,
    },

    // --- New Consumer Tools ---
    {
        slug: "case-converter",
        name: "Case Converter",
        description: "Convert text between Uppercase, Lowercase, Title Case & more.",
        category: "text",
        icon: ALargeSmall,
        isNew: true,
    },
    {
        slug: "age-calculator",
        name: "Age Calculator",
        description: "Calculate your exact age in years, months, and days.",
        category: "general",
        icon: Calendar,
        isNew: true,
    },
    {
        slug: "image-resizer",
        name: "Image Resizer",
        description: "Resize images by pixel dimensions or percentage online.",
        category: "media",
        icon: Scaling,
        isNew: true,
    },

    // --- Finance Tools ---
    {
        slug: "loan-calculator",
        name: "Loan Calculator",
        description: "Calculate monthly payments (EMI) and total interest for loans.",
        category: "finance",
        icon: CircleDollarSign,
        isNew: true,
    },

    // --- Health Tools ---
    {
        slug: "bmi-calculator",
        name: "BMI Calculator",
        description: "Calculate Body Mass Index (BMI) and check weight categories.",
        category: "health",
        icon: Activity,
        isNew: true,
    },

    // --- PDF Tools ---
    {
        slug: "image-to-pdf",
        name: "Image to PDF",
        description: "Convert JPG/PNG images to a single PDF document online.",
        category: "pdf",
        icon: FileUp,
        isNew: true,
    },
    {
        slug: "signature-generator",
        name: "Signature Generator",
        description: "Create digital signatures and sign PDF documents online.",
        category: "pdf",
        icon: Pen,
        isNew: true,
        isPopular: true,
    },
    {
        slug: "sign-pdf",
        name: "Sign PDF Online",
        description: "Upload and sign PDF documents. Add signatures to all pages instantly.",
        category: "pdf",
        icon: Pen,
        isNew: true,
    },

    // --- Security Tools Additions ---
    {
        slug: "password-strength",
        name: "Password Strength",
        description: "Test how strong your password is and estimate crack time.",
        category: "security",
        icon: ShieldCheck,
        isNew: true,
    },

    // --- Social Tools Additions ---
    {
        slug: "whatsapp-link",
        name: "WhatsApp Link",
        description: "Generate direct WhatsApp links with pre-filled messages.",
        category: "social",
        icon: MessageCircle,
        isNew: true,
    },

    // --- Productivity/General ---
    {
        slug: "pomodoro-timer",
        name: "Pomodoro Timer",
        description: "Maximize focus with this customizable Pomodoro technique timer.",
        category: "general",
        icon: TimerReset,
        isNew: true,
    },
]

export const categories: { id: ToolCategory; label: string; icon: LucideIcon }[] = [
    { id: "developer", label: "Developer", icon: Code },
    { id: "design", label: "Design", icon: Palette },
    { id: "media", label: "Media", icon: FileImage },
    { id: "security", label: "Security", icon: Lock },
    { id: "text", label: "Text", icon: Type },
    { id: "social", label: "Social", icon: Youtube },
    { id: "math", label: "Math", icon: Calculator },
    { id: "finance", label: "Finance", icon: CircleDollarSign },
    { id: "health", label: "Health", icon: Activity },
    { id: "pdf", label: "PDF", icon: FileUp },
    { id: "general", label: "General", icon: RefreshCcw },
]

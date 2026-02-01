"use client"

import { useState, useRef, useEffect } from "react"
import {
    Plus,
    Trash2,
    Download,
    Calculator,
    ShieldCheck,
    RefreshCcw,
    Layout,
    User,
    Building2,
    Calendar,
    Hash,
    Image as ImageIcon,
    FileText,
    Stamp,
    Settings2,
    Palette,
    Type,
    AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { cn } from "@/lib/utils"

export type DocumentType = "invoice" | "quote" | "receipt" | "estimate"
export type InvoiceTheme = "modern" | "professional" | "creative" | "minimal"

interface InvoiceItem {
    id: string
    description: string
    quantity: number
    rate: number
    discount: number
}

interface BusinessDocumentEditorProps {
    initialDocType?: DocumentType
    lockedDocType?: boolean
}

export function BusinessDocumentEditor({
    initialDocType = "invoice",
    lockedDocType = false
}: BusinessDocumentEditorProps) {
    const [docType, setDocType] = useState<DocumentType>(initialDocType)
    const [theme, setTheme] = useState<InvoiceTheme>("professional") // Default to Light theme
    const [currency, setCurrency] = useState("USD")
    const [docNumber, setDocNumber] = useState(`${initialDocType.toUpperCase().slice(0, 3)}-${new Date().getFullYear()}-001`)
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [dueDate, setDueDate] = useState("")

    // Customization
    const [font, setFont] = useState<"sans" | "serif" | "mono">("sans")
    const [status, setStatus] = useState<"Draft" | "Sent" | "Pending" | "Paid" | "Overdue" | "Cancelled">("Draft")

    // Tax System
    const [taxSystem, setTaxSystem] = useState<"simple" | "gst_in">("simple")
    const [gstType, setGstType] = useState<"intra_state" | "inter_state">("intra_state")

    // Logo
    const [logo, setLogo] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Parties
    const [sender, setSender] = useState({ name: "", email: "", address: "", phone: "", vat: "" })
    const [client, setClient] = useState({ name: "", email: "", address: "", phone: "", vat: "" })

    // Items
    const [items, setItems] = useState<InvoiceItem[]>([
        { id: "1", description: "Professional Services", quantity: 1, rate: 100, discount: 0 }
    ])

    const [taxRate, setTaxRate] = useState(0)
    const [notes, setNotes] = useState("Thank you for your business!")
    const [isGenerating, setIsGenerating] = useState(false)

    const docRef = useRef<HTMLDivElement>(null)

    const addItem = () => {
        setItems([...items, { id: Math.random().toString(36).substr(2, 9), description: "", quantity: 1, rate: 0, discount: 0 }])
    }

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id))
    }

    const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item))
    }

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogo(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + (item.quantity * item.rate * (1 - item.discount / 100)), 0)
    }

    const subtotal = calculateSubtotal()

    // Tax Calculations
    let taxAmount = 0
    let cgstAmount = 0
    let sgstAmount = 0
    let igstAmount = 0

    if (taxSystem === "gst_in") {
        if (gstType === "intra_state") {
            const splitRate = taxRate / 2
            cgstAmount = subtotal * (splitRate / 100)
            sgstAmount = subtotal * (splitRate / 100)
            taxAmount = cgstAmount + sgstAmount
        } else {
            igstAmount = subtotal * (taxRate / 100)
            taxAmount = igstAmount
        }
    } else {
        taxAmount = subtotal * (taxRate / 100)
    }

    const total = subtotal + taxAmount

    const handleDownloadPDF = async () => {
        if (!docRef.current) return
        setIsGenerating(true)

        // Store original styles to restore later
        const originalStyles: Array<{ element: HTMLElement; backgroundColor: string; width?: string; maxWidth?: string }> = []

        try {
            // CRITICAL FIX: Set fixed width for professional PDF rendering
            const docElement = docRef.current
            originalStyles.push({
                element: docElement,
                backgroundColor: window.getComputedStyle(docElement).backgroundColor,
                width: docElement.style.width,
                maxWidth: docElement.style.maxWidth
            })
            // Set professional document width (A4-like proportions)
            docElement.style.width = '850px'
            docElement.style.maxWidth = '850px'

            // CRITICAL FIX: Temporarily override ALL parent backgrounds to prevent oklch/lab inheritance
            // Get all parent elements up to body
            let currentElement = docRef.current.parentElement
            while (currentElement) {
                const computedStyle = window.getComputedStyle(currentElement)
                originalStyles.push({
                    element: currentElement,
                    backgroundColor: computedStyle.backgroundColor
                })
                // Force explicit safe background
                currentElement.style.backgroundColor = 'transparent'
                currentElement = currentElement.parentElement
            }

            // Also override body
            const body = document.body
            originalStyles.push({
                element: body,
                backgroundColor: window.getComputedStyle(body).backgroundColor
            })
            body.style.backgroundColor = theme === "professional" || theme === "minimal" ? "#ffffff" : "#0f172a"


            const canvas = await html2canvas(docRef.current, {
                scale: 4, // Crisp scale for professional quality
                useCORS: true,
                backgroundColor: theme === "professional" || theme === "minimal" ? "#ffffff" : null,
                logging: false, // Disable logging for cleaner output
                ignoreElements: (element) => {
                    // Ignore elements with problematic color functions
                    const computedStyle = window.getComputedStyle(element);
                    const bgColor = computedStyle.backgroundColor;
                    // Return true to IGNORE (skip) elements with oklch/lab
                    if (bgColor && (bgColor.includes('oklch') || bgColor.includes('lab'))) {
                        return true; // Ignore this element
                    }
                    return false; // Process this element normally
                }
            })

            // Always use PNG for crisp text (JPEG artifacts look bad on docs)
            const imgData = canvas.toDataURL("image/png")

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [canvas.width / 2, canvas.height / 2],
                compress: true // Enable PDF compression
            })

            pdf.addImage(
                imgData,
                "PNG",
                0,
                0,
                canvas.width / 2,
                canvas.height / 2,
                undefined,
                "FAST"
            )
            pdf.save(`${docType.charAt(0).toUpperCase() + docType.slice(1)}-${docNumber}.pdf`)
        } catch (error) {
            console.error("PDF generation failed:", error)
        } finally {
            // Restore original styles
            originalStyles.forEach(({ element, backgroundColor, width, maxWidth }) => {
                element.style.backgroundColor = backgroundColor
                if (width !== undefined) element.style.width = width
                if (maxWidth !== undefined) element.style.maxWidth = maxWidth
            })
            setIsGenerating(false)
        }
    }

    // Theme Configuration for PDF Safety (Hex/RGB only)
    const THEME_STYLES = {
        modern: {
            container: { backgroundColor: '#0f172a', color: '#ffffff', borderColor: '#ffffff20' },
            header: { color: '#ffffff' },
            muted: { color: '#94a3b8' },
            border: { borderColor: '#ffffff20' },
            accent: { color: '#38bdf8' },
            bgMuted: { backgroundColor: '#ffffff10' }
        },
        professional: {
            container: { backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#e2e8f0' },
            header: { color: '#0f172a' },
            muted: { color: '#64748b' },
            border: { borderColor: '#e2e8f0' },
            accent: { color: '#0f172a' },
            bgMuted: { backgroundColor: '#f1f5f9' }
        },
        creative: {
            // Gradient handled separately via cleaner inline style, fallback color here
            container: { backgroundColor: '#312e81', color: '#ffffff', borderColor: '#ffffff20' },
            header: { color: '#ffffff' },
            muted: { color: '#cbd5e1' },
            border: { borderColor: '#ffffff20' },
            accent: { color: '#818cf8' },
            bgMuted: { backgroundColor: '#ffffff10' }
        },
        minimal: {
            container: { backgroundColor: '#ffffff', color: '#334155', borderColor: 'transparent' },
            header: { color: '#334155' },
            muted: { color: '#94a3b8' },
            border: { borderColor: '#e2e8f0' },
            accent: { color: '#334155' },
            bgMuted: { backgroundColor: 'transparent' }
        }
    }

    const currentTheme = THEME_STYLES[theme]

    // Font Styles based on selection
    const fontStyle = font === 'serif'
        ? { fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }
        : font === 'mono'
            ? { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }
            : { fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }

    return (
        <div className="grid xl:grid-cols-[450px_1fr] gap-10">
            {/* Editor Sidebar */}
            <div className="space-y-6">

                {/* Document Settings Card */}
                <Card className="liquid-glass border-white/5 shadow-lg overflow-hidden backdrop-blur-3xl bg-white/40 dark:bg-black/20">
                    {!lockedDocType && (
                        <div className="p-1 bg-white/10 dark:bg-black/10 grid grid-cols-4 gap-1">
                            {(["invoice", "quote", "receipt", "estimate"] as DocumentType[]).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setDocType(type)
                                        setDocNumber(`${type.toUpperCase().slice(0, 3)}-${new Date().getFullYear()}-001`)
                                    }}
                                    className={cn(
                                        "py-2 px-1 text-[10px] font-bold uppercase tracking-wide transition-all rounded-md",
                                        docType === type
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:bg-white/10 dark:hover:bg-white/5"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    )}

                    <CardHeader className="pb-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2 font-bold text-foreground">
                            <Settings2 className="w-4 h-4 text-primary" />
                            Document Settings
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-[10px] uppercase font-bold text-muted-foreground hover:text-primary hover:bg-primary/10"
                            onClick={() => {
                                setSender({
                                    name: "Acme Corp Design",
                                    email: "billing@acme.design",
                                    address: "123 Creative Blvd, Tech City, TC 94000",
                                    phone: "+1 (555) 000-0000",
                                    vat: "US-999-999"
                                })
                                setClient({
                                    name: "Globex Corporation",
                                    email: "accounts@globex.com",
                                    address: "742 Evergreen Terrace, Springfield, IL",
                                    phone: "+1 (555) 867-5309",
                                    vat: ""
                                })
                                setItems([
                                    { id: "s1", description: "UI/UX Design Services", quantity: 40, rate: 150, discount: 0 },
                                    { id: "s2", description: "Frontend Development", quantity: 20, rate: 125, discount: 5 },
                                    { id: "s3", description: "Cloud Infrastructure Setup", quantity: 1, rate: 1500, discount: 0 }
                                ])
                                setDueDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
                                setTaxRate(10)
                            }}
                        >
                            <RefreshCcw className="w-3 h-3 mr-1.5" />
                            Smart Fill
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Theme, Font & Currency Row */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                                    <Palette className="w-3 h-3" /> Theme
                                </Label>
                                <Select value={theme} onValueChange={(v: any) => setTheme(v)}>
                                    <SelectTrigger className="h-9 bg-background/50 border-input text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="modern">Modern Glass</SelectItem>
                                        <SelectItem value="professional">Corporate</SelectItem>
                                        <SelectItem value="creative">Creative</SelectItem>
                                        <SelectItem value="minimal">Minimal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                                    <Type className="w-3 h-3" /> Font Family
                                </Label>
                                <Select value={font} onValueChange={(v: any) => setFont(v)}>
                                    <SelectTrigger className="h-9 bg-background/50 border-input text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sans">Inter (Sans)</SelectItem>
                                        <SelectItem value="serif">Merriweather (Serif)</SelectItem>
                                        <SelectItem value="mono">JetBrains (Mono)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                                    <Calculator className="w-3 h-3" /> Currency
                                </Label>
                                <Select value={currency} onValueChange={setCurrency}>
                                    <SelectTrigger className="h-9 bg-background/50 border-input text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["USD", "EUR", "GBP", "JPY", "INR", "AUD", "CAD"].map(c => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Tax System Settings (Creative Addition) */}
                        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-bold text-orange-600 uppercase tracking-wide flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" /> Tax System
                                </Label>
                                <Select value={taxSystem} onValueChange={(v: "simple" | "gst_in") => setTaxSystem(v)}>
                                    <SelectTrigger className="h-7 w-[140px] text-[10px] uppercase font-bold bg-background/50 border-orange-200 text-orange-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="simple">Simple Tax</SelectItem>
                                        <SelectItem value="gst_in">Indian GST</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {taxSystem === "gst_in" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="space-y-3 pt-2"
                                >
                                    <div className="flex p-1 bg-background/50 rounded-lg border border-orange-200/50">
                                        <button
                                            onClick={() => setGstType("intra_state")}
                                            className={cn(
                                                "flex-1 py-1.5 text-[10px] font-bold uppercase transition-all rounded-md",
                                                gstType === "intra_state" ? "bg-orange-500 text-white shadow-sm" : "text-muted-foreground hover:bg-orange-500/10"
                                            )}
                                        >
                                            Intra-State (CGST+SGST)
                                        </button>
                                        <button
                                            onClick={() => setGstType("inter_state")}
                                            className={cn(
                                                "flex-1 py-1.5 text-[10px] font-bold uppercase transition-all rounded-md",
                                                gstType === "inter_state" ? "bg-orange-500 text-white shadow-sm" : "text-muted-foreground hover:bg-orange-500/10"
                                            )}
                                        >
                                            Inter-State (IGST)
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed px-1">
                                        {gstType === "intra_state"
                                            ? "For sales within the same state. Tax is split equally between Central (CGST) and State (SGST)."
                                            : "For sales outside the state. Integrated Tax (IGST) applies fully."}
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Status Row */}
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                                <AlertCircle className="w-3 h-3" /> Document Status
                            </Label>
                            <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                                <SelectTrigger className="h-9 bg-background/50 border-input text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Sent">Sent</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Paid">Paid</SelectItem>
                                    <SelectItem value="Overdue">Overdue</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator className="bg-border/50" />

                        {/* Party Settings */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-20 h-20 shrink-0 rounded-xl border border-dashed border-input hover:border-primary hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center bg-background/30 group"
                                >
                                    {logo ? (
                                        <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <>
                                            <ImageIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mb-1" />
                                            <span className="text-[9px] font-semibold uppercase text-muted-foreground group-hover:text-primary">Logo</span>
                                        </>
                                    )}
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                                        <Input className="pl-9 h-9 text-sm bg-background/50 border-input" placeholder="Doc Number" value={docNumber} onChange={e => setDocNumber(e.target.value)} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="relative">
                                            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                            <Input type="date" className="pl-8 h-8 text-xs bg-background/50 border-input" value={date} onChange={e => setDate(e.target.value)} />
                                        </div>
                                        <div className="relative">
                                            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                            <Input type="date" className="pl-8 h-8 text-xs bg-background/50 border-input" value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="Due Date" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 p-4 rounded-xl bg-background/30 border border-border/40">
                                <Label className="text-xs font-semibold text-primary flex items-center gap-2 uppercase tracking-wide">
                                    <Building2 className="w-3.5 h-3.5" /> Your Business
                                </Label>
                                <Input placeholder="Business Name" className="h-8 text-xs bg-white/20 dark:bg-black/20 border-input" value={sender.name} onChange={e => setSender({ ...sender, name: e.target.value })} />
                                <div className="grid grid-cols-2 gap-2">
                                    <Input placeholder="Email" className="h-8 text-xs bg-white/20 dark:bg-black/20 border-input" value={sender.email} onChange={e => setSender({ ...sender, email: e.target.value })} />
                                    <Input placeholder="Phone" className="h-8 text-xs bg-white/20 dark:bg-black/20 border-input" value={sender.phone} onChange={e => setSender({ ...sender, phone: e.target.value })} />
                                </div>
                                <Textarea placeholder="Headquarters Address" className="text-xs bg-white/20 dark:bg-black/20 border-input min-h-[50px]" value={sender.address} onChange={e => setSender({ ...sender, address: e.target.value })} />
                                <Input placeholder="Tax ID / VAT (Optional)" className="h-8 text-xs bg-white/20 dark:bg-black/20 border-input" value={sender.vat} onChange={e => setSender({ ...sender, vat: e.target.value })} />
                            </div>

                            <div className="space-y-3 p-4 rounded-xl bg-background/30 border border-border/40">
                                <Label className="text-xs font-semibold text-indigo-500 flex items-center gap-2 uppercase tracking-wide">
                                    <User className="w-3.5 h-3.5" /> Client Details
                                </Label>
                                <Input placeholder="Client Name" className="h-8 text-xs bg-white/20 dark:bg-black/20 border-input" value={client.name} onChange={e => setClient({ ...client, name: e.target.value })} />
                                <Textarea placeholder="Billing Address" className="text-xs bg-white/20 dark:bg-black/20 border-input min-h-[50px]" value={client.address} onChange={e => setClient({ ...client, address: e.target.value })} />
                                <Input placeholder="Client Email" className="h-8 text-xs bg-white/20 dark:bg-black/20 border-input" value={client.email} onChange={e => setClient({ ...client, email: e.target.value })} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Line Items & Calculations Card */}
                <Card className="liquid-glass border-white/5 shadow-lg overflow-hidden backdrop-blur-3xl bg-white/40 dark:bg-black/20">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-border/10 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Layout className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-bold text-foreground">Line Items</CardTitle>
                                <CardDescription className="text-xs">Manage products and services</CardDescription>
                            </div>
                        </div>
                        <Button size="sm" onClick={addItem} className="h-8 text-xs font-medium px-4 bg-muted/50 hover:bg-muted text-foreground">
                            <Plus className="w-3.5 h-3.5 mr-2" /> Add Item
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/10 max-h-[500px] overflow-y-auto">
                            {items.map((item, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    key={item.id}
                                    className="p-4 space-y-3 group hover:bg-muted/30 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1 space-y-1.5">
                                            <Label className="text-[9px] font-semibold uppercase text-muted-foreground">Description</Label>
                                            <Input
                                                className="h-9 text-sm bg-white/20 dark:bg-black/20 border-input"
                                                placeholder="Service or Product Name"
                                                value={item.description}
                                                onChange={e => updateItem(item.id, "description", e.target.value)}
                                            />
                                        </div>
                                        <div className="pt-6">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeItem(item.id)}
                                                className="w-8 h-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] font-semibold uppercase text-muted-foreground">Qty</Label>
                                            <Input
                                                type="number"
                                                className="h-8 text-sm bg-white/20 dark:bg-black/20 border-input text-center"
                                                value={item.quantity}
                                                onChange={e => updateItem(item.id, "quantity", Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] font-semibold uppercase text-muted-foreground">Rate</Label>
                                            <Input
                                                type="number"
                                                className="h-8 text-sm bg-white/20 dark:bg-black/20 border-input text-right font-mono"
                                                value={item.rate}
                                                onChange={e => updateItem(item.id, "rate", Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] font-semibold uppercase text-muted-foreground">Disc %</Label>
                                            <Input
                                                type="number"
                                                className="h-8 text-sm bg-white/20 dark:bg-black/20 border-input text-center font-mono text-emerald-600 dark:text-emerald-400"
                                                value={item.discount}
                                                onChange={e => updateItem(item.id, "discount", Number(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-6 bg-muted/10 border-t border-border/10 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground">Notes & Instructions</Label>
                                <Textarea
                                    className="text-sm bg-white/30 dark:bg-black/30 border-input min-h-[80px]"
                                    placeholder="Payment terms, delivery notes..."
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                />
                            </div>
                            <div className="space-y-4 pt-4 border-t border-border/10">
                                <div className="flex items-center justify-between gap-4">
                                    <Label className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                                        {taxSystem === "gst_in" ? "GST Rate %" : "Tax Rate %"}
                                    </Label>
                                    <div className="relative w-32">
                                        <Input
                                            type="number"
                                            className="h-10 bg-white/30 dark:bg-black/30 border-input text-right pr-8 font-mono"
                                            value={taxRate}
                                            onChange={e => setTaxRate(Number(e.target.value))}
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-bold">%</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-background border border-border flex items-center justify-between shadow-sm">
                                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Total Due</p>
                                    <p className="text-2xl font-bold tracking-tight text-primary">{currency} {total.toLocaleString()}</p>
                                </div>
                            </div>

                            <Button
                                onClick={handleDownloadPDF}
                                className="w-full h-12 premium-button text-base bg-primary text-primary-foreground shadow-lg group overflow-hidden relative"
                                disabled={isGenerating}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                {isGenerating ? (
                                    <span className="flex items-center gap-2">
                                        <RefreshCcw className="w-4 h-4 animate-spin" />
                                        Rendering...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Download PDF
                                    </span>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 flex gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg h-fit">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-emerald-500 italic uppercase tracking-tighter">Zero-Knowledge Export</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">No data ever leaves your device. All rendering is local.</p>
                    </div>
                </div>
            </div>

            {/* Right Column: Sticky Preview */}
            <div className="space-y-8 sticky top-24">
                {/* The Document Preview */}
                <div className="relative group">
                    {/* Removed gradient wrapper to prevent color parsing issues */}
                    <div
                        ref={docRef}
                        style={{
                            // Position and Layout
                            position: 'relative',
                            width: '100%',
                            minHeight: '800px',
                            padding: '3rem',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'visible',
                            // Border and Visual
                            borderRadius: '2rem',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            // Theme Colors
                            ...currentTheme.container,
                            ...fontStyle,
                            // Ensure gradient for creative theme if selected
                            background: theme === 'creative'
                                ? 'linear-gradient(135deg, #312e81 0%, #4c1d95 50%, #0f172a 100%)'
                                : currentTheme.container.backgroundColor,
                            // Transitions (optional, can be removed if causing issues)
                            transition: 'all 0.7s ease',
                            // CRITICAL FIX: Override ALL CSS variables that use oklch() from globals.css
                            // This prevents html2canvas from encountering unsupported color functions
                            color: currentTheme.container.color,
                            colorScheme: 'normal',
                            // @ts-ignore - CSS variable overrides
                            '--background': 'transparent',
                            '--foreground': 'transparent',
                            '--card': 'transparent',
                            '--card-foreground': 'transparent',
                            '--popover': 'transparent',
                            '--popover-foreground': 'transparent',
                            '--primary': 'transparent',
                            '--primary-foreground': 'transparent',
                            '--secondary': 'transparent',
                            '--secondary-foreground': 'transparent',
                            '--muted': 'transparent',
                            '--muted-foreground': 'transparent',
                            '--accent': 'transparent',
                            '--accent-foreground': 'transparent',
                            '--destructive': 'transparent',
                            '--border': 'transparent',
                            '--input': 'transparent',
                            '--ring': 'transparent'
                        } as React.CSSProperties}
                    >
                        {/* Header Section */}
                        <div className="flex justify-between items-start mb-16">
                            <div className="space-y-4">
                                {logo ? (
                                    <img src={logo} alt="Brand" className="h-16 w-auto object-contain" />
                                ) : (
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                        style={{ ...currentTheme.bgMuted, ...currentTheme.border, borderWidth: '1px', borderStyle: 'solid' }}
                                    >
                                        <Stamp className="w-8 h-8" style={currentTheme.muted} />
                                    </div>
                                )}
                                <div>
                                    <h1 className="text-5xl font-black tracking-tighter uppercase leading-none" style={{ ...currentTheme.header, opacity: 0.9 }}>{docType}</h1>
                                    <div className="flex gap-4 mt-4 text-[10px] font-mono uppercase tracking-widest" style={{ ...currentTheme.muted, opacity: 0.6 }}>
                                        <span>#{docNumber}</span>
                                        <span>|</span>
                                        <span>{date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right space-y-2" style={currentTheme.header}>
                                <p className="text-xl font-bold tracking-tight">{sender.name || "YOUR BUSINESS"}</p>
                                <div className="text-xs space-y-1" style={{ ...currentTheme.muted, opacity: 0.7 }}>
                                    <p>{sender.email}</p>
                                    <p>{sender.phone}</p>
                                    <p className="max-w-[200px] ml-auto">{sender.address}</p>
                                    {sender.vat && <p className="font-semibold mt-1">TAX ID: {sender.vat}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-12 mb-16 py-10" style={{ ...currentTheme.border, borderTopWidth: '1px', borderBottomWidth: '1px', borderStyle: 'solid' }}>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ ...currentTheme.muted, opacity: 0.4 }}>Bill To</p>
                                <p className="text-xl font-bold mb-2" style={currentTheme.header}>{client.name || "Client Name"}</p>
                                <div className="text-sm space-y-1 leading-relaxed" style={{ ...currentTheme.muted, opacity: 0.7 }}>
                                    <p className="max-w-[250px]">{client.address || "Address..."}</p>
                                    <p className="font-mono text-xs">{client.email}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ ...currentTheme.muted, opacity: 0.4 }}>Snapshot</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="uppercase tracking-widest text-[9px]" style={{ ...currentTheme.muted, opacity: 0.5 }}>Status</span>
                                        <span className="font-bold italic uppercase" style={{ ...currentTheme.header, opacity: 0.8 }}>{status}</span>
                                    </div>
                                    {dueDate && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="uppercase tracking-widest text-[9px]" style={{ ...currentTheme.muted, opacity: 0.5 }}>Due</span>
                                            <span className="font-mono" style={currentTheme.header}>{dueDate}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="opacity-50 uppercase tracking-widest text-[9px]" style={currentTheme.muted}>Currency</span>
                                        <span className="font-bold" style={currentTheme.header}>{currency}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="flex-1 min-h-[250px]">
                            <table className="w-full">
                                <thead>
                                    <tr style={{ ...currentTheme.border, ...currentTheme.muted, borderBottomWidth: '1px', borderStyle: 'solid' }}>
                                        {/* Explicit Font Sizes and Tracking needed because Tailwind 'text-[9px]' might fail if coupled with other utilities, but generally inline styles are safer for color. */}
                                        <th className="py-4 text-left font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '0.25em', opacity: 0.5 }}>Description</th>
                                        <th className="py-4 px-4 text-center font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '0.25em', opacity: 0.5 }}>Qty</th>
                                        <th className="py-4 text-right font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '0.25em', opacity: 0.5 }}>Rate</th>
                                        <th className="py-4 text-right font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '0.25em', opacity: 0.5 }}>Sum</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.id} className="group/row" style={{ borderBottomWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(128,128,128,0.05)' }}>
                                            <td className="py-6">
                                                <p className="font-semibold text-base" style={currentTheme.header}>{item.description || "Item Name"}</p>
                                                {item.discount > 0 && (
                                                    <span className="font-bold uppercase inline-block mt-1" style={{ fontSize: '9px', letterSpacing: '0.05em', opacity: 0.6, ...currentTheme.muted }}>
                                                        {item.discount}% Off
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-6 px-4 text-center font-mono text-sm" style={{ opacity: 0.7, ...currentTheme.muted }}>{item.quantity}</td>
                                            <td className="py-6 text-right font-mono text-sm" style={{ opacity: 0.7, ...currentTheme.muted }}>{currency} {item.rate.toLocaleString()}</td>
                                            <td className="py-6 text-right font-bold text-lg" style={currentTheme.header}>
                                                {currency} {(item.quantity * item.rate * (1 - item.discount / 100)).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer / Totals */}
                        <div className="mt-auto pt-10 flex justify-between items-end" style={{ borderTopWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(128,128,128,0.2)' }}>
                            <div className="max-w-[50%] space-y-8">
                                <div>
                                    <p className="font-bold uppercase mb-3" style={{ fontSize: '9px', letterSpacing: '0.2em', opacity: 0.4, ...currentTheme.muted }}>Notes & Terms</p>
                                    <p className="text-xs leading-relaxed" style={{ opacity: 0.7, ...currentTheme.muted }}>{notes}</p>
                                </div>

                            </div>
                            <div className="w-[280px] rounded-2xl p-6 space-y-3" style={{ backgroundColor: 'rgba(128,128,128,0.05)' }}>
                                <div className="flex justify-between text-sm" style={{ opacity: 0.7, ...currentTheme.muted }}>
                                    <span>Subtotal</span>
                                    <span className="font-mono">{currency} {subtotal.toLocaleString()}</span>
                                </div>

                                {taxSystem === "simple" ? (
                                    <div className="flex justify-between text-sm" style={{ opacity: 0.7, ...currentTheme.muted }}>
                                        <span>Tax ({taxRate}%)</span>
                                        <span className="font-mono">{currency} {taxAmount.toLocaleString()}</span>
                                    </div>
                                ) : (
                                    <>
                                        {gstType === "intra_state" ? (
                                            <>
                                                <div className="flex justify-between text-sm" style={{ opacity: 0.7, ...currentTheme.muted }}>
                                                    <span>CGST ({taxRate / 2}%)</span>
                                                    <span className="font-mono">{currency} {cgstAmount.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-sm" style={{ opacity: 0.7, ...currentTheme.muted }}>
                                                    <span>SGST ({taxRate / 2}%)</span>
                                                    <span className="font-mono">{currency} {sgstAmount.toLocaleString()}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex justify-between text-sm" style={{ opacity: 0.7, ...currentTheme.muted }}>
                                                <span>IGST ({taxRate}%)</span>
                                                <span className="font-mono">{currency} {igstAmount.toLocaleString()}</span>
                                            </div>
                                        )}
                                    </>
                                )}
                                <div className="pt-4 flex justify-between items-center font-bold" style={{ borderTopWidth: '1px', borderStyle: 'dashed', borderColor: 'rgba(128,128,128,0.2)', ...currentTheme.header }}>
                                    <span className="uppercase tracking-widest text-[10px]" style={{ opacity: 0.8 }}>Total</span>
                                    <span className="text-3xl tracking-tight">{currency} {total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Watermark */}
                    <div className="mt-16 pt-8 flex items-center justify-center text-center gap-2" style={{ ...currentTheme.border, borderTopWidth: '1px', borderStyle: 'solid', opacity: 0.4 }}>

                        <p className="font-bold uppercase tracking-widest" style={{ fontSize: '10px', ...currentTheme.muted }}>
                            PDF generated by <span style={currentTheme.header}>
                                {/* <img src="/assets/OpenToolBox_Logo.png" alt="Logo" className="w-4 h-4 rounded-sm grayscale opacity-70" /> */}
                                <a href="https://opentoolbox.online" target="_blank" rel="noopener noreferrer">
                                    opentoolbox.online
                                </a>
                            </span>
                        </p>
                    </div>

                    {/* Decorative Background - Ignored by html2canvas */}
                    <div
                        className="absolute top-0 right-0 w-96 h-96 blur-[100px] rounded-full pointer-events-none opacity-50"
                        style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} // Safe fallback for preview
                        data-html2canvas-ignore
                    />
                </div>
            </div>
        </div>

    )
}

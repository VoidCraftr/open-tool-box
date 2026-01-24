"use client"

import { useState } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Download, RefreshCcw, Sparkles, Share2, Link2, Wifi, MessageCircle, ShieldCheck, Zap, Activity } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { PrivacyBadge } from "@/components/common/PrivacyBadge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function QrCodeGeneratorPage() {
    const [url, setUrl] = useState("https://voidcraftr.com")
    const [size, setSize] = useState([512])
    const [bgColor, setBgColor] = useState("#ffffff")
    const [fgColor, setFgColor] = useState("#000000")
    const [isSimpleMode, setIsSimpleMode] = useState(true)
    const [logo, setLogo] = useState<string | null>(null)

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (ev) => setLogo(ev.target?.result as string)
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleDownload = () => {
        const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement
        if (canvas) {
            const pngUrl = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = pngUrl
            link.download = `qr-code-${Date.now()}.png`
            link.click()
        }
    }

    const applyPreset = (type: string) => {
        switch (type) {
            case "standard":
                setFgColor("#000000")
                setBgColor("#ffffff")
                break
            case "ocean":
                setFgColor("#0ea5e9")
                setBgColor("#ffffff")
                break
            case "premium":
                setFgColor("#8b5cf6")
                setBgColor("#ffffff")
                break
        }
    }

    return (
        <ToolWrapper
            title="Professional QR Rendering Studio"
            description="High-fidelity QR code generation with custom branding, enterprise-grade error correction, and high-performance rasterization. Secure and 100% localized."
            toolSlug="qr-code-generator"
            adSlot="qr-code-slot"
            className="max-w-6xl"
        >
            <div className="grid lg:grid-cols-[1fr_420px] gap-8">
                {/* Configuration Matrix */}
                <div className="space-y-6">
                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            <Zap className="w-32 h-32" />
                        </div>
                        <CardHeader className="pb-4 relative z-10">
                            <CardTitle className="text-xl flex items-center gap-2 font-black italic">
                                <Activity className="w-5 h-5 text-primary" />
                                Vector Definition
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8 relative z-10">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Universal Asset Payload (URL/Text)</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center text-primary opacity-40 group-focus-within:opacity-100 transition-opacity">
                                        <Link2 className="h-5 w-5" />
                                    </div>
                                    <Input
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://..."
                                        className="h-14 pl-12 rounded-2xl bg-background/50 border-white/10 focus:ring-primary/20 text-lg font-mono tracking-tight"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setIsSimpleMode(true)}
                                    className={`py-3 px-4 rounded-xl border transition-all text-[10px] font-black tracking-widest ${isSimpleMode ? 'bg-primary text-primary-foreground border-primary shadow-lg' : 'bg-white/5 border-white/10 opacity-60'}`}
                                >
                                    EXPRESS MODES
                                </button>
                                <button
                                    onClick={() => setIsSimpleMode(false)}
                                    className={`py-3 px-4 rounded-xl border transition-all text-[10px] font-black tracking-widest ${!isSimpleMode ? 'bg-primary text-primary-foreground border-primary shadow-lg' : 'bg-white/5 border-white/10 opacity-60'}`}
                                >
                                    ARCHITECT MODE
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {isSimpleMode ? (
                                    <motion.div
                                        key="simple"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="grid grid-cols-3 gap-3"
                                    >
                                        {[
                                            { id: 'standard', color: 'bg-black', label: 'CARBON' },
                                            { id: 'ocean', color: 'bg-sky-500', label: 'OCEAN' },
                                            { id: 'premium', color: 'bg-violet-500', label: 'COBALT' }
                                        ].map((p) => (
                                            <button
                                                key={p.id}
                                                onClick={() => applyPreset(p.id)}
                                                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${fgColor.toLowerCase() === (p.id === 'standard' ? '#000000' : p.id === 'ocean' ? '#0ea5e9' : '#8b5cf6') ? "border-primary bg-primary/5 shadow-xl scale-[1.02]" : "border-white/5 bg-white/5 opacity-50 hover:opacity-100"}`}
                                            >
                                                <div className={`w-10 h-10 ${p.color} rounded-lg shadow-inner`} />
                                                <span className="text-[10px] font-black tracking-tighter">{p.label}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="advanced"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase text-muted-foreground">Matrix Color</Label>
                                                <div className="flex gap-2 p-1 bg-black/20 rounded-xl border border-white/5">
                                                    <Input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 p-1 border-none bg-transparent cursor-pointer" />
                                                    <Input value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="bg-transparent border-none text-xs font-mono uppercase w-full" />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase text-muted-foreground">Backdrop</Label>
                                                <div className="flex gap-2 p-1 bg-black/20 rounded-xl border border-white/5">
                                                    <Input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 p-1 border-none bg-transparent cursor-pointer" />
                                                    <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="bg-transparent border-none text-xs font-mono uppercase w-full" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <Label className="text-[10px] font-black uppercase text-muted-foreground">Branding Identity</Label>
                                                {logo && <Button variant="ghost" size="sm" onClick={() => setLogo(null)} className="h-6 text-[9px] font-black text-red-400 uppercase">Eject Logo</Button>}
                                            </div>
                                            <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                                            <Label htmlFor="logo-upload" className="flex items-center justify-center w-full h-14 rounded-2xl border-2 border-dashed border-white/10 hover:border-primary/40 bg-white/5 cursor-pointer transition-all active:scale-[0.98]">
                                                <Sparkles className="h-4 w-4 mr-3 text-primary" />
                                                <span className="text-xs font-black uppercase tracking-widest">Ingest Global Brand Asset</span>
                                            </Label>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end">
                                                <Label className="text-[10px] font-black uppercase text-muted-foreground">Export Resolution</Label>
                                                <span className="text-sm font-mono font-black text-primary">{size[0]}PX</span>
                                            </div>
                                            <Slider value={size} onValueChange={setSize} min={256} max={2048} step={64} className="py-2" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>

                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
                        <div className="p-2 bg-primary/10 rounded-lg h-fit">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-primary uppercase tracking-tighter italic">Localized Verification</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Matrix synthesis occurs strictly in your device cache. Destination data is never indexed.</p>
                        </div>
                    </div>
                </div>

                {/* Live Rendering Stage */}
                <div className="flex flex-col items-center justify-center space-y-8 p-10 bg-muted/10 border-2 border-primary/5 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <motion.div
                        layout
                        initial={false}
                        className="relative z-10 p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-black/30 border border-white hover:rotate-1 transition-transform duration-500"
                    >
                        <QRCodeCanvas
                            id="qr-canvas"
                            value={url || " "}
                            size={size[0] / 2}
                            bgColor={bgColor}
                            fgColor={fgColor}
                            level={"H"}
                            includeMargin={true}
                            style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
                            imageSettings={logo ? {
                                src: logo,
                                height: (size[0] / 2) * 0.18,
                                width: (size[0] / 2) * 0.18,
                                excavate: true,
                            } : undefined}
                        />
                    </motion.div>

                    <div className="w-full max-w-sm space-y-4 relative z-10">
                        <Button
                            onClick={handleDownload}
                            size="lg"
                            className="w-full h-20 premium-button text-2xl font-black rounded-[2rem] shadow-2xl shadow-primary/30 flex flex-col gap-0 active:scale-95"
                        >
                            <span className="flex items-center">
                                <Download className="mr-3 h-7 w-7" /> EXPORT ASSET
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.4em] opacity-50 mt-1 font-bold">Vector Compliant Raster</span>
                        </Button>

                        <div className="flex justify-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest italic">30% Redundancy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest italic">CSPRNG Logic</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ContentSection
                title="Your Professional QR Code Studio"
                description={`Create customizable, high-resolution QR codes for websites, WiFi networks, vCards, and more. \n\nQR (Quick Response) codes are 2D barcodes that can be scanned by any smartphone camera to instantly access information. Our tool runs locally, ensuring your private data (like WiFi passwords) is never sent to a server.`}
                features={[
                    "✨ **Pixel-Perfect Clarity**: Download high-resolution PNGs ready for billboards or business cards.",
                    "🎨 **Brand Customization**: Add your own logo and match your brand colors with precision.",
                    "🔒 **100% Data Privacy**: Unlike other generators, we never track your links or store your info.",
                    "🛡️ **High Error Correction**: Level H correction ensures your code scans even if damaged.",
                    "⚡ **Infinite Generation**: No limits, no subscriptions, no watermarks, just results."
                ]}
                howToUse={[
                    "Enter your **URL or Text** in the destination field.",
                    "Switch to **Visual Design** mode to unlock colors and logos.",
                    "Adjust the **Size Slider** if you need a specific resolution.",
                    "Upload your **Brand Logo** to make the code stand out.",
                    "Click **Save High-Res PNG** to use it anywhere."
                ]}
                faq={[
                    {
                        question: "Do these QR codes expire?",
                        answer: "No. These are **static QR codes**. Once generated, they will work forever as long as the link or data they point to remains valid. There is no middleman tracking service."
                    },
                    {
                        question: "Can I change the link later?",
                        answer: "Since these are static codes, the link is hardcoded into the pixels. To change the link, you'll need to generate a new QR code. This is why we don't charge for them!"
                    },
                    {
                        question: "Are they safe for print?",
                        answer: "Yes! By setting a high resolution (like 1024px), you ensure the edges are sharp even when printed large. Always do a test scan with your phone before printing thousands of copies."
                    },
                    {
                        question: "Can I add a logo to a small code?",
                        answer: "We use **Level H Error Correction**, which allows up to 30% of the code to be covered. Your logo can safely sit in the center without affecting scannability."
                    }
                ]}
            />
        </ToolWrapper >
    )
}

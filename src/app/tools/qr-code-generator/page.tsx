"use client"

import { useState } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Download, RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function QrCodeGeneratorPage() {
    const [url, setUrl] = useState("https://voidcraftr.com")
    const [size, setSize] = useState([256])
    const [bgColor, setBgColor] = useState("#ffffff")
    const [fgColor, setFgColor] = useState("#000000")

    const [logo, setLogo] = useState<string | null>(null)

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (ev) => {
                setLogo(ev.target?.result as string)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleDownload = () => {
        const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement
        if (canvas) {
            const pngUrl = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = pngUrl
            link.download = "qrcode.png"
            link.click()
        }
    }

    return (
        <ToolWrapper
            title="QR Code Generator"
            description="Create customizable QR codes for links, text, and more. Download in high resolution."
            adSlot="qr-code-slot"
            toolSlug="qr-code-generator"
        >
            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Content (URL or Text)</Label>
                        <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Size (px)</Label>
                                <span className="font-mono text-sm">{size[0]}px</span>
                            </div>
                            <Slider value={size} onValueChange={setSize} min={128} max={1024} step={32} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Background Color</Label>
                                <div className="flex gap-2">
                                    <Input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 p-1" />
                                    <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="uppercase" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Foreground Color</Label>
                                <div className="flex gap-2">
                                    <Input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-12 p-1" />
                                    <Input value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="uppercase" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t">
                        <Label>Center Logo (Optional)</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="cursor-pointer"
                        />
                        {logo && (
                            <Button variant="outline" size="sm" onClick={() => setLogo(null)} className="w-full text-destructive hover:text-destructive">
                                Remove Logo
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border bg-muted/20 p-8">
                    <Card className="p-4 bg-white inline-block shadow-sm">
                        <QRCodeCanvas
                            id="qr-canvas"
                            value={url}
                            size={size[0]}
                            bgColor={bgColor}
                            fgColor={fgColor}
                            level={"H"}
                            includeMargin={true}
                            imageSettings={logo ? {
                                src: logo,
                                height: size[0] * 0.2,
                                width: size[0] * 0.2,
                                excavate: true,
                            } : undefined}
                        />
                    </Card>

                    <Button onClick={handleDownload} size="lg" className="w-full max-w-xs">
                        <Download className="mr-2 h-4 w-4" /> Download PNG
                    </Button>
                </div>
            </div>

            <ContentSection
                title="QR Code Generator Guide"
                description={`Create customizable, high-resolution QR codes for websites, WiFi networks, vCards, and more. \n\nQR (Quick Response) codes are 2D barcodes that can be scanned by any smartphone camera to instantly access information. Our tool runs locally, ensuring your private data (like WiFi passwords) is never sent to a server.`}
                features={[
                    "High-Resolution PNG Download",
                    "Custom Background & Foreground Colors",
                    "Adjustable Size (Up to 1024px)",
                    "Error Correction Level H (High)"
                ]}
                faq={[
                    {
                        question: "Do these QR codes expire?",
                        answer: "No. These are static QR codes. Once generated, they will work forever as long as the link or data they point to remains valid."
                    },
                    {
                        question: "Can I use these for commercial print?",
                        answer: "Absolutely. You can download the high-quality PNG and use it on flyers, business cards, or merchandise without attribution."
                    },
                    {
                        question: "Why is the QR code not scanning?",
                        answer: "Ensure there is enough contrast between the foreground and background colors. Dark foreground on light background is best. Also, ensure the Quiet Zone (margin) is preserved."
                    }
                ]}
            />
        </ToolWrapper >
    )
}

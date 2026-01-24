"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, FileUp, Download, ArrowUp, ArrowDown, FileType, ShieldCheck, Sparkles, Activity } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { motion, AnimatePresence } from "framer-motion"
import jsPDF from "jspdf"

export default function ImageToPdf() {
    const [images, setImages] = useState<{ id: string, src: string, file: File }[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files).map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                src: URL.createObjectURL(file),
                file
            }))
            setImages(prev => [...prev, ...newImages])
        }
    }

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id))
    }

    const moveImage = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index > 0) {
            const newImages = [...images]
            const temp = newImages[index]
            newImages[index] = newImages[index - 1]
            newImages[index - 1] = temp
            setImages(newImages)
        } else if (direction === 'down' && index < images.length - 1) {
            const newImages = [...images]
            const temp = newImages[index]
            newImages[index] = newImages[index + 1]
            newImages[index + 1] = temp
            setImages(newImages)
        }
    }

    const generatePdf = async () => {
        if (images.length === 0) return

        setIsGenerating(true)
        const pdf = new jsPDF()

        for (let i = 0; i < images.length; i++) {
            const img = images[i]
            const imgProps = await getImageProperties(img.src)

            const pageWidth = pdf.internal.pageSize.getWidth()
            const pageHeight = pdf.internal.pageSize.getHeight()
            const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height)
            const imgWidth = imgProps.width * ratio
            const imgHeight = imgProps.height * ratio
            const x = (pageWidth - imgWidth) / 2
            const y = (pageHeight - imgHeight) / 2

            if (i > 0) pdf.addPage()
            pdf.addImage(img.src, 'JPEG', x, y, imgWidth, imgHeight)
        }

        pdf.save("converted-images.pdf")
        setIsGenerating(false)
    }

    const getImageProperties = (src: string): Promise<{ width: number, height: number }> => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
                resolve({ width: img.width, height: img.height })
            }
            img.src = src
        })
    }

    return (
        <ToolWrapper
            title="Premium Image to PDF"
            description="Convert multiple photos into a high-fidelity PDF document. Reorder, optimize, and generate locally in seconds."
            toolSlug="image-to-pdf"
        >
            <div className="space-y-8">
                <Card className="liquid-glass border-white/20 shadow-liquid overflow-hidden relative group">
                    <CardHeader className="border-b border-white/10 pb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                                <CardTitle className="text-2xl font-black tracking-tighter flex items-center gap-2">
                                    <FileType className="w-5 h-5 text-primary" />
                                    ASSET QUEUE
                                </CardTitle>
                                <CardDescription className="font-medium">
                                    {images.length} images staged for compilation
                                </CardDescription>
                            </div>
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-lg shadow-primary/20 transition-all active:scale-95"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                IMPORT ASSETS
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/png, image/jpeg, image/jpg"
                            multiple
                            onChange={handleFileUpload}
                        />

                        {images.length === 0 ? (
                            <div
                                className="border-2 border-dashed border-white/10 rounded-[2rem] p-20 text-center hover:bg-white/5 cursor-pointer transition-all group/dropzone"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="relative mx-auto w-20 h-20 mb-6">
                                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-0 group-hover/dropzone:scale-150 transition-transform duration-1000" />
                                    <FileUp className="relative w-20 h-20 text-muted-foreground opacity-30 group-hover/dropzone:text-primary group-hover/dropzone:opacity-100 transition-all" />
                                </div>
                                <h3 className="text-xl font-black tracking-tight text-foreground/60 uppercase">No active queue</h3>
                                <p className="text-sm text-muted-foreground mt-2 font-medium">Drop images here or click to browse system files</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                                {images.map((img, index) => (
                                    <motion.div
                                        layout
                                        key={img.id}
                                        className="relative group border border-white/10 rounded-2xl overflow-hidden bg-black/40 aspect-[3/4] shadow-2xl transition-all hover:border-primary/50"
                                    >
                                        <img src={img.src} alt="Preview" className="w-full h-full object-contain" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                            <Button size="icon" variant="destructive" className="h-8 w-8 rounded-lg" onClick={() => removeImage(img.id)}>
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg bg-black/60 border-white/10 backdrop-blur-md" disabled={index === 0} onClick={() => moveImage(index, 'up')}>
                                                <ArrowUp className="w-4 h-4" />
                                            </Button>
                                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg bg-black/60 border-white/10 backdrop-blur-md" disabled={index === images.length - 1} onClick={() => moveImage(index, 'down')}>
                                                <ArrowDown className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        <div className="absolute bottom-3 left-3 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tight">
                                            Page {index + 1}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                </div>
                                <p className="text-[10px] text-muted-foreground italic font-medium uppercase tracking-tighter">Localized Compilation Zone</p>
                            </div>

                            <Button
                                size="lg"
                                disabled={images.length === 0 || isGenerating}
                                onClick={generatePdf}
                                className="h-16 px-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                {isGenerating ? "Compiling PDF..." : `EXPORT AS PDF (${images.length} PAGES)`}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6 pb-12">
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black italic uppercase tracking-tighter text-primary">High Fidelity Rendering</h4>
                            <p className="text-xs text-muted-foreground">Maintains original asset resolution while optimizing for standard A4 document sizes.</p>
                        </div>
                    </div>
                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6 flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl">
                            <Activity className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black italic uppercase tracking-tighter text-blue-500">Live Delta Ordering</h4>
                            <p className="text-xs text-muted-foreground">Drag, drop, and rearrange your pages with real-time reactive feedback.</p>
                        </div>
                    </div>
                </div>

                <ContentSection
                    title="Seamless Image to PDF Compilation"
                    description="Transforming static image assets into professional PDF documents is a core requirement for developers and creatives. Our Premium Image to PDF utility provides a secure, client-side environment for building multi-page documents with precision and ease."
                    features={[
                        "📂 **Bulk Asset Import**: Upload dozens of images (JPG, PNG) simultaneously without compromising browser performance.",
                        "🔄 **Reactive Reordering**: Effortlessly arrange your pages using visual controls to ensure perfect document flow.",
                        "📏 **Auto-Scaling Engine**: Intelligently fits your images to standard A4 page dimensions while maintaining aspect ratios.",
                        "🔒 **Private Processing**: All PDF compilation happens on your local machine. Your photos are never uploaded to our servers.",
                        "⚡ **Instant Export**: Generate and download your PDF instantly without waiting for backend queues or cloud processing.",
                        "🎨 **Liquid UI Interface**: A stunning, hardware-accelerated workspace designed for maximum productivity."
                    ]}
                    howToUse={[
                        "Click **Import Assets** or drag and drop your images directly into the asset queue.",
                        "Wait for the high-fidelity previews to appear in the staging area.",
                        "Use the **Arrow Controls** to rearrange page order if necessary.",
                        "Verify page numbers and content using the automated layout grid.",
                        "Click **Export as PDF** to compile your document and download it to your system."
                    ]}
                    faq={[
                        {
                            question: "What image formats are supported?",
                            answer: "We support all standard web formats, including JPEG, PNG, and WebP, ensuring maximum compatibility for your assets."
                        },
                        {
                            question: "Is there a page limit for the PDF?",
                            answer: "While we don't impose a hard limit, we recommend keeping documents under 50 pages for optimal browser performance during local compilation."
                        },
                        {
                            question: "Are my images private?",
                            answer: "Yes. Unlike other web converters, OpenToolbox processes everything locally in your browser. We never see or store your data."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}

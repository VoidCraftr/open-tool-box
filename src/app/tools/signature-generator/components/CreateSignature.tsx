"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Eraser, Pen, Type } from "lucide-react"

// Import Fonts
import { Dancing_Script, Great_Vibes, Sacramento, Allura, Homemade_Apple } from 'next/font/google'

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: '400' })
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' })
const sacramento = Sacramento({ subsets: ['latin'], weight: '400' })
const allura = Allura({ subsets: ['latin'], weight: '400' })
const homemadeApple = Homemade_Apple({ subsets: ['latin'], weight: '400' })

const fontOptions = [
    { name: 'Cursive', value: 'cursive', style: { fontFamily: 'cursive' } },
    { name: 'Fantasy', value: 'fantasy', style: { fontFamily: 'fantasy' } },
    { name: 'Dancing Script', value: 'Dancing Script', style: dancingScript.style },
    { name: 'Great Vibes', value: 'Great Vibes', style: greatVibes.style },
    { name: 'Sacramento', value: 'Sacramento', style: sacramento.style },
    { name: 'Allura', value: 'Allura', style: allura.style },
    { name: 'Homemade Apple', value: 'Homemade Apple', style: homemadeApple.style },
]

interface CreateSignatureProps {
    onSignatureCreated?: (dataUrl: string) => void
}

export function CreateSignature({ onSignatureCreated }: CreateSignatureProps) {
    const [creationMode, setCreationMode] = useState<"draw" | "type">("draw")
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [penColor, setPenColor] = useState("#000000")
    const [penWidth, setPenWidth] = useState([2])
    const [typedName, setTypedName] = useState("")
    const [selectedFont, setSelectedFont] = useState(fontOptions[0])
    const [generatedSignature, setGeneratedSignature] = useState<string | null>(null)

    // Drawing Canvas Logic
    const initCanvas = () => {
        if (creationMode !== 'draw') return;

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Handle High DPI
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = rect.width * dpr;
        canvas.height = 300 * dpr; // fixed height

        // Normalize coordinate system to use css pixels
        ctx.scale(dpr, dpr);

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `300px`;

        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = penColor
        ctx.lineWidth = penWidth[0]
    }

    // Initialize on mount and when creationMode changes (fixes tab switch offset bug)
    useEffect(() => {
        if (creationMode === 'draw') {
            // Small timeout to ensure DOM is fully painted/layout before measuring rect
            const timer = setTimeout(initCanvas, 50);
            window.addEventListener('resize', initCanvas);
            return () => {
                window.removeEventListener('resize', initCanvas);
                clearTimeout(timer);
            }
        }
    }, [creationMode])

    // Update style when pen changes
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penWidth[0];
    }, [penColor, penWidth]);

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect()
        let clientX, clientY

        if ('touches' in e) {
            clientX = e.touches[0].clientX
            clientY = e.touches[0].clientY
        } else {
            clientX = e.nativeEvent.clientX
            clientY = e.nativeEvent.clientY
        }

        return {
            offsetX: clientX - rect.left,
            offsetY: clientY - rect.top
        }
    }

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Prevent scrolling on touch
        if ('touches' in e) {
            // e.preventDefault(); // Note: might need 'touch-action: none' in CSS instead to be passive-listener compliant
        }

        setIsDrawing(true)
        const { offsetX, offsetY } = getCoordinates(e, canvas)
        ctx.beginPath()
        ctx.moveTo(offsetX, offsetY)
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const { offsetX, offsetY } = getCoordinates(e, canvas)
        ctx.lineTo(offsetX, offsetY)
        ctx.stroke()
    }

    const stopDrawing = () => {
        setIsDrawing(false)
        const canvas = canvasRef.current;
        if (canvas) {
            const dataUrl = canvas.toDataURL();
            setGeneratedSignature(dataUrl);
            if (onSignatureCreated) onSignatureCreated(dataUrl);
        }
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, 300);

        setGeneratedSignature(null)
    }

    const downloadSignature = () => {
        const link = document.createElement('a')
        link.download = 'signature.png'

        if (creationMode === 'draw') {
            const canvas = canvasRef.current
            if (!canvas) return
            link.href = canvas.toDataURL()
        } else {
            const dataUrl = generateTypedSignatureDataUrl();
            if (!dataUrl) return;
            link.href = dataUrl;
        }

        link.click()
    }

    const generateTypedSignatureDataUrl = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Need to set the font style correctly. 
            // If it's a loaded font, we trust it's loaded.
            ctx.font = `80px ${selectedFont.style.fontFamily || selectedFont.value}`;
            ctx.fillStyle = penColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(typedName, canvas.width / 2, canvas.height / 2);
            return canvas.toDataURL();
        }
        return null;
    }

    // UseEffect to sync typed signature
    useEffect(() => {
        if (creationMode === 'type' && typedName) {
            // Debounce slightly to avoid heavy canvas ops on every keystroke
            const timer = setTimeout(() => {
                const dataUrl = generateTypedSignatureDataUrl();
                if (dataUrl) {
                    setGeneratedSignature(dataUrl);
                    if (onSignatureCreated) onSignatureCreated(dataUrl);
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [typedName, selectedFont, penColor, creationMode]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Your Signature</CardTitle>
                <CardDescription>
                    Draw your signature or type it to generate a digital version.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex gap-4 mb-4">
                    <Button
                        variant={creationMode === 'draw' ? 'default' : 'outline'}
                        onClick={() => setCreationMode('draw')}
                        className="flex-1"
                    >
                        <Pen className="w-4 h-4 mr-2" /> Draw
                    </Button>
                    <Button
                        variant={creationMode === 'type' ? 'default' : 'outline'}
                        onClick={() => setCreationMode('type')}
                        className="flex-1"
                    >
                        <Type className="w-4 h-4 mr-2" /> Type
                    </Button>
                </div>

                {creationMode === 'draw' ? (
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Label>Color:</Label>
                                <div className="flex gap-2">
                                    {['#000000', '#0000FF', '#FF0000', '#008000', '#800080', '#FF1493'].map((color) => (
                                        <button
                                            key={color}
                                            className={`w-8 h-8 rounded-full border-2 ${penColor === color ? 'border-primary' : 'border-transparent'}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setPenColor(color)}
                                        />
                                    ))}
                                    <input
                                        type="color"
                                        value={penColor}
                                        onChange={(e) => setPenColor(e.target.value)}
                                        className="w-8 h-8 p-0 border-0 rounded-full overflow-hidden"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 w-[200px]">
                                <Label>Width:</Label>
                                <Slider
                                    value={penWidth}
                                    onValueChange={setPenWidth}
                                    min={1}
                                    max={10}
                                    step={0.5}
                                />
                            </div>
                        </div>

                        <div className="border-2 border-dashed rounded-lg p-1 bg-white" style={{ touchAction: 'none' }}>
                            <canvas
                                ref={canvasRef}
                                className="w-full h-[300px] border rounded bg-white cursor-crosshair"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                onTouchStart={startDrawing}
                                onTouchMove={draw}
                                onTouchEnd={stopDrawing}
                            />
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={clearCanvas}>
                                <Eraser className="w-4 h-4 mr-2" /> Clear
                            </Button>
                            <Button onClick={downloadSignature}>
                                <Download className="w-4 h-4 mr-2" /> Download Signature
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="name-input">Type your name</Label>
                            <Input
                                id="name-input"
                                placeholder="John Doe"
                                value={typedName}
                                onChange={(e) => {
                                    setTypedName(e.target.value);
                                }}
                                className="text-lg py-6"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <Label>Choose Font</Label>
                                <div className="flex gap-2">
                                    {['#000000', '#0000FF', '#FF0000', '#008000', '#800080'].map((color) => (
                                        <button
                                            key={color}
                                            className={`w-6 h-6 rounded-full border-2 ${penColor === color ? 'border-primary' : 'border-transparent'}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setPenColor(color)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-2">
                                {fontOptions.map(font => (
                                    <div
                                        key={font.value}
                                        className={`p-4 border rounded-lg cursor-pointer text-center text-3xl hover:bg-muted ${selectedFont.value === font.value ? 'ring-2 ring-primary bg-muted' : ''}`}
                                        style={{ ...font.style, color: penColor }}
                                        onClick={() => setSelectedFont(font)}
                                    >
                                        {typedName || 'Signature'}
                                        <div className="text-xs text-muted-foreground mt-2 font-sans">{font.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-12 border rounded-lg bg-white text-center min-h-[200px] flex items-center justify-center relative">
                            <div className="absolute top-2 left-2 text-xs text-muted-foreground">Preview</div>
                            <div style={{ ...selectedFont.style, color: penColor, fontSize: '64px' }}>
                                {typedName || 'Your Signature Preview'}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={downloadSignature} disabled={!typedName}>
                                <Download className="w-4 h-4 mr-2" /> Download Signature
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

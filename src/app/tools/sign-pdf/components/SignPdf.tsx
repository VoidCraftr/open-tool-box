"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Download, Trash2, ImagePlus, Copy } from "lucide-react"
import { pdfjs, Document, Page } from 'react-pdf';
import { PDFDocument } from 'pdf-lib'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface SignPdfProps {
    initialSignature?: string | null
}

interface SignatureItem {
    id: string;
    x: number;
    y: number;
    dataUrl: string;
    width: number;
    height: number;
}

export function SignPdf({ initialSignature }: SignPdfProps) {
    const [pdfFile, setPdfFile] = useState<File | null>(null)
    const [pdfNumPages, setPdfNumPages] = useState<number>(0)
    const [pdfPageNumber, setPdfPageNumber] = useState<number>(1)

    // Multi-page signature state: pageIndex -> array of signatures
    const [signatures, setSignatures] = useState<Record<number, SignatureItem[]>>({})

    // UI State
    const [activeSignatureUrl, setActiveSignatureUrl] = useState<string | null>(initialSignature || null)
    const pdfContainerRef = useRef<HTMLDivElement>(null)
    const [pageDetails, setPageDetails] = useState<{ width: number, height: number } | null>(null)
    const [draggingId, setDraggingId] = useState<string | null>(null)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

    // Sync initial signature if updated (basic syncing)
    useEffect(() => {
        if (initialSignature) setActiveSignatureUrl(initialSignature)
    }, [initialSignature])

    const onPdfLoadSuccess = ({ numPages }: { numPages: number }) => {
        setPdfNumPages(numPages);
    }

    const onPageLoadSuccess = (page: { originalWidth: number; originalHeight: number }) => {
        setPageDetails({ width: page.originalWidth, height: page.originalHeight });
    }

    const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPdfFile(e.target.files[0])
            setSignatures({}) // Reset signatures on new file
            setPdfPageNumber(1)
        }
    }

    const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setActiveSignatureUrl(ev.target.result as string);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    // Add signature to current page
    const addSignatureToPage = () => {
        if (!activeSignatureUrl) return;

        const newSig: SignatureItem = {
            id: crypto.randomUUID(),
            x: 50,
            y: 50,
            dataUrl: activeSignatureUrl,
            width: 150, // Default width
            height: 50 // Approx default
        };

        setSignatures(prev => ({
            ...prev,
            [pdfPageNumber]: [...(prev[pdfPageNumber] || []), newSig]
        }));
    }

    const removeSignature = (id: string) => {
        setSignatures(prev => ({
            ...prev,
            [pdfPageNumber]: (prev[pdfPageNumber] || []).filter(s => s.id !== id)
        }));
    }

    const applyToAllPages = () => {
        const currentSignatures = signatures[pdfPageNumber];
        if (!currentSignatures || currentSignatures.length === 0) {
            alert("No signatures on current page to copy.");
            return;
        }

        const newSignatures = { ...signatures };

        for (let i = 1; i <= pdfNumPages; i++) {
            if (i === pdfPageNumber) continue;

            // Clone signatures with new IDs
            const PageSigs = currentSignatures.map(sig => ({
                ...sig,
                id: crypto.randomUUID()
            }));

            // Overwrite or append? "Apply to all" implies "Make all like this" or "Add to all".
            // Typically "Add to all". But to avoid duplicates if user clicks twice, maybe we should be careful.
            // For simplicity: We append to existing.
            newSignatures[i] = [...(newSignatures[i] || []), ...PageSigs];
        }

        setSignatures(newSignatures);
        alert(`Copied ${currentSignatures.length} signature(s) to all ${pdfNumPages} pages.`);
    }

    // DRAG LOGIC
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: string, currentX: number, currentY: number) => {
        if (!pdfContainerRef.current) return;
        e.stopPropagation(); // Prevent bubbling

        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

        const containerRect = pdfContainerRef.current.getBoundingClientRect();

        // Calculate offset from the top-left of the signature element
        const relativeMouseX = clientX - containerRect.left;
        const relativeMouseY = clientY - containerRect.top;

        setDragOffset({
            x: relativeMouseX - currentX,
            y: relativeMouseY - currentY
        });

        setDraggingId(id);
    }

    // Global drag move/end listeners
    useEffect(() => {
        const handleDragMove = (e: MouseEvent | TouchEvent) => {
            if (!draggingId || !pdfContainerRef.current) return;
            e.preventDefault();

            const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

            const containerRect = pdfContainerRef.current.getBoundingClientRect();

            let newX = clientX - containerRect.left - dragOffset.x;
            let newY = clientY - containerRect.top - dragOffset.y;

            // Boundary constraints (allow some overflow for UX, but keep center in)
            const sigWidth = 150;
            const sigHeight = 50;

            newX = Math.max(-50, Math.min(newX, containerRect.width - 20));
            newY = Math.max(-20, Math.min(newY, containerRect.height - 20));

            // Update state
            setSignatures(prev => {
                const currentList = prev[pdfPageNumber] || [];
                return {
                    ...prev,
                    [pdfPageNumber]: currentList.map(s => s.id === draggingId ? { ...s, x: newX, y: newY } : s)
                };
            });
        };

        const handleDragEnd = () => {
            setDraggingId(null);
        };

        if (draggingId) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchmove', handleDragMove, { passive: false });
            window.addEventListener('touchend', handleDragEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [draggingId, dragOffset, pdfPageNumber]);


    const handleSavePdf = async () => {
        if (!pdfFile || !pageDetails) return;

        try {
            const pdfBytes = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);

            // Iterate over all pages that have signatures
            for (const [pageNumStr, sigs] of Object.entries(signatures)) {
                const pageNum = parseInt(pageNumStr);
                if (pageNum > pdfDoc.getPageCount()) continue;

                const pdfPage = pdfDoc.getPage(pageNum - 1); // 0-indexed
                const { width: pdfPageWidth, height: pdfPageHeight } = pdfPage.getSize();

                const visualWidth = 500; // Fixed visual width
                const scaleFactor = pdfPageWidth / visualWidth;

                for (const sig of sigs) {
                    const signatureImage = await pdfDoc.embedPng(sig.dataUrl);

                    // Maintain aspect ratio logic
                    const visualSigWidth = sig.width; // 150
                    const scaledSigWidth = visualSigWidth * scaleFactor;

                    const sigDims = signatureImage.scaleToFit(scaledSigWidth, scaledSigWidth);

                    // PDF Coords (Bottom-Left is 0,0) vs DOM (Top-Left is 0,0)
                    const pdfX = sig.x * scaleFactor;
                    const pdfY = pdfPageHeight - (sig.y * scaleFactor) - sigDims.height;

                    pdfPage.drawImage(signatureImage, {
                        x: pdfX,
                        y: pdfY,
                        width: sigDims.width,
                        height: sigDims.height,
                    });
                }
            }

            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
            const link = document.createElement('a');
            link.href = pdfDataUri;
            link.download = `signed_document.pdf`;
            link.click();

        } catch (error) {
            console.error("Error saving PDF:", error);
            alert("Failed to save PDF. Please try again.");
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign PDF Document</CardTitle>
                <CardDescription>
                    Upload a PDF, add signatures to any page, and save.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!pdfFile ? (
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-muted/20">
                        <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Upload your PDF</h3>
                        <p className="text-muted-foreground mb-6">Drag and drop or click to upload</p>
                        <Input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            id="pdf-upload"
                            onChange={handlePdfUpload}
                        />
                        <Button asChild>
                            <label htmlFor="pdf-upload" className="cursor-pointer">
                                <Upload className="w-4 h-4 mr-2" /> Select PDF
                            </label>
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 rounded-lg flex justify-center bg-slate-100 p-4">
                            {/* Viewer Container */}
                            <div
                                ref={pdfContainerRef}
                                className="relative shadow-lg inline-block bg-white"
                                style={{ width: '500px', minHeight: '600px' }}
                            >
                                <Document
                                    file={pdfFile}
                                    onLoadSuccess={onPdfLoadSuccess}
                                    className="pointer-events-none"
                                >
                                    <Page
                                        pageNumber={pdfPageNumber}
                                        width={500}
                                        onLoadSuccess={onPageLoadSuccess}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                </Document>

                                {/* Render signatures for CURRENT page */}
                                {(signatures[pdfPageNumber] || []).map((sig) => (
                                    <div
                                        key={sig.id}
                                        onMouseDown={(e) => handleDragStart(e, sig.id, sig.x, sig.y)}
                                        onTouchStart={(e) => handleDragStart(e, sig.id, sig.x, sig.y)}
                                        style={{
                                            position: 'absolute',
                                            left: sig.x,
                                            top: sig.y,
                                            width: `${sig.width}px`,
                                            cursor: draggingId === sig.id ? 'grabbing' : 'grab',
                                            zIndex: 10,
                                            border: '1px dashed #3b82f6',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                        }}
                                        className="group"
                                    >
                                        <img src={sig.dataUrl} alt="Signature" className="w-full h-auto pointer-events-none" />

                                        {/* Remove Button */}
                                        <button
                                            className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => { e.stopPropagation(); removeSignature(sig.id); }}
                                            onTouchEnd={(e) => { e.stopPropagation(); removeSignature(sig.id); }}
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>

                                        <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            Drag to move
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-64 space-y-4">
                            <div className="p-4 border rounded-lg bg-white">
                                <h4 className="font-semibold mb-2">Controls</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Page {pdfPageNumber} of {pdfNumPages}
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={pdfPageNumber <= 1}
                                        onClick={() => setPdfPageNumber(p => p - 1)}
                                    >
                                        Prev
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={pdfPageNumber >= pdfNumPages}
                                        onClick={() => setPdfPageNumber(p => p + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>

                            <div className="p-4 border rounded-lg bg-white space-y-4">
                                <h4 className="font-semibold">Current Signature</h4>
                                {activeSignatureUrl ? (
                                    <>
                                        <div className="border p-2 rounded bg-slate-50">
                                            <img src={activeSignatureUrl} alt="Signature" className="w-full" />
                                        </div>
                                        <div className="space-y-2">
                                            <Button size="sm" onClick={addSignatureToPage} className="w-full">
                                                Place on Page {pdfPageNumber}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={applyToAllPages}
                                                className="w-full"
                                                disabled={!signatures[pdfPageNumber]?.length}
                                            >
                                                <Copy className="w-3 h-3 mr-2" /> Apply to All Pages
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-sm text-muted-foreground">
                                        No signature selected.
                                    </div>
                                )}

                                <div className="pt-2 border-t">
                                    <Label className="text-xs text-muted-foreground mb-2 block">Upload custom signature</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id="sig-upload"
                                            onChange={handleSignatureUpload}
                                        />
                                        <Button asChild variant="outline" size="sm" className="w-full">
                                            <label htmlFor="sig-upload" className="cursor-pointer">
                                                <ImagePlus className="w-4 h-4 mr-2" /> Upload Image
                                            </label>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full" onClick={handleSavePdf} disabled={Object.keys(signatures).length === 0}>
                                <Download className="w-4 h-4 mr-2" /> Save Signed PDF
                            </Button>

                            <Button variant="ghost" className="w-full text-red-500" onClick={() => setPdfFile(null)}>
                                Remove PDF
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

"use client"

import { useState } from "react"
import { Copy, Trash2, ShieldCheck, Minimize, Maximize, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import Editor from "@monaco-editor/react"

import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function JsonFormatterClient() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleFormat = () => {
        try {
            if (!input.trim()) return
            const parsed = JSON.parse(input)
            setOutput(JSON.stringify(parsed, null, 2))
            setError(null)
        } catch (err) {
            setError("Invalid JSON: " + (err as Error).message)
            setOutput("")
        }
    }

    const handleMinify = () => {
        try {
            if (!input.trim()) return
            const parsed = JSON.parse(input)
            setOutput(JSON.stringify(parsed))
            setError(null)
        } catch (err) {
            setError("Invalid JSON: " + (err as Error).message)
            setOutput("")
        }
    }

    const handleClear = () => {
        setInput("")
        setOutput("")
        setError(null)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(output)
    }

    const handleDownload = () => {
        if (!output) return
        const blob = new Blob([output], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "formatted.json"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleLoadSample = () => {
        const sample = {
            "project": "OpenToolbox",
            "version": 1.0,
            "features": ["formatting", "validation", "minification"],
            "active": true
        }
        setInput(JSON.stringify(sample, null, 2))
        setError(null)
    }

    return (
        <ToolWrapper
            title="JSON Formatter & Validator"
            description="Format, prettify, and validate your JSON data. Secure, client-side processing."
            toolSlug="json-formatter"
            adSlot="json-tool-slot"
        >
            <div className="grid gap-6 md:grid-cols-2 h-[500px]">
                <div className="space-y-2 flex flex-col h-full">
                    <div className="flex items-center justify-between shrink-0">
                        <h3 className="text-lg font-medium">Input JSON</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleLoadSample} className="h-8 px-2">
                                Load Sample
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 px-2 text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Clear
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 border rounded-md overflow-hidden shadow-sm">
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            theme="vs-dark"
                            value={input}
                            onChange={(value) => setInput(value || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 13,
                                wordWrap: "on",
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-2 flex flex-col h-full">
                    <div className="flex items-center justify-between shrink-0">
                        <h3 className="text-lg font-medium">Output</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleDownload} disabled={!output} className="h-8 px-2">
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output} className="h-8 px-2">
                                <Copy className="mr-2 h-4 w-4" /> Copy
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 border rounded-md overflow-hidden shadow-sm">
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            theme="vs-dark"
                            value={output}
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                fontSize: 13,
                                wordWrap: "on",
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 py-4 justify-center">
                <Button onClick={handleFormat} size="lg">
                    <Maximize className="mr-2 h-4 w-4" /> Format / Prettify
                </Button>
                <Button onClick={handleMinify} variant="secondary" size="lg">
                    <Minimize className="mr-2 h-4 w-4" /> Minify
                </Button>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <ContentSection
                title="JSON Formatter & Validator Guide"
                description={`JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate.\n\nOur JSON Formatter helps developers debug, validate, and prettify JSON data instantly throughout their workflow. Since all processing happens locally in your browser, even sensitive data remains secure.`}
                features={[
                    "RFC 8259 Compliant Validation",
                    "Local Client-Side Processing",
                    "Minification for Payload Optimization",
                    "Syntax Error Highlighting"
                ]}
                faq={[
                    {
                        question: "Is my data sent to a server?",
                        answer: "No. All processing is performed client-side using JavaScript. Your data never leaves your browser."
                    },
                    {
                        question: "Why is my JSON invalid?",
                        answer: "Common issues include trailing commas, missing quotes around keys, or using single quotes instead of double quotes. Our tool highlights the exact position of the syntax error."
                    },
                    {
                        question: "What is the difference between formatting and minifying?",
                        answer: "Formatting adds whitespace and indentation to make the JSON readable for humans. Minifying removes all unnecessary whitespace to reduce the file size for transmission."
                    }
                ]}
            />
        </ToolWrapper>
    )
}

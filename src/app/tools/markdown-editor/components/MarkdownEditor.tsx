"use client"

import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, FileDown, Eye, PenLine } from "lucide-react"

const DEFAULT_MARKDOWN = `# Welcome to the Markdown Editor

This is a live preview editor. Type in the left pane (or top pane on mobile) and see the result here.

## Features
- live preview
- clean interface
- standard markdown support

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

[Learn more about Markdown](https://www.markdownguide.org)
`

export function MarkdownEditor() {
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)

    const handleCopyHtml = () => {
        // Simple HTML export using a temporary element or just converting widely supported subset
        // For now, we will just copy the Markdown source as requested by "Copy" usually implies source
        // If user wants HTML, we might need a transformer or just copy plain text
        navigator.clipboard.writeText(markdown)
        alert("Markdown copied to clipboard!")
    }

    const handleDownload = () => {
        const blob = new Blob([markdown], { type: "text/markdown" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "document.md"
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="h-[calc(100vh-250px)] min-h-[500px] flex flex-col gap-4">
            <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyHtml}>
                    <Copy className="w-4 h-4 mr-2" /> Copy Markdown
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                    <FileDown className="w-4 h-4 mr-2" /> Download .md
                </Button>
            </div>

            <div className="flex-1 grid md:grid-cols-2 gap-4 h-full">
                {/* Editor Pane */}
                <Card className="flex flex-col h-full overflow-hidden">
                    <div className="bg-muted p-2 border-b flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <PenLine className="w-4 h-4" /> Editor
                    </div>
                    <Textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-sm leading-relaxed"
                        placeholder="Type your markdown here..."
                    />
                </Card>

                {/* Preview Pane */}
                <Card className="flex flex-col h-full overflow-hidden">
                    <div className="bg-muted p-2 border-b flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Eye className="w-4 h-4" /> Preview
                    </div>
                    <div className="flex-1 overflow-auto p-6 prose dark:prose-invert max-w-none">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </div>
                </Card>
            </div>

            {/* Mobile Tabs View (for smaller screens if grid breaks down, though grid-cols-1 handles it) */}
        </div>
    )
}

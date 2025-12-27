"use client"

import { useState, useRef, useEffect } from "react"
import { DiffEditor } from "@monaco-editor/react"
import { Trash2, ArrowDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

const LANGUAGES = [
    { value: "plaintext", label: "Plain Text" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "json", label: "JSON" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "sql", label: "SQL" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "markdown", label: "Markdown" },
]

export default function DiffViewerClient() {
    const [original, setOriginal] = useState("")
    const [modified, setModified] = useState("")
    const [language, setLanguage] = useState("plaintext")

    const [showDiff, setShowDiff] = useState(false)
    const [renderSideBySide, setRenderSideBySide] = useState(true)

    const editorRef = useRef<any>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.updateOptions({
                renderSideBySide: renderSideBySide
            });
        }
    }, [renderSideBySide]);

    const handleCompare = () => {
        if (original || modified) {
            setShowDiff(true)
            // Optional: Scroll to diff view?
            setTimeout(() => {
                document.getElementById('diff-result')?.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }

    const handleClear = () => {
        setOriginal("")
        setModified("")
        setShowDiff(false)
    }

    return (
        <ToolWrapper
            title="Code Diff Viewer"
            description="Compare code snippets or text files side-by-side. Highlights differences with syntax coloring."
            toolSlug="diff-viewer"
            adSlot="diff-viewer-slot"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-lg border">
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[180px] bg-background"><SelectValue placeholder="Select Language" /></SelectTrigger>
                        <SelectContent>
                            {LANGUAGES.map(l => (
                                <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                        <div className="flex bg-background rounded-md border mr-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setRenderSideBySide(true)}
                                className={renderSideBySide ? "bg-muted font-bold" : "text-muted-foreground"}
                            >
                                Split
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setRenderSideBySide(false)}
                                className={!renderSideBySide ? "bg-muted font-bold" : "text-muted-foreground"}
                            >
                                Unified
                            </Button>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleClear} className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" /> Clear All
                        </Button>
                    </div>
                </div>

                {/* Inputs - Always Visible */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold flex items-center gap-2">
                            <span className="bg-muted px-2 py-0.5 rounded text-xs">1</span> Original Text
                        </h3>
                        <Textarea
                            className="font-mono h-[300px] resize-y focus-visible:ring-1"
                            placeholder="Paste original content here..."
                            value={original}
                            onChange={(e) => setOriginal(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold flex items-center gap-2">
                            <span className="bg-muted px-2 py-0.5 rounded text-xs">2</span> Changed Text
                        </h3>
                        <Textarea
                            className="font-mono h-[300px] resize-y focus-visible:ring-1"
                            placeholder="Paste changed content here..."
                            value={modified}
                            onChange={(e) => setModified(e.target.value)}
                        />
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-center pt-2 pb-4">
                    <Button
                        size="lg"
                        onClick={handleCompare}
                        disabled={!original && !modified}
                        className="w-64 text-lg h-12 shadow-lg hover:shadow-xl transition-all"
                    >
                        Find Difference <ArrowDown className="ml-2 h-5 w-5" />
                    </Button>
                </div>

                {/* Diff Output - Conditionally Visible */}
                {showDiff && (
                    <div id="diff-result" className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
                        <h3 className="text-lg font-semibold text-center pb-2">Comparison Result</h3>
                        <div className="border rounded-md overflow-hidden shadow-sm h-[600px] bg-[#1e1e1e]">
                            <DiffEditor
                                height="100%"
                                language={language}
                                theme="vs-dark"
                                original={original}
                                modified={modified}
                                onMount={(editor) => {
                                    editorRef.current = editor;
                                }}
                                options={{
                                    renderSideBySide: renderSideBySide,
                                    fontSize: 13,
                                    readOnly: true,
                                    scrollBeyondLastLine: false,
                                    minimap: { enabled: false }
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <ContentSection
                title="Monaco Diff Viewer Guide"
                description={`A professional-grade diff tool powered by the Monaco Editor (VS Code). \n\nPaste your code or text into the two distinct panes to instantly see line-by-line differences. Supports syntax highlighting for major programming languages.`}
                features={[
                    "Side-by-Side Comparison",
                    "Syntax Highlighting",
                    "Infinite Undo/Redo",
                    "Language Selection"
                ]}
                faq={[
                    {
                        question: "Can I edit the code?",
                        answer: "Yes! Simply edit the text in the input boxes above, then click 'Find Difference' again to update the comparison."
                    },
                    {
                        question: "Does it support large files?",
                        answer: "Monaco is highly optimized and can handle thousands of lines of code without lagging."
                    }
                ]}
            />
        </ToolWrapper>
    )
}

"use client"

import { useState } from "react"
import { format } from "sql-formatter"
import { Copy, Trash2, Play, ShieldCheck } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import Editor from "@monaco-editor/react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function SqlFormatterClient() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [dialect, setDialect] = useState("sql")
    const [error, setError] = useState<string | null>(null)

    const handleFormat = () => {
        try {
            const formatted = format(input, { language: dialect as any, tabWidth: 2 })
            setOutput(formatted)
            setError(null)
        } catch (err) {
            setError("Invalid SQL")
        }
    }

    const handleCopyAsString = (lang: 'java' | 'python' | 'csharp') => {
        if (!output) return
        let escaped = output.replace(/"/g, '\\"').replace(/\n/g, '\\n')
        let code = ""

        // Simple string escaping (can be improved)
        if (lang === 'java' || lang === 'csharp') {
            code = `"${escaped}"`
        } else if (lang === 'python') {
            code = `"""${output}"""`
        }

        navigator.clipboard.writeText(code)
    }

    return (
        <ToolWrapper
            title="SQL Formatter"
            description="Beautify and standardise SQL queries. Supports MySQL, PostgreSQL, SQLite, and more."
            toolSlug="sql-formatter"
            adSlot="sql-formatter-slot"
            className="max-w-7xl"
        >
            <div className="flex flex-col h-[calc(100vh-350px)] min-h-[450px] gap-6 relative">
                {/* Fixed Control Deck */}
                <div className="sticky top-0 z-30 flex flex-col md:flex-row items-center justify-between gap-6 py-4 px-6 bg-background/80 backdrop-blur-xl border border-white/10 rounded-3xl liquid-shadow animate-fade-in shrink-0">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Database Link</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-xs font-bold uppercase tracking-tighter">{dialect} Engine</span>
                            </div>
                        </div>
                        <Separator orientation="vertical" className="h-8 bg-white/10" />
                        <div className="flex gap-3">
                            <Button onClick={handleFormat} size="lg" className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-lg shadow-primary/20 active:scale-95 transition-all">
                                <Play className="mr-2 h-4 w-4" /> FORMAT SQL
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-[10px] text-muted-foreground italic font-medium uppercase tracking-tighter">Localized Compute Zone</p>
                    </div>
                </div>

                {/* Main Workspace Grid */}
                <div className="grid lg:grid-cols-2 lg:flex-1 gap-6 min-h-0">
                    <div className="space-y-2 flex flex-col h-full group">
                        <div className="flex justify-between items-center shrink-0 px-1">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Input Source</Label>
                            <div className="flex gap-2">
                                <Select value={dialect} onValueChange={setDialect}>
                                    <SelectTrigger className="w-[140px] h-8 text-[10px] font-bold uppercase tracking-tight bg-white/5 border-white/5"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sql">Standard SQL</SelectItem>
                                        <SelectItem value="mysql">MySQL</SelectItem>
                                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                                        <SelectItem value="sqlite">SQLite</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="ghost" size="sm" onClick={() => setInput("")} className="text-red-400 hover:bg-red-400/10 h-8 px-2 text-[10px] font-black uppercase">
                                    <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Clear
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 border-white/10 border-2 rounded-[1.5rem] overflow-hidden shadow-inner bg-black/20">
                            <Editor
                                height="100%"
                                defaultLanguage="sql"
                                theme="vs-dark"
                                value={input}
                                onChange={(value) => setInput(value || "")}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    wordWrap: "on",
                                    padding: { top: 16 },
                                    renderLineHighlight: "none"
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-2 flex flex-col h-full group">
                        <div className="flex justify-between items-center shrink-0 px-1">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Prettified Output</Label>
                            <div className="flex gap-2">
                                <Select onValueChange={(v) => handleCopyAsString(v as any)}>
                                    <SelectTrigger className="w-[130px] h-8 text-[10px] font-bold uppercase bg-white/5 border-white/5">
                                        <SelectValue placeholder="Code Snippet" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="java">Java String</SelectItem>
                                        <SelectItem value="csharp">C# String</SelectItem>
                                        <SelectItem value="python">Python String</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(output)} className="h-8 px-4 text-[10px] font-black uppercase bg-white/10 hover:bg-white/20 border-white/5">
                                    <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 border-white/10 border-2 rounded-[1.5rem] overflow-hidden shadow-inner bg-black/40">
                            <Editor
                                height="100%"
                                defaultLanguage="sql"
                                theme="vs-dark"
                                value={output}
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    wordWrap: "on",
                                    padding: { top: 16 },
                                    renderLineHighlight: "none"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ContentSection
                title="SQL Formatter Guide"
                description={`Clean up messy SQL queries instantly. \n\nConsistent formatting makes SQL easier to read, debug, and maintain. Our tool handles various dialects including MySQL, PostgreSQL, and SQLite.`}
                features={[
                    "Support for Multiple Dialects",
                    "Standard 2-Space Indentation",
                    "Syntax Error Detection",
                    "One-Click Copy Output"
                ]}
                faq={[
                    {
                        question: "Why format SQL?",
                        answer: "Clean code reduces bugs. Properly indented nested queries are much easier to understand than single-line spaghetti code."
                    },
                    {
                        question: "Does it execute the SQL?",
                        answer: "No. This is purely a text processing tool. It does not connect to any database or execute any commands."
                    }
                ]}
            />
        </ToolWrapper>
    )
}

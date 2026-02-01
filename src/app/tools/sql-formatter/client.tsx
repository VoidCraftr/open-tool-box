"use client"

import { useState } from "react"
import { Editor } from "@monaco-editor/react"
import { Play, Copy, Download, Trash2, Database, ShieldCheck, Check, Code, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolLayout } from "@/components/tools/ui/ToolLayout"
import { ControlCard } from "@/components/tools/ui/ControlCard"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { format } from "sql-formatter"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Simple Pill Selector Component
const PillSelector = ({ value, onChange, options, className }: { value: string, onChange: (v: string) => void, options: { value: string, label: string }[], className?: string }) => (
    <div className={cn("flex gap-1 p-1 bg-muted/40 rounded-lg", className)}>
        {options.map((opt) => (
            <button
                key={opt.value}
                onClick={() => onChange(opt.value)}
                className={cn(
                    "flex-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                    value === opt.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                )}
            >
                {opt.label}
            </button>
        ))}
    </div>
)

export default function SqlFormatterClient() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [dialect, setDialect] = useState("sql")
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const handleFormat = () => {
        try {
            const formatted = format(input, { language: dialect as any, tabWidth: 2 })
            setOutput(formatted)
            setError(null)
        } catch (err) {
            setError("Invalid SQL Syntax")
        }
    }

    const handleCopy = () => {
        if (!output) return
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleCopyAsString = (lang: 'java' | 'python' | 'csharp') => {
        if (!output) return
        let escaped = output.replace(/"/g, '\\"').replace(/\n/g, '\\n')
        let code = ""

        if (lang === 'java') {
            code = `String sql = "${escaped}";`
        } else if (lang === 'csharp') {
            code = `string sql = @"${output}";`
        } else if (lang === 'python') {
            code = `sql = """${output}"""`
        }

        navigator.clipboard.writeText(code)
    }

    return (
        <ToolWrapper
            title="SQL Formatter & Beautifier"
            description="Beautify and standardize SQL queries instantly. Supports MySQL, PostgreSQL, SQLite, and more."
            toolSlug="sql-formatter"
            adSlot="sql-formatter-slot"

            className="max-w-[2000px] px-4"
        >
            <div className="flex flex-col gap-6 animate-fade-in">
                {/* Main Editors - Full Width */}
                <div className="grid lg:grid-cols-2 gap-4 h-[60vh] min-h-[400px]">
                    {/* Input Node */}
                    <Card className={`bg-card border border-border shadow-sm flex flex-col min-h-0 overflow-hidden group transition-colors ${error ? 'border-destructive/50' : 'hover:shadow-md'}`}>
                        <CardHeader className="py-1.5 px-3 border-b border-border flex flex-row items-center justify-between shrink-0 bg-muted/40">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Database className="w-3.5 h-3.5" /> Raw Query
                            </CardTitle>
                            {/* Input Actions */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => { setInput(""); setOutput(""); setError(null); }}
                                    className="h-6 px-2 text-[10px] text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 className="w-3 h-3 mr-1" /> Clear
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 min-h-0 bg-card">
                            <Editor
                                height="100%"
                                defaultLanguage="sql"
                                theme="vs-dark"
                                value={input}
                                onChange={(value) => setInput(value || "")}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    wordWrap: "on",
                                    padding: { top: 16, bottom: 16 },
                                    lineNumbersMinChars: 3,
                                    renderLineHighlight: "none",
                                    fontFamily: "'Geist Mono', monospace",
                                }}
                            />
                        </CardContent>
                    </Card>

                    {/* Output Node */}
                    <Card className="bg-card border border-border shadow-sm flex flex-col min-h-0 overflow-hidden group hover:shadow-md transition-all">
                        <CardHeader className="py-1.5 px-3 border-b border-border flex flex-row items-center justify-between shrink-0 bg-muted/40">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <ShieldCheck className="w-3.5 h-3.5" /> Clean SQL
                            </CardTitle>
                            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output} className="h-6 px-3 text-[10px] font-black tracking-widest hover:bg-primary/10 hover:text-primary rounded-md transition-all">
                                {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                                {copied ? "COPIED" : "COPY"}
                            </Button>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 min-h-0 bg-card">
                            <div className="relative h-full">
                                <Editor
                                    height="100%"
                                    defaultLanguage="sql"
                                    theme="vs-dark"
                                    value={output}
                                    options={{
                                        readOnly: true,
                                        minimap: { enabled: false },
                                        fontSize: 13,
                                        wordWrap: "on",
                                        padding: { top: 16, bottom: 16 },
                                        lineNumbersMinChars: 3,
                                        renderLineHighlight: "none",
                                        fontFamily: "'Geist Mono', monospace",
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 10, height: 0 }}
                        >
                            <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 rounded-xl">
                                <AlertTitle className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                    <Database className="w-4 h-4" /> SQL Error Detected
                                </AlertTitle>
                                <AlertDescription className="font-mono text-xs opacity-80">{error}</AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Professional Toolbar */}
                <Card className="bg-muted/30 border-border p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                    {/* Left: Dialect Selection */}
                    <div className="flex items-center gap-4">
                        <div className="space-y-1">
                            <span className="text-[9px] font-black uppercase text-muted-foreground ml-1">Example Dialect</span>
                            <div className="flex gap-2">
                                <PillSelector
                                    value={dialect}
                                    onChange={setDialect}
                                    options={[
                                        { value: 'sql', label: 'Standard SQL' },
                                        { value: 'mysql', label: 'MySQL' },
                                        { value: 'postgresql', label: 'Postgres' },
                                        { value: 'sqlite', label: 'SQLite' },
                                    ]}
                                    className="h-9 bg-background border-border"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Center: Main Action */}
                    <div className="flex-1 flex justify-center">
                        <Button
                            onClick={handleFormat}
                            className="h-10 px-10 premium-button bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                        >
                            <Play className="mr-2 h-4 w-4 fill-current" /> Format Query
                        </Button>
                    </div>

                    {/* Right: Export Options */}
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase text-muted-foreground mr-2 hidden sm:block">Export As String</span>
                        <div className="flex gap-1 bg-background border border-border rounded-lg p-1">
                            <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold px-2 hover:bg-muted" onClick={() => handleCopyAsString('java')}>Java</Button>
                            <div className="w-px bg-border my-1" />
                            <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold px-2 hover:bg-muted" onClick={() => handleCopyAsString('python')}>Python</Button>
                            <div className="w-px bg-border my-1" />
                            <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold px-2 hover:bg-muted" onClick={() => handleCopyAsString('csharp')}>C#</Button>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="mt-12">
                <ContentSection
                    title="SQL Formatter & Beautifier Guide"
                    description={`Clean up messy SQL queries instantly. \n\nConsistent formatting makes SQL easier to read, debug, and maintain. Our tool handles various dialects including MySQL, PostgreSQL, and SQLite.`}
                    features={[
                        "Support for Multiple Dialects",
                        "Standard 2-Space Indentation",
                        "Syntax Error Detection",
                        "One-Click Copy Output",
                        "Export as Java/Python/C# Strings"
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
            </div>
        </ToolWrapper>
    )
}

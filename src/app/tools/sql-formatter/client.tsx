"use client"

import { useState } from "react"
import { format } from "sql-formatter"
import { Copy, Trash2, Play } from "lucide-react"

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

    return (
        <ToolWrapper
            title="SQL Formatter"
            description="Beautify and standardise SQL queries. Supports MySQL, PostgreSQL, SQLite, and more."
            toolSlug="sql-formatter"
            adSlot="sql-formatter-slot"
        >
            <div className="grid gap-6 lg:grid-cols-2 h-[500px]">
                <div className="space-y-2 flex flex-col h-full">
                    <div className="flex justify-between items-center shrink-0">
                        <Select value={dialect} onValueChange={setDialect}>
                            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sql">Standard SQL</SelectItem>
                                <SelectItem value="mysql">MySQL</SelectItem>
                                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                                <SelectItem value="sqlite">SQLite</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm" onClick={() => setInput("")} className="text-destructive h-8 px-2">
                            <Trash2 className="mr-2 h-4 w-4" /> Clear
                        </Button>
                    </div>
                    <div className="flex-1 border rounded-md overflow-hidden shadow-sm">
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
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-2 flex flex-col h-full">
                    <div className="flex justify-between items-center shrink-0">
                        <h3 className="font-medium">Output</h3>
                        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)} className="h-8 px-2">
                            <Copy className="mr-2 h-4 w-4" /> Copy
                        </Button>
                    </div>
                    <div className="flex-1 border rounded-md overflow-hidden shadow-sm">
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
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center py-4">
                <Button onClick={handleFormat} size="lg" className="w-full max-w-sm">
                    <Play className="mr-2 h-4 w-4" /> Format SQL
                </Button>
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

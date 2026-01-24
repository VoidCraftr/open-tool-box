import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Metadata } from "next"
import { MarkdownEditor } from "./components/MarkdownEditor"
import { ContentSection } from "@/components/tools/ContentSection"

export const metadata: Metadata = {
    title: "Free Online Markdown Editor & Viewer | Live Preview | OpenToolBox",
    description: "Write and preview Markdown in real-time. A clean, split-pane editor for developers and writers to draft READMES, docs, and notes.",
    keywords: ["markdown editor", "markdown viewer", "online markdown preview", "readme generator", "md editor"],
}

export default function MarkdownEditorPage() {
    return (
        <ToolWrapper
            title="Markdown Editor"
            description="A clean, real-time Markdown editor with split-pane preview."
            toolSlug="markdown-editor"
        >
            <MarkdownEditor />

            <ContentSection
                title="Advanced Markdown Composition & Live Preview"
                description="Markdown is the industry standard for documentation, README creation, and technical writing. Our Premium Markdown Editor provides a high-performance, split-pane environment to draft and visualize your content in real-time."
                features={[
                    "📝 **Split-Pane Synchronicity**: View your rendered HTML side-by-side with your raw Markdown input instantly.",
                    "🚀 **GFM Support**: Fully compatible with GitHub Flavored Markdown, including tables, task lists, and strikethroughs.",
                    "🎨 **Syntax Highlighting**: Real-time coloring of Markdown syntax to make drafting easier and faster.",
                    "⚡ **Hardware Accelerated Preview**: Optimized rendering engine ensures smooth scrolling even with large documents.",
                    "🔒 **Zero-Persistence Drafting**: Your content remains strictly in your browser session, ensuring maximum data privacy.",
                    "✨ **Developer-First UI**: A minimalist, liquid interface that minimizes distractions and maximizes focus."
                ]}
                howToUse={[
                    "Start typing in the left-hand editor pane using standard Markdown syntax.",
                    "Watch the right-hand preview pane update instantly as you make changes.",
                    "Toggle between visual states to ensure your document flow matches your intent.",
                    "Once satisfied, copy the raw Markdown to your clipboard for use in GitHub or other platforms.",
                    "Use the built-in shortcuts for headers, bolding, and list creation where available."
                ]}
                faq={[
                    {
                        question: "What is Markdown used for?",
                        answer: "Markdown is a lightweight markup language used to format text on the web. It is extensively used for GitHub READMEs, forum posts, and documentation systems."
                    },
                    {
                        question: "Does this support tables and images?",
                        answer: "Yes, our editor supports full GFM (GitHub Flavored Markdown) syntax, including complex tables and embedded image links."
                    },
                    {
                        question: "Where is my data stored?",
                        answer: "Nowhere. This is a client-side tool. Your drafts are never sent to a server, keeping your sensitive documentation completely private."
                    }
                ]}
            />
        </ToolWrapper>
    )
}

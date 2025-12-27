import DiffViewerClient from "./client"
import { constructMetadata } from "@/lib/seo"

export const metadata = constructMetadata({
    title: "Diff Viewer & Compare Tool - OpenToolbox",
    description: "Compare text and code side-by-side. Highlight differences with syntax coloring using our advanced Monaco-based diff viewer.",
    keywords: ["diff viewer", "compare text", "code compare", "diff tool", "syntax highlighting", "monaco diff"],
})

export default function DiffViewerPage() {
    return <DiffViewerClient />
}

import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Metadata } from "next"
import QuoteGeneratorClient from "./client"

export const metadata: Metadata = {
    title: "Quote Post Generator | Create Cinematic Quote Images | OpenToolBox",
    description: "Convert your favorite quotes into beautiful, shareable images for social media. Choose from premium backgrounds, mesh gradients, and designer typography.",
    keywords: ["quote generator", "quote maker", "instagram quote creator", "cinematic quotes", "quote to image"],
}

export default function QuoteGeneratorPage() {
    return <QuoteGeneratorClient />
}

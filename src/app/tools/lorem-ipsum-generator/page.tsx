import { constructMetadata } from "@/lib/seo"
import LoremIpsumGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "Lorem Ipsum Generator - Placeholder Text",
    description: "Free online Lorem Ipsum generator. Create dummy text for your designs, layouts, and mockups. Generate paragraphs, sentences, or words.",
    keywords: ["lorem ipsum generator", "dummy text generator", "placeholder text", "lipsum", "text generator", "web design tools"]
})

export default function LoremIpsumGeneratorPage() {
    return <LoremIpsumGeneratorClient />
}

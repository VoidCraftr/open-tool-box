import { constructMetadata } from "@/lib/seo"
import TextToHandwritingClient from "./client"

export const metadata = constructMetadata({
    title: "Text to Handwriting Converter - Online Handwriting Tool",
    description: "Convert typed text into realistic handwritten notes. Choose from multiple handwriting fonts and paper styles. Free text to handwriting tool.",
    keywords: ["text to handwriting", "handwriting converter", "robot handwriting", "handwriting generator", "font to handwriting", "digital notes"]
})

export default function TextToHandwritingPage() {
    return <TextToHandwritingClient />
}

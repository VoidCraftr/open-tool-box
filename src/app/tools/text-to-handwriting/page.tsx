import { constructMetadata } from "@/lib/seo"
import TextToHandwritingClient from "./client"

export const metadata = constructMetadata({
    title: "Text to Handwriting Converter - Online Handwriting Tool",
    description: "Convert typed text into realistic handwritten notes. Choose from multiple handwriting fonts and paper styles. Free text to handwriting tool.",
    keywords: ["text to handwriting", "handwriting converter", "robot handwriting", "handwriting generator", "font to handwriting", "digital notes"]
})

export default function TextToHandwritingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Text to Handwriting Converter","description":"Convert typed text into realistic handwritten notes. Choose from multiple handwriting fonts and paper styles. Free text to handwriting tool.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <TextToHandwritingClient />
        </>
    )
}

import DiffViewerClient from "./client"
import { constructMetadata } from "@/lib/seo"

export const metadata = constructMetadata({
    title: "Diff Viewer & Compare Tool - OpenToolbox",
    description: "Compare text and code side-by-side. Highlight differences with syntax coloring using our advanced Monaco-based diff viewer.",
    keywords: ["diff viewer", "compare text", "code compare", "diff tool", "syntax highlighting", "monaco diff"],
})

export default function DiffViewerPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Diff Viewer & Compare Tool","description":"Compare text and code side-by-side. Highlight differences with syntax coloring using our advanced Monaco-based diff viewer.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <DiffViewerClient />
        </>
    )
}

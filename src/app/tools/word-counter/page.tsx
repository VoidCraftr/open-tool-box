import { constructMetadata } from "@/lib/seo"
import WordCounterClient from "./client"

export const metadata = constructMetadata({
    title: "Word Counter - Count Words, Characters & Sentences Online",
    description: "Free online word counter and character counter. Calculate reading time, speaking time, and keyword density instantly. Secure client-side analysis.",
    keywords: ["word counter", "character count", "sentence counter", "reading time calculator", "keyword density", "text analysis"]
})

export default function WordCounterPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Word Counter","description":"Free online word counter and character counter. Calculate reading time, speaking time, and keyword density instantly. Secure client-side analysis.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <WordCounterClient />
        </>
    )
}

import { constructMetadata } from "@/lib/seo"
import InstagramHashtagsClient from "./client"

export const metadata = constructMetadata({
    title: "Instagram Hashtag Generator",
    description: "Generate trending and popular Instagram hashtags for travel, food, tech, and more.",
    keywords: ["instagram hashtags", "hashtag generator", "trending hashtags", "social media growth", "instagram tags"]
})

export default function InstagramHashtagsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Instagram Hashtag Generator","description":"Generate trending and popular Instagram hashtags for travel, food, tech, and more.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <InstagramHashtagsClient />
        </>
    )
}

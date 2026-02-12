import { constructMetadata } from "@/lib/seo"
import TweetToImageClient from "./client"

export const metadata = constructMetadata({
    title: "Fake Tweet Generator",
    description: "Create realistic fake tweets, replies, and threads. Perfect for memes and jokes. Customizable name, photo, and metrics.",
    keywords: ["fake tweet", "tweet generator", "twitter mockup", "social media simulator", "meme maker"]
})

export default function TweetToImagePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Fake Tweet Generator","description":"Create realistic fake tweets, replies, and threads. Perfect for memes and jokes. Customizable name, photo, and metrics.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <TweetToImageClient />
        </>
    )
}

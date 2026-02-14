import { constructMetadata } from "@/lib/seo"
import InstagramHashtagsClient from "./client"

export const metadata = constructMetadata({
    title: "Instagram Hashtag Generator",
    description: "Generate trending and popular Instagram hashtags for travel, food, tech, and more.",
    keywords: ["instagram hashtags", "hashtag generator", "trending hashtags", "social media growth", "instagram tags"]
})

export default function InstagramHashtagsPage() {
    return <InstagramHashtagsClient />
}

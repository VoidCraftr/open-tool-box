import { constructMetadata } from "@/lib/seo"
import YoutubeThumbnailClient from "./client"

export const metadata = constructMetadata({
    title: "YouTube Thumbnail Downloader",
    description: "Download high-quality thumbnails from any YouTube video. Supports HD, SD, and HQ resolutions.",
    keywords: ["youtube thumbnail", "thumbnail downloader", "youtube image", "youtube cover", "save thumbnail"]
})

export default function YoutubeThumbnailPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"YouTube Thumbnail Downloader","description":"Download high-quality thumbnails from any YouTube video. Supports HD, SD, and HQ resolutions.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <YoutubeThumbnailClient />
        </>
    )
}

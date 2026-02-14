import { constructMetadata } from "@/lib/seo"
import YoutubeThumbnailClient from "./client"

export const metadata = constructMetadata({
    title: "YouTube Thumbnail Downloader",
    description: "Download high-quality thumbnails from any YouTube video. Supports HD, SD, and HQ resolutions.",
    keywords: ["youtube thumbnail", "thumbnail downloader", "youtube image", "youtube cover", "save thumbnail"]
})

export default function YoutubeThumbnailPage() {
    return <YoutubeThumbnailClient />
}

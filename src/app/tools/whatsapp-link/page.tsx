import { constructMetadata } from "@/lib/seo"
import WhatsAppLinkClient from "./client"

export const metadata = constructMetadata({
    title: "WhatsApp Link Generator - Create Chat Links Instantly",
    description: "Generate direct WhatsApp links with pre-filled messages. Open chats without saving numbers. Perfect for businesses and social media.",
    keywords: ["whatsapp link generator", "create whatsapp link", "wa.me link", "whatsapp chat link", "whatsapp message link"]
})

export default function WhatsAppLinkPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"WhatsApp Link Generator","description":"Generate direct WhatsApp links with pre-filled messages. Open chats without saving numbers. Perfect for businesses and social media.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <WhatsAppLinkClient />
        </>
    )
}

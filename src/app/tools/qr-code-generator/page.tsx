import { constructMetadata } from "@/lib/seo"
import QrCodeGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "QR Code Generator - Free High-Quality QR Codes",
    description: "Create free custom QR codes for URLs, WiFi, and text. Download high-resolution PNGs with logo support. No expiration.",
    keywords: ["qr code generator", "free qr code", "create qr code", "qr code maker", "custom qr code", "wifi qr code"]
})

export default function QrCodeGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"QR Code Generator","description":"Create free custom QR codes for URLs, WiFi, and text. Download high-resolution PNGs with logo support. No expiration.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <QrCodeGeneratorClient />
        </>
    )
}

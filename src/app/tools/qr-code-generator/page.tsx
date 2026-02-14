import { constructMetadata } from "@/lib/seo"
import QrCodeGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "QR Code Generator - Free High-Quality QR Codes",
    description: "Create free custom QR codes for URLs, WiFi, and text. Download high-resolution PNGs with logo support. No expiration.",
    keywords: ["qr code generator", "free qr code", "create qr code", "qr code maker", "custom qr code", "wifi qr code"]
})

export default function QrCodeGeneratorPage() {
    return <QrCodeGeneratorClient />
}

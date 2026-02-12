import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
    title: "Free Online Image Editor | OpenToolBox",
    description: "Crop, resize, filter, and edit photos online. Free, private, and no signup needed.",
}

export default function ImageEditorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Free Online Image Editor | OpenToolBox","description":"Crop, resize, filter, and edit photos online. Free, private, and no signup needed.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <Client />
        </>
    )
}

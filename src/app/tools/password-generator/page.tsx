import { constructMetadata } from "@/lib/seo"
import PasswordGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "Secure Password Generator",
    description: "Create strong, random passwords locally in your browser. Customizable length and character sets for maximum security.",
    keywords: ["password generator", "secure password", "random password", "password strength"]
})

export default function PasswordGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Secure Password Generator","description":"Create strong, random passwords locally in your browser. Customizable length and character sets for maximum security.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <PasswordGeneratorClient />
        </>
    )
}

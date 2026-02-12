import { constructMetadata } from "@/lib/seo"
import PasswordStrengthClient from "./client"

export const metadata = constructMetadata({
    title: "Password Strength Checker - Test Password Security",
    description: "Check your password strength instantly. Estimate crack time and entropy. Secure client-side password testing.",
    keywords: ["password strength checker", "test password strength", "how strong is my password", "password security checker", "crack time estimator"]
})

export default function PasswordStrengthPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Password Strength Checker","description":"Check your password strength instantly. Estimate crack time and entropy. Secure client-side password testing.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <PasswordStrengthClient />
        </>
    )
}

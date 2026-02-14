import { constructMetadata } from "@/lib/seo"
import PasswordStrengthClient from "./client"

export const metadata = constructMetadata({
    title: "Password Strength Checker - Test Password Security",
    description: "Check your password strength instantly. Estimate crack time and entropy. Secure client-side password testing.",
    keywords: ["password strength checker", "test password strength", "how strong is my password", "password security checker", "crack time estimator"]
})

export default function PasswordStrengthPage() {
    return <PasswordStrengthClient />
}

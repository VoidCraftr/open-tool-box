import { constructMetadata } from "@/lib/seo"
import PasswordGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "Secure Password Generator",
    description: "Create strong, random passwords locally in your browser. Customizable length and character sets for maximum security.",
    keywords: ["password generator", "secure password", "random password", "password strength"]
})

export default function PasswordGeneratorPage() {
    return <PasswordGeneratorClient />
}

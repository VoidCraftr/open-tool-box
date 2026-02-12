import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About OpenToolBox - Free Privacy-First Online Tools",
    description: "Learn about OpenToolBox: our mission to provide free, fast, and privacy-focused online tools that process everything locally in your browser.",
    keywords: ["about opentoolbox", "privacy first tools", "client-side processing", "free online tools", "browser-based tools"],
    openGraph: {
        title: "About OpenToolBox - Free Privacy-First Online Tools",
        description: "Learn about OpenToolBox: our mission to provide free, fast, and privacy-focused online tools.",
        type: "website",
    }
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

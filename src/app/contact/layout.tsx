import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact Us - OpenToolBox",
    description: "Get in touch with the OpenToolBox team. Report bugs, suggest new tools, or just say hello. We typically respond within 24 hours.",
    keywords: ["contact opentoolbox", "report bugs", "suggest tools", "feedback", "support"],
    openGraph: {
        title: "Contact Us - OpenToolBox",
        description: "Get in touch with the OpenToolBox team. Report bugs, suggest new tools, or just say hello.",
        type: "website",
    }
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

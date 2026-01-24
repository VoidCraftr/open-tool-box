import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Metadata } from "next"
import { SocialPreview } from "./components/SocialPreview"
import { ContentSection } from "@/components/tools/ContentSection"

export const metadata: Metadata = {
    title: "Social Media Preview Tool | Check Open Graph & Meta Tags | OpenToolBox",
    description: "Preview how your website links look on Facebook, Twitter, LinkedIn, and Google. Debug Open Graph (OG) tags and SEO metadata instantly.",
    keywords: ["social media preview", "open graph checker", "twitter card validator", "facebook link preview", "seo preview tool"],
}

export default function SocialPreviewPage() {
    return (
        <ToolWrapper
            title="Social Media Link Preview"
            description="Visualize how your content appears on social networks and search engines."
            toolSlug="social-media-preview"
        >
            <SocialPreview />

            <ContentSection
                title="Social Media Intelligence & Open Graph Validation"
                description="The way your content appears on social networks and search engines directly impacts your click-through rates and brand perception. Our Social Media Preview utility helps you debug and optimize your Meta tags and Open Graph (OG) metadata instantly."
                features={[
                    "🌐 **Omni-Platform Previews**: Visualize how your links appear on Facebook, Twitter (X), LinkedIn, and Google Search simultaneously.",
                    "🔍 **Open Graph Debugger**: Instantly verify `og:title`, `og:image`, and `og:description` tags for any URL.",
                    "📈 **CTR-Optimization Workspace**: Test different titles and descriptions to see which generates the most compelling social card.",
                    "🚀 **Live Meta Tag Extraction**: Fetch and analyze current metadata from any live website to see exactly what bots see.",
                    "⚡ **Instant Feedback Loop**: Make changes to your site's meta tags and see the visual impact in real-time.",
                    "🎨 **Liquid UI Simulation**: High-fidelity recreations of social platform card styles for accurate visual testing."
                ]}
                howToUse={[
                    "Enter the URL of the website or specific page you wish to analyze in the input field.",
                    "Wait for the engine to crawl the live metadata and populate the preview cards.",
                    "Switch between platform tabs (Facebook, Twitter, LinkedIn) to see specific styling nuances.",
                    "Verify that the preview image (og:image) is correctly sized and high-resolution.",
                    "Check for any missing tags that might cause broken link previews on specific platforms."
                ]}
                faq={[
                    {
                        question: "Why does my preview image look blurry?",
                        answer: "Social platforms often crop or scale images. Ensure your Open Graph image is at least 1200x630 pixels for the best high-definition results."
                    },
                    {
                        question: "How long does it take for social platforms to update?",
                        answer: "Platforms like Facebook and Twitter cache link previews. Use their respective 'scraper' tools (included in our links) to force a refresh after you update your tags."
                    },
                    {
                        question: "Is this tool free for commercial use?",
                        answer: "Yes, OpenToolbox tools are 100% free and open-source, built to help developers and marketing professionals optimize their web presence."
                    }
                ]}
            />
        </ToolWrapper>
    )
}

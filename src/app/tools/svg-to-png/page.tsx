import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { Metadata } from "next"
import { SvgConverter } from "./components/SvgConverter"

export const metadata: Metadata = {
    title: "Free SVG to PNG/JPG Converter | High Resolution | OpenToolBox",
    description: "Convert SVG vector files to high-quality PNG or JPG images online. Customize scale and resolution. No upload to server - 100% client-side private.",
    keywords: ["svg to png", "svg to jpg", "convert svg", "vector converter", "high res svg export"],
}

export default function SvgConverterPage() {
    return (
        <ToolWrapper
            title="SVG to PNG Converter"
            description="Convert your SVG vectors to raster images (PNG/JPG) securely in your browser."
            toolSlug="svg-to-png"
        >
            <SvgConverter />

            <ContentSection
                title="Professional SVG to High-Resolution Raster Conversion"
                description="Converting SVG vectors to PNG or JPG images requires precision to maintain the crispness of your original artwork. Our tool allows you to scale your vectors by up to 400% (4x) to generate high-resolution raster images for print, web, and social media without the traditional blur of browser rescaling."
                features={[
                    "📐 **Infinite Scale Control**: Increase your SVG scale factor (2x, 4x, etc.) to export ultra-sharp, high-resolution PNGs.",
                    "🌈 **Transparency Support**: Export to PNG to maintain original alpha mathematical transparency.",
                    "🖼️ **JPG Optimization**: Instantly convert to high-quality JPG with automatic white background fill for standard compatibility.",
                    "🔒 **End-to-End Privacy**: Your vectors never reach our server. 100% client-side rendering ensures absolute data safety.",
                    "⚡ **High-Speed Rendering**: Near-instant conversion even for complex paths and heavy XML vectors.",
                    "✨ **Neuromorphic Glass UI**: A premium, distraction-free environment for professional designers and developers."
                ]}
                howToUse={[
                    "Upload your source **.svg** file using the select button or drag-and-drop zone.",
                    "Select your target export format: **PNG (Transparent)** or **JPG (White Background)**.",
                    "Adjust the **Scale Factor** slider (up to 4x) to determine the output resolution and dimensions.",
                    "Observe the real-time preview to verify the rendering accuracy of your vector paths.",
                    "Click **Download Image** to save the processed high-resolution raster file to your local device."
                ]}
                faq={[
                    {
                        question: "Why should I use a higher scale factor?",
                        answer: "SVGs are vectors and have no fixed resolution. By increasing the scale factor (e.g., 4x), you tell our engine to render the vector at 4 times its original size, resulting in a significantly sharper and larger PNG suitable for high-DPI displays or print."
                    },
                    {
                        question: "Does this support complex SVGs with filters or gradients?",
                        answer: "Yes. We use a high-performance browser-native rendering pipeline that supports the majority of modern SVG specifications, including linear and radial gradients."
                    },
                    {
                        question: "Is there any limit to the SVG file size?",
                        answer: "The tool can process very large vector files, though performance depends on your local hardware. Since no uploading is required, there are no network timeouts to worry about."
                    }
                ]}
            />
        </ToolWrapper>
    )
}

import { Metadata } from "next"
import ImageEditorClient from "./client"

export const metadata: Metadata = {
    title: "Free Online Image Editor - Edit Photos Online | Photo Editor",
    description: "Free online image editor with professional features. Crop, resize, add filters, text, shapes, and effects to photos. No download required. 100% browser-based photo editing tool.",
    keywords: [
        "image editor",
        "photo editor",
        "edit image online",
        "online photo editor free",
        "free image editor",
        "edit photos online free",
        "picture editor",
        "online image editor",
        "photo editing tool",
        "image editing software",
        "crop image online",
        "resize photo online",
        "add text to image",
        "photo filters online",
        "image effects online",
        "rotate image online",
        "flip image online",
        "add shapes to image",
        "online photo filters",
        "free photo editor online",
        "edit pictures online",
        "image manipulation tool",
        "web-based image editor"
    ]
}

export default function ImageEditorPage() {
    return <ImageEditorClient />
}

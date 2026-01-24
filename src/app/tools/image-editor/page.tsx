import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
    title: "Free Online Image Editor | OpenToolBox",
    description: "Crop, resize, filter, and edit photos online. Free, private, and no signup needed.",
}

export default function ImageEditorPage() {
    return <Client />
}

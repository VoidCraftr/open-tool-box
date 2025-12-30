"use client"

import dynamic from "next/dynamic"

const SignPdf = dynamic(
    () => import('./SignPdf').then(mod => mod.SignPdf),
    { ssr: false }
)

export function DynamicSignPdf() {
    return <SignPdf />
}

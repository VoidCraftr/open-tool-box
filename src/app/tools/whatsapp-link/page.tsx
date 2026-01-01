"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MessageCircle, ExternalLink, Copy, Check } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export default function WhatsAppLink() {
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [copied, setCopied] = useState(false)

    const cleanPhone = phone.replace(/[^0-9]/g, '')
    const whatsappUrl = `https://wa.me/${cleanPhone}${message ? `?text=${encodeURIComponent(message)}` : ''}`

    const copyToClipboard = () => {
        if (!cleanPhone) return
        navigator.clipboard.writeText(whatsappUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const openChat = () => {
        if (!cleanPhone) return
        window.open(whatsappUrl, '_blank')
    }

    return (
        <ToolWrapper
            title="WhatsApp Link Generator"
            description="Create a direct link to a WhatsApp chat with a pre-filled message."
            toolSlug="whatsapp-link"
        >
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Link</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Phone Number (with Country Code)</Label>
                            <Input
                                placeholder="e.g. 15551234567"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                            />
                            <p className="text-xs text-muted-foreground">Don&apos;t use +, spaces, or dashes. Just numbers.</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Pre-filled Message (Optional)</Label>
                            <Textarea
                                placeholder="Hello, I'm interested in..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Link</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {cleanPhone ? (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="p-4 bg-secondary rounded-md break-all text-sm font-mono">
                                    {whatsappUrl}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={openChat}>
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        Open Chat
                                    </Button>
                                    <Button variant="outline" className="w-full" onClick={copyToClipboard}>
                                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                        {copied ? "Copied!" : "Copy Link"}
                                    </Button>
                                    {/* Placeholder for QR Code if we had a library, currently just link */}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground text-center">
                                <MessageCircle className="w-12 h-12 mb-4 opacity-20" />
                                <p>Enter a phone number to generate a link.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </ToolWrapper>
    )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Upload, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Shuffle } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ContentSection } from "@/components/tools/ContentSection"
import { toPng } from "html-to-image"

export default function InstagramPostGeneratorClient() {
    const [username, setUsername] = useState("johndoe")
    const [location, setLocation] = useState("San Francisco, CA")
    const [caption, setCaption] = useState("Living my best life! 📸✨ #vibes #weekend")
    const [likes, setLikes] = useState("1,234")
    const [timeAgo, setTimeAgo] = useState("2 HOURS AGO")
    const [verified, setVerified] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [background, setBackground] = useState<string>("linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)")
    const [isGlass, setIsGlass] = useState(false)

    // UI State
    const [avatarUrl, setAvatarUrl] = useState<string>("")
    const [postImageUrl, setPostImageUrl] = useState<string>("")
    const [isDownloading, setIsDownloading] = useState(false)
    const [mounted, setMounted] = useState(false)

    const postRef = useRef<HTMLDivElement>(null)
    const avatarInputRef = useRef<HTMLInputElement>(null)
    const postImageInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleDownload = async () => {
        if (!postRef.current) return
        setIsDownloading(true)
        try {
            const dataUrl = await toPng(postRef.current, {
                cacheBust: true,
                backgroundColor: 'transparent',
            })

            const link = document.createElement("a")
            link.href = dataUrl
            link.download = `instagram-post-${username}-${Date.now()}.png`
            link.click()
        } catch (err) {
            console.error("Failed to generate image", err)
            if (err instanceof Error && err.message.includes("lab")) {
                alert("Browser compatibility issue with color formats. Please try a different browser or theme.")
            } else {
                alert("Failed to generate image. Please try again.")
            }
        } finally {
            setIsDownloading(false)
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => setter(e.target?.result as string)
            reader.readAsDataURL(file)
        }
    }

    const currentAvatar = avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
    const currentPostImage = postImageUrl || "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"

    // Background presets
    const backgrounds = [
        { name: "Insta Gradient", value: "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)" },
        { name: "Sunset", value: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)" },
        { name: "Minimal", value: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)" },
        { name: "Solid Black", value: "#000000" },
        { name: "Solid White", value: "#ffffff" },
        { name: "Transparent", value: "transparent" },
    ]

    if (!mounted) return null

    return (
        <ToolWrapper
            title="Fake Instagram Post Generator"
            description="Create realistic looking Instagram posts for social media planning or pranks."
            toolSlug="instagram-post-generator"
        >
            <div className="grid lg:grid-cols-[400px_1fr] gap-8">
                {/* Controls Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Details</CardTitle>
                            <CardDescription>Customize your Instagram post.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Post Image</Label>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" size="sm" onClick={() => postImageInputRef.current?.click()} className="w-full">
                                        <Upload className="w-4 h-4 mr-2" /> Upload Image
                                    </Button>
                                    <input ref={postImageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setPostImageUrl)} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Profile Picture</Label>
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarImage src={currentAvatar} />
                                        <AvatarFallback>{username[0]}</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" size="sm" onClick={() => avatarInputRef.current?.click()}>
                                        <Upload className="w-4 h-4 mr-2" /> Upload
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => {
                                        const randomSeed = Math.random().toString(36).substring(7)
                                        setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`)
                                    }}>
                                        <Shuffle className="w-4 h-4 mr-2" /> Random
                                    </Button>
                                    <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setAvatarUrl)} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Username</Label>
                                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Caption</Label>
                                <Textarea
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className="h-24 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Likes Count</Label>
                                    <Input value={likes} onChange={(e) => setLikes(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Time Ago</Label>
                                    <Input value={timeAgo} onChange={(e) => setTimeAgo(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <Label className="cursor-pointer" htmlFor="verified">Verified Badge</Label>
                                <Switch id="verified" checked={verified} onCheckedChange={setVerified} />
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <Label className="cursor-pointer" htmlFor="darkmode">Dark Mode</Label>
                                <Switch id="darkmode" checked={darkMode} onCheckedChange={setDarkMode} />
                            </div>

                            <div className="space-y-2 pt-2 border-t">
                                <Label>Background Effect</Label>
                                <div className="grid grid-cols-4 gap-2 mb-4">
                                    {backgrounds.map((bg, i) => (
                                        <button
                                            key={i}
                                            className={`w-full h-8 rounded border transition-all ${background === bg.value ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                            style={{ background: bg.value }}
                                            onClick={() => setBackground(bg.value)}
                                            title={bg.name}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="cursor-pointer" htmlFor="glass">Glass Effect (Blur)</Label>
                                    <Switch id="glass" checked={isGlass} onCheckedChange={setIsGlass} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Area */}
                <div className="space-y-6">
                    <div className="sticky top-6 space-y-6">
                        <div className="flex justify-center items-center bg-muted/20 border rounded-xl overflow-hidden min-h-[600px]">
                            <div
                                ref={postRef}
                                className="p-12 w-full flex justify-center items-center min-h-[500px] transition-all duration-300"
                                style={{ background: background }}
                            >
                                <div
                                    style={{
                                        // Override global CSS variables for safety
                                        display: 'block',
                                        ['--border' as any]: darkMode ? '#262626' : '#dbdbdb',
                                        ['--background' as any]: darkMode ? '#000000' : '#ffffff',
                                        ['--foreground' as any]: darkMode ? '#ffffff' : '#000000',

                                        // Glass effect styles
                                        ...(isGlass ? {
                                            backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                                            backdropFilter: 'blur(12px)',
                                            WebkitBackdropFilter: 'blur(12px)', // Safari support
                                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                                            border: '1px solid rgba(255, 255, 255, 0.18)',
                                        } : {})
                                    }}
                                    className={`w-full max-w-[400px] rounded-lg border shadow-xl overflow-hidden transition-all duration-200 ${!isGlass ? (
                                        darkMode ? "bg-black text-white border-neutral-800" : "bg-white text-black border-gray-200"
                                    ) : (
                                        darkMode ? "text-white border-white/10" : "text-black border-white/20"
                                    )
                                        }`}
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-3">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden border shrink-0 border-gray-200">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={currentAvatar}
                                                    alt={username}
                                                    crossOrigin="anonymous"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col text-xs leading-tight">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-semibold">{username}</span>
                                                    {verified && (
                                                        <svg viewBox="0 0 40 40" aria-label="Verified" fill="url(#verified-gradient)" className="w-3 h-3 text-blue-500 fill-blue-500">
                                                            <path d="M19.998 3.094 14.638 0l-5.36 3.094-5.36-3.094L3.92 6.188l-5.36 3.094 5.36 3.094L3.92 18.562l5.36 3.094 5.36-3.094 5.358 3.094 5.36-3.094L19.998 12.376 25.358 15.47l5.36-3.094 5.36 3.094L36.078 9.282l5.36-3.094-5.36-3.094 5.36-3.094L25.358 6.188l-5.36-3.094-5.36 3.094z"></path>
                                                            <path fill="#fff" d="M18.3 23.37L11.5 16.57l2.83-2.83 3.97 3.97 9.97-9.97 2.83 2.83L18.3 23.37z"></path>
                                                        </svg>
                                                    )}
                                                </div>
                                                {location && <span className={darkMode ? "text-gray-400" : "text-gray-500"}>{location}</span>}
                                            </div>
                                        </div>
                                        <MoreHorizontal className="w-5 h-5" />
                                    </div>

                                    {/* Image */}
                                    <div className="relative aspect-square bg-gray-100">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={currentPostImage}
                                            alt="Post content"
                                            crossOrigin="anonymous"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Actions */}
                                    <div className="p-3 pb-0">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-4">
                                                <Heart className="w-6 h-6 hover:text-gray-500 cursor-pointer" />
                                                <MessageCircle className="w-6 h-6 hover:text-gray-500 cursor-pointer -rotate-90" />
                                                <Send className="w-6 h-6 hover:text-gray-500 cursor-pointer -rotate-12" />
                                            </div>
                                            <Bookmark className="w-6 h-6 hover:text-gray-500 cursor-pointer" />
                                        </div>
                                        <div className="font-semibold text-sm mb-2">{likes} likes</div>
                                        <div className="text-sm">
                                            <span className="font-semibold mr-2">{username}</span>
                                            <span dangerouslySetInnerHTML={{ __html: caption.replace(/\n/g, '<br/>') }} />
                                        </div>
                                        <div className={`text-[10px] uppercase mt-2 mb-3 tracking-wide ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            {timeAgo}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Button onClick={handleDownload} className="w-full h-12 text-lg" disabled={isDownloading}>
                            {isDownloading ? <span className="animate-spin mr-2">⏳</span> : <Download className="mr-2 h-5 w-5" />}
                            {isDownloading ? "Generating Image..." : "Download Post"}
                        </Button>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <ContentSection
                        title="About Instagram Mockup Generator"
                        description="Our free fake Instagram post generator allows you to create authentic-looking Instagram posts in seconds. Perfect for social media managers, marketers, and content creators."
                        features={[
                            "Dark & Light Mode Support",
                            "Customizable Engagement Stats",
                            "Image Upload Support",
                            "Verified Badge Overlay"
                        ]}
                        faq={[
                            {
                                question: "Can I use this for pranks?",
                                answer: "Yes, you can use it for pranks, memes, or planning your feed layout."
                            },
                            {
                                question: "Are the images watermarked?",
                                answer: "No, all generated images are watermark-free."
                            }
                        ]}
                    />
                </div>
            </div>
        </ToolWrapper>
    )
}

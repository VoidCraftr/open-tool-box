"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Upload, ThumbsUp, MessageCircle, Share2, Globe, Users, Lock, MoreHorizontal, Shuffle, Smile } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ContentSection } from "@/components/tools/ContentSection"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toPng } from "html-to-image"

export default function FacebookPostGeneratorClient() {
    const [username, setUsername] = useState("Jane Smith")
    const [timeAgo, setTimeAgo] = useState("2h")
    const [caption, setCaption] = useState("Just finished a great hike! 🌲🏔️ #nature #weekend")
    const [privacy, setPrivacy] = useState<"public" | "friends" | "onlyme">("public")
    const [likes, setLikes] = useState("45")
    const [comments, setComments] = useState("12")
    const [shares, setShares] = useState("3")
    const [darkMode, setDarkMode] = useState(false)
    const [background, setBackground] = useState<string>("linear-gradient(to right, #8e2de2, #4a00e0)")
    const [isGlass, setIsGlass] = useState(false)

    // UI State
    const [avatarUrl, setAvatarUrl] = useState<string>("")
    const [postImageUrl, setPostImageUrl] = useState<string>("https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3")
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
            link.download = `facebook-post-${username}-${Date.now()}.png`
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

    // Background presets
    const backgrounds = [
        { name: "Facebook Blue", value: "linear-gradient(to right, #1877f2, #00c6ff)" },
        { name: "Purple Dream", value: "linear-gradient(to right, #8e2de2, #4a00e0)" },
        { name: "Modern", value: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)" },
        { name: "Solid Black", value: "#000000" },
        { name: "Solid White", value: "#ffffff" },
        { name: "Transparent", value: "transparent" },
    ]

    // Privacy Icon mapping
    const PrivacyIcon = {
        public: Globe,
        friends: Users,
        onlyme: Lock
    }[privacy]

    if (!mounted) return null

    return (
        <ToolWrapper
            title="Fake Facebook Post Generator"
            description="Create realistic looking Facebook posts for educational purposes or fun."
            toolSlug="facebook-post-generator"
        >
            <div className="grid lg:grid-cols-[400px_1fr] gap-8">
                {/* Controls Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Details</CardTitle>
                            <CardDescription>Customize your Facebook post.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Post Image (Optional)</Label>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" size="sm" onClick={() => postImageInputRef.current?.click()} className="w-full">
                                        <Upload className="w-4 h-4 mr-2" /> Upload Image
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setPostImageUrl("")} className="w-full text-red-500 hover:text-red-600">
                                        Remove Image
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

                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Time Ago</Label>
                                    <Input value={timeAgo} onChange={(e) => setTimeAgo(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Privacy</Label>
                                    <Select value={privacy} onValueChange={(v: any) => setPrivacy(v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Privacy" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="public">Public</SelectItem>
                                            <SelectItem value="friends">Friends</SelectItem>
                                            <SelectItem value="onlyme">Only Me</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Post Text</Label>
                                <Textarea
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className="h-24 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Likes</Label>
                                    <Input value={likes} onChange={(e) => setLikes(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Comments</Label>
                                    <Input value={comments} onChange={(e) => setComments(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Shares</Label>
                                    <Input value={shares} onChange={(e) => setShares(e.target.value)} />
                                </div>
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
                        <div className="flex justify-center items-center bg-muted/20 border rounded-xl overflow-hidden min-h-[400px]">
                            <div
                                ref={postRef}
                                className="p-12 w-full flex justify-center items-center min-h-[300px] transition-all duration-300"
                                style={{ background: background }}
                            >
                                <div
                                    style={{
                                        // Override global CSS variables for safety
                                        display: 'block',
                                        ['--border' as any]: darkMode ? '#3e4042' : '#dddfe2',
                                        ['--background' as any]: darkMode ? '#242526' : '#ffffff',
                                        ['--foreground' as any]: darkMode ? '#e4e6eb' : '#050505',
                                        fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',

                                        // Glass effect styles
                                        ...(isGlass ? {
                                            backgroundColor: darkMode ? 'rgba(36, 37, 38, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                                            backdropFilter: 'blur(12px)',
                                            WebkitBackdropFilter: 'blur(12px)', // Safari support
                                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                                            border: '1px solid rgba(255, 255, 255, 0.18)',
                                        } : {})
                                    }}
                                    className={`w-full max-w-[500px] rounded-lg shadow-sm border overflow-hidden transition-all duration-200 ${!isGlass ? (
                                        darkMode ? "bg-[#242526] text-[#e4e6eb] border-[#3e4042]" : "bg-white text-[#050505] border-[#dddfe2]"
                                    ) : (
                                        darkMode ? "text-[#e4e6eb] border-white/10" : "text-[#050505] border-white/20"
                                    )
                                        }`}
                                >
                                    {/* Header */}
                                    <div className="p-3 pb-2 flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden border shrink-0 border-gray-200">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={currentAvatar}
                                                    alt={username}
                                                    crossOrigin="anonymous"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col leading-tight">
                                                <span className="font-semibold text-[15px] hover:underline cursor-pointer">{username}</span>
                                                <div className={`flex items-center gap-1 text-[13px] ${darkMode ? "text-[#b0b3b8]" : "text-[#65676b]"}`}>
                                                    <span className="hover:underline cursor-pointer">{timeAgo}</span>
                                                    <span aria-hidden="true">·</span>
                                                    <PrivacyIcon className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                        <MoreHorizontal className={`w-5 h-5 ${darkMode ? "text-[#b0b3b8]" : "text-[#65676b]"}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="px-3 pb-3 text-[15px] whitespace-pre-wrap">
                                        {caption}
                                    </div>

                                    {/* Image */}
                                    {postImageUrl && (
                                        <div className="relative w-full bg-gray-100">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={postImageUrl}
                                                alt="Post content"
                                                crossOrigin="anonymous"
                                                className="w-full h-auto object-cover max-h-[600px]"
                                            />
                                        </div>
                                    )}

                                    {/* Stats */}
                                    <div className="px-3 py-2.5 flex items-center justify-between text-[15px] border-b" style={{ borderColor: darkMode ? '#3e4042' : '#ced0d4' }}>
                                        <div className={`flex items-center gap-1.5 ${darkMode ? "text-[#b0b3b8]" : "text-[#65676b]"}`}>
                                            <div className="flex -space-x-1">
                                                <div className="w-[18px] h-[18px] rounded-full bg-[#1877f2] flex items-center justify-center border-2 border-white z-20">
                                                    <ThumbsUp className="w-2.5 h-2.5 text-white fill-current" />
                                                </div>
                                            </div>
                                            <span className="hover:underline cursor-pointer">{likes}</span>
                                        </div>
                                        <div className={`flex gap-3 ${darkMode ? "text-[#b0b3b8]" : "text-[#65676b]"}`}>
                                            <span className="hover:underline cursor-pointer">{comments} comments</span>
                                            <span className="hover:underline cursor-pointer">{shares} shares</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="px-1 py-1 flex items-center justify-between">
                                        <Button variant="ghost" className={`flex-1 gap-2 h-9 text-[15px] font-medium ${darkMode ? "text-[#b0b3b8] hover:bg-[#3a3b3c]" : "text-[#65676b] hover:bg-gray-100"}`}>
                                            <ThumbsUp className="w-5 h-5" /> Like
                                        </Button>
                                        <Button variant="ghost" className={`flex-1 gap-2 h-9 text-[15px] font-medium ${darkMode ? "text-[#b0b3b8] hover:bg-[#3a3b3c]" : "text-[#65676b] hover:bg-gray-100"}`}>
                                            <MessageCircle className="w-5 h-5" /> Comment
                                        </Button>
                                        <Button variant="ghost" className={`flex-1 gap-2 h-9 text-[15px] font-medium ${darkMode ? "text-[#b0b3b8] hover:bg-[#3a3b3c]" : "text-[#65676b] hover:bg-gray-100"}`}>
                                            <Share2 className="w-5 h-5" /> Share
                                        </Button>
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
                        title="About Facebook Post Generator"
                        description="Design authentic Facebook posts for mockups, presentations, or social media strategy visualization. Customize every detail including reactions, comments, and shares."
                        features={[
                            "Public/Friends/Private Post Modes",
                            "Dark & Light Mode Support",
                            "Realistic Reactions & Stats",
                            "High-Quality Image Export"
                        ]}
                        faq={[
                            {
                                question: "Is this free?",
                                answer: "Yes, 100% free and open source."
                            },
                            {
                                question: "Do you save my images?",
                                answer: "No, all generation happens in your browser. Nothing is uploaded to our servers."
                            }
                        ]}
                    />
                </div>
            </div>
        </ToolWrapper>
    )
}

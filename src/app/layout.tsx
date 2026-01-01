import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Shell } from "@/components/layout/Shell";
import { CommandMenu } from "@/components/common/CommandMenu";
import { AuthProvider } from "@/components/premium/AuthProvider";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://opentoolbox.online"),
  title: {
    default: "OpenToolBox - Free Online Developer & Security Tools",
    template: "%s | OpenToolBox"
  },
  description: "A comprehensive collection of free, privacy-focused, and secure developer tools. JSON Formatter, Image Converter, Password Generator, and more. 100% Client-side privacy.",
  keywords: [
    // Brand
    "OpenToolbox", "free developers tools", "privacy focused tools", "secure online tools",

    // Developer
    "json formatter", "sql beautifier", "jwt decoder", "uuid generator", "cron schedule generator", "keycode finder",

    // Media & Images
    "image converter", "webp to png", "svg to png", "image resizer", "youtube thumbnail downloader",

    // PDF
    "image to pdf", "sign pdf online", "digital signature generator", "pdf tools",

    // Security
    "strong password generator", "password strength checker", "secure password",

    // Web Design
    "css box shadow generator", "css gradient generator", "css flexbox playground", "ui tools",

    // Social
    "social media preview", "whatsapp link generator", "instagram hashtags", "tweet to image",

    // General / Productivity
    "qr code generator", "unit converter", "word counter", "text diff viewer", "pomodoro timer",
    "loan calculator", "bmi calculator", "age calculator", "case converter", "text transformer"
  ],
  authors: [{ name: "VoidCraftr", url: "https://github.com/voidcraftr" }],
  creator: "VoidCraftr",
  publisher: "OpenToolBox",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://opentoolbox.online",
    title: "OpenToolBox - Free Online Developer & Security Tools",
    description: "Secure, fast, and free online tools for developers and creators. No server-side processing.",
    siteName: "OpenToolBox",
  },
  alternates: {
    canonical: './',
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenToolBox - Free Online Developer Tools",
    description: "Secure, fast, and free online tools for developers and creators.",
    creator: "@voidcraftr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CommandMenu />
            <Shell>
              {children}
            </Shell>
            <MicrosoftClarity />
            <GoogleAnalytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

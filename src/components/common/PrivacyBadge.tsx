"use client";

import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function PrivacyBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-primary/20 text-primary text-sm font-medium animate-fade-in"
        >
            <ShieldCheck className="h-4 w-4" />
            <span>100% Client-Side - Your data never leaves your device</span>
        </motion.div>
    );
}

"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { stripHtml } from "@/lib/utils";
import { Settings } from "@/lib/api";

export const StorySection = ({ settings }: { settings: Settings | null }) => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
            {/* Background Effects - Dark Mode */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] hidden dark:block pointer-events-none opacity-40" />
             
            {/* Background Effects - Light Mode */}
            <div className="absolute inset-0 dark:hidden pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl mx-auto text-center relative py-12"
                >
                    {/* Glowing Backdrop */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-[80px] rounded-full pointer-events-none -z-10" />

                    <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white">
                            {settings?.about_us_title || "Our Story"}
                        </span>
                    </h2>
                    
                    <div className="relative z-10">
                        <Quote className="inline-block w-12 h-12 text-blue-500 mb-6 opacity-80" />
                        <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-200 leading-normal font-light">
                            {stripHtml(settings?.about_us_description)}
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-12 rounded-full opacity-50" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

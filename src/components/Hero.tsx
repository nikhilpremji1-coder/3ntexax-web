"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DynamicParticles from "./DynamicParticles";
import { Settings } from "@/lib/api";
import { stripHtml } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Hero = ({ settings }: { settings: Settings | null }) => {
    if (!settings?.hero_enabled) {
        return null;
    }

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <DynamicParticles />
            </div>

            <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-5xl font-bold mb-8 mx-auto max-w-4xl px-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 animate-gradient-x">
                        {settings?.hero_title || "Reimagining Real Estate"}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                        {stripHtml(settings?.hero_subtitle) || "Experience the future of property management with 3N TEXAS. We provide innovative solutions for modern living."}
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                >
                    <Link
                        href="/portfolio"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-medium text-white shadow-lg transition-transform hover:bg-blue-700 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                        Explore Portfolio
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-gray-200 bg-white px-8 text-sm font-medium text-slate-900 shadow-sm transition-transform hover:bg-gray-50 hover:scale-105 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-white/10 dark:text-white dark:border-white/20 dark:hover:bg-white/20"
                    >
                        Contact Us
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

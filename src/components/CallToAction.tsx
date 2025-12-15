"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Settings } from "@/lib/api";

export const CallToAction = ({ settings }: { settings: Settings | null }) => {
    if (!settings?.call_to_action_enabled) {
        return null;
    }

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900 -z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 opacity-90 -z-10" />

            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Ready to Transform Your Portfolio?
                    </h2>
                    <p className="text-lg text-blue-100 leading-relaxed">
                        Join hundreds of satisfied clients who have elevated their real estate game with 3N TEXAS.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex h-14 items-center justify-center rounded-full bg-white text-blue-600 dark:bg-blue-500 dark:text-white px-8 text-lg font-bold shadow-2xl transition-all hover:bg-gray-50 dark:hover:bg-blue-600"
                        >
                            Get Started Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

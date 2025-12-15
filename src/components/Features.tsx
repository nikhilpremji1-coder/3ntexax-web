"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react"; // Fallback icon
import { Settings } from "@/lib/api";
import { stripHtml } from "@/lib/utils";
import Image from "next/image";

export const Features = ({ settings }: { settings: Settings | null }) => {
    const features = settings?.why_choose_us_items || [];

    if (!settings?.why_choose_us_enabled) {
        return null;
    }

    return (
        <section className="relative py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
                {/* Grid Pattern: Dark Mode */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 hidden dark:block" />
                 {/* Grid Pattern: Light Mode */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:hidden" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-20 space-y-4">

                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight [&_b]:text-transparent [&_b]:bg-clip-text [&_b]:bg-gradient-to-r [&_b]:from-blue-600 [&_b]:to-purple-600 dark:[&_b]:from-blue-400 dark:[&_b]:to-purple-400 [&_strong]:text-transparent [&_strong]:bg-clip-text [&_strong]:bg-gradient-to-r [&_strong]:from-blue-600 [&_strong]:to-purple-600 dark:[&_strong]:from-blue-400 dark:[&_strong]:to-purple-400 [&_b]:font-inherit [&_strong]:font-inherit"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        dangerouslySetInnerHTML={{ __html: settings?.why_choose_us_title || "Why Choose <b>3N TEXAS</b>" }}
                    />
                    <motion.div
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed [&_b]:text-slate-900 dark:[&_b]:text-white [&_strong]:text-slate-900 dark:[&_strong]:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        dangerouslySetInnerHTML={{ __html: settings?.why_choose_us_description || "We combine expertise with innovation to deliver unparalleled real estate services." }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.length > 0 ? (
                        features.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                className="group relative p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/30 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl dark:shadow-none"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                                
                                <div className="relative z-10 text-center">
                                    <div className="mb-6 inline-flex items-center justify-center p-4 rounded-2xl bg-blue-50 dark:bg-transparent dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-all duration-300 shadow-none dark:shadow-lg dark:shadow-blue-900/20">
                                        {feature.icon ? (
                                            <Image src={feature.icon} alt={feature.title} width={32} height={32} className="w-8 h-8 object-contain" />
                                        ) : (
                                            <Building2 className="w-8 h-8" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <div 
                                        className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors [&_b]:text-slate-900 dark:[&_b]:text-white [&_strong]:text-slate-900 dark:[&_strong]:text-white"
                                        dangerouslySetInnerHTML={{ __html: feature.description }}
                                    />
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-4 text-center text-slate-500 italic">No features configured.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

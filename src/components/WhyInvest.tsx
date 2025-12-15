"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Settings } from "../lib/api";
import Image from "next/image";

export const WhyInvest = ({ settings }: { settings: Settings | null }) => {
    if (!settings?.why_like_real_estate_enabled) {
        return null;
    }

    return (
        <section className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
             {/* Background Effects - Dark Mode */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] hidden dark:block" />
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none hidden dark:block">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            {/* Background Effects - Light Mode */}
            <div className="absolute inset-0 dark:hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">

                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight [&_b]:text-transparent [&_b]:bg-clip-text [&_b]:bg-gradient-to-r [&_b]:from-blue-600 [&_b]:to-purple-600 dark:[&_b]:from-blue-400 dark:[&_b]:to-purple-400 [&_b]:font-inherit"
                        dangerouslySetInnerHTML={{ __html: settings?.why_like_real_estate_title || "WHY WE LIKE <b>REAL ESTATE</b>" }}
                    />
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
                        dangerouslySetInnerHTML={{ __html: settings?.why_like_real_estate_description || "Real estate stands as a cornerstone of wealth creation, offering a unique combination of stability and growth." }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {settings?.why_like_real_estate_items && settings.why_like_real_estate_items.length > 0 ? (
                        settings.why_like_real_estate_items.map((benefit, index) => (
                            <motion.div
                                key={benefit.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                className="group relative p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/30 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-sm dark:shadow-none hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                                
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-blue-50 dark:bg-transparent dark:bg-gradient-to-br dark:from-blue-500 dark:to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-white shadow-none dark:shadow-lg dark:shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                        {benefit.icon ? (
                                            <Image src={benefit.icon} alt={benefit.title} width={28} height={28} className="w-7 h-7 object-contain" />
                                        ) : (
                                            <TrendingUp className="w-7 h-7" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                                        {benefit.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-4 text-center text-slate-500 italic">No items found.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

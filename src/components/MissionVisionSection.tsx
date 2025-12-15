"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";
import { stripHtml } from "@/lib/utils";
import { Settings } from "@/lib/api";

export const MissionVisionSection = ({ settings }: { settings: Settings | null }) => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Mission */}
                    <motion.div 
                        className="group p-10 md:p-12 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Watermark Number */}
                        <div className="absolute -bottom-4 -right-4 text-[12rem] font-black text-slate-100 dark:text-slate-800 opacity-50 select-none pointer-events-none leading-none group-hover:scale-110 transition-transform duration-700 ease-out">
                            01
                        </div>
                        
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                {settings?.mission_title || "Our Mission"}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {stripHtml(settings?.mission_description)}
                            </p>
                        </div>
                    </motion.div>

                    {/* Vision */}
                    <motion.div 
                        className="group p-10 md:p-12 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Watermark Number */}
                        <div className="absolute -bottom-4 -right-4 text-[12rem] font-black text-slate-100 dark:text-slate-800 opacity-50 select-none pointer-events-none leading-none group-hover:scale-110 transition-transform duration-700 ease-out">
                            02
                        </div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Lightbulb className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                {settings?.vision_title || "Our Vision"}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {stripHtml(settings?.vision_description)}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

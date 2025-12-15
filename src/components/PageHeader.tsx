"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
    title: string;
    breadcrumb: string;
}

export const PageHeader = ({ title, breadcrumb }: PageHeaderProps) => {
    return (
        <section className="relative py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
            {/* Background Gradients (Removed to match Navbar color exactly) */}
            {/* <div className="absolute inset-0 bg-blue-500/5 dark:bg-gradient-to-r dark:from-blue-900/50 dark:via-slate-900/50 dark:to-purple-900/50 opacity-100" /> */}
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:opacity-30 opacity-10 pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center space-x-2 text-sm text-slate-600 dark:text-slate-300 mb-4"
                >
                    <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-blue-400 font-medium">{breadcrumb}</span>
                </motion.div>

                <motion.h1 
                    className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {title}
                </motion.h1>
            </div>
        </section>
    );
};

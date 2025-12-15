"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Settings } from "@/lib/api";
import { stripHtml } from "@/lib/utils";
import { NewsletterForm } from "@/components/NewsletterForm";

const Footer = ({ settings }: { settings: Settings | null }) => {
    // Client-side fetch removed, using props


    return (
        <footer className="relative bg-slate-100 dark:bg-slate-950 pt-32 pb-8 transition-colors duration-300 overflow-hidden">
             {/* Premium Layered Wave Top Decoration */}
             <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px] transform rotate-180">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white dark:fill-slate-900"></path>
                    <path d="M0,0V15.81C13,36.92,46.5,64.77,62,87c35.45,50.85,113.62,56.7,169,32.48C281.41,96.65,223,60.67,263,33.06c40.09-27.69,134.78,14.77,152,19.34,60.2,16,134.13,11.2,185-18.17,50.22-29,102-45.72,137-33.42,35.63,12.51,60.9,79.13,135,53.33,73.11-25.44,113-91.13,186-77.93,17.06,3.08,102.32,29.15,142,39.08V0Z" className="fill-white dark:fill-slate-900"></path>
                </svg>
             </div>
             
             {/* Background Effects */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] hidden dark:block pointer-events-none opacity-20" />
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:hidden opacity-40" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Section 1: Logo & Description */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Link href="/" className="inline-block">
                                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    3N TEXAS
                                </span>
                            </Link>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
                                {stripHtml(settings?.footer_description) || "Elevating real estate experiences with premium solutions. We build the future of property management."}
                            </p>
                        </div>
                        
                        {/* Contact Info */}
                        <div className="space-y-3">
                            {settings?.contact_info?.email && (
                                <a href={`mailto:${settings.contact_info.email}`} className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-500/10 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span>{settings.contact_info.email}</span>
                                </a>
                            )}
                            {settings?.contact_info?.phone && (
                                <a href={`tel:${settings.contact_info.phone}`} className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-500/10 transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span>{settings.contact_info.phone}</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Section 2: Nav Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/" label="Home" />
                            <FooterLink href="/about" label="About Us" />
                            <FooterLink href="/portfolio" label="Our Portfolio" />
                            <FooterLink href="/contact" label="Contact Support" />
                        </ul>
                    </div>

                    {/* Section 3: Subscribe Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">Stay Updated</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                            Subscribe to our newsletter for the latest updates, exclusive offers, and real estate insights.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>

                {/* Divider with Gradient Line */}
                <div className="relative pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                     <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

                    {/* Copyright */}
                    <p className="text-slate-500 dark:text-slate-500 text-sm">
                        {settings?.copyright_text || `\u00A9 ${new Date().getFullYear()} 3N TEXAS. All rights reserved.`}
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-6">
                        {settings?.social_links?.facebook && <SocialLink href={settings.social_links.facebook} icon={<Facebook className="w-5 h-5" />} label="Facebook" />}
                        {settings?.social_links?.twitter && <SocialLink href={settings.social_links.twitter} icon={<Twitter className="w-5 h-5" />} label="Twitter" />}
                        {settings?.social_links?.instagram && <SocialLink href={settings.social_links.instagram} icon={<Instagram className="w-5 h-5" />} label="Instagram" />}
                        {settings?.social_links?.linkedin && <SocialLink href={settings.social_links.linkedin} icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ href, label }: { href: string; label: string }) => (
    <li>
        <Link
            href={href}
            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 flex items-center group"
        >
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                {label}
            </span>
        </Link>
    </li>
);

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <motion.a
        href={href}
        whileHover={{ scale: 1.2, rotate: 5 }}
        className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
    >
        {icon}
    </motion.a>
);

export default Footer;

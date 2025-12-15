"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useTheme } from "next-themes";

import { Settings } from "@/lib/api";

const Header = ({ settings }: { settings: Settings | null }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine logo to display based on theme and settings
    const logoSrc = mounted 
        ? (theme === 'dark' ? settings?.site_logo_dark : settings?.site_logo) || settings?.site_logo // fallback to default logo if dark logo missing
        : settings?.site_logo; // default for SSR/initial render

    const siteName = settings?.site_name || "3N TEXAS";

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-20 relative">
                    {/* Logo */}
                    <div className="flex-shrink-0 z-10">
                        <Link href="/" className="flex items-center group">
                            {logoSrc ? (
                                <img src={logoSrc} alt={siteName} className="h-10 w-auto object-contain" />
                            ) : (
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                                    {siteName}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Desktop Navigation (Centered) */}
                    <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <NavLinks />
                    </nav>

                    {/* Right Side Actions: Theme Toggle & Mobile Menu */}
                    <div className="flex items-center gap-4 z-10">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            <NavLinks mobile onClick={() => setIsOpen(false)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

import { usePathname } from "next/navigation";

const NavLinks = ({ mobile = false, onClick }: { mobile?: boolean; onClick?: () => void }) => {
    const pathname = usePathname();
    
    const links = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Contact", href: "/contact" },
    ];

    const baseClasses = "font-medium transition-colors duration-200 relative group";
    const mobileClasses = "block px-3 py-2 rounded-md text-base hover:bg-blue-50 dark:hover:bg-slate-800";
    const desktopClasses = "hover:text-blue-600";

    return (
        <>
            {links.map((link) => {
                const isActive = pathname === link.href;
                
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            baseClasses,
                            mobile ? mobileClasses : desktopClasses,
                            isActive 
                                ? (mobile ? "bg-blue-50 dark:bg-slate-800 text-blue-600 font-bold" : "text-blue-600 font-bold") 
                                : "text-slate-600 dark:text-slate-300"
                        )}
                        onClick={onClick}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {link.name}
                        {!mobile && (
                            <span 
                                className={clsx(
                                    "absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300",
                                    isActive ? "w-full" : "w-0 group-hover:w-full"
                                )}
                            />
                        )}
                    </Link>
                );
            })}
        </>
    );
};

export default Header;

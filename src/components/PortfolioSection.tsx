"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Settings, Project, getProjects } from "@/lib/api";
import { Skeleton } from "@/components/Skeleton";

export const PortfolioSection = ({ settings }: { settings: Settings | null }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [fetchingMore, setFetchingMore] = useState(false);

    if (!settings?.portfolio_enabled) {
        return null;
    }

    useEffect(() => {
        loadInitialProjects();
    }, []);

    const loadInitialProjects = async () => {
        try {
            const data = await getProjects(1);
            setProjects(data.data);
            setPage(1);
            setHasMore(data.next_page_url !== null);
            setLoading(false);
        } catch (error) {
            console.error("Failed to load projects", error);
            setLoading(false);
        }
    };

    const loadMoreProjects = async () => {
        if (!hasMore || fetchingMore) return;

        setFetchingMore(true);
        try {
            const nextPage = page + 1;
            const data = await getProjects(nextPage);
            setProjects((prev) => [...prev, ...data.data]);
            setPage(nextPage);
            setHasMore(data.next_page_url !== null);
        } catch (error) {
            console.error("Failed to load more projects", error);
        } finally {
            setFetchingMore(false);
        }
    };

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

            // Infinite scroll trigger: when close to right end (within 200px)
            if (scrollLeft + clientWidth >= scrollWidth - 200) {
                loadMoreProjects();
            }
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        // Add scroll listener to the ref element
        const currentRef = scrollContainerRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScroll);
        }
        return () => {
            window.removeEventListener('resize', checkScroll);
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkScroll);
            }
        };
    }, [hasMore, fetchingMore, page]); // Re-run if hasMore or fetchingMore changes to re-evaluate scroll conditions

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
    };

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 w-full max-w-[1400px]">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-6 gap-4">
                    <div className="space-y-2 max-w-2xl text-center md:text-left">
                         <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider text-[10px] uppercase"
                        >
                            {settings?.portfolio_description || "Our Portfolio"}
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight"
                            dangerouslySetInnerHTML={{ __html: settings?.portfolio_title || 'Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Projects</span>' }}
                        />
                        <motion.div 
                            initial={{ opacity: 0, width: 0 }}
                            whileInView={{ opacity: 1, width: "100px" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                            className="h-2 md:mx-0 mx-auto mt-2"
                        >
                             <svg width="100%" height="100%" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <path d="M2 5C20 5 30 2 50 2C70 2 80 8 98 8" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="gradient" x1="2" y1="5" x2="98" y2="5" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#2563EB" />
                                        <stop offset="1" stopColor="#9333EA" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-4">
                         {/* Scroll Arrows */}
                         <div className="hidden md:flex items-center gap-2">
                            <button 
                                onClick={scrollLeft}
                                disabled={!canScrollLeft}
                                className={`p-2 rounded-full border border-slate-200 dark:border-white/10 transition-all duration-300 cursor-pointer ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-600 dark:text-slate-300'}`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={scrollRight}
                                disabled={!canScrollRight}
                                className={`p-2 rounded-full border border-slate-200 dark:border-white/10 transition-all duration-300 cursor-pointer ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-600 dark:text-slate-300'}`}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scrollable Container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide px-4"
                    style={{ 
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {loading && projects.length === 0 ? (
                         // Skeleton loading state
                         Array.from({ length: 4 }).map((_, i) => (
                             <div key={i} className="min-w-[220px] md:min-w-[280px] aspect-[3/4] bg-neutral-900 rounded-xl border border-white/5 relative overflow-hidden flex-shrink-0">
                                 <Skeleton className="absolute inset-0 w-full h-full" />
                             </div>
                         ))
                    ) : (
                        projects.map((item, index) => (
                            <motion.div
                                key={`${item.id}-${index}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="min-w-[220px] md:min-w-[280px] snap-center group relative rounded-xl overflow-hidden aspect-[3/4] flex-shrink-0 cursor-pointer bg-neutral-900 border border-white/5"
                            >
                                <div className="absolute inset-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 220px, 280px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                                </div>
    
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/20 backdrop-blur-sm">
                                                {item.category?.title || 'Uncategorized'}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                                            {item.title}
                                        </h3>
    
                                        <div className="flex items-center gap-2 text-neutral-400 text-sm">
                                            <MapPin className="w-4 h-4" />
                                            <span>{item.location}</span>
                                            {/* <span className="w-1 h-1 rounded-full bg-neutral-600" />
                                            <span>{item.year || new Date(item.created_at).getFullYear()}</span> */}
                                        </div>
                                        
                                        <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                            <a 
                                                href={item.external_link || '#'} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-white font-medium"
                                            >
                                                View Project <ArrowRight className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                    {fetchingMore && (
                        <div className="min-w-[220px] md:min-w-[280px] aspect-[3/4] bg-neutral-900 rounded-xl border border-white/5 relative overflow-hidden flex-shrink-0">
                            <Skeleton className="absolute inset-0 w-full h-full" />
                        </div>
                    )}
                </div>

                {/* View All Button - Bottom Center */}
                <div className="flex justify-center mt-8">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link 
                            href="/portfolio" 
                            className="group flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-white/10 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 rounded-full transition-all duration-300 backdrop-blur-sm border border-slate-200 dark:border-white/10 hover:shadow-lg hover:shadow-blue-500/20 text-xs text-slate-900 dark:text-white"
                        >
                            <span className="font-medium">View All Projects</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

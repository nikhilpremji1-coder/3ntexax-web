"use client";

import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project, getProjects } from "@/lib/api";
import { PageHeader } from "@/components/PageHeader";

import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/Skeleton";
import { ProjectCard } from "@/components/ProjectCard";

export default function PortfolioClient() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [fetchingMore, setFetchingMore] = useState(false);
    
    // Observer for infinite scroll
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !fetchingMore && !loading) {
                    loadMoreProjects();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, fetchingMore, loading]);

    const loadInitialData = async () => {
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
    
    return (
        <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-900">
            <PageHeader title="Our Portfolio" breadcrumb="Portfolio" />

            <section className="py-20 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((item, index) => (
                        <ProjectCard key={`${item.id}-${index}`} item={item} index={index} />
                    ))}
                </div>
                
                {/* Infinite Scroll Loader */}
                <div ref={observerTarget} className="py-12">
                     {fetchingMore && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                             {Array.from({ length: 3 }).map((_, i) => (
                                 <div key={i} className="h-[400px] bg-neutral-900 rounded-2xl border border-white/5 relative overflow-hidden">
                                     <Skeleton className="absolute inset-0 w-full h-full" />
                                 </div>
                             ))}
                        </div>
                     )}
                </div>
            </section>
        </div>
    );
}

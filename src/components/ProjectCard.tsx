"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { Project } from "@/lib/api";
import { memo } from "react";

interface ProjectCardProps {
    item: Project;
    index: number;
}

const ProjectCard = memo(({ item, index }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px" }} // Added margin to trigger earlier
            transition={{ delay: (index % 10) * 0.05 }} // Reduce delay calculation for appended items
            className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/5"
        >
            {/* Image & Overlay */}
            <div className="absolute inset-0">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    quality={75} // Slight optimization
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/20 backdrop-blur-sm">
                            {item.category?.title || 'Uncategorized'}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {item.title}
                    </h3>

                    <div className="flex items-center gap-2 text-neutral-400 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
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
    );
});

ProjectCard.displayName = "ProjectCard";

export { ProjectCard };

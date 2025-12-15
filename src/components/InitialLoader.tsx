"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import DynamicParticles from "./DynamicParticles";

const InitialLoader = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Suppress console logs if in production env
        if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_APP_ENV === 'production') {
            const noop = () => {};
            console.log = noop;
            console.info = noop;
            console.warn = noop;
            // console.error = noop; // Keep errors for critical debugging if needed, or suppress too if requested. 
            // User said "nessey data not show", usually implies logs/info.
        }

        // Simulate data fetching or critical resource loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5 seconds loading time

        return () => clearTimeout(timer);
    }, []);

    // Prevent hydration mismatch by only rendering the loader on the client
    if (!isMounted) {
        return <>{children}</>;
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        className={clsx(
                            "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden",
                            "bg-white dark:bg-black"
                        )}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        {/* Background Gradients (Same as Hero) */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
                            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700" />
                        </div>

                        {/* Interactive Particles Layer */}
                        <DynamicParticles />

                        <motion.div
                            className="relative z-10 flex flex-col items-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Animated Logo Text */}
                            <motion.h1
                                className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                    scale: [1, 1.02, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                style={{ backgroundSize: "200% auto" }}
                            >
                                3N TEXAS
                            </motion.h1>

                            {/* Progress Bar Container */}
                            <div className="w-64 h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-sm">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                />
                            </div>

                            <motion.p
                                className="mt-6 text-sm text-gray-400 dark:text-gray-500 font-medium tracking-wide uppercase"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, y: [0, -5, 0] }}
                                transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
                            >
                                Loading Experience
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content (hidden/locked while loading) */}
            <div className={isLoading ? "h-screen overflow-hidden" : ""}>
                {children}
            </div>
        </>
    );
};

export default InitialLoader;

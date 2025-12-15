"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { subscribe } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export const NewsletterForm = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");
        setErrors(null);
        setMessage("");

        try {
            await subscribe(email);
            setStatus("success");
            setMessage("Subscribed successfully!");
            setEmail("");
        } catch (error: any) {
            setStatus("error");
            if (error.errors) {
                // Laravel validation errors
                setErrors(error.errors);
                // Use the generic message or the specific email error if available
                setMessage(error.message || error.errors.email?.[0] || "Subscription failed.");
            } else {
                setMessage(error.message || "Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <form className="relative flex flex-col space-y-2" onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={`w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500
                            ${status === 'error' ? 'border-red-500/50 focus:border-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20'}
                        `}
                    />
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 rounded-lg hover:bg-blue-500 text-white font-medium flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide shadow-lg shadow-blue-600/20"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Subscribe"}
                    </motion.button>
                </div>

                <AnimatePresence mode="wait">
                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-green-400 text-sm mt-2 font-medium"
                        >
                            <CheckCircle className="w-4 h-4" />
                            <span>{message}</span>
                        </motion.div>
                    )}

                    {status === "error" && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-2 text-red-400 text-sm mt-2 font-medium"
                        >
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <div className="flex flex-col gap-1">
                                {errors?.email?.map((err: string, i: number) => (
                                    <span key={i}>{err}</span>
                                )) || <span>{message}</span>}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
};

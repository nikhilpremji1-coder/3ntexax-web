"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { submitLead } from "@/lib/api";

export const ContactForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [globalError, setGlobalError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error for this field when user types
        if (fieldErrors?.[e.target.name]) {
            setFieldErrors({ ...fieldErrors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");
        setFieldErrors(null);
        setGlobalError("");
        
        try {
            await submitLead(formData);
            setStatus("success");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error: any) {
            setStatus("error");
            if (error.errors) {
                setFieldErrors(error.errors);
            } else {
                setGlobalError(error.message || "Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-bold mb-6 dark:text-white">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-black border focus:outline-none transition-colors dark:text-white
                            ${fieldErrors?.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-zinc-800 focus:border-blue-500'}
                        `}
                    />
                    {fieldErrors?.name && <p className="text-red-500 text-sm mt-1">{fieldErrors.name[0]}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-black border focus:outline-none transition-colors dark:text-white
                            ${fieldErrors?.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-zinc-800 focus:border-blue-500'}
                        `}
                    />
                    {fieldErrors?.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email[0]}</p>}
                </div>
                <div>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number (Optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-black border focus:outline-none transition-colors dark:text-white
                            ${fieldErrors?.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-zinc-800 focus:border-blue-500'}
                        `}
                    />
                    {fieldErrors?.phone && <p className="text-red-500 text-sm mt-1">{fieldErrors.phone[0]}</p>}
                </div>
                <div>
                    <textarea
                        name="message"
                        placeholder="Your Message (Max 255 chars)"
                        maxLength={255}
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-black border focus:outline-none transition-colors dark:text-white resize-none
                            ${fieldErrors?.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-zinc-800 focus:border-blue-500'}
                        `}
                    ></textarea>
                     {fieldErrors?.message && <p className="text-red-500 text-sm mt-1">{fieldErrors.message[0]}</p>}
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
                </button>

                {status === "success" && (
                    <p className="text-green-600 text-center text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded">
                        Message sent successfully! We'll get back to you soon.
                    </p>
                )}
                {globalError && (
                    <p className="text-red-600 text-center text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">
                        {globalError}
                    </p>
                )}
            </form>
        </div>
    );
};

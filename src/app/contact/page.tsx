import { getSettings } from "@/lib/api";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";

import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSettings();
    const seo = settings?.seo?.contact;

    return {
        title: seo?.title || 'Contact Us - 3N TEXAS',
        description: seo?.description || 'Get in touch with 3N TEXAS for inquiries and support.',
        keywords: seo?.keywords?.split(',').map(k => k.trim()) || [],
        openGraph: {
            images: seo?.image ? [seo.image] : [],
        },
    };
}

export default async function ContactPage() {
    const settings = await getSettings();

    // Helper to safely extract URL if user pasted full iframe code
    const getMapUrl = (url: string | undefined) => {
        if (!url) return null;
        if (url.includes("<iframe")) {
            const match = url.match(/src="([^"]+)"/);
            return match ? match[1] : null;
        }
        return url;
    };

    const mapUrl = getMapUrl(settings?.contact_info.map_url);

    return (
        <div className="pt-20">
             <PageHeader 
                title={settings?.seo?.contact?.title || "Contact Us"} 
                breadcrumb="Contact" 
            />

            <section className="py-20 bg-white dark:bg-black">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold mb-8 dark:text-white">Get in Touch</h2>
                            
                            {settings?.contact_info.email && (
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg dark:text-white">Email Us</h3>
                                        <a href={`mailto:${settings.contact_info.email}`} className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                                            {settings.contact_info.email}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {settings?.contact_info.phone && (
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg dark:text-white">Call Us</h3>
                                        <a href={`tel:${settings.contact_info.phone}`} className="text-gray-600 dark:text-gray-400 hover:text-purple-500">
                                            {settings.contact_info.phone}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {settings?.contact_info.address && (
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg dark:text-white">Visit Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                            {settings.contact_info.address}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Social Media Links */}
                            {(settings?.social_links?.facebook || settings?.social_links?.twitter || settings?.social_links?.instagram || settings?.social_links?.linkedin) && (
                                <div className="pt-4">
                                     <h3 className="font-semibold text-lg dark:text-white mb-4">Follow Us</h3>
                                     <div className="flex gap-4">
                                         {settings?.social_links?.facebook && (
                                             <a 
                                                href={settings.social_links.facebook} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="p-3 bg-blue-50 dark:bg-slate-800 text-blue-600 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
                                                aria-label="Facebook"
                                             >
                                                 <Facebook className="w-5 h-5" />
                                             </a>
                                         )}
                                         {settings?.social_links?.twitter && (
                                             <a 
                                                href={settings.social_links.twitter} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="p-3 bg-sky-50 dark:bg-slate-800 text-sky-500 rounded-lg hover:bg-sky-100 dark:hover:bg-slate-700 transition-colors"
                                                aria-label="Twitter"
                                             >
                                                 <Twitter className="w-5 h-5" />
                                             </a>
                                         )}
                                         {settings?.social_links?.instagram && (
                                             <a 
                                                href={settings.social_links.instagram} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="p-3 bg-pink-50 dark:bg-slate-800 text-pink-600 rounded-lg hover:bg-pink-100 dark:hover:bg-slate-700 transition-colors"
                                                aria-label="Instagram"
                                             >
                                                 <Instagram className="w-5 h-5" />
                                             </a>
                                         )}
                                         {settings?.social_links?.linkedin && (
                                             <a 
                                                href={settings.social_links.linkedin} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="p-3 bg-blue-50 dark:bg-slate-800 text-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
                                                aria-label="LinkedIn"
                                             >
                                                 <Linkedin className="w-5 h-5" />
                                             </a>
                                         )}
                                     </div>
                                </div>
                            )}
                        </div>

                        {/* Contact Form & Map */}
                        <div className="space-y-8">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Full Width Map Section */}
            <section className="w-full h-[350px] bg-gray-100 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
                {mapUrl ? (
                    <iframe 
                        src={mapUrl}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Map URL not configured
                    </div>
                )}
            </section>
        </div>
    );
}

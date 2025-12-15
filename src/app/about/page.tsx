import { getSettings } from "@/lib/api";
import { PageHeader } from "@/components/PageHeader";
import { Features } from "@/components/Features";
import { StorySection } from "@/components/StorySection";
import { MissionVisionSection } from "@/components/MissionVisionSection";

import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSettings();
    const seo = settings?.seo?.about;

    return {
        title: seo?.title || 'About Us - 3N TEXAS',
        description: seo?.description || 'Learn more about 3N TEXAS, our mission, vision, and team.',
        keywords: seo?.keywords?.split(',').map(k => k.trim()) || [],
        openGraph: {
            images: seo?.image ? [seo.image] : [],
        },
    };
}

export default async function AboutPage() {
    const settings = await getSettings();

    return (
        <div className="pt-20">
             <PageHeader 
                title={settings?.seo?.about?.title || "About Us"} 
                breadcrumb="About" 
            />

            <StorySection settings={settings} />

            <MissionVisionSection settings={settings} />

            <Features settings={settings} />
        </div>
    );
}

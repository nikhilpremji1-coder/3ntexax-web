import { Metadata } from 'next';

import { getSettings } from "@/lib/api";
import PortfolioClient from './PortfolioClient';

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSettings();
    const seo = settings?.seo?.portfolio;

    return {
        title: seo?.title || 'Our Portfolio - 3N TEXAS',
        description: seo?.description || 'Explore our featured real estate and property management projects.',
        keywords: seo?.keywords?.split(',').map(k => k.trim()) || [],
        openGraph: {
            images: seo?.image ? [seo.image] : [],
        },
    };
}

export default function PortfolioPage() {
    return <PortfolioClient />;
}


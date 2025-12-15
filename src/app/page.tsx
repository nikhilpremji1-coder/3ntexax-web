import { Suspense } from 'react';
export const dynamic = "force-dynamic";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";
import { WhyInvest } from "@/components/WhyInvest";
import { getSettings } from "@/lib/api";
import { HomeSkeleton } from "@/components/skeletons/HomeSkeleton";

import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const seo = settings?.seo?.home;

  return {
    title: seo?.title || '3N TEXAS - Real Estate & Property Management',
    description: seo?.description || 'Premier real estate and property management solutions in Texas.',
    keywords: seo?.keywords?.split(',').map(k => k.trim()) || [],
    openGraph: {
      images: seo?.image ? [seo.image] : [],
    },
  };
}

export default function Home() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}

import { PortfolioSection } from "@/components/PortfolioSection";

async function HomeContent() {
  const settings = await getSettings();

  return (
    <div className="flex flex-col w-full">
      <Hero settings={settings} />
      <Features settings={settings} />
      <PortfolioSection settings={settings} />
      <CallToAction settings={settings} />
      <WhyInvest settings={settings} />
    </div>
  );
}

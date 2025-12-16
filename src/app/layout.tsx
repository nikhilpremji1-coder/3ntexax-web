import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import InitialLoader from "@/components/InitialLoader";
import NextTopLoader from 'nextjs-toploader';
import { ScrollToTop } from "@/components/ScrollToTop";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: {
      default: settings?.site_name || "3N TEXAS",
      template: `%s | ${settings?.site_name || "3N TEXAS"}`,
    },
    description: settings?.seo?.home?.description || "Real Estate & Portfolio Management",
    icons: {
      icon: settings?.site_favicon || undefined,
      shortcut: settings?.site_favicon || undefined,
      apple: settings?.site_favicon || undefined,
    },
  };
}

import { getSettings } from "@/lib/api";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${outfit.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader 
            color="#3b82f6"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
          />
          <InitialLoader>
            <Header settings={settings} />
            <main className="flex-grow">
              {children}
            </main>
            <Footer settings={settings} />
            <ScrollToTop />
          </InitialLoader>
        </ThemeProvider>
      </body>
    </html>
  );
}

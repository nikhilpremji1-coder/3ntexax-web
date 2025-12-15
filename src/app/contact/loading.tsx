import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
    return (
        <div className="pt-20">
            {/* Header Skeleton */}
            <div className="relative py-16 bg-gray-900 overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center mb-4">
                        <Skeleton className="h-4 w-32 bg-gray-800" />
                    </div>
                    <div className="flex justify-center">
                        <Skeleton className="h-10 w-48 bg-gray-800" />
                    </div>
                </div>
            </div>

            <section className="py-20 bg-white dark:bg-black">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Contact Info Skeleton */}
                        <div className="space-y-8">
                            <Skeleton className="h-10 w-48 mb-8" />
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start space-x-4">
                                    <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
                                    <div className="space-y-2 w-full">
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-5 w-48" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Form Skeleton */}
                        <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6">
                            <Skeleton className="h-8 w-40 mb-6" />
                            <div className="space-y-4">
                                <Skeleton className="h-12 w-full rounded-lg" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                                <Skeleton className="h-32 w-full rounded-lg" />
                                <Skeleton className="h-14 w-full rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

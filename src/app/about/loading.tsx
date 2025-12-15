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

            {/* Story Section Skeleton */}
            <section className="py-24 bg-white dark:bg-black">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <Skeleton className="h-10 w-64 mx-auto" />
                        <div className="space-y-3 px-8">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-[90%] mx-auto" />
                            <Skeleton className="h-6 w-[95%] mx-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission/Vision Skeleton */}
            <section className="py-24 bg-gray-50 dark:bg-zinc-900/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto space-y-8">
                        {[1, 2].map((i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm">
                                <div className="flex items-center gap-6 mb-4">
                                    <Skeleton className="w-12 h-12 rounded-xl" />
                                    <Skeleton className="h-8 w-40" />
                                </div>
                                <div className="pl-16 space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-[90%]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

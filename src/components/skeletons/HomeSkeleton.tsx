import { Skeleton } from "@/components/ui/Skeleton";

export function HomeSkeleton() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Skeleton */}
      <section className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden">
         <div className="space-y-6 text-center max-w-4xl w-full z-10">
            <Skeleton className="h-16 w-3/4 mx-auto rounded-xl" />
            <Skeleton className="h-24 w-1/2 mx-auto rounded-xl" />
            <div className="flex justify-center gap-4 mt-8">
               <Skeleton className="h-14 w-40 rounded-full" />
               <Skeleton className="h-14 w-40 rounded-full" />
            </div>
         </div>
      </section>

      {/* Portfolio Skeleton */}
      <section className="py-16 container mx-auto px-4 overflow-hidden">
          <div className="flex justify-between items-end mb-6">
              <div className="space-y-2">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-10 w-64 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-32 rounded-full" />
          </div>
          <div className="flex gap-4 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="min-w-[220px] h-[300px] rounded-xl flex-shrink-0" />
              ))}
          </div>
      </section>

      {/* Features Skeleton */}
      <section className="py-32 container mx-auto px-4">
         <div className="text-center mb-20 space-y-4">
             <Skeleton className="h-12 w-96 mx-auto rounded-lg" />
             <Skeleton className="h-6 w-2/3 mx-auto rounded-lg" />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-3xl" />
            ))}
         </div>
      </section>

       {/* Call To Action Skeleton */}
       <section className="py-20">
            <Skeleton className="h-64 w-full" />
       </section>
      
      {/* WhyInvest Skeleton */}
       <section className="py-32 container mx-auto px-4">
         <div className="text-center mb-20 space-y-4">
             <Skeleton className="h-12 w-96 mx-auto rounded-lg" />
             <Skeleton className="h-6 w-2/3 mx-auto rounded-lg" />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-3xl" />
            ))}
         </div>
      </section>
    </div>
  );
}

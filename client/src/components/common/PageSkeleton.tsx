import { Skeleton } from "@/components/ui/skeleton";

interface PageSkeletonProps {
  type?: "profile" | "card" | "table";
}

export default function PageSkeleton({ type = "profile" }: PageSkeletonProps) {
  if (type === "profile") {
    return (
      <section className="w-full min-h-screen bg-zinc-50 flex items-center justify-center pt-28 pb-16 px-4">
        <div className="w-full max-w-4xl">
          <div className="border bg-white rounded-2xl shadow-sm">
            <div className="p-6 border-b space-y-3">
              <Skeleton className="h-8 w-60" />
              <Skeleton className="h-4 w-80" />
            </div>

            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="border-r p-8 flex flex-col items-center">
                <Skeleton className="h-32 w-32 rounded-full" />

                <Skeleton className="h-6 w-40 mt-5" />
                <Skeleton className="h-4 w-52 mt-2" />

                <Skeleton className="h-10 w-full mt-6" />
                <Skeleton className="h-10 w-[80%] mt-3" />
              </div>

              <div className="p-8 space-y-8">
                <Skeleton className="h-7 w-56" />

                <div className="grid lg:grid-cols-2 gap-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border rounded-xl p-6 space-y-4">
                      <Skeleton className="h-5 w-32" />

                      <Skeleton className="h-10 w-full" />

                      <Skeleton className="h-10 w-full" />

                      <Skeleton className="h-10 w-28" />
                    </div>
                  ))}

                  <div className="flex justify-end items-end">
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

import { Skeleton } from "@/components/ui/skeleton";

const WishlistSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="aspect-3/4 w-full rounded-none bg-zinc-200" />

          <div className="space-y-3 pt-4">
            <Skeleton className="h-3 w-20 rounded-none bg-zinc-200" />
            <Skeleton className="h-4 w-3/4 rounded-none bg-zinc-200" />
            <Skeleton className="h-4 w-1/3 rounded-none bg-zinc-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistSkeleton;

import { Heart } from "lucide-react";

interface WishlistHeaderProps {
  count: number;
}

const WishlistHeader = ({ count }: WishlistHeaderProps) => {
  return (
    <div className="mb-8 border-b border-zinc-200 pb-6">
      <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
        <span>Home</span>
        <span>/</span>
        <span className="text-zinc-900">Wishlist</span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Heart size={20} className="text-zinc-900" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Your Collection
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Save your favorite pieces and find them whenever you need.
          </p>
        </div>

        <p className="text-sm text-zinc-500">
          <span className="font-semibold text-zinc-950">{count}</span>{" "}
          {count === 1 ? "Item" : "Items"}
        </p>
      </div>
    </div>
  );
};

export default WishlistHeader;

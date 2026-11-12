import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";

import type { Product } from "@/types/product";

import { Button } from "@/components/ui/button";

interface WishlistCardProps {
  product: Product;
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  isRemoving: boolean;
  isAddingToCart: boolean;
}

const getProductImage = (product: Product): string | undefined => {
  const image = product.images?.[0] as unknown;

  if (typeof image === "string") return image;

  if (
    image &&
    typeof image === "object" &&
    "url" in image &&
    typeof image.url === "string"
  ) {
    return image.url;
  }

  return undefined;
};

const WishlistCard = ({
  product,
  onRemove,
  onAddToCart,
  isRemoving,
  isAddingToCart,
}: WishlistCardProps) => {
  const image = getProductImage(product);

  return (
    <div className="group min-w-0">
      <div className="relative aspect-3/4 overflow-hidden bg-zinc-100">
        <Link to={`/products/${product._id}`}>
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-400">
              No Image
            </div>
          )}
        </Link>

        <button
          type="button"
          disabled={isRemoving}
          onClick={() => onRemove(product._id)}
          aria-label="Remove from wishlist"
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Heart
            size={17}
            className="fill-zinc-900 text-zinc-900 group-hover:fill-white group-hover:text-white"
          />
        </button>

        {product.is_new_arrival && (
          <span className="absolute left-3 top-3 bg-zinc-950 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
            New
          </span>
        )}

        <div className="absolute inset-x-3 bottom-3 hidden translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          <Button
            disabled={isAddingToCart}
            onClick={() => onAddToCart(product)}
            className="h-11 w-full rounded-none bg-white text-xs font-medium uppercase tracking-wider text-zinc-950 shadow-sm hover:bg-zinc-950 hover:text-white"
          >
            <ShoppingBag size={15} className="mr-2" />
            {isAddingToCart ? "Adding..." : "Add to Bag"}
          </Button>
        </div>
      </div>

      <div className="pt-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 truncate text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-400">
              {product.category}
            </p>

            <Link
              to={`/products/${product._id}`}
              className="line-clamp-1 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-500"
            >
              {product.name}
            </Link>
          </div>

          <p className="shrink-0 text-sm font-semibold text-zinc-950">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span>{product.rating_count ?? 0}</span>
          </div>

          <span className="text-[10px] uppercase tracking-wider text-zinc-400">
            {product.sizes?.length ?? 0} Sizes
          </span>
        </div>

        <Button
          disabled={isAddingToCart}
          onClick={() => onAddToCart(product)}
          variant="outline"
          className="mt-4 h-10 w-full rounded-none border-zinc-300 text-xs font-medium uppercase tracking-wider sm:hidden"
        >
          <ShoppingBag size={14} className="mr-2" />
          {isAddingToCart ? "Adding..." : "Add to Bag"}
        </Button>
      </div>
    </div>
  );
};

export default WishlistCard;

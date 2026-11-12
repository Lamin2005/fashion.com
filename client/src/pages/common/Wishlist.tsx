import { useState } from "react";
import { Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import WishlistHeader from "@/components/wishlist/WishlistHeader";
import WishlistGrid from "@/components/wishlist/WishlistGrid";
import WishlistEmpty from "@/components/wishlist/WishlistEmpty";
import WishlistSkeleton from "@/components/wishlist/WishlistSkeleton";

import { Button } from "@/components/ui/button";

import type { Product } from "@/types/product";

import {
  useGetWishlistQuery,
  useRemoveWishlistItemMutation,
  useClearWishlistMutation,
} from "@/store/slices/api/wishlistApi";

import { useAddCartItemMutation } from "@/store/slices/api/cartApi";

const WishlistPage = () => {
  const [removingProductId, setRemovingProductId] = useState<string | null>(
    null,
  );

  const { data, isLoading, isError, refetch } = useGetWishlistQuery();

  const [removeWishlistItem, { isLoading: isRemoving }] =
    useRemoveWishlistItemMutation();

  const [clearWishlist, { isLoading: isClearing }] = useClearWishlistMutation();

  const [addCartItem, { isLoading: isAddingToCart }] = useAddCartItemMutation();

  const products = data?.wishlist ?? [];
  const wishlistCount = products.length;

  const handleRemove = async (productId: string) => {
    try {
      setRemovingProductId(productId);

      await removeWishlistItem(productId).unwrap();

      toast.success("Product removed from wishlist.");
    } catch (error) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Unable to remove product.";

      toast.error(message);
    } finally {
      setRemovingProductId(null);
    }
  };

  const handleClearWishlist = async () => {
    if (!wishlistCount) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear your wishlist?",
    );

    if (!confirmed) return;

    try {
      await clearWishlist().unwrap();

      toast.success("Wishlist cleared successfully.");
    } catch (error) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Unable to clear wishlist.";

      toast.error(message);
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await addCartItem({
        product_id: product._id,
        quantity: 1,
        size: product.sizes?.[0] ?? "",
        color: product.colors?.[0] ?? "",
      }).unwrap();

      toast.success("Product added to bag.");
    } catch (error) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Unable to add product to bag.";

      toast.error(message);
    }
  };

  return (
    <section className="min-h-screen w-full bg-zinc-50 px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* Header */}
        <WishlistHeader count={wishlistCount} />

        {/* Loading */}
        {isLoading && <WishlistSkeleton />}

        {/* Error */}
        {isError && !isLoading && (
          <div className="flex min-h-87.5 flex-col items-center justify-center text-center">
            <h2 className="text-lg font-semibold text-zinc-950">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              We couldn't load your wishlist.
            </p>

            <Button
              onClick={() => refetch()}
              variant="outline"
              className="mt-5 rounded-none"
            >
              <RefreshCw size={15} className="mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {/* Wishlist Content */}
        {!isLoading && !isError && (
          <>
            {wishlistCount > 0 ? (
              <>
                {/* Wishlist Toolbar */}
                <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Saved Items ({wishlistCount})
                  </p>

                  <Button
                    variant="ghost"
                    disabled={isClearing || isRemoving}
                    onClick={handleClearWishlist}
                    className="h-9 rounded-none px-2 text-xs text-zinc-500 hover:bg-transparent hover:text-red-600"
                  >
                    <Trash2 size={14} className="mr-2" />

                    {isClearing ? "Clearing..." : "Clear All"}
                  </Button>
                </div>

                <WishlistGrid
                  products={products}
                  onRemove={handleRemove}
                  onAddToCart={handleAddToCart}
                  removingProductId={removingProductId}
                  isAddingToCart={isAddingToCart}
                />
              </>
            ) : (
              <WishlistEmpty />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;

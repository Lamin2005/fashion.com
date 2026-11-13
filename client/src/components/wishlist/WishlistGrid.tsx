import type { Product } from "@/types/product";

import WishlistCard from "./WishlistCard";

interface WishlistGridProps {
  products: Product[];
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  removingProductId: string | null;
  addingProductId: string | null;
}

const WishlistGrid = ({
  products,
  onRemove,
  onAddToCart,
  removingProductId,
  addingProductId,
}: WishlistGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <WishlistCard
          key={product._id}
          product={product}
          onRemove={onRemove}
          onAddToCart={onAddToCart}
          isRemoving={removingProductId === product._id}
          isAddingToCart={addingProductId === product._id}
        />
      ))}
    </div>
  );
};

export default WishlistGrid;

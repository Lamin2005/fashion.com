import type { Product } from "@/types/product";

interface StockLevelProps {
  product: Product;
}

function StockLevel({ product }: StockLevelProps) {
  const maxStock = 100;
  const stock = Math.max(0, product.instock_count ?? 0);

  const percentage = Math.min(100, Math.round((stock / maxStock) * 100));

  const stockColor =
    stock === 0
      ? "bg-red-500"
      : stock <= 10
        ? "bg-amber-400"
        : "bg-emerald-400";

  console.log(product);
  

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-sm font-medium text-white">
          {product.name}
        </p>

        <span className="shrink-0 text-xs text-zinc-400">{stock} in stock</span>
      </div>

      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Stock level for ${product.name}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${stockColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-1 text-xs text-zinc-500">
        {percentage}% of stock capacity
      </p>
    </div>
  );
}

export default StockLevel;

import type { Product } from "@/types/product";
import { useGetProductsQuery } from "../../store/slices/api/productApi";

const LOW_STOCK_LIMIT = 10;
const POLLING_INTERVAL = 10000; // 10 seconds

export default function useLowStockCount() {
  const { data, isLoading, isError } = useGetProductsQuery(
    {
      sizes: [],
      colors: [],
    },
    {
      pollingInterval: POLLING_INTERVAL,
      refetchOnFocus: true,
    },
  );

  const products = Array.isArray(data) ? data : (data?.products ?? []);

  const lowStockCount = products.filter(
    (product: Product) => Number(product.instock_count) <= LOW_STOCK_LIMIT,
  ).length;

  return {
    lowStockCount,
    isLoading,
    isError,
  };
}

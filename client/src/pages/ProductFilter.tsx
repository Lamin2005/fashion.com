import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useGetProductsQuery } from "@/store/slices/productApi";

function ProductFilter() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialkeyword = queryParams.get("keyword") || "";

  const [filter, setFilter] = useState({
    keyword: initialkeyword,
  });

  const { data: products = [], isLoading } = useGetProductsQuery(filter);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(products);

  console.log(location);

  return <div>ProductFilter</div>;
}

export default ProductFilter;

import { useState } from "react";
import { SlidersHorizontal, Star, Heart, ShoppingBag, X } from "lucide-react";
import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Outerwear",
  "T-Shirts",
  "Pants",
  "Shirts",
  "Accessories",
];

function ProductFilter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const Initialkeyword = queryParams.get("keyword") || "";
  const Initialcategory = queryParams.get("category") || "";
  const [searchTerm, setSearchTerm] = useState(Initialkeyword || "");
  const [selectedCategory, setSelectedCategory] = useState(
    Initialcategory || "All",
  );

  const [filter, setFilter] = useState({
    keyword: Initialkeyword,
    category: Initialcategory,
  });

  const { data: products, isLoading, isError } = useGetProductsQuery(filter);
  const productList = products?.products || [];

  console.log(products);
  console.log(productList);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setFilter((prev) => ({ ...prev, keyword: "" }));
        return;
      }
      setFilter((prev) => ({ ...prev, keyword: searchTerm }));
      navigate(`/products/filters/?keyword=${encodeURIComponent(searchTerm)}`, {
        replace: true,
      });
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm, navigate]);

  useEffect(() => {
    if (selectedCategory === "All") {
      const t = setTimeout(() => {
        setFilter((prev) => ({ ...prev, category: "" }));
        navigate("/products/filters/", { replace: true });
      }, 400);
      return () => clearTimeout(t);
    }

    if (selectedCategory !== "All") {
      const t = setTimeout(() => {
        setFilter((prev) => ({ ...prev, category: selectedCategory }));
        navigate(
          `/products/filters/?category=${encodeURIComponent(selectedCategory)}`,
          {
            replace: true,
          },
        );
      }, 400);
      return () => clearTimeout(t);
    }
  }, [selectedCategory, navigate]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white pt-20">
        <p className="text-center text-zinc-500 text-sm py-20">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen bg-white pt-20">
        <p className="text-center text-red-500 text-sm py-20">
          Error fetching products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white pt-20">
      <div className="bg-zinc-50 border-b border-zinc-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            Shop All Collections
          </h1>
          <p className="text-xs text-zinc-400 font-light tracking-wide uppercase">
            Home &nbsp;/&nbsp; <span className="text-zinc-900">Shop</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 shrink-0 space-y-8">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
                Search Products
              </h3>
              <input
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-sm px-4 py-2.5 bg-zinc-50 border border-zinc-200 outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
                Categories
              </h3>
              <div className="flex flex-col space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className="text-sm text-left text-zinc-500 hover:text-zinc-900 transition-colors duration-150 py-0.5 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setFilter((prev) => ({
                        ...prev,
                        category: cat === "All" ? "" : cat,
                      }));
                      navigate(
                        cat === "All"
                          ? "/products/filters/"
                          : `/products/filters/?category=${encodeURIComponent(cat)}`,
                        { replace: true },
                      );
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
                  Max Price
                </h3>
                <span className="text-sm font-semibold text-zinc-900">
                  $300
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="300"
                step="5"
                defaultValue="300"
                className="w-full accent-zinc-900 cursor-pointer h-1 bg-zinc-200 rounded-lg appearance-none"
                disabled
              />
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>$40</span>
                <span>$300</span>
              </div>
            </div>

            <button className="w-full bg-zinc-100 hover:bg-zinc-900 hover:text-white text-zinc-800 text-xs font-semibold py-3 transition-colors duration-300">
              Reset All Filters
            </button>
          </aside>

          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-medium text-zinc-700 border border-zinc-200 px-4 py-2 hover:border-zinc-900"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>

              <p className="text-xs text-zinc-400 font-light hidden sm:block">
                Showing{" "}
                <span className="text-zinc-900 font-medium">
                  {productList.length}
                </span>{" "}
                of {productList.length} products
              </p>

              <div className="flex items-center space-x-2">
                <label
                  htmlFor="sort"
                  className="text-xs text-zinc-400 whitespace-nowrap"
                >
                  Sort by :
                </label>
                <select
                  id="sort"
                  defaultValue="default"
                  className="text-xs font-medium border border-zinc-200 text-zinc-700 py-2 px-3 outline-none focus:border-zinc-900 bg-white"
                >
                  <option value="default">Default Features</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>
            </div>

            {(searchTerm !== "" || selectedCategory !== "All") && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-zinc-400">Active Filters:</span>

                {searchTerm !== "" && (
                  <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 px-2.5 py-1 rounded-sm">
                    {searchTerm}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => {
                        setSearchTerm("");
                        setFilter((prev) => ({ ...prev, keyword: "" }));
                        const newParams = new URLSearchParams(location.search);
                        newParams.delete("keyword");
                        navigate(`/products/filters/?${newParams.toString()}`, {
                          replace: true,
                        });
                      }}
                    />
                  </span>
                )}

                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 px-2.5 py-1 rounded-sm">
                    {selectedCategory}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedCategory("All");
                        setFilter((prev) => ({ ...prev, category: "" }));
                        const newParams = new URLSearchParams(location.search);
                        newParams.delete("category");
                        navigate(`/products/filters/?${newParams.toString()}`, {
                          replace: true,
                        });
                      }}
                    />
                  </span>
                )}
              </div>
            )}

            {productList.length === 0 ? (
              <div className="text-center py-20 text-zinc-500">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6">
                {productList.map((product: Product) => (
                  <a href={`/products/${product._id}`} key={product._id}>
                    <div className="group relative flex flex-col justify-between">
                      <div className="relative w-full aspect-3/4 bg-zinc-50 overflow-hidden border border-zinc-100 shadow-sm mb-4">
                        {product.is_new_arrival && (
                          <span className="absolute top-2.5 left-2.5 bg-zinc-900 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 z-10">
                            NEW
                          </span>
                        )}
                        <button className="absolute top-2.5 right-2.5 p-2 bg-white/80 backdrop-blur-sm text-zinc-600 hover:text-red-500 rounded-full transition-colors z-10 shadow-sm">
                          <Heart size={14} strokeWidth={2} />
                        </button>
                        <img
                          src={
                            product.images?.[0]?.url ||
                            "https://via.placeholder.com/400x500"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <button className="w-full bg-zinc-900 text-white text-xs font-medium py-3 px-4 flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-md">
                            <ShoppingBag size={14} /> Add to Bag
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1 px-1">
                        <p className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">
                          {product.category}
                        </p>
                        <h3 className="text-xs sm:text-sm font-semibold text-zinc-800 line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-sm font-bold text-zinc-900">
                            ${product.price?.toFixed(2) || "0.00"}
                          </span>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star size={12} fill="currentColor" />
                            <span className="text-xs font-medium text-zinc-500">
                              {product.rating_count || "0"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {productList.length > 0 && (
              <div className="pt-16 text-center">
                <button className="inline-flex items-center justify-center border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white text-xs font-bold px-8 py-4 transition-colors duration-300 cursor-pointer">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <h2 className="text-base font-bold text-zinc-900">
              Filter Options
            </h2>
            <X
              size={20}
              className="cursor-pointer text-zinc-500"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
              Search
            </h3>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm px-4 py-2 bg-zinc-50 border border-zinc-200 outline-none"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setFilter((prev) => ({
                      ...prev,
                      category: cat === "All" ? "" : cat,
                    }));
                    navigate(
                      cat === "All"
                        ? "/products/filters/"
                        : `/products/filters/?category=${encodeURIComponent(cat)}`,
                      { replace: true },
                    );
                  }}
                  className="text-xs px-3 py-1.5 border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-900 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          className="w-full bg-zinc-900 text-white py-3 text-xs font-semibold tracking-wide"
          onClick={() => {
            setIsSidebarOpen(false);
            setSearchTerm("");
            setSelectedCategory("All");
            setFilter({ keyword: "", category: "" });
            navigate("/products/filters/", { replace: true });
          }}
        >
          Clear All & Close
        </button>
      </div>
    </div>
  );
}

export default ProductFilter;

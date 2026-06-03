import { useState, useMemo } from "react";
import { SlidersHorizontal, Star, Heart, ShoppingBag, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isNew?: boolean;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Classic Beige Trench Coat",
    price: 189.0,
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    isNew: true,
  },
  {
    id: 2,
    name: "Oversized Organic Cotton Tee",
    price: 45.0,
    category: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Premium Slim-Fit Denim Jeans",
    price: 95.0,
    category: "Pants",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    isNew: true,
  },
  {
    id: 4,
    name: "Minimalist Leather Tote Bag",
    price: 220.0,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80",
    rating: 5.0,
  },
  {
    id: 5,
    name: "Linen Relaxed Button-Up Shirt",
    price: 65.0,
    category: "Shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Tailored Wool Blend Blazer",
    price: 245.0,
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Knit Crewneck Sweater",
    price: 85.0,
    category: "Shirts",
    image:
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Urban Cargo Trousers",
    price: 110.0,
    category: "Pants",
    image:
      "https://images.unsplash.com/photo-1517423738875-5ce310acd3da?auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
  },
];

const categories = [
  "All",
  "Outerwear",
  "T-Shirts",
  "Pants",
  "Shirts",
  "Accessories",
];

const Shoppage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // ၄။ Filter & Sort Logic ကို useMemo သုံးပြီး Performance ကောင်းအောင် တွက်ချက်ခြင်း
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search Query Filter
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Category Filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Price Range Filter
    result = result.filter((product) => product.price <= maxPrice);

    // Sorting Logic
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, maxPrice, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setMaxPrice(300);
    setSortBy("default");
    setSearchQuery("");
  };

  return (
    <div className="w-full min-h-screen bg-white pt-20">
      {/* Step 1: Banner & Breadcrumbs (ထိပ်ဆုံးပိုင်း) */}
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
          {/* Step 2: Desktop Filter Sidebar (ဘယ်ဘက်ခြမ်း - ကွန်ပျူတာအတွက်) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8">
            {/* Search Input Box Inside Sidebar */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
                Search Products
              </h3>
              <input
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm px-4 py-2.5 bg-zinc-50 border border-zinc-200 outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            {/* Categories List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
                Categories
              </h3>
              <div className="flex flex-col space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm text-left transition-colors duration-150 py-0.5 cursor-pointer ${
                      selectedCategory === cat
                        ? "text-zinc-900 font-semibold underline underline-offset-4"
                        : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
                  Max Price
                </h3>
                <span className="text-sm font-semibold text-zinc-900">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="300"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-zinc-900 cursor-pointer h-1 bg-zinc-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>$40</span>
                <span>$300</span>
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={resetFilters}
              className="w-full bg-zinc-100 hover:bg-zinc-900 hover:text-white text-zinc-800 text-xs font-semibold py-3 transition-colors duration-300"
            >
              Reset All Filters
            </button>
          </aside>

          {/* Right Content Area: Filter Toolbar + Product Grid */}
          <div className="flex-1 space-y-6">
            {/* Horizontal Sub-Toolbar Bar */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              {/* Mobile Filter Trigger Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-medium text-zinc-700 border border-zinc-200 px-4 py-2 hover:border-zinc-900"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>

              {/* Product Counter Status */}
              <p className="text-xs text-zinc-400 font-light hidden sm:block">
                Showing{" "}
                <span className="text-zinc-900 font-medium">
                  {filteredProducts.length}
                </span>{" "}
                of {initialProducts.length} products
              </p>

              {/* Dropdown Sorting Control */}
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="sort"
                  className="text-xs text-zinc-400 whitespace-nowrap"
                >
                  Sort by :
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-medium border border-zinc-200 text-zinc-700 py-2 px-3 outline-none focus:border-zinc-900 bg-white"
                >
                  <option value="default">Default Features</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>
            </div>

            {/* Active Badges Alert Line */}
            {(selectedCategory !== "All" || maxPrice < 300 || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-zinc-400">Active Filters:</span>
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 px-2.5 py-1 rounded-sm">
                    {selectedCategory}{" "}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory("All")}
                    />
                  </span>
                )}
                {maxPrice < 300 && (
                  <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 px-2.5 py-1 rounded-sm">
                    Under ${maxPrice}{" "}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => setMaxPrice(300)}
                    />
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 px-2.5 py-1 rounded-sm">
                    "{searchQuery}"{" "}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => setSearchQuery("")}
                    />
                  </span>
                )}
              </div>
            )}

            {/* Step 3: Product Grid Area (Responsive 2-Columns on Mobile, 3-Columns on Desktop) */}
            {filteredProducts.length === 0 ? (
              <div className="w-full text-center py-20 space-y-3">
                <p className="text-zinc-500 font-light text-base">
                  No items match your selected filter criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="text-sm font-semibold text-zinc-900 underline underline-offset-4"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative flex flex-col justify-between"
                  >
                    {/* Image Box */}
                    <div className="relative w-full aspect-3/4 bg-zinc-50 overflow-hidden border border-zinc-100 shadow-sm mb-4">
                      {product.isNew && (
                        <span className="absolute top-2.5 left-2.5 bg-zinc-900 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 z-10">
                          NEW
                        </span>
                      )}
                      <button className="absolute top-2.5 right-2.5 p-2 bg-white/80 backdrop-blur-sm text-zinc-600 hover:text-red-500 rounded-full transition-colors z-10 shadow-sm">
                        <Heart size={14} strokeWidth={2} />
                      </button>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Slide-up Bag Action Trigger */}
                      <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full bg-zinc-900 text-white text-xs font-medium py-3 px-4 flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-md">
                          <ShoppingBag size={14} /> Add to Bag
                        </button>
                      </div>
                    </div>

                    {/* Texts Details */}
                    <div className="space-y-1 px-1">
                      <p className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">
                        {product.category}
                      </p>
                      <h3 className="text-xs sm:text-sm font-semibold text-zinc-800 line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-bold text-zinc-900">
                          ${product.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star size={12} fill="currentColor" />
                          <span className="text-xs font-medium text-zinc-500">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 4: Pagination (Load More Button Style) */}
            {filteredProducts.length > 0 && (
              <div className="pt-16 text-center">
                <button className="inline-flex items-center justify-center border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white text-xs font-bold px-8 py-4 transition-colors duration-300 cursor-pointer">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Pop-up Sidebar Filter Sheet (ဖုန်းအတွက် သီးသန့်ဆွဲထုတ်မည့် Drawer) */}
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

          {/* Search Box */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
              Search
            </h3>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm px-4 py-2 bg-zinc-50 border border-zinc-200 outline-none"
            />
          </div>

          {/* Mobile Categories */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 border transition-colors ${
                    selectedCategory === cat
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-600 border-zinc-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            resetFilters();
            setIsSidebarOpen(false);
          }}
          className="w-full bg-zinc-900 text-white py-3 text-xs font-semibold tracking-wide"
        >
          Clear All & Close
        </button>
      </div>
    </div>
  );
};

export default Shoppage;

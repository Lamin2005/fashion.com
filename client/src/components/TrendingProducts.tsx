import { Heart, ShoppingBag, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isNew?: boolean;
}

const products: Product[] = [
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
];

const TrendingProducts = () => {
  return (
    <section className="w-full bg-zinc-50/50 py-16 lg:py-24 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-semibold text-amber-600 tracking-widest uppercase">
            Customer Favorites
          </p>
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight sm:text-4xl">
            Trending New Arrivals
          </h2>
          <p className="text-sm text-zinc-500 font-light">
            Explore our most-wanted pieces of the week, finely tailored with
            pure premium textiles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col justify-between"
            >
              <div className="relative w-full aspect-3/4 bg-zinc-100 overflow-hidden border border-zinc-200/50 shadow-sm mb-4">
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-zinc-900 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 z-10">
                    NEW
                  </span>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm text-zinc-600 hover:text-red-500 rounded-full transition-colors z-10 shadow-sm cursor-pointer">
                  <Heart size={16} strokeWidth={2} />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-zinc-900/40 to-transparent">
                  <button className="w-full bg-zinc-900 text-white text-xs font-medium py-3 px-4 flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg cursor-pointer">
                    <ShoppingBag size={14} />
                    Quick Add to Bag
                  </button>
                </div>
              </div>

              <div className="space-y-1 px-1">
                <p className="text-xs text-zinc-400 font-medium tracking-wide">
                  {product.category}
                </p>
                <h3 className="text-sm font-semibold text-zinc-800 group-hover:text-zinc-900 transition-colors line-clamp-1">
                  <a href={`/product/${product.id}`}>{product.name}</a>
                </h3>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-bold text-zinc-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-medium text-zinc-600">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;

import { ArrowUpRight } from "lucide-react";

interface Category {
  id: number;
  name: string;
  itemCount: string;
  image: string;
  gridSpan: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Women's Apparel",
    itemCount: "120+ Items",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    gridSpan: "md:col-span-2 h-[400px]",
  },
  {
    id: 2,
    name: "Men's Collection",
    itemCount: "85+ Items",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    gridSpan: "md:col-span-1 h-[400px]",
  },
  {
    id: 3,
    name: "Minimal Accessories",
    itemCount: "45+ Items",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80",
    gridSpan: "md:col-span-1 h-[300px]",
  },
  {
    id: 4,
    name: "Exclusive Footwear",
    itemCount: "60+ Items",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    gridSpan: "md:col-span-2 h-[300px]",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-amber-600 tracking-widest uppercase">
              Curated Showcase
            </p>
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
              Shop by Categories
            </h2>
          </div>
          <a
            href="#shop"
            className="text-sm font-medium text-zinc-900 hover:text-amber-600 underline underline-offset-4 transition-colors mt-4 md:mt-0 inline-flex items-center gap-1"
          >
            Browse All Categories
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`relative ${category.gridSpan} bg-zinc-100 overflow-hidden border border-zinc-100 group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-750 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-950/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between text-white">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-300 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-sm">
                    {category.itemCount}
                  </span>
                  <h3 className="text-xl font-bold tracking-wide mt-2">
                    {category.name}
                  </h3>
                </div>

                <div className="w-10 h-10 bg-white text-zinc-900 rounded-full flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;

import { ArrowRight } from "lucide-react";

interface CollectionItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  itemCount: number;
  link: string;
}

const collectionsData: CollectionItem[] = [
  {
    id: 1,
    title: "The Minimalist Monochromatic",
    subtitle: "Winter / Autumn Lookbook 2026",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    itemCount: 24,
    link: "#shop",
  },
  {
    id: 2,
    title: "Urban Utility & Cargo Style",
    subtitle: "Streetwear Essence",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    itemCount: 16,
    link: "#shop",
  },
  {
    id: 3,
    title: "Timeless Tailored Suiting",
    subtitle: "Premium Blazer & Formal Wear",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    itemCount: 12,
    link: "#shop",
  },
];

const Collectionspage = () => {
  return (
    <div className="w-full min-h-screen bg-white pt-20">
      {/* Editorial Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <span className="text-xs font-semibold text-amber-600 tracking-widest uppercase">
          Curated Lookbooks
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 max-w-2xl mx-auto leading-tight">
          Define Your Aesthetic Through Our Collections
        </h1>
        <p className="text-sm text-zinc-400 font-light max-w-md mx-auto">
          Each capsule is designed with a specific mood, environment, and
          architectural clean lines in mind.
        </p>
      </div>

      {/* Alternating & Dynamic Grid Layout (Premium Lookbook Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">
        {collectionsData.map((collection, index) => (
          <div
            key={collection.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`lg:col-span-7 relative group overflow-hidden bg-zinc-50 aspect-16/10 sm:aspect-video ${
                index % 2 === 1 ? "lg:order-last" : ""
              }`}
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-102"
              />
              {/* Subtle dark layout grid mask overlay */}
              <div className="absolute inset-0 bg-black/5 opacity-100 transition-opacity group-hover:opacity-20" />
            </div>

            {/* Text Description Section (占据 5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4 p-4 lg:p-8">
              <span className="text-xs font-mono text-zinc-400">
                [ Collection 0{collection.id} &mdash; {collection.itemCount}{" "}
                Items ]
              </span>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                {collection.subtitle}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
                {collection.title}
              </h2>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                Experience exceptional craftsmanship. Made with premium,
                sustainably sourced textiles built to adapt gracefully to your
                lifestyle and silhouette.
              </p>

              <div className="pt-4">
                <a
                  href={collection.link}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-amber-600 transition-colors group underline underline-offset-8"
                >
                  Explore Lookbook
                  <ArrowRight
                    size={14}
                    className="transform transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collectionspage;

import { ArrowRight, Truck, ShieldCheck, RefreshCw } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-linear-to-br from-zinc-50 via-stone-100 to-amber-50/40 pt-20 sm:pt-8 flex flex-col justify-between overflow-hidden">
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-zinc-300/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 lg:py-20">
        <div className="space-y-8 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-200 shadow-sm">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-zinc-700 tracking-wider uppercase">
              New Season Essentials
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-tight sm:leading-none">
            Minimalist Aesthetics,
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-900 via-zinc-700 to-amber-600">
              Premium Quality.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed">
            Discover a curated collection of contemporary apparel designed for
            comfort and crafted to last. Elevate your everyday wardrobe with
            timeless wardrobe staples.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white font-medium px-8 py-4 rounded-none hover:bg-zinc-800 transition-all duration-300 shadow-lg hover:shadow-xl group cursor-pointer">
              Shop Collection
              <ArrowRight
                size={18}
                className="transform transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button className="inline-flex items-center justify-center bg-white text-zinc-900 font-medium px-8 py-4 rounded-none border border-zinc-300 hover:border-zinc-900 transition-all duration-300 cursor-pointer">
              Explore Lookbook
            </button>
          </div>
        </div>

        <div className="relative w-full h-112.5 sm:h-137.5 lg:h-150 flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-200/40 translate-x-4 translate-y-4 -z-10"></div>

          <div className="w-full h-full overflow-hidden border border-zinc-200 shadow-2xl relative group">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
              alt="Premium Clothing Showcase"
              className="w-full h-full object-cover sm:object-top object-center transform transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/20 to-transparent pointer-events-none"></div>
          </div>

          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md border border-zinc-200/50 p-4 shadow-xl hidden sm:block">
            <p className="text-xs text-zinc-500 uppercase tracking-widest">
              Premium Blend
            </p>
            <p className="text-sm font-bold text-zinc-900">
              100% Organic Cotton
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-md border-t border-zinc-200/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex items-center space-x-4 p-6 bg-stone-50 border border-zinc-200/60 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-3 bg-white border border-zinc-100 text-zinc-800 shadow-sm rounded-lg">
                <Truck size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">
                  Free Shipping
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5">
                  On all orders over $150
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-zinc-50 border border-zinc-200/60 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-3 bg-white border border-zinc-100 text-zinc-800 shadow-sm rounded-lg">
                <ShieldCheck size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">
                  Secure Payment
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5">
                  100% protected transactions
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-zinc-50 border border-zinc-200/60 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-3 bg-white border border-zinc-100 text-zinc-800 shadow-sm rounded-lg">
                <RefreshCw size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">
                  Easy Returns
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5">
                  30-day hassle-free return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

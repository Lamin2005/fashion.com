import { ArrowRight, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-zinc-900 text-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 rounded-none shadow-2xl">
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 z-10">
            <span className="text-xs font-semibold text-amber-500 tracking-widest uppercase">
              Join The Fashion Club
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Sign up now & get <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-200">
                15% Off Your First Order
              </span>
            </h2>
            <p className="text-zinc-400 font-light text-sm sm:text-base max-w-md">
              Be the first to know about new collection launches, exclusive
              lookbooks, and seasonal style promotions.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-md pt-2"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-zinc-800/80 text-white text-sm pl-12 pr-4 py-3.5 border border-zinc-700 focus:border-white outline-none transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-zinc-900 hover:bg-zinc-100 font-semibold px-6 py-3.5 text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 relative min-h-75 lg:min-h-full bg-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80"
              alt="Luxury retail clothing store background"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-80 mix-blend-luminosity hover:opacity-100 transition-opacity duration-500"
            />

            <div className="absolute inset-0 bg-linear-to-r from-zinc-900 via-transparent to-transparent hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import { ShieldCheck, Leaf, Compass, Globe } from "lucide-react";

const Aboutpage = () => {
  return (
    <div className="w-full min-h-screen bg-white pt-20">
      {/* Section 1: Hero Philosophy Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-semibold text-amber-600 tracking-widest uppercase block">
            Our Core Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
            We believe in fewer, <br />
            <span className="text-zinc-400 italic font-serif">
              but better
            </span>{" "}
            clothing pieces.
          </h1>
          <p className="text-zinc-600 text-sm font-light leading-relaxed max-w-xl">
            Founded in 2026, FASHION. was born out of a desire to shift away
            from chaotic fast fashion towards intentional, architectural
            minimalism. We design contemporary garments that exist outside of
            trends &mdash; versatile essentials made to endure.
          </p>
        </div>

        {/* Editorial Split Grid Photos */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7 aspect-3/4 bg-zinc-100 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80"
              alt="Tailoring design workspace"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="col-span-5 aspect-3/4 bg-zinc-100 overflow-hidden pt-8">
            <img
              src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=500&q=80"
              alt="Premium fabric clothing"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Numbers/Statistics Counter Area */}
      <section className="w-full bg-zinc-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-mono font-bold text-amber-400">
              2026
            </p>
            <p className="text-xs font-light text-zinc-400 uppercase tracking-widest">
              Established
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-mono font-bold text-white">
              100%
            </p>
            <p className="text-xs font-light text-zinc-400 uppercase tracking-widest">
              Organic Cotton
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-mono font-bold text-white">
              45K+
            </p>
            <p className="text-xs font-light text-zinc-400 uppercase tracking-widest">
              Global Members
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-mono font-bold text-white">
              Free
            </p>
            <p className="text-xs font-light text-zinc-400 uppercase tracking-widest">
              Domestic Returns
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Pillars of Value Grid Icons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            How We Operate Differently
          </h2>
          <p className="text-xs text-zinc-400 font-light uppercase tracking-widest">
            Our Four Core Values Pillars
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-6">
          {/* Pillar 1 */}
          <div className="space-y-3 p-6 border border-zinc-100 hover:border-zinc-900 transition-colors duration-300">
            <Leaf className="text-zinc-800" size={24} strokeWidth={1.5} />
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Eco Materials
            </h3>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              We exclusively use certified organic cotton, recycled wool, and
              linen that minimizes ecological footprint.
            </p>
          </div>
          {/* Pillar 2 */}
          <div className="space-y-3 p-6 border border-zinc-100 hover:border-zinc-900 transition-colors duration-300">
            <ShieldCheck
              className="text-zinc-800"
              size={24}
              strokeWidth={1.5}
            />
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Ethical Ateliers
            </h3>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Our clothing factories ensure exceptional legal standards, healthy
              environments, and fair living wages.
            </p>
          </div>
          {/* Pillar 3 */}
          <div className="space-y-3 p-6 border border-zinc-100 hover:border-zinc-900 transition-colors duration-300">
            <Compass className="text-zinc-800" size={24} strokeWidth={1.5} />
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Timeless Blueprint
            </h3>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Every detail is micro-tested for daily versatility and high-stress
              durability, outlasting standard trends.
            </p>
          </div>
          {/* Pillar 4 */}
          <div className="space-y-3 p-6 border border-zinc-100 hover:border-zinc-900 transition-colors duration-300">
            <Globe className="text-zinc-800" size={24} strokeWidth={1.5} />
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Radical Clarity
            </h3>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              We openly disclose our true production markups and environmental
              impact audits to consumers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutpage;

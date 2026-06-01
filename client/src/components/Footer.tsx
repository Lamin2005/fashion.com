import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-900">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-widest text-white uppercase">
              FASHION<span className="text-amber-500">.</span>
            </h3>
            <p className="text-xs font-light leading-relaxed max-w-xs">
              Crafting contemporary, minimalist apparel for the modern
              individual. We believe in exceptional quality and ethical
              sustainability.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <a
                href="#"
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Shop Collection
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Men's Clothing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Women's Apparel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Aesthetic Outerwear
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Minimal Accessories
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  30-Days Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Our Boutique
            </h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <span className="text-white">Address:</span> SanChaung St,
                Yangon, Myanmar
              </li>
              <li>
                <span className="text-white">Phone:</span> +95 9 123456789
              </li>
              <li>
                <span className="text-white">Email:</span>{" "}
                laminhein2005@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-zinc-400">
            &copy; 2026 FASHION Clothing Inc. All rights reserved. Developed
            with Clean UI.
          </p>

          <div className="flex items-center space-x-3 text-[10px] text-zinc-500 font-mono">
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">
              VISA
            </span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">
              MASTER
            </span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">
              APPLE PAY
            </span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">
              KPay
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-white hover:text-amber-400 font-medium transition-colors cursor-pointer group"
          >
            Back to top
            <ArrowUp
              size={14}
              className="transform transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

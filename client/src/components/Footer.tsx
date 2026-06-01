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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <polygon points="10 15 15 12 10 9" fill="currentColor" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" fill="currentColor" />
                </svg>
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

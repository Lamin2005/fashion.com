import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  // Search Box ပွင့်/ပိတ် အခြေအနေကို သိမ်းဆည်းရန် State
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Scroll ဆွဲလိုက်ရင် Navbar နောက်ခံ ပြောင်းလဲရန်
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-zinc-100 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* ၁။ Brand Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="text-2xl font-bold tracking-widest text-zinc-900 uppercase">
                VOGUE<span className="text-amber-600">.</span>
              </a>
            </div>

            {/* ၂။ Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Shop', 'Collections', 'About'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="relative text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors duration-200 group py-2"
                >
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-zinc-950 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* ၃။ Action Icons (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Search Icon (နှိပ်လိုက်ရင် Search Box ပွင့်လာမည်) */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              
              <button className="text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">
                <User size={20} strokeWidth={1.5} />
              </button>
              
              <button className="text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer relative">
                <Heart size={20} strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-1.5 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              
              <button className="text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer relative">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-900 hover:text-zinc-600 focus:outline-none cursor-pointer"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* ၄။ Mobile Dropdown Menu */}
        <div
          className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-zinc-100 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-4 shadow-lg">
            {['Home', 'Shop', 'Collections', 'About'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-zinc-600 hover:text-zinc-900 py-2 border-b border-zinc-50"
              >
                {link}
              </a>
            ))}
            <div className="flex items-center space-x-6 pt-4">
              <button 
                onClick={() => { setIsOpen(false); setIsSearchOpen(true); }}
                className="text-zinc-600 flex items-center gap-2 cursor-pointer"
              >
                <Search size={20} /> <span className="text-sm">Search</span>
              </button>
              <button className="text-zinc-600 flex items-center gap-2">
                <User size={20} /> <span className="text-sm">Account</span>
              </button>
              <button className="text-zinc-600 flex items-center gap-2 relative">
                <ShoppingBag size={20} /> <span className="text-sm">Cart (3)</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ၅။ Full-Width Premium Search Overlay Box */}
      <div
        className={`fixed top-0 left-0 w-full h-24 bg-white border-b border-zinc-200 z-50 flex items-center transition-all duration-300 ease-in-out ${
          isSearchOpen 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-full opacity-0 invisible'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4 w-full max-w-3xl">
            <Search className="text-zinc-400" size={22} strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search products, collections, clothing..."
              className="w-full bg-transparent text-zinc-900 text-lg placeholder-zinc-400 border-none outline-none focus:ring-0"
              autoFocus={isSearchOpen}
            />
          </div>
          
          {/* Close Button */}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
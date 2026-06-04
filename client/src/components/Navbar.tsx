import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Heart,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

// Mock Data: Cart ထဲက ပစ္စည်းများကို နမူနာပြသရန်
interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Classic Beige Trench Coat",
      price: 189.0,
      size: "M",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=150&q=80",
      quantity: 1,
    },
    {
      id: 2,
      name: "Oversized Organic Cotton Tee",
      price: 45.0,
      size: "L",
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80",
      quantity: 2,
    },
  ]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
  ];

  const updateQuantity = (id: number, type: "increase" | "decrease") => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty =
            type === "increase" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-zinc-100 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="shrink-0">
              <a
                href="/"
                className="text-2xl font-bold tracking-widest text-zinc-900 uppercase"
              >
                FASHION<span className="text-amber-600">.</span>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`${link.path.toLowerCase()}`}
                  className="relative text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors duration-200 group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-zinc-950 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-6">
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

              <button
                onClick={() => setIsCartOpen(true)}
                className="text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer relative"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
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

        <div
          className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-zinc-100 transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-4 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`${link.path.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-zinc-600 hover:text-zinc-900 py-2 border-b border-zinc-50"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center space-x-6 pt-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsSearchOpen(true);
                }}
                className="text-zinc-600 flex items-center gap-2 cursor-pointer"
              >
                <Search size={20} /> <span className="text-sm">Search</span>
              </button>
              <button className="text-zinc-600 flex items-center gap-2">
                <User size={20} /> <span className="text-sm">Account</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsCartOpen(true);
                }}
                className="text-zinc-600 flex items-center gap-2 relative cursor-pointer"
              >
                <ShoppingBag size={20} />{" "}
                <span className="text-sm">Cart ({totalItemsCount})</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-full h-24 bg-white border-b border-zinc-200 z-50 flex items-center transition-all duration-300 ease-in-out ${
          isSearchOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
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

          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart section */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-112.5 bg-white z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-900">
              Your Shopping Bag
            </h2>
            <span className="bg-zinc-100 text-zinc-800 text-xs font-semibold px-2 py-0.5 rounded-full">
              {totalItemsCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <ShoppingBag
                size={48}
                strokeWidth={1}
                className="text-zinc-300"
              />
              <p className="text-zinc-500 font-light text-sm">
                Your shopping bag is completely empty.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-xs font-semibold text-zinc-900 underline underline-offset-4 hover:text-amber-600"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-6 border-b border-zinc-100 items-start"
              >
                <div className="w-20 h-24 bg-zinc-50 border border-zinc-100 shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between gap-2">
                    <h4 className="text-sm font-medium text-zinc-900 line-clamp-1">
                      {item.name}
                    </h4>
                    <span className="text-sm font-bold text-zinc-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">Size: {item.size}</p>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center border border-zinc-200">
                      <button
                        onClick={() => updateQuantity(item.id, "decrease")}
                        className="p-1.5 text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-medium text-zinc-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, "increase")}
                        className="p-1.5 text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-500">
                Subtotal
              </span>
              <span className="text-lg font-bold text-zinc-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-light">
              Shipping, taxes, and discounts will be calculated at checkout.
            </p>
            <div className="space-y-2 pt-2">
              <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm py-4 transition-colors shadow-md cursor-pointer">
                Proceed to Checkout
              </button>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-transparent text-zinc-600 hover:text-zinc-900 text-xs font-medium py-2 transition-colors cursor-pointer text-center"
              >
                View Shopping Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

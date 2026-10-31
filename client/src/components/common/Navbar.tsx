import { useState, useEffect } from "react";
import {
  Search,
  LogIn,
  User,
  ShoppingBag,
  Menu,
  X,
  Heart,
  Plus,
  Minus,
  Trash2,
  LogOutIcon,
  Loader,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/index.ts";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "@/store/slices/states/auth";
import { useLogoutMutation } from "@/store/slices/api/userApi";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { debounce } from "lodash";
import { useMemo } from "react";
import {
  useClearMyCartMutation,
  useGetMyCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/store/slices/api/cartApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [keyword, setKeyword] = useState<string>("");
  const dispatch = useDispatch();
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const { data: cartResponse, isLoading: isCartLoading } = useGetMyCartQuery(
    undefined,
    {
      skip: !userInfo,
    },
  );

  const products = userInfo ? (cartResponse?.cart?.items ?? []) : [];
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [clearMyCart] = useClearMyCartMutation();

  console.log(cartResponse);
  console.log(products);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
  ];

  const searchProducts = useMemo(
    () =>
      debounce((searchTerm: string) => {
        if (searchTerm.trim() !== "") {
          navigate(
            `/products/filters?keyword=${encodeURIComponent(searchTerm)}`,
          );
        } else {
          navigate("/products/filters");
        }
      }, 500),
    [navigate],
  );

  const updateQuantity = async (key: string, type: "increase" | "decrease") => {
    const item = products.find((item) => item.key === key);

    if (!item) return;

    const totalProductQuantity = products
      .filter((cartItem) => cartItem.product._id === item.product._id)
      .reduce((total, cartItem) => total + cartItem.quantity, 0);

    if (type === "increase") {
      if (totalProductQuantity >= item.product.instock_count) {
        toast.error("Not enough stock available");
        return;
      }

      await updateCartItem({
        key,
        quantity: item.quantity + 1,
      }).unwrap();
    } else {
      const newQuantity = Math.max(1, item.quantity - 1);

      await updateCartItem({
        key,
        quantity: newQuantity,
      }).unwrap();
    }
  };

  const removeItem = async (key: string) => {
    if (key) {
      await removeCartItem(key).unwrap();
    }
  };

  const clearCart = async () => {
    try {
      const response = await clearMyCart().unwrap();
      toast(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal = products.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const totalItemsCount = products.reduce(
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

  const logoutHandler = async () => {
    try {
      const response = await logoutMutation({}).unwrap();
      dispatch(clearUserInfo());
      setIsCartOpen(false);
      navigate("/");
      toast.success(`${response.message}`);
    } catch (error) {
      console.log("Logout Error : ", error);
    }
  };

  const handleCheckout = async () => {
    if (products.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setIsCheckoutLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            items: products.map((item) => ({
              productId: item.product._id,
              quantity: item.quantity,
              size: item.size,
              color: item.color,
            })),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      if (!data.url) {
        throw new Error("Stripe Checkout URL was not returned");
      }

      window.location.href = data.url;
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Unable to start checkout",
      );
      setIsCheckoutLoading(false);
    }
  };

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
              <Link
                to="/"
                className="text-2xl font-bold tracking-widest text-zinc-900 uppercase"
              >
                FASHION<span className="text-amber-600">.</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={`${link.path.toLowerCase()}`}
                  className="relative text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors duration-200 group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-zinc-950 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              {userInfo ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-zinc-600 flex items-center gap-2 cursor-pointer">
                      <User size={20} /> <span className="text-sm" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      {userInfo.role === "admin" && (
                        <Link to="/admin">
                          <DropdownMenuItem className="cursor-pointer">
                            Dashboard
                          </DropdownMenuItem>
                        </Link>
                      )}
                      <Link to="/profile">
                        <DropdownMenuItem className="cursor-pointer">
                          Profile
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="cursor-pointer">
                        Order History
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Save Address
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="cursor-pointer
                           data-highlighted:bg-red-200
                          "
                        onClick={logoutHandler}
                        disabled={isLoading}
                      >
                        {" "}
                        <LogOutIcon size={18} className="text-red-400" />
                        <span className="text-red-400">Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  to="/login"
                  className="text-zinc-600 flex items-center gap-2 cursor-pointer"
                >
                  <LogIn size={20} /> <span className="text-sm" />
                </Link>
              )}

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
              <Link
                key={link.name}
                to={`${link.path.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-zinc-600 hover:text-zinc-900 py-2 border-b border-zinc-50"
              >
                {link.name}
              </Link>
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
              {userInfo ? (
                <button className="text-zinc-600 flex items-center gap-2 cursor-pointer">
                  <User size={20} /> <span className="text-sm" />
                  <span className="text-sm">Account</span>
                </button>
              ) : (
                <Link
                  className="text-zinc-600 flex items-center gap-2 cursor-pointer"
                  to="/login"
                >
                  <LogIn size={20} /> <span className="text-sm" />
                  <span className="text-sm">Login</span>
                </Link>
              )}
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
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                searchProducts(e.target.value);
              }}
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
              {isCartLoading ? <Loader size={20} /> : totalItemsCount}
            </span>

            {products.length > 3 && (
              <button
                onClick={clearCart}
                className=" bg-transparent text-zinc-600 hover:text-red-900 text-xs font-medium py-2 transition-colors cursor-pointer text-center"
              >
                Clear All
              </button>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {products.length === 0 ? (
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
            products.map((item) => (
              <div
                key={item.key}
                className="flex gap-4 pb-6 border-b border-zinc-100 items-start"
              >
                <div className="w-20 h-24 bg-zinc-50 border border-zinc-100 shrink-0 overflow-hidden">
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between gap-2">
                    <h4 className="text-sm font-medium text-zinc-900 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-sm font-bold text-zinc-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">Size: {item.size}</p>
                  <p className="text-xs text-zinc-400">Color: {item.color}</p>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center border border-zinc-200">
                      <button
                        onClick={() => updateQuantity(item.key, "decrease")}
                        className="p-1.5 text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-medium text-zinc-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          updateQuantity(item.key, "increase");
                        }}
                        className="p-1.5 text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.key)}
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

        {products?.length > 0 && (
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
              <button
                onClick={handleCheckout}
                disabled={isCheckoutLoading || products.length === 0}
                className="w-full cursor-pointer bg-zinc-900 hover:bg-zinc-800
    text-white font-medium text-sm py-4
    transition-colors shadow-md
    disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckoutLoading
                  ? "Redirecting to Stripe..."
                  : "Proceed to Checkout"}
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

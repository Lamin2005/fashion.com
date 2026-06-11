import { useState } from "react";
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  LogOut,
  Camera,
  ChevronRight,
  Package,
} from "lucide-react"; // သင့် project အလိုက် import ကို စစ်ဆေးပါ (ဥပမာ - lucide-react)

export default function UserProfilePage() {
  // လက်ရှိ ရွေးချယ်ထားသည့် Tab အား မှတ်သားရန် State
  const [activeTab, setActiveTab] = useState("profile");

  // Mock Data (ဒီဇိုင်းလှပစွာ ပေါ်စေရန်)
  const userMockData = {
    name: "Thuta Sann",
    email: "thutasann@fashion.com",
    avatar: "", // ဓာတ်ပုံမရှိလျှင် Initial စာလုံးပြရန်
    joinedDate: "Member since Jan 2026",
  };

  const ordersMockData = [
    {
      id: "ORD-9284",
      date: "June 08, 2026",
      total: "$120.00",
      status: "Delivered",
    },
    {
      id: "ORD-8172",
      date: "May 24, 2026",
      total: "$85.00",
      status: "In Transit",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 border-b border-zinc-100 pb-6">
          <h1 className="text-xl font-bold uppercase tracking-widest text-zinc-900">
            My Account
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            {userMockData.joinedDate}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* =========================================================
              LEFT SIDEBAR NAVIGATION
             ========================================================= */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Short Info */}
            <div className="flex items-center space-x-4 p-4 bg-zinc-50 border border-zinc-100">
              <div className="relative group cursor-pointer">
                <div className="w-12 h-12 bg-zinc-900 text-white flex items-center justify-center font-bold text-sm tracking-wider uppercase">
                  {userMockData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-800 tracking-wide">
                  {userMockData.name}
                </h2>
                <p className="text-xs text-zinc-400 truncate max-w-[160px]">
                  {userMockData.email}
                </p>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col space-y-1">
              {[
                { id: "profile", label: "Profile Information", icon: User },
                { id: "orders", label: "Order History", icon: ShoppingBag },
                { id: "addresses", label: "Saved Addresses", icon: MapPin },
                { id: "wishlist", label: "My Wishlist", icon: Heart },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center justify-between w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-medium transition-all ${
                      activeTab === item.id
                        ? "bg-zinc-900 text-white font-bold"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 stroke-[1.5]" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight
                      className={`w-3 h-3 opacity-60 ${activeTab === item.id ? "block" : "hidden lg:block"}`}
                    />
                  </button>
                );
              })}

              <button className="flex items-center space-x-3 w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-medium text-red-600 hover:bg-red-50/50 transition-all mt-4">
                <LogOut className="w-4 h-4 stroke-[1.5]" />
                <span>Log Out</span>
              </button>
            </nav>
          </div>

          {/* =========================================================
              RIGHT CONTENT AREA (DYNAMIC BASED ON ACTIVE TAB)
             ========================================================= */}
          <div className="lg:col-span-3 border border-zinc-100 p-6 sm:p-8">
            {/* TAB 1: PROFILE INFORMATION */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-100 pb-3">
                  Account Details
                </h3>

                <form
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Thuta"
                      className="w-full text-xs p-3 border border-zinc-200 focus:border-zinc-900 outline-none transition-colors rounded-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Sann"
                      className="w-full text-xs p-3 border border-zinc-200 focus:border-zinc-900 outline-none transition-colors rounded-none"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={userMockData.email}
                      className="w-full text-xs p-3 border border-zinc-200 bg-zinc-50 text-zinc-400 outline-none rounded-none cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+95 9_ ___ ___"
                      className="w-full text-xs p-3 border border-zinc-200 focus:border-zinc-900 outline-none transition-colors rounded-none"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-4">
                    <button
                      type="submit"
                      className="bg-zinc-900 text-white text-xs uppercase tracking-widest font-bold py-3 px-8 hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: ORDER HISTORY */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-100 pb-3">
                  Order History
                </h3>

                <div className="space-y-4">
                  {ordersMockData.map((order) => (
                    <div
                      key={order.id}
                      className="border border-zinc-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-300 transition-all"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-2.5 bg-zinc-50 border border-zinc-100 text-zinc-700">
                          <Package className="w-5 h-5 stroke-[1.2]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900 tracking-wide">
                            {order.id}
                          </p>
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            Placed on {order.date}
                          </p>
                          <p className="text-xs font-semibold text-zinc-800 mt-1">
                            Total: {order.total}
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-between sm:items-end justify-between sm:justify-center gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            order.status === "Delivered"
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {order.status}
                        </span>
                        <button className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 underline cursor-pointer">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SAVED ADDRESSES */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">
                    Shipping Addresses
                  </h3>
                  <button className="text-xs font-bold uppercase tracking-wider text-zinc-900 border border-zinc-900 px-3 py-1.5 hover:bg-zinc-900 hover:text-white transition-all cursor-pointer">
                    Add New
                  </button>
                </div>

                {/* Address Card */}
                <div className="border border-zinc-900 p-5 relative max-w-md">
                  <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest bg-zinc-900 text-white px-2 py-0.5">
                    Default
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                    Home Address
                  </p>
                  <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                    No. 123, Kamayut Township,
                    <br />
                    Yangon, Myanmar.
                  </p>
                  <p className="text-xs text-zinc-500 mt-2">
                    Phone: +95 9123456789
                  </p>

                  <div className="flex space-x-4 mt-4 pt-4 border-t border-zinc-100 text-[11px] font-bold uppercase tracking-wider">
                    <button className="text-zinc-600 hover:text-zinc-900 cursor-pointer">
                      Edit
                    </button>
                    <button className="text-zinc-400 hover:text-red-600 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: WISHLIST */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-100 pb-3">
                  My Wishlist (2)
                </h3>

                {/* Simple Minimal Grid for Wishlist items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Oversized Cotton Trench Coat",
                      price: "$189.00",
                      img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60",
                    },
                    {
                      name: "Classic Leather Loafers",
                      price: "$120.00",
                      img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&auto=format&fit=crop&q=60",
                    },
                  ].map((product, idx) => (
                    <div
                      key={idx}
                      className="flex border border-zinc-100 group"
                    >
                      <div className="w-20 h-24 bg-zinc-100 overflow-hidden relative flex-shrink-0">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3 flex flex-col justify-between flex-grow">
                        <div>
                          <h4 className="text-xs font-medium text-zinc-800 line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-xs font-bold text-zinc-900 mt-1">
                            {product.price}
                          </p>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 hover:underline cursor-pointer">
                            Add to Cart
                          </button>
                          <button className="text-[10px] text-zinc-400 hover:text-red-600 cursor-pointer">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

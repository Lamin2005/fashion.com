import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Plus, Package, CheckCircle2, AlertCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock Product Data
const mockProducts = [
  {
    id: "1",
    name: "Oversized Wool Coat",
    price: 45000,
    category: "Apparel",
    instock_count: 25,
    preview:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60",
    is_new_arrival: true,
  },
  {
    id: "2",
    name: "Leather Chelsea Boots",
    price: 85000,
    category: "Footwear",
    instock_count: 0, // Out of stock example
    preview:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60",
    is_new_arrival: false,
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Stats calculations
  const totalProducts = mockProducts.length;
  const inStockCount = mockProducts.filter((p) => p.instock_count > 0).length;
  const outOfStockCount = mockProducts.filter(
    (p) => p.instock_count === 0,
  ).length;

  return (
    <div className="space-y-6 overflow-y-auto scrollbar-none min-h-screen w-full bg-zinc-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-6">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Products Management
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your store's inventory, prices, and product details
            efficiently.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to="/admin/create-products"
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
          >
            <Plus size={16} />
            Add Product
          </NavLink>
        </div>
      </div>

      {/* Stat Cards (Total, In Stock, Out of Stock) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {/* Total Products */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/70">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
              <Package size={20} />
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-zinc-500">
            Total Products
          </p>
          <p className="mt-1 font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {totalProducts}
          </p>
        </div>

        {/* In Stock */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/70">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-zinc-500">In Stock</p>
          <p className="mt-1 font-serif text-2xl font-semibold tracking-tight text-emerald-400 sm:text-3xl">
            {inStockCount}
          </p>
        </div>

        {/* Out of Stock */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/70">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <AlertCircle size={20} />
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-zinc-500">Out of Stock</p>
          <p className="mt-1 font-serif text-2xl font-semibold tracking-tight text-red-400 sm:text-3xl">
            {outOfStockCount}
          </p>
        </div>
      </div>

      {/* Main Content Card with Table */}
      <Card className="border-zinc-800/80 bg-zinc-900/40 text-white rounded-2xl">
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-4">
          <div>
            <CardTitle className="font-serif text-lg font-semibold text-white">
              Product Inventory
            </CardTitle>
            <CardDescription className="text-zinc-500 text-xs">
              A list of all products currently available in your database.
            </CardDescription>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full border-zinc-800 bg-zinc-950 pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600 rounded-xl"
            />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

import {
  ArrowUpRight,
  MoreHorizontal,
  ShoppingBag,
  Package,
  Eye,
  Plus,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetProductsQuery } from "@/store/slices/productApi";
import ProductStatusCard from "@/components/admin/ProductStatusCard";
import DailyProductChart from "@/components/admin/DailyProductChart";

const recentOrders = [
  {
    id: "#ORD-7291",
    customer: "Ayesha Khan",
    amount: "$249.00",
    status: "Delivered",
    date: "2 min ago",
  },
  {
    id: "#ORD-7290",
    customer: "Marcus Lee",
    amount: "$89.50",
    status: "Processing",
    date: "18 min ago",
  },
  {
    id: "#ORD-7289",
    customer: "Sara Ahmed",
    amount: "$412.75",
    status: "Pending",
    date: "1 hr ago",
  },
  {
    id: "#ORD-7288",
    customer: "Daniel Park",
    amount: "$59.99",
    status: "Delivered",
    date: "3 hr ago",
  },
  {
    id: "#ORD-7287",
    customer: "Nadia Rahman",
    amount: "$178.20",
    status: "Cancelled",
    date: "5 hr ago",
  },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Processing: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const topProducts = [
  { name: "Oversized Wool Coat", sold: 342, revenue: "$18,420", progress: 82 },
  {
    name: "Leather Chelsea Boots",
    sold: 289,
    revenue: "$14,290",
    progress: 68,
  },
  { name: "Silk Scarf — Autumn", sold: 214, revenue: "$6,420", progress: 51 },
  { name: "Linen Blazer", sold: 178, revenue: "$9,890", progress: 42 },
];

// Simple bar chart data (last 7 days)
const salesData = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 62 },
  { day: "Wed", value: 38 },
  { day: "Thu", value: 74 },
  { day: "Fri", value: 88 },
  { day: "Sat", value: 56 },
  { day: "Sun", value: 71 },
];

function Dashboard() {
  const maxValue = Math.max(...salesData.map((d) => d.value));
  const { data: product, isLoading } = useGetProductsQuery({});
  const products = product?.products || [];
  return (
    <div className="space-y-6 overflow-y-auto scrollbar-none">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Welcome back, Administrator. Here's what's happening today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to="/admin/analytics"
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
          >
            <Eye size={16} />
            View Analytics
          </NavLink>
          <NavLink
            to="/admin/create-products"
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
          >
            <Plus size={16} />
            Add Product
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ProductStatusCard
          title="Total Products"
          count={products?.length || 0}
          icon={<ShoppingBag className="h-6 w-6" />}
          status="Products"
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6 xl:col-span-2">
          <DailyProductChart />

          {/* Bars */}
          <div className="mt-6 flex h-48 items-end justify-between gap-2 sm:gap-4">
            {salesData.map((d) => {
              const height = (d.value / maxValue) * 100;
              return (
                <div
                  key={d.day}
                  className="group flex flex-1 flex-col items-center gap-2"
                >
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      style={{ height: `${height}%` }}
                      className="w-full rounded-t-lg bg-linear-to-t from-amber-500/40 to-amber-400 transition-all duration-300 group-hover:from-amber-400/60 group-hover:to-amber-300"
                    />
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg border border-zinc-700 bg-zinc-950 px-2 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      ${(d.value * 100).toLocaleString()}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-zinc-500">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top products */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-serif text-lg font-semibold text-white">
                Top Products
              </h2>
              <p className="mt-0.5 text-xs text-zinc-500">
                Best sellers this month
              </p>
            </div>
            <button
              type="button"
              aria-label="More options"
              className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {topProducts.map((p) => (
              <div key={p.name}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                      <Package size={16} className="text-zinc-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {p.name}
                      </p>
                      <p className="text-xs text-zinc-500">{p.sold} sold</p>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-sm font-semibold text-amber-400">
                    {p.revenue}
                  </span>
                </div>

                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    style={{ width: `${p.progress}%` }}
                    className="h-full rounded-full bg-linear-to-r from-amber-500 to-amber-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Recent orders ---------- */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40">
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-serif text-lg font-semibold text-white">
              Recent Orders
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500">
              Latest transactions from your store
            </p>
          </div>
          <NavLink
            to="/admin/orders"
            className="flex items-center gap-1 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
          >
            View all
            <ArrowUpRight size={14} />
          </NavLink>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-640px">
            <thead>
              <tr className="border-b border-zinc-800/80 text-left">
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-600 sm:px-6">
                  Order ID
                </th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-600 sm:px-6">
                  Customer
                </th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-600 sm:px-6">
                  Amount
                </th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-600 sm:px-6">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-widest text-zinc-600 sm:px-6">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-zinc-800/40 transition-colors last:border-0 hover:bg-zinc-900/50"
                >
                  <td className="px-5 py-4 font-mono text-sm font-medium text-white sm:px-6">
                    {o.id}
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-300 sm:px-6">
                    {o.customer}
                  </td>
                  <td className="px-5 py-4 font-mono text-sm font-semibold text-amber-400 sm:px-6">
                    {o.amount}
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[o.status]}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right text-xs text-zinc-500 sm:px-6">
                    {o.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

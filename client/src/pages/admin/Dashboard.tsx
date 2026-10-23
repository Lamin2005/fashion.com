import { ArrowUpRight, ShoppingBag, Eye, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetProductsQuery } from "@/store/slices/productApi";
import ProductStatusCard from "@/components/admin/ProductStatusCard";
import DailyProductChart from "@/components/admin/DailyProductChart";
import type { Product } from "@/types/product";
import StockLevel from "@/components/admin/StockLevel";
import { fakeOrders } from "@/lib/utils";
import type { Order } from "@/types/order";
import { formatRelativeTime } from "@/lib/utils";

const statusStyles: Record<Order["status"], string> = {
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

  processing: "bg-sky-500/10 text-sky-400 border-sky-500/20",

  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",

  shipped: "bg-violet-500/10 text-violet-400 border-violet-500/20",

  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const paymentStatusStyles: Record<Order["payment_status"], string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",

  paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

  failed: "bg-red-500/10 text-red-400 border-red-500/20",

  refunded: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

function Dashboard() {
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
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-serif text-lg font-semibold text-white">
                Recent Products
              </h2>
              <p className="mt-0.5 text-xs text-zinc-500">
                recent products list
              </p>
            </div>
            <NavLink
              to="/admin/products"
              className="flex items-center gap-1 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
            >
              View all
              <ArrowUpRight size={14} />
            </NavLink>
          </div>

          <div className="mt-5 space-y-4">
            {products.slice(0, 7).map((p: Product) => {
              return <StockLevel product={p} key={p._id} />;
            })}
          </div>
        </div>
      </div>

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
                  Total
                </th>

                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-600 sm:px-6">
                  Payment
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
              {fakeOrders.map((o: Order) => (
                <tr
                  key={o._id}
                  className="border-b border-zinc-800/40 transition-colors last:border-0 hover:bg-zinc-900/50"
                >
                  <td className="px-5 py-4 font-mono text-sm font-medium text-white sm:px-6">
                    {o._id}
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-300 sm:px-6">
                    {o.user_id}
                  </td>
                  <td className="px-5 py-4 font-mono text-sm font-semibold text-amber-400 sm:px-6">
                    {o.total_price} MMK
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${
                        paymentStatusStyles[o.payment_status]
                      }`}
                    >
                      {o.payment_status}
                    </span>
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[o.status]}`}
                    >
                      {o.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right text-xs text-zinc-500 sm:px-6">
                    {formatRelativeTime(o.createdAt)}
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

import { Search, Package, CalendarDays, Loader2, Eye } from "lucide-react";

import type { Order } from "@/types/order";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type OrderStatus = Order["status"];

type OrderTableProps = {
  orders: Order[];
  filteredOrders: Order[];
  isLoading: boolean;
  search: string;
  filter: string;
  setSearch: (value: string) => void;
  setFilter: (value: string) => void;
  setSelectedOrder: (order: Order) => void;
};

const statusStyles: Record<OrderStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  processing: "border-blue-200 bg-blue-50 text-blue-700",
  shipped: "border-violet-200 bg-violet-50 text-violet-700",
  delivered: "border-emerald-200 bg-emerald-50 text-emerald-700",
  cancelled: "border-red-200 bg-red-50 text-red-700",
};

const OrderTable = ({
  orders,
  filteredOrders,
  isLoading,
  search,
  filter,
  setSearch,
  setFilter,
  setSelectedOrder,
}: OrderTableProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl border-gray-200 shadow-sm">
      <CardHeader className="space-y-4 border-b border-gray-100">
        <div>
          <CardTitle className="text-xl font-semibold text-black">
            Order History
          </CardTitle>
          <CardDescription className="mt-1">
            View and manage all your previous purchases.
          </CardDescription>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order number..."
              className="h-10 border-gray-200 bg-white pl-9 text-black"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-black"
          >
            <option value="All">All Orders</option>
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <p className="mt-3 text-sm text-gray-500">Loading your orders...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-187.5 text-left">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Items</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Payment</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="transition-colors hover:bg-gray-50/80"
                  >
                    <td className="px-6 py-5">
                      <span className="font-semibold text-black">
                        {order._id}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays size={14} />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {order.items.length} Items
                    </td>

                    <td className="px-6 py-5 font-semibold text-black">
                      ${order.total_price.toFixed(2)}
                    </td>

                    <td className="px-6 py-5">
                      <Badge
                        variant="outline"
                        className={
                          order.payment_status === "paid"
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-amber-200 bg-amber-50 text-amber-700"
                        }
                      >
                        {order.payment_status}
                      </Badge>
                    </td>

                    <td className="px-6 py-5">
                      <Badge
                        variant="outline"
                        className={statusStyles[order.status]}
                      >
                        {order.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="border-gray-200 text-gray-700 hover:bg-black hover:text-white"
                      >
                        <Eye size={14} className="mr-2" />
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
            <div className="rounded-full bg-gray-100 p-5">
              <Package size={30} className="text-gray-400" />
            </div>

            <h3 className="mt-4 font-semibold text-black">No orders found</h3>

            <p className="mt-1 text-sm text-gray-500">
              Try another search or filter.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <p className="text-xs text-gray-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTable;

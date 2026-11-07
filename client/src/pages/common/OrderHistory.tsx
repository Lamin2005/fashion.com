import { useMemo, useState } from "react";
import {
  Search,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Eye,
  ShoppingBag,
  CalendarDays,
} from "lucide-react";

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

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type PaymentStatus = "Paid" | "Unpaid";

interface Order {
  _id: string;
  orderNumber: string;
  date: string;
  items: number;
  total: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
}

const initialOrders: Order[] = [
  {
    _id: "1",
    orderNumber: "ORD-1025",
    date: "Nov 05, 2026",
    items: 3,
    total: 250,
    paymentStatus: "Paid",
    status: "Delivered",
  },
  {
    _id: "2",
    orderNumber: "ORD-1024",
    date: "Nov 03, 2026",
    items: 2,
    total: 180,
    paymentStatus: "Paid",
    status: "Shipped",
  },
  {
    _id: "3",
    orderNumber: "ORD-1023",
    date: "Oct 29, 2026",
    items: 1,
    total: 85,
    paymentStatus: "Paid",
    status: "Processing",
  },
  {
    _id: "4",
    orderNumber: "ORD-1022",
    date: "Oct 25, 2026",
    items: 4,
    total: 320,
    paymentStatus: "Unpaid",
    status: "Pending",
  },
  {
    _id: "5",
    orderNumber: "ORD-1021",
    date: "Oct 20, 2026",
    items: 2,
    total: 120,
    paymentStatus: "Paid",
    status: "Cancelled",
  },
];

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Processing: "bg-blue-100 text-blue-700 border-blue-200",
  Shipped: "bg-purple-100 text-purple-700 border-purple-200",
  Delivered: "bg-green-100 text-green-700 border-green-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
};

const statusIcons = {
  Pending: Clock,
  Processing: Package,
  Shipped: Truck,
  Delivered: CheckCircle2,
  Cancelled: XCircle,
};

function OrderHistoryPage() {
  const [orders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.orderNumber
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter = filter === "All" || order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, filter]);

  const totalSpent = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((total, order) => total + order.total, 0);

  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const activeCount = orders.filter(
    (order) =>
      order.status === "Pending" ||
      order.status === "Processing" ||
      order.status === "Shipped",
  ).length;

  return (
    <section className="min-h-screen w-full bg-zinc-50 px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black">
              My Orders
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Track your orders and view your purchase history.
            </p>
          </div>

          <Button
            onClick={() => (window.location.href = "/products")}
            className="bg-black px-6 text-white hover:bg-zinc-800"
          >
            <ShoppingBag size={16} className="mr-2" />
            Continue Shopping
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Orders",
              value: orders.length,
              icon: Package,
            },
            {
              title: "Delivered",
              value: deliveredCount,
              icon: CheckCircle2,
            },
            {
              title: "Active Orders",
              value: activeCount,
              icon: Truck,
            },
            {
              title: "Total Spent",
              value: `$${totalSpent.toFixed(2)}`,
              icon: ShoppingBag,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="rounded-xl border-gray-200 shadow-sm"
              >
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <h2 className="mt-2 text-2xl font-bold text-black">
                      {item.value}
                    </h2>
                  </div>

                  <div className="rounded-xl bg-zinc-100 p-3 text-black">
                    <Icon size={22} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Orders */}
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
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {filteredOrders.length > 0 ? (
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
                      <th className="px-6 py-4 text-right font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map((order) => {
                      const StatusIcon = statusIcons[order.status];

                      return (
                        <tr
                          key={order._id}
                          className="transition-colors hover:bg-gray-50/80"
                        >
                          <td className="px-6 py-5">
                            <span className="font-semibold text-black">
                              {order.orderNumber}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <CalendarDays size={14} />
                              {order.date}
                            </div>
                          </td>

                          <td className="px-6 py-5 text-sm text-gray-600">
                            {order.items} Items
                          </td>

                          <td className="px-6 py-5 font-semibold text-black">
                            ${order.total.toFixed(2)}
                          </td>

                          <td className="px-6 py-5">
                            <Badge
                              variant="outline"
                              className={
                                order.paymentStatus === "Paid"
                                  ? "border-green-200 bg-green-50 text-green-700"
                                  : "border-amber-200 bg-amber-50 text-amber-700"
                              }
                            >
                              {order.paymentStatus}
                            </Badge>
                          </td>

                          <td className="px-6 py-5">
                            <Badge
                              variant="outline"
                              className={statusStyles[order.status]}
                            >
                              <StatusIcon size={12} className="mr-1" />
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
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
                <div className="rounded-full bg-gray-100 p-5">
                  <Package size={30} className="text-gray-400" />
                </div>

                <h3 className="mt-4 font-semibold text-black">
                  No orders found
                </h3>

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

        {/* Order Details */}
        {selectedOrder && (
          <Card className="rounded-2xl border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg text-black">
                  Order Details
                </CardTitle>
                <CardDescription>{selectedOrder.orderNumber}</CardDescription>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </Button>
            </CardHeader>

            <CardContent className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-xs text-gray-500">Order Date</p>
                <p className="mt-1 font-medium text-black">
                  {selectedOrder.date}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Total Items</p>
                <p className="mt-1 font-medium text-black">
                  {selectedOrder.items}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Total Amount</p>
                <p className="mt-1 font-semibold text-black">
                  ${selectedOrder.total.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

export default OrderHistoryPage;

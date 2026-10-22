import { useState } from "react";
import {
  ShoppingCart,
  Clock,
  PackageCheck,
  CircleCheck,
  Search,
  CalendarDays,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type PaymentStatus = "Paid" | "Unpaid" | "Refunded";

interface Order {
  _id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
}

const orders: Order[] = [
  {
    _id: "ORD-1001",
    customer: "Aung Min",
    email: "aungmin@example.com",
    date: "Oct 22, 2026",
    items: 3,
    total: 125000,
    paymentStatus: "Paid",
    status: "Delivered",
  },
  {
    _id: "ORD-1002",
    customer: "Su Mon",
    email: "sumon@example.com",
    date: "Oct 22, 2026",
    items: 2,
    total: 85000,
    paymentStatus: "Paid",
    status: "Processing",
  },
  {
    _id: "ORD-1003",
    customer: "Kyaw Zin",
    email: "kyawzin@example.com",
    date: "Oct 21, 2026",
    items: 1,
    total: 45000,
    paymentStatus: "Unpaid",
    status: "Pending",
  },
  {
    _id: "ORD-1004",
    customer: "May Thu",
    email: "maythu@example.com",
    date: "Oct 21, 2026",
    items: 4,
    total: 210000,
    paymentStatus: "Paid",
    status: "Shipped",
  },
  {
    _id: "ORD-1005",
    customer: "Htet Aung",
    email: "htetaung@example.com",
    date: "Oct 20, 2026",
    items: 2,
    total: 65000,
    paymentStatus: "Refunded",
    status: "Cancelled",
  },
  {
    _id: "ORD-1006",
    customer: "Thiri Win",
    email: "thiri@example.com",
    date: "Oct 20, 2026",
    items: 3,
    total: 150000,
    paymentStatus: "Paid",
    status: "Processing",
  },
];

const statusStyles: Record<OrderStatus, string> = {
  Pending: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  Processing: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  Shipped: "border-violet-500/20 bg-violet-500/10 text-violet-400",
  Delivered: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Cancelled: "border-red-500/20 bg-red-500/10 text-red-400",
};

const paymentStyles: Record<PaymentStatus, string> = {
  Paid: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Unpaid: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  Refunded: "border-zinc-700 bg-zinc-800 text-zinc-400",
};

const stats = [
  {
    title: "Total Orders",
    icon: ShoppingCart,
    color: "bg-amber-500/10 text-amber-400",
    getCount: (data: Order[]) => data.length,
  },
  {
    title: "Pending Orders",
    icon: Clock,
    color: "bg-amber-500/10 text-amber-400",
    getCount: (data: Order[]) =>
      data.filter((order) => order.status === "Pending").length,
  },
  {
    title: "Processing Orders",
    icon: PackageCheck,
    color: "bg-blue-500/10 text-blue-400",
    getCount: (data: Order[]) =>
      data.filter((order) => order.status === "Processing").length,
  },
  {
    title: "Completed Orders",
    icon: CircleCheck,
    color: "bg-emerald-500/10 text-emerald-400",
    getCount: (data: Order[]) =>
      data.filter((order) => order.status === "Delivered").length,
  },
];

function OrderPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [payment, setPayment] = useState("All Payments");

  const filteredOrders = orders.filter((order) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm) ||
      order.email.toLowerCase().includes(searchTerm);

    const matchesStatus = status === "All Status" || order.status === status;

    const matchesPayment =
      payment === "All Payments" || order.paymentStatus === payment;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const formatPrice = (price: number) => `${price.toLocaleString("en-US")} MMK`;

  return (
    <div className="min-w-0 space-y-6 pb-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Orders
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Manage customer orders, payments, and delivery status.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="h-10 gap-2 border-zinc-800 bg-zinc-900/50 text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            <CalendarDays className="size-4" />
            Date Range
          </Button>

          <Button className="h-10 gap-2 bg-amber-400 font-semibold text-zinc-950 hover:bg-amber-300">
            <Download className="size-4" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="group border-zinc-800/80 bg-zinc-900/40 text-white shadow-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <Icon className="size-5" />
                  </div>

                  <span className="rounded-md border border-zinc-800 bg-zinc-950/50 px-2 py-1 text-xs text-zinc-500">
                    Orders
                  </span>
                </div>

                <p className="mt-4 text-sm font-medium text-zinc-500">
                  {stat.title}
                </p>

                <p className="mt-1 font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {stat.getCount(orders).toLocaleString()}
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  {stat.title === "Total Orders"
                    ? "All customer orders"
                    : stat.title === "Pending Orders"
                      ? "Awaiting confirmation"
                      : stat.title === "Processing Orders"
                        ? "Currently being prepared"
                        : "Successfully delivered"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Orders Table Card */}
      <Card className="overflow-hidden border-zinc-800/80 bg-zinc-900/40 text-white shadow-sm">
        <CardHeader className="flex flex-col gap-3 space-y-0 border-b border-zinc-800 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-white">
              All Orders
            </CardTitle>

            <p className="mt-1 text-sm text-zinc-500">
              View and manage your customer orders.
            </p>
          </div>

          <Badge
            variant="outline"
            className="w-fit border-zinc-700 bg-zinc-800/50 text-zinc-400"
          >
            {filteredOrders.length} orders
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          {/* Search and Filters */}
          <div className="flex flex-col gap-3 border-b border-zinc-800 p-4 md:flex-row md:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search order ID or customer..."
                className="h-10 border-zinc-800 bg-zinc-950/60 pl-9 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-amber-500/40"
              />
            </div>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 outline-none transition-colors focus:border-amber-500/50"
              aria-label="Filter by order status"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

            <select
              value={payment}
              onChange={(event) => setPayment(event.target.value)}
              className="h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 outline-none transition-colors focus:border-amber-500/50"
              aria-label="Filter by payment status"
            >
              <option>All Payments</option>
              <option>Paid</option>
              <option>Unpaid</option>
              <option>Refunded</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="whitespace-nowrap px-5 text-xs font-medium text-zinc-500">
                    Order ID
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Customer
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Date
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Items
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Total
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Payment
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Status
                  </TableHead>

                  <TableHead className="px-5 text-right text-xs font-medium text-zinc-500">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow
                    key={order._id}
                    className="border-zinc-800/80 transition-colors hover:bg-zinc-800/30"
                  >
                    <TableCell className="whitespace-nowrap px-5 font-medium text-white">
                      {order._id}
                    </TableCell>

                    <TableCell>
                      <div className="flex min-w-40 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-semibold text-zinc-300">
                          {order.customer
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-zinc-200">
                            {order.customer}
                          </p>

                          <p className="max-w-44 truncate text-xs text-zinc-500">
                            {order.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm text-zinc-400">
                      {order.date}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm text-zinc-400">
                      {order.items} items
                    </TableCell>

                    <TableCell className="whitespace-nowrap font-medium text-zinc-200">
                      {formatPrice(order.total)}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`whitespace-nowrap ${paymentStyles[order.paymentStatus]}`}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`whitespace-nowrap ${statusStyles[order.status]}`}
                      >
                        <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                        {order.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-5 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`View order ${order._id}`}
                        className="size-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      >
                        <Eye className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredOrders.length === 0 && (
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableCell colSpan={8} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-zinc-500">
                        <Package className="size-8 text-zinc-600" />

                        <p className="text-sm font-medium text-zinc-400">
                          No orders found
                        </p>

                        <p className="text-xs">
                          Try changing your search or filters.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-zinc-800 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-500">
              Showing{" "}
              <span className="font-medium text-zinc-300">
                {filteredOrders.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-zinc-300">{orders.length}</span>{" "}
              orders
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled
                className="h-9 gap-2 border-zinc-800 bg-transparent px-3 text-zinc-400 disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>

              <Button
                variant="outline"
                className="h-9 min-w-9 border-amber-500/30 bg-amber-500/10 px-3 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300"
              >
                1
              </Button>

              <Button
                variant="outline"
                className="h-9 gap-2 border-zinc-800 bg-transparent px-3 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderPage;

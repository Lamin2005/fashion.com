import { useState } from "react";
import {
  ShoppingCart,
  Clock,
  PackageCheck,
  CircleCheck,
  Search,
  Download,
  Eye,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  Select,
  SelectValue,
} from "@/components/ui/select";
import ProductStatusCard from "@/components/admin/ProductStatusCard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAllOrdersQuery,
  useGetOrderStatusQuery,
  useLazyExportOrdersQuery,
} from "@/store/slices/api/orderApi";
import { type Order } from "@/types/order";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderUpdateDialog from "@/components/admin/OrderUpdateDialog";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

import OrderDateRangePicker from "@/components/admin/OrderDateRangePicker";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

type PaymentStatus = "paid" | "refunded" | "pending" | "failed";

const statusStyles: Record<OrderStatus, string> = {
  pending: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  processing: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  shipped: "border-violet-500/20 bg-violet-500/10 text-violet-400",
  delivered: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  cancelled: "border-red-500/20 bg-red-500/10 text-red-400",
};

const paymentStyles: Record<PaymentStatus, string> = {
  paid: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  pending: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
  refunded: "border-zinc-700 bg-zinc-800 text-zinc-400",
};

function OrderPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [payment, setPayment] = useState("all");

  const [sort, setSort] = useState("newest");

  const itemsPerPage = 10;

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const [exportOrders, { isFetching: isExporting }] =
    useLazyExportOrdersQuery();

  const { data, isFetching } = useGetAllOrdersQuery({
    page: currentPage,
    limit: itemsPerPage,
    keyword: search.trim(),
    status,
    payment_status: payment,
    sort,
    startDate: dateRange?.from
      ? format(dateRange.from, "yyyy-MM-dd")
      : undefined,
    endDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
  });

  const { data: orderstats, isLoading: isStatusLoading } =
    useGetOrderStatusQuery("", {
      pollingInterval: 3000,
    });

  console.log(orderstats);

  const orders = data?.orders ?? [];

  const pagination = data?.pagination;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handlePaymentChange = (value: string) => {
    setPayment(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  const handleExport = async () => {
    try {
      const blob = await exportOrders({
        page: 1,
        limit: itemsPerPage,
        keyword: search.trim(),
        status,
        payment_status: payment,
        sort,
        startDate: dateRange?.from
          ? format(dateRange.from, "yyyy-MM-dd")
          : undefined,
        endDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
      }).unwrap();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `orders-${format(new Date(), "yyyy-MM-dd")}.csv`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export orders error:", error);
    }
  };

  const formatPrice = (price: number) => `${price.toLocaleString("en-US")} MMK`;

  return (
    <div className="min-w-0 space-y-6 pb-6">
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
          <OrderDateRangePicker
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />

          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="h-10 gap-2 bg-amber-400 font-semibold text-zinc-950 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="size-4" />

            {isExporting ? "Exporting..." : "Export Orders"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ProductStatusCard
          title="Total Orders"
          count={orderstats?.stats?.totalOrders ?? 0}
          icon={<ShoppingCart className="size-6" />}
          status="Total Orders"
          isLoading={isStatusLoading}
        />

        <ProductStatusCard
          title="Pending Orders"
          count={orderstats?.stats?.pendingOrders ?? 0}
          icon={<Clock className="size-6" />}
          status="Pending Orders"
          isLoading={isStatusLoading}
        />

        <ProductStatusCard
          title="Processing Orders"
          count={orderstats?.stats?.processingOrders ?? 0}
          icon={<PackageCheck className="size-6" />}
          status="Processing Orders"
          isLoading={isStatusLoading}
        />

        <ProductStatusCard
          title="Shipped Orders"
          count={orderstats?.stats?.completedOrders ?? 0}
          icon={<CircleCheck className="size-6" />}
          status="Shipped Orders"
          isLoading={isStatusLoading}
        />
      </div>

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
            {orderstats?.stats?.totalOrders || 0} orders
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b border-zinc-800 p-4 md:flex-row md:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />

              <Input
                placeholder="Search customer, email, phone..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="h-10 border-zinc-800 bg-zinc-950/60 pl-9 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-amber-500/40"
              />
            </div>

            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={payment} onValueChange={handlePaymentChange}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    className="border-zinc-800/80 transition-colors hover:bg-zinc-800/30"
                  >
                    <TableCell className="whitespace-nowrap px-5 font-medium text-white">
                      ORD-{order._id.slice(0, 5)}...
                    </TableCell>

                    <TableCell>
                      <div className="flex min-w-40 items-center gap-3">
                        {order.user_id?.avatar ? (
                          <img
                            src={order.user_id?.avatar?.image_url}
                            alt={order.user_id?.name}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm object-cover"
                          />
                        ) : (
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-semibold text-zinc-300">
                            {order.user_id?.name.slice(0, 2)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="font-medium text-zinc-200">
                            {order.user_id?.name}
                          </p>

                          <p className="max-w-44 truncate text-xs text-zinc-500">
                            {order.user_id?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm text-zinc-400">
                      {order.createdAt}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm text-zinc-400">
                      {order.items.length} items
                    </TableCell>

                    <TableCell className="whitespace-nowrap font-medium text-zinc-200">
                      {formatPrice(order.total_price)}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`whitespace-nowrap ${paymentStyles[order.payment_status]}`}
                      >
                        {order.payment_status}
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
                        onClick={() => {
                          setSelectedOrder(order);
                          setOpen(true);
                        }}
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

                {orders.length === 0 && (
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

          {selectedOrder && (
            <OrderUpdateDialog
              key={selectedOrder._id}
              order={selectedOrder}
              open={open}
              onOpenChange={setOpen}
            />
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800 px-5 py-4">
            <p className="text-sm text-zinc-500">
              Showing{" "}
              <span className="font-medium text-zinc-200">
                {pagination && pagination.totalOrders > 0
                  ? (currentPage - 1) * itemsPerPage + 1
                  : 0}
                {" - "}
                {Math.min(
                  currentPage * itemsPerPage,
                  pagination?.totalOrders ?? 0,
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium text-zinc-200">
                {pagination?.totalOrders ?? 0}
              </span>{" "}
              orders
            </p>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination?.hasPrevPage || isFetching}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="h-9 gap-1 border-zinc-800 bg-zinc-950 px-3 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>

              {Array.from(
                { length: pagination?.totalPages ?? 0 },
                (_, index) => index + 1,
              ).map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  size="sm"
                  disabled={isFetching}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "h-9 min-w-9 border-zinc-800 bg-zinc-950 px-3 text-sm font-medium transition-all",
                    "hover:border-zinc-600 hover:bg-zinc-800 hover:text-white",
                    currentPage === page &&
                      currentPage === page &&
                      "border-yellow-400 bg-yellow-400 text-black hover:border-yellow-300 hover:bg-yellow-300 hover:text-black",
                  )}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={!pagination?.hasNextPage || isFetching}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="h-9 gap-1 border-yellow-500/30 bg-zinc-950 px-3 text-yellow-400 hover:border-yellow-400 hover:bg-yellow-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderPage;

import { useState } from "react";
import { Package, CheckCircle2, Truck, ShoppingBag } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { type Order } from "@/types/order";
import { useGetMyOrdersQuery } from "@/store/slices/api/orderApi";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import OrderDetailsDialog from "@/components/order/OrderDetailsDialog";
import OrderTable from "@/components/order/OrderTable";

function OrderHistoryPage() {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data, isLoading } = useGetMyOrdersQuery(userInfo?._id ?? "", {
    skip: !userInfo?._id,
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  console.log(selectedOrder);

  const orders = data?.orders ?? [];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order._id
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "All" || order.status === filter;

    return matchesSearch && matchesFilter;
  });

  const totalSpent = orders
    .filter((order) => order.payment_status === "paid")
    .reduce((total, order) => total + order.total_price, 0);

  const deliveredCount = orders.filter(
    (order) => order.status === "delivered",
  ).length;

  const activeCount = orders.filter(
    (order) =>
      order.status === "pending" ||
      order.status === "processing" ||
      order.status === "shipped",
  ).length;

  return (
    <section className="min-h-screen w-full bg-zinc-50 px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
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

        <OrderTable
          orders={orders}
          filteredOrders={filteredOrders}
          isLoading={isLoading}
          search={search}
          filter={filter}
          setSearch={setSearch}
          setFilter={setFilter}
          setSelectedOrder={setSelectedOrder}
        />

        <OrderDetailsDialog
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      </div>
    </section>
  );
}

export default OrderHistoryPage;

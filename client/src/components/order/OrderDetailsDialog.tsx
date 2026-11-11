import { CalendarDays, Package, CreditCard, X } from "lucide-react";

import type { Order } from "@/types/order";
import OrderProductItem from "./OrderProductItem";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type OrderDetailsDialogProps = {
  order: Order | null;
  onClose: () => void;
};

const statusStyles: Record<Order["status"], string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  processing: "border-blue-200 bg-blue-50 text-blue-700",
  shipped: "border-violet-200 bg-violet-50 text-violet-700",
  delivered: "border-emerald-200 bg-emerald-50 text-emerald-700",
  cancelled: "border-red-200 bg-red-50 text-red-700",
};

const OrderDetailsDialog = ({ order, onClose }: OrderDetailsDialogProps) => {
  if (!order) return null;

  return (
    <Dialog
      open={!!order}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl border-zinc-200 bg-white p-0 sm:max-w-2xl">
        <DialogHeader className="border-b border-zinc-100 px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <DialogTitle className="text-xl font-bold text-zinc-900">
                Order Details
              </DialogTitle>

              <DialogDescription className="mt-1 text-xs">
                Order ID: {order._id}
              </DialogDescription>
            </div>

            <Badge
              variant="outline"
              className={`capitalize ${statusStyles[order.status]}`}
            >
              {order.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="flex items-center gap-2 text-zinc-500">
                <CalendarDays size={16} />
                <span className="text-xs font-medium">Order Date</span>
              </div>

              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="flex items-center gap-2 text-zinc-500">
                <CreditCard size={16} />
                <span className="text-xs font-medium">Payment Status</span>
              </div>

              <div className="mt-2">
                <Badge
                  variant="outline"
                  className={
                    order.payment_status === "paid"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-amber-200 bg-amber-50 text-amber-700"
                  }
                >
                  {order.payment_status}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                <Package size={17} />
                Ordered Products
              </h3>

              <span className="text-xs text-zinc-500">
                {order.items.length} Products
              </span>
            </div>

            <div className="rounded-xl border border-zinc-200 px-4">
              {order.items.map((item) => (
                <OrderProductItem
                  key={`${item.product_id}-${item.size}-${item.color}`}
                  item={item}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-zinc-900 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400">
                  Total Amount
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {order.items.length} Products
                </p>
              </div>

              <p className="text-2xl font-bold text-white">
                ${order.total_price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-zinc-100 px-6 py-4">
          <Button
            onClick={onClose}
            className="bg-zinc-900 text-white hover:bg-zinc-800"
          >
            <X size={15} className="mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;

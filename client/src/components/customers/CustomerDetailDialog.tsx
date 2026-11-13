
import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShoppingBag,
  Wallet,
} from "lucide-react";

import type { Customer } from "@/types/customer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CustomerDetailDialogProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomerDetailDialog = ({
  customer,
  open,
  onOpenChange,
}: CustomerDetailDialogProps) => {
  if (!customer) return null;

  const initials = customer.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  const formatPrice = (price: number) =>
    `${price.toLocaleString("en-US")} MMK`;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Customer Details
          </DialogTitle>

          <DialogDescription className="text-zinc-500">
            View customer profile and account information.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 py-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-lg font-semibold text-zinc-200">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-white">
              {customer.name}
            </h3>

            <p className="mt-1 text-xs text-zinc-500">
              {customer._id}
            </p>

            <Badge
              variant="outline"
              className={
                customer.status === "Active"
                  ? "mt-2 border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  : "mt-2 border-zinc-700 bg-zinc-800 text-zinc-400"
              }
            >
              {customer.status}
            </Badge>
          </div>
        </div>

        <Separator className="bg-zinc-800" />

        <div className="space-y-4 py-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Contact Information
          </h4>

          <div className="flex items-center gap-3">
            <Mail className="size-4 text-zinc-500" />
            <span className="break-all text-sm text-zinc-300">
              {customer.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="size-4 text-zinc-500" />
            <span className="text-sm text-zinc-300">
              {customer.phone}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="size-4 text-zinc-500" />
            <span className="text-sm text-zinc-300">
              {customer.location}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="size-4 text-zinc-500" />
            <span className="text-sm text-zinc-300">
              Joined {formatDate(customer.joinedAt)}
            </span>
          </div>
        </div>

        <Separator className="bg-zinc-800" />

        <div className="space-y-4 py-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Purchase Summary
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
              <ShoppingBag className="mb-3 size-5 text-blue-400" />

              <p className="text-xs text-zinc-500">
                Total Orders
              </p>

              <p className="mt-1 text-xl font-semibold text-white">
                {customer.totalOrders}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
              <Wallet className="mb-3 size-5 text-emerald-400" />

              <p className="text-xs text-zinc-500">
                Total Spent
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {formatPrice(customer.totalSpent)}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-zinc-600">
          Customer ID: {customer._id}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailDialog;

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import type { Order } from "@/types/order";
import { useUpdateOrderMutation } from "@/store/slices/api/orderApi";

interface OrderUpdateDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrderUpdateDialog({
  order,
  open,
  onOpenChange,
}: OrderUpdateDialogProps) {
  const [status, setStatus] = useState(order?.status ?? "pending");
  const [paymentStatus, setPaymentStatus] = useState(
    order?.payment_status ?? "pending",
  );
  //   const [shippingAddress, setShippingAddress] = useState(
  //     order?.shipping_address ?? "",
  //   );
  //   const [phone, setPhone] = useState(order?.phone ?? "");
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!order) return;

    try {
      await updateOrder({
        id: order._id,
        status,
        payment_status: paymentStatus,
        // shipping_address: shippingAddress.trim(),
        // phone: phone.trim(),
      }).unwrap();

      toast.success("Order updated successfully");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-white sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Update Order
          </DialogTitle>

          <DialogDescription className="text-zinc-400">
            Update order information and delivery details.
          </DialogDescription>
        </DialogHeader>

        {order && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-zinc-300">Order ID</Label>
              <Input
                value={`ORD-${order._id.slice(0, 8)}`}
                disabled
                className="border-zinc-800 bg-zinc-900 text-zinc-400 disabled:opacity-100"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300">Order Status</Label>

              <Select
                value={status}
                onValueChange={(value) => setStatus(value as Order["status"])}
              >
                <SelectTrigger className="border-zinc-800 bg-zinc-900">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300">Payment Status</Label>

              <Select
                value={paymentStatus}
                onValueChange={(value) =>
                  setPaymentStatus(value as Order["payment_status"])
                }
              >
                <SelectTrigger className="border-zinc-800 bg-zinc-900">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/*            
            <div className="space-y-2">
              <Label className="text-zinc-300">Shipping Address</Label>

              <Input
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter shipping address"
                className="border-zinc-800 bg-zinc-900 text-white"
              />
            </div>

           
            <div className="space-y-2">
              <Label className="text-zinc-300">Phone Number</Label>

              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="border-zinc-800 bg-zinc-900 text-white"
              />
            </div> */}

            <DialogFooter className="gap-2 border-t border-zinc-800 pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => onOpenChange(false)}
                className="border-zinc-700 bg-zinc-900 text-zinc-300"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2 bg-amber-400 font-semibold text-zinc-950 hover:bg-amber-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

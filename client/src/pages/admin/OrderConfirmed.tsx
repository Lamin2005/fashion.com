import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  ArrowRight,
  LoaderCircle,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetOrderBySessionQuery } from "@/store/slices/api/orderApi";

export default function OrderConfirmed() {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError, refetch } = useGetOrderBySessionQuery(
    sessionId ?? "",
    {
      skip: !sessionId,
      pollingInterval: 3000,
    },
  );

  if (!sessionId) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center p-6">
        <Card className="w-full max-w-md border-border/60">
          <CardContent className="space-y-4 p-8 text-center">
            <h1 className="text-xl font-semibold">Invalid Checkout Session</h1>

            <p className="text-sm text-muted-foreground">
              We could not find your checkout session.
            </p>

            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (isLoading && !data) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <LoaderCircle className="h-8 w-8 animate-spin" />

        <p className="text-sm text-muted-foreground">
          Confirming your order...
        </p>
      </main>
    );
  }

  if (isError || !data?.order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center p-6">
        <Card className="w-full max-w-md border-border/60">
          <CardContent className="space-y-4 p-8 text-center">
            <Package className="mx-auto h-10 w-10 text-muted-foreground" />

            <h1 className="text-xl font-semibold">
              Your order is being processed
            </h1>

            <p className="text-sm leading-6 text-muted-foreground">
              Your payment may have completed, but we are still waiting for your
              order confirmation. Please try again shortly.
            </p>

            <Button onClick={() => void refetch()} className="w-full">
              Check Order Again
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const { order } = data;

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Card className="overflow-hidden border-border/60 shadow-sm">
          <CardContent className="p-6 sm:p-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="h-9 w-9 text-emerald-500" />
              </div>

              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
                Payment Successful
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Thank you for your order!
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Your payment has been received. We have your order details and
                will prepare your items soon.
              </p>
            </div>

            <div className="my-8 rounded-xl border border-border/60 bg-muted/30 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>

                  <p className="mt-1 break-all font-semibold">#{order._id}</p>
                </div>

                <Package className="h-6 w-6 shrink-0 text-muted-foreground" />
              </div>

              <div className="my-5 border-t border-border/60" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Payment Method
                </span>

                <span className="text-sm font-medium capitalize">
                  {order.payment_method}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Payment Status
                </span>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium capitalize text-emerald-600">
                  {order.payment_status}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Order Status
                </span>

                <span className="text-sm font-medium capitalize">
                  {order.status}
                </span>
              </div>

              <div className="my-5 border-t border-border/60" />

              <div className="flex items-center justify-between gap-4">
                <span className="font-medium">Total Paid</span>

                <span className="text-2xl font-semibold">
                  ${order.total_price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-semibold">
                Order Items ({order.items.length})
              </h2>

              {order.items.map((item, index) => (
                <div
                  key={`${item.product_id}-${item.size}-${item.color}-${index}`}
                  className="flex gap-4 border-b border-border/50 pb-4 last:border-0"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                    {item.image?.[0] ? (
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 font-medium">{item.name}</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Size: {item.size} · Color: {item.color}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1">
                <Link to="/products">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="flex-1">
                <Link to="/profile/orders">View My Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

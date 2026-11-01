import { Link } from "react-router";
import {
  ArrowLeft,
  CircleX,
  ShoppingBag,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function OrderCancel() {
  return (
    <main className="min-h-screen bg-[#08090b] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
        <div className="w-full">
          <Link
            to="/"
            className="mb-12 flex items-center justify-center gap-2 text-xl font-bold tracking-[0.25em]"
          >
            FASHION<span className="text-zinc-500">.</span>
          </Link>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111214] shadow-2xl">
            <div className="border-b border-white/10 px-6 py-10 text-center sm:px-10 sm:py-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10">
                <CircleX
                  className="h-10 w-10 text-amber-400"
                  strokeWidth={1.5}
                />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                Checkout Cancelled
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Payment Not Completed
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
                Your checkout was cancelled before the payment was completed. No
                successful payment has been confirmed for this checkout. You can
                return to your cart and try again whenever you're ready.
              </p>
            </div>

            <div className="space-y-5 px-6 py-8 sm:px-10">
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/3 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <ShoppingBag className="h-5 w-5 text-zinc-300" />
                </div>

                <div>
                  <h2 className="font-medium">
                    Your shopping journey isn't over
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    You can review your selected products and return to checkout
                    when you're ready.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/3 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <RotateCcw className="h-5 w-5 text-zinc-300" />
                </div>

                <div>
                  <h2 className="font-medium">Want to try again?</h2>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Return to your cart to review your items before starting a
                    new checkout session.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                <Button
                  asChild
                  variant="outline"
                  className="h-12 flex-1 rounded-xl border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white"
                >
                  <Link to="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-4 text-xs text-zinc-500">
                <ShieldCheck className="h-4 w-4" />
                <span>Your payment status is handled securely by Stripe.</span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs tracking-wide text-zinc-600">
            © {new Date().getFullYear()} FASHION. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </main>
  );
}

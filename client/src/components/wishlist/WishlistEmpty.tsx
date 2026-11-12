import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const WishlistEmpty = () => {
  return (
    <div className="flex min-h-105 flex-col items-center justify-center px-5 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-zinc-100">
        <Heart size={30} strokeWidth={1.2} className="text-zinc-500" />
      </div>

      <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
        Your wishlist is empty
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
        You haven't saved any products yet. Explore our collection and save the
        pieces you love.
      </p>

      <Button
        asChild
        className="mt-7 h-11 rounded-none bg-zinc-950 px-8 text-xs uppercase tracking-wider hover:bg-zinc-700"
      >
        <Link to="/products/filters">Explore Collection</Link>
      </Button>
    </div>
  );
};

export default WishlistEmpty;

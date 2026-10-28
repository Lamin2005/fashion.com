import { useState } from "react";
import {
  Star,
  ShoppingBag,
  Heart,
  Shield,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { useGetProductDetailQuery } from "@/store/slices/api/productApi";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useAddCartItemMutation } from "@/store/slices/api/cartApi";

const ProductDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetProductDetailQuery(id ?? "", {
    skip: !id,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addCartItem] = useAddCartItemMutation();

  const mainImage =
    data?.images?.find((img) => img.url === selectedImage)?.url ??
    data?.images?.[0]?.url;

  const activeColor = data?.colors?.includes(selectedColor ?? "")
    ? selectedColor
    : data?.colors?.[0];

  const activeSize = data?.sizes?.includes(selectedSize)
    ? selectedSize
    : (data?.sizes?.[0] ?? "");

  const stock = Math.max(0, Number(data?.instock_count ?? 0));

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(stock, current + 1));
  };

  const handleAddToCart = async () => {
    if (!data || stock < 1 || quantity > stock) {
      toast.error("Not enough stock available");
      return;
    }

    if (!activeSize || !activeColor) {
      toast.error("Please select a size and color");
      return;
    }

    await addCartItem({
      product_id: data._id,
      quantity: 1,
      size: activeSize,
      color: activeColor,
    }).unwrap();

    toast.success(`${data.name} added to cart`);
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-white px-5">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-zinc-900">
            Product not found
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Unable to load this product. Please try again.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-16 pt-24 text-zinc-900 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-7 flex items-center gap-2 overflow-hidden text-[10px] uppercase tracking-[0.16em] text-zinc-400">
          <span className="shrink-0">Shop</span>
          <span>/</span>
          <span className="shrink-0">{data.category}</span>
          <span>/</span>
          <span className="truncate text-zinc-900">{data.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <section className="lg:col-span-7">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="order-2 flex gap-3 overflow-x-auto pb-1 sm:order-1 sm:w-24 sm:shrink-0 sm:flex-col sm:overflow-visible">
                {data.images?.map((img, index) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setSelectedImage(img.url)}
                    aria-label={`View image ${index + 1}`}
                    aria-pressed={mainImage === img.url}
                    className={`relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-200 sm:h-28 sm:w-full ${
                      mainImage === img.url
                        ? "border-zinc-900 ring-1 ring-zinc-900"
                        : "border-zinc-200 opacity-70 hover:border-zinc-500 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${data.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute bottom-1 right-1 rounded bg-white/90 px-1.5 py-0.5 text-[9px] text-zinc-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                ))}
              </div>

              <div className="group relative order-1 aspect-4/5 min-w-0 flex-1 overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 sm:order-2">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={data.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                    No image available
                  </div>
                )}

                <span className="absolute left-4 top-4 rounded-sm bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-800 backdrop-blur">
                  Studio Collection
                </span>

                <button
                  type="button"
                  onClick={() => setIsWishlisted((value) => !value)}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  aria-pressed={isWishlisted}
                  className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm backdrop-blur transition-all ${
                    isWishlisted
                      ? "border-red-100 bg-red-50 text-red-500"
                      : "border-white/70 bg-white/90 text-zinc-700 hover:text-red-500"
                  }`}
                >
                  <Heart
                    size={17}
                    className={isWishlisted ? "fill-current" : ""}
                  />
                </button>
              </div>
            </div>
          </section>

          <section className="flex flex-col lg:col-span-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Studio Atelier Series
                </span>

                <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-zinc-800">
                    {data.rating_count ?? 0}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl font-semibold uppercase leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                {data.name}
              </h1>

              <p className="text-2xl font-medium tracking-tight sm:text-3xl">
                {formatPrice(data.price)}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <span
                  className={`h-2 w-2 rounded-full ${
                    stock > 0 ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                <span
                  className={`text-xs ${
                    stock > 0 ? "text-emerald-700" : "text-red-600"
                  }`}
                >
                  {stock > 0 ? `${stock} items available` : "Out of stock"}
                </span>
              </div>
            </div>

            <div className="my-6 h-px bg-zinc-100" />

            <div
              className="product-description text-sm leading-7 text-zinc-500 [&_p]:mb-3 [&_ul]:ml-5 [&_ul]:list-disc"
              dangerouslySetInnerHTML={{
                __html: data.description ?? "",
              }}
            />

            <div className="mt-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                  Color
                </span>
                <span className="text-xs text-zinc-500">
                  {activeColor ?? "Select a color"}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {data.colors?.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    aria-label={`Select color ${color}`}
                    aria-pressed={activeColor === color}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border p-1 transition-all ${
                      activeColor === color
                        ? "border-zinc-900 ring-2 ring-zinc-900 ring-offset-2"
                        : "border-zinc-200 hover:border-zinc-500"
                    }`}
                  >
                    <span
                      className="h-full w-full rounded-full border border-black/5"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                  Select Size
                </span>

                <button
                  type="button"
                  onClick={() =>
                    window.alert("Connect your size guide modal here.")
                  }
                  className="text-xs text-zinc-500 underline underline-offset-4 transition-colors hover:text-zinc-900"
                >
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {data.sizes?.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={activeSize === size}
                    className={`rounded-lg border py-3 text-xs font-medium transition-all ${
                      activeSize === size
                        ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                  Quantity
                </span>

                <span className="text-[11px] text-zinc-400">
                  {stock > 0 ? `${stock} available` : "Unavailable"}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50/70 p-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1 || stock === 0}
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition-all hover:border-zinc-900 hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-zinc-200 disabled:hover:bg-white disabled:hover:text-zinc-700"
                  >
                    <Minus size={15} />
                  </button>

                  <span
                    aria-live="polite"
                    className="min-w-8 text-center text-sm font-semibold tabular-nums"
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= stock || stock === 0}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition-all hover:border-zinc-900 hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-zinc-200 disabled:hover:bg-white disabled:hover:text-zinc-700"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <div className="pr-2 text-xs text-zinc-500">
                  Subtotal{" "}
                  <span className="font-semibold text-zinc-900">
                    {formatPrice(data.price * quantity)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={stock === 0 || quantity > stock}
                className="group flex min-h-14 flex-1 items-center justify-center gap-3 rounded-xl bg-zinc-900 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-300 hover:bg-zinc-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:shadow-none"
              >
                <ShoppingBag
                  size={17}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5"
                />
                {stock === 0 ? "Out of Stock" : "Add to Bag"}
              </button>

              <button
                type="button"
                onClick={() => setIsWishlisted((value) => !value)}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border transition-all ${
                  isWishlisted
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-900"
                }`}
              >
                <Heart
                  size={18}
                  className={isWishlisted ? "fill-current" : ""}
                />
              </button>
            </div>

            <p className="mt-3 text-center text-[11px] text-zinc-400">
              Secure checkout · Carefully packed for you
            </p>

            <div className="mt-8 border-y border-zinc-200">
              <button
                type="button"
                onClick={() => setIsDetailsOpen((value) => !value)}
                aria-expanded={isDetailsOpen}
                className="flex w-full items-center justify-between py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:text-zinc-500"
              >
                Composition & Care Details
                {isDetailsOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {isDetailsOpen && (
                <div className="space-y-3 pb-5 text-xs leading-6 text-zinc-500">
                  <p>Designed with attention to fit, fabric, and detail.</p>
                  <p>Follow the garment care instructions before washing.</p>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              <div className="flex flex-col items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50/70 px-2 py-4 text-center">
                <Truck size={17} className="text-zinc-600" />
                <span className="text-[10px] font-medium text-zinc-600">
                  Free Shipping
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50/70 px-2 py-4 text-center">
                <RotateCcw size={17} className="text-zinc-600" />
                <span className="text-[10px] font-medium text-zinc-600">
                  30-Day Returns
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50/70 px-2 py-4 text-center">
                <Shield size={17} className="text-zinc-600" />
                <span className="text-[10px] font-medium text-zinc-600">
                  Authentic Only
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.12em] text-zinc-400">
              <Check size={13} />
              Quality checked before dispatch
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;

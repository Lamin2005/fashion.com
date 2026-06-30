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
} from "lucide-react";
// import { useGetProductDetailQuery } from "@/store/slices/productApi";
// import { useParams } from "react-router";


const productData = {
  id: "prod_001",
  name: "Oversized Tailored Wool Blazer",
  price: 245.0,
  currency: "$",
  rating: 4.9,
  reviewsCount: 124,
  description:
    "A contemporary silhouette meticulously crafted from premium recycled wool blend. Featuring structured shoulders, notched lapels, and clean minimalist lines designed to transcend seasonal trends.",
  details: [
    "Premium 70% Recycled Wool, 30% Organic Cotton Blend",
    "Internal chest welt pockets and front flap pockets",
    "Sustainably sourced horn-effect buttons",
    "Dry clean only",
    "Made in Italy",
  ],
  colors: [
    { name: "Charcoal Black", class: "bg-zinc-900", code: "#18181b" },
    { name: "Oatmeal Melange", class: "bg-stone-200", code: "#e7e5e4" },
    { name: "Raw Umber", class: "bg-amber-900", code: "#451a03" },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80", // Main Hero Image
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80", // Angle 2
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80", // Detail Look
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80", // Texture Look
  ],
};

const ProductDetail = () => {
  // const { id } = useParams();
  // const { data : product } = useGetProductDetailQuery(id);

  const [mainImage, setMainImage] = useState<string>(productData.images[0]);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="w-full aspect-3/4 bg-zinc-50 overflow-hidden relative group">
              <img
                src={mainImage}
                alt={productData.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />
              <span className="absolute top-4 left-4 text-[10px] font-mono bg-zinc-950 text-white px-2 py-1 tracking-widest uppercase">
                [ Capsule 01 ]
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {productData.images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(imgUrl)}
                  className={`aspect-3/4 bg-zinc-50 overflow-hidden transition-all relative cursor-pointer ${
                    mainImage === imgUrl
                      ? "border border-zinc-900 opacity-100"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Product View ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-zinc-400 bg-white/80 px-1">
                    0{index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-start space-y-6 pt-2 lg:pt-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-amber-600 uppercase">
                  Studio Atelier Series
                </span>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold font-mono">
                    {productData.rating}
                  </span>
                  <span className="text-xs text-zinc-400 font-light">
                    ({productData.reviewsCount})
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 uppercase leading-none">
                {productData.name}
              </h1>
              <p className="text-2xl font-mono text-zinc-900 pt-1">
                {productData.currency}
                {productData.price.toFixed(2)}
              </p>
            </div>

            <hr className="border-zinc-100" />

            {/* Description Text */}
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              {productData.description}
            </p>

            {/* Color Selector Accent */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Color:
                </span>
                <span className="text-xs font-light text-zinc-400">
                  {selectedColor?.name}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {productData.colors.map((color) => (
                  <button
                    key={color.code}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-none p-0.5 border transition-all cursor-pointer ${
                      selectedColor?.code === color.code
                        ? "border-zinc-900 scale-105"
                        : "border-zinc-200 hover:border-zinc-400 hover:scale-105"
                    }`}
                  >
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: color.code }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector Grid */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Select Size:
                </span>
                <a
                  href="#"
                  className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-900"
                >
                  Size Guide
                </a>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs py-3 font-mono transition-all border cursor-pointer ${
                      selectedSize === size
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-white text-zinc-800 border-zinc-200 hover:border-zinc-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons (Add to Bag / Wishlist) */}
            <div className="flex space-x-3 pt-4">
              <button className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest py-4 transition-colors duration-300 flex items-center justify-center gap-2 group cursor-pointer">
                <ShoppingBag size={15} />
                Add To Wardrobe Bag
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-5 py-4 border transition-all cursor-pointer ${
                  isWishlisted
                    ? "bg-zinc-50 border-red-200 text-red-500"
                    : "bg-white border-zinc-200 text-zinc-800 hover:border-zinc-900"
                }`}
              >
                <Heart
                  size={16}
                  className={isWishlisted ? "fill-current" : ""}
                />
              </button>
            </div>

            {/* Premium Accordion (Details & Composition) */}
            <div className="border-t border-b border-zinc-100 py-2">
              <button
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="w-full flex justify-between items-center py-2 text-xs font-bold uppercase tracking-wider text-zinc-800 cursor-pointer"
              >
                Composition & Care Details
                {isDetailsOpen ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </button>

              {isDetailsOpen && (
                <ul className="list-disc pl-4 space-y-1.5 text-xs text-zinc-500 font-light py-2 animate-fadeIn">
                  {productData.details.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Trust Factors / Brand Badges */}
            <div className="grid grid-cols-3 gap-4 pt-2 text-center">
              <div className="flex flex-col items-center p-3 bg-zinc-50 space-y-1">
                <Truck size={16} className="text-zinc-600" />
                <span className="text-[10px] font-medium text-zinc-700">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-zinc-50 space-y-1">
                <RotateCcw size={16} className="text-zinc-600" />
                <span className="text-[10px] font-medium text-zinc-700">
                  30-Day Returns
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-zinc-50 space-y-1">
                <Shield size={16} className="text-zinc-600" />
                <span className="text-[10px] font-medium text-zinc-700">
                  Authentic Only
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

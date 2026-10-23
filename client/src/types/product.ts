import { type ProductFormInput } from "@/schema/products";

export interface Image {
  url: string;
}

export interface Product {
  _id: string;
  description: string;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  colors: string[];
  rating_count: number;
  images: Image[];
  is_new_arrival?: boolean;
  is_feature?: boolean;
  instock_count: number;
}

export interface ProductFiltersMeta {
  sizes: string[];
  colors: string[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
}

export interface ProductFormProp {
  initialData?: unknown;
  onSubmit: (data: ProductFormInput) => void;
  isLoading: boolean;
  isUpdating?: boolean;
}


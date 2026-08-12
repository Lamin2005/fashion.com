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
  rating_count: string;
  images: Image[];
  is_new_arrival?: boolean;
  is_feature?: boolean;
}

export interface ProductFiltersMeta {
  sizes: string[];
  colors: string[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
}

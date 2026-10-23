export interface OrderItem {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
  image: string[];
}

export interface Order {
  _id: string;
  user_id: string;
  items: OrderItem[];
  total_price: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_method: "cod" | "kpay" | "wavepay" | "card";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  shipping_address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

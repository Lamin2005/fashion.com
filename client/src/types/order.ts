export interface OrderItem {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
  image: string[];
}

export interface Order {
  _id: string;
  user_id: {
    name: string;
    email: string;
    avatar: {
      image_url: string;
    };
  };
  items: OrderItem[];
  total_price: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_method: "cod" | "kpay" | "wavepay" | "card";
  payment_status: "pending" | "paid" | "refunded" | "failed";
  shipping_address: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderSessionResponse {
  success: boolean;
  message?: string;
  order: Order;
}

export interface OrderPagination {
  currentPage: number;
  limit: number;
  totalOrders: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface OrdersResponse {
  success: boolean;
  count: number;
  orders: Order[];
  pagination?: OrderPagination;
}

export interface UpdateOrderPayload {
  id: string;
  status?: Order["status"];
  shipping_address?: string;
  phone?: string;
}

export interface DeleteOrderResponse {
  success: boolean;
  message: string;
}

export interface GetAllOrdersParams {
  page: number;
  limit: number;
  status?: string;
  payment_status?: string;
  keyword?: string;
  sort?: string;
}

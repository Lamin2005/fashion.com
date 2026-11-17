import type { Address } from "./address";
import type { Order } from "./order";

export type CustomerStatus = "Active" | "Inactive";

export type CustomerSort = "newest" | "oldest" | "orders" | "spent";

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;

  totalOrders: number;
  totalSpent: number;

  status: CustomerStatus;
  joinedAt: string;
}

export interface CustomerDetail extends Customer {
  addresses: Address[];
  orders: Order[];
}

export interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  newCustomers: number;
}

export interface CustomerPagination {
  currentPage: number;
  limit: number;
  totalCustomers: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CustomersResponse {
  success: boolean;
  customers: Customer[];
  pagination: CustomerPagination;
}

export interface CustomerStatsResponse {
  success: boolean;
  stats: CustomerStats;
}

export interface GetCustomersParams {
  page?: number;
  limit?: number;
  keyword?: string;
  status?: "all" | CustomerStatus;
  sort?: CustomerSort;
}

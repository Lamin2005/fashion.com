export type CustomerStatus = "Active" | "Inactive";

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  location: string;
  joinedAt: string;
  totalOrders: number;
  totalSpent: number;
  status: CustomerStatus;
}

export interface CustomerStatsData {
  totalCustomers: number;
  activeCustomers: number;
  newCustomers: number;
  inactiveCustomers: number;
}

export interface CustomerFilters {
  keyword: string;
  status: string;
  sort: string;
}

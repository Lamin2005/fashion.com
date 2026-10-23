import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Order } from "@/types/order";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const fakeOrders: Order[] = [
  {
    _id: "ORD-1024",
    user_id: "USER-001",
    items: [
      {
        product_id: "PROD-001",
        name: "Classic Black T-Shirt",
        quantity: 2,
        price: 25000,
        image: ["https://placehold.co/400x400/18181b/ffffff?text=T-Shirt"],
      },
      {
        product_id: "PROD-002",
        name: "Slim Fit Jeans",
        quantity: 1,
        price: 45000,
        image: ["https://placehold.co/400x400/27272a/ffffff?text=Jeans"],
      },
    ],
    total_price: 95000,
    status: "delivered",
    payment_method: "kpay",
    payment_status: "paid",
    shipping_address: "Sanchaung Township, Yangon",
    phone: "09-123456789",
    createdAt: "2026-10-23T09:30:00.000Z",
    updatedAt: "2026-10-23T12:30:00.000Z",
  },
  {
    _id: "ORD-1023",
    user_id: "USER-002",
    items: [
      {
        product_id: "PROD-003",
        name: "Oversized Hoodie",
        quantity: 2,
        price: 35000,
        image: ["https://placehold.co/400x400/3f3f46/ffffff?text=Hoodie"],
      },
    ],
    total_price: 70000,
    status: "processing",
    payment_method: "wavepay",
    payment_status: "paid",
    shipping_address: "Kamayut Township, Yangon",
    phone: "09-234567891",
    createdAt: "2026-10-22T14:15:00.000Z",
    updatedAt: "2026-10-22T15:00:00.000Z",
  },
  {
    _id: "ORD-1022",
    user_id: "USER-003",
    items: [
      {
        product_id: "PROD-004",
        name: "White Sneakers",
        quantity: 1,
        price: 85000,
        image: ["https://placehold.co/400x400/e4e4e7/18181b?text=Sneakers"],
      },
      {
        product_id: "PROD-005",
        name: "Baseball Cap",
        quantity: 1,
        price: 18000,
        image: ["https://placehold.co/400x400/52525b/ffffff?text=Cap"],
      },
    ],
    total_price: 103000,
    status: "pending",
    payment_method: "cod",
    payment_status: "pending",
    shipping_address: "Hlaing Township, Yangon",
    phone: "09-345678912",
    createdAt: "2026-10-22T10:45:00.000Z",
    updatedAt: "2026-10-22T10:45:00.000Z",
  },
  {
    _id: "ORD-1021",
    user_id: "USER-004",
    items: [
      {
        product_id: "PROD-006",
        name: "Denim Jacket",
        quantity: 1,
        price: 65000,
        image: ["https://placehold.co/400x400/1e3a5f/ffffff?text=Jacket"],
      },
    ],
    total_price: 65000,
    status: "shipped",
    payment_method: "kpay",
    payment_status: "paid",
    shipping_address: "Chanayethazan Township, Mandalay",
    phone: "09-456789123",
    createdAt: "2026-10-21T08:20:00.000Z",
    updatedAt: "2026-10-22T11:10:00.000Z",
  },
  {
    _id: "ORD-1020",
    user_id: "USER-005",
    items: [
      {
        product_id: "PROD-007",
        name: "Casual Cotton Shirt",
        quantity: 3,
        price: 22000,
        image: ["https://placehold.co/400x400/71717a/ffffff?text=Shirt"],
      },
    ],
    total_price: 66000,
    status: "cancelled",
    payment_method: "cod",
    payment_status: "pending",
    shipping_address: "Zabuthiri Township, Naypyidaw",
    phone: "09-567891234",
    createdAt: "2026-10-20T16:00:00.000Z",
    updatedAt: "2026-10-20T17:30:00.000Z",
  },
  {
    _id: "ORD-1019",
    user_id: "USER-006",
    items: [
      {
        product_id: "PROD-008",
        name: "Leather Crossbody Bag",
        quantity: 1,
        price: 55000,
        image: ["https://placehold.co/400x400/44403c/ffffff?text=Bag"],
      },
      {
        product_id: "PROD-009",
        name: "Classic Belt",
        quantity: 2,
        price: 15000,
        image: ["https://placehold.co/400x400/292524/ffffff?text=Belt"],
      },
    ],
    total_price: 85000,
    status: "delivered",
    payment_method: "card",
    payment_status: "paid",
    shipping_address: "Bahan Township, Yangon",
    phone: "09-678912345",
    createdAt: "2026-10-19T07:40:00.000Z",
    updatedAt: "2026-10-21T13:00:00.000Z",
  },
  {
    _id: "ORD-1018",
    user_id: "USER-007",
    items: [
      {
        product_id: "PROD-010",
        name: "Premium Polo Shirt",
        quantity: 2,
        price: 30000,
        image: ["https://placehold.co/400x400/14532d/ffffff?text=Polo"],
      },
    ],
    total_price: 60000,
    status: "processing",
    payment_method: "wavepay",
    payment_status: "paid",
    shipping_address: "Aungmyaythazan Township, Mandalay",
    phone: "09-789123456",
    createdAt: "2026-10-18T12:10:00.000Z",
    updatedAt: "2026-10-18T13:20:00.000Z",
  },
];

export function formatRelativeTime(date: string): string {
  const now = Date.now();
  const createdAt = new Date(date).getTime();

  if (Number.isNaN(createdAt)) {
    return "Invalid date";
  }

  const diff = Math.max(0, now - createdAt);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 10) return "just now";
  if (minutes < 1) return `${seconds} seconds ago`;
  if (hours < 1) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (days < 1) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (months < 1) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (years < 1) return `${months} month${months > 1 ? "s" : ""} ago`;

  return `${years} year${years > 1 ? "s" : ""} ago`;
}

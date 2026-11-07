import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

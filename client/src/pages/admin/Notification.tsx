import { useState } from "react";
import {
  Bell,
  ShoppingBag,
  CreditCard,
  Package,
  Users,
  Settings,
  Check,
  CheckCheck,
  Trash2,
  Search,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type NotificationType =
  | "order"
  | "payment"
  | "inventory"
  | "customer"
  | "system";

interface Notification {
  _id: string;
  title: string;
  description: string;
  date: string;
  type: NotificationType;
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  {
    _id: "1",
    title: "New Order Received",
    description:
      "A new order #ORD-1025 has been placed by Mg Mg. Total amount $250.00.",
    date: "2 minutes ago",
    type: "order",
    isRead: false,
  },
  {
    _id: "2",
    title: "Low Stock Alert",
    description:
      "Black Oversized T-Shirt is running low. Only 3 items remaining.",
    date: "15 minutes ago",
    type: "inventory",
    isRead: false,
  },
  {
    _id: "3",
    title: "Payment Successful",
    description: "Payment of $180.00 for order #ORD-1024 has been received.",
    date: "1 hour ago",
    type: "payment",
    isRead: false,
  },
  {
    _id: "4",
    title: "New Customer Registered",
    description: "Aye Aye has created a new customer account.",
    date: "3 hours ago",
    type: "customer",
    isRead: true,
  },
  {
    _id: "5",
    title: "Order Delivered",
    description: "Order #ORD-1020 has been successfully delivered.",
    date: "Yesterday",
    type: "order",
    isRead: true,
  },
  {
    _id: "6",
    title: "System Update",
    description: "Your store dashboard has been updated successfully.",
    date: "Yesterday",
    type: "system",
    isRead: true,
  },
];

const notificationStyles: Record<
  NotificationType,
  { icon: React.ReactNode; color: string; label: string }
> = {
  order: {
    icon: <ShoppingBag size={18} />,
    color: "text-blue-400 bg-blue-400/10",
    label: "Order",
  },
  payment: {
    icon: <CreditCard size={18} />,
    color: "text-emerald-400 bg-emerald-400/10",
    label: "Payment",
  },
  inventory: {
    icon: <Package size={18} />,
    color: "text-amber-400 bg-amber-400/10",
    label: "Inventory",
  },
  customer: {
    icon: <Users size={18} />,
    color: "text-purple-400 bg-purple-400/10",
    label: "Customer",
  },
  system: {
    icon: <Settings size={18} />,
    color: "text-zinc-400 bg-zinc-400/10",
    label: "System",
  },
};

function NotificationPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const filteredNotifications = notifications.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !item.isRead) ||
      (filter === "read" && item.isRead);

    return matchesSearch && matchesFilter;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item._id === id ? { ...item, isRead: true } : item)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="min-w-0 space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Stay updated with your store activities and alerts.
          </p>
        </div>

        <Button
          onClick={markAllAsRead}
          variant="outline"
          className="h-10 border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          <CheckCheck size={16} className="mr-2" />
          Mark all as read
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Total Notifications",
            value: notifications.length,
            icon: Bell,
          },
          {
            title: "Unread Notifications",
            value: unreadCount,
            icon: Bell,
          },
          {
            title: "Read Notifications",
            value: notifications.length - unreadCount,
            icon: CheckCheck,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="border-zinc-800 bg-zinc-900/40">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-zinc-500">{item.title}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">
                  <Icon size={21} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Notification List */}
      <Card className="overflow-hidden border-zinc-800 bg-zinc-900/40">
        <div className="flex flex-col gap-4 border-b border-zinc-800 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">
              Recent Activity
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              You have {unreadCount} unread notifications.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notifications..."
                className="h-10 w-full border-zinc-800 bg-zinc-950 pl-9 text-white placeholder:text-zinc-600 sm:w-64"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 outline-none"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-zinc-800">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => {
              const style = notificationStyles[item.type];

              return (
                <div
                  key={item._id}
                  className={`group flex gap-4 p-5 transition-colors hover:bg-zinc-800/20 ${
                    !item.isRead ? "bg-amber-500/2.5" : ""
                  }`}
                >
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${style.color}`}
                  >
                    {style.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>

                      {!item.isRead && (
                        <span className="size-2 rounded-full bg-amber-400" />
                      )}

                      <Badge className={`${style.color} border-0 text-xs`}>
                        {style.label}
                      </Badge>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-zinc-500">
                      {item.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-zinc-600">
                      <Clock size={13} />
                      {item.date}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-start gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                    {!item.isRead && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => markAsRead(item._id)}
                        title="Mark as read"
                        className="size-8 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                      >
                        <Check size={16} />
                      </Button>
                    )}

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteNotification(item._id)}
                      title="Delete notification"
                      className="size-8 text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Bell size={35} className="text-zinc-700" />
              <h3 className="mt-4 text-sm font-semibold text-white">
                No notifications found
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-zinc-800 px-5 py-4">
          <p className="text-xs text-zinc-600">
            Showing {filteredNotifications.length} of {notifications.length}{" "}
            notifications
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilter("all")}
            className="text-zinc-400 hover:text-white"
          >
            View all
            <ArrowUpRight size={14} className="ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default NotificationPage;

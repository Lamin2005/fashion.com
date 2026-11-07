import { useState } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  Crown,
  Search,
  Download,
  Eye,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CustomerStatus = "Active" | "Inactive";
type CustomerType = "Regular" | "Member" | "VIP";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joined: string;
  orders: number;
  totalSpent: number;
  status: CustomerStatus;
  type: CustomerType;
}

const customers: Customer[] = [
  {
    _id: "CUS-1001",
    name: "Aung Min",
    email: "aungmin@example.com",
    phone: "+95 9 123 456 789",
    location: "Yangon, Myanmar",
    joined: "Oct 12, 2026",
    orders: 12,
    totalSpent: 850000,
    status: "Active",
    type: "VIP",
  },
  {
    _id: "CUS-1002",
    name: "Su Mon",
    email: "sumon@example.com",
    phone: "+95 9 234 567 890",
    location: "Mandalay, Myanmar",
    joined: "Oct 15, 2026",
    orders: 8,
    totalSpent: 520000,
    status: "Active",
    type: "Member",
  },
  {
    _id: "CUS-1003",
    name: "Kyaw Zin",
    email: "kyawzin@example.com",
    phone: "+95 9 345 678 901",
    location: "Naypyidaw, Myanmar",
    joined: "Oct 18, 2026",
    orders: 2,
    totalSpent: 95000,
    status: "Active",
    type: "Regular",
  },
  {
    _id: "CUS-1004",
    name: "May Thu",
    email: "maythu@example.com",
    phone: "+95 9 456 789 012",
    location: "Yangon, Myanmar",
    joined: "Oct 19, 2026",
    orders: 15,
    totalSpent: 1200000,
    status: "Active",
    type: "VIP",
  },
  {
    _id: "CUS-1005",
    name: "Htet Aung",
    email: "htetaung@example.com",
    phone: "+95 9 567 890 123",
    location: "Bago, Myanmar",
    joined: "Oct 20, 2026",
    orders: 0,
    totalSpent: 0,
    status: "Inactive",
    type: "Regular",
  },
  {
    _id: "CUS-1006",
    name: "Thiri Win",
    email: "thiri@example.com",
    phone: "+95 9 678 901 234",
    location: "Yangon, Myanmar",
    joined: "Oct 21, 2026",
    orders: 6,
    totalSpent: 380000,
    status: "Active",
    type: "Member",
  },
];

const customerStatusStyles: Record<CustomerStatus, string> = {
  Active: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Inactive: "border-zinc-700 bg-zinc-800 text-zinc-400",
};

const customerTypeStyles: Record<CustomerType, string> = {
  Regular: "border-zinc-700 bg-zinc-800/70 text-zinc-400",
  Member: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  VIP: "border-amber-500/20 bg-amber-500/10 text-amber-400",
};

const stats = [
  {
    title: "Total Customers",
    icon: Users,
    color: "bg-amber-500/10 text-amber-400",
    getCount: (data: Customer[]) => data.length,
    description: "All registered customers",
  },
  {
    title: "Active Customers",
    icon: UserCheck,
    color: "bg-emerald-500/10 text-emerald-400",
    getCount: (data: Customer[]) =>
      data.filter((customer) => customer.status === "Active").length,
    description: "Currently active accounts",
  },
  {
    title: "New Customers",
    icon: UserPlus,
    color: "bg-blue-500/10 text-blue-400",
    getCount: (data: Customer[]) => (data.length > 0 ? 2 : 0),
    description: "Recently registered customers",
  },
  {
    title: "VIP Customers",
    icon: Crown,
    color: "bg-violet-500/10 text-violet-400",
    getCount: (data: Customer[]) =>
      data.filter((customer) => customer.type === "VIP").length,
    description: "Premium customer accounts",
  },
];

function CustomerPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [type, setType] = useState("All Types");

  const filteredCustomers = customers.filter((customer) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      customer._id.toLowerCase().includes(searchTerm) ||
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.phone.toLowerCase().includes(searchTerm);

    const matchesStatus = status === "All Status" || customer.status === status;

    const matchesType = type === "All Types" || customer.type === type;

    return matchesSearch && matchesStatus && matchesType;
  });

  const formatPrice = (price: number) => `${price.toLocaleString("en-US")} MMK`;

  return (
    <div className="min-w-0 space-y-6 pb-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Customers
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Manage customer accounts, memberships, and customer activity.
          </p>
        </div>

        <Button className="h-10 gap-2 bg-amber-400 font-semibold text-zinc-950 hover:bg-amber-300">
          <Download className="size-4" />
          Export Customers
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="group border-zinc-800/80 bg-zinc-900/40 text-white shadow-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <Icon className="size-5" />
                  </div>

                  <span className="rounded-md border border-zinc-800 bg-zinc-950/50 px-2 py-1 text-xs text-zinc-500">
                    Customers
                  </span>
                </div>

                <p className="mt-4 text-sm font-medium text-zinc-500">
                  {stat.title}
                </p>

                <p className="mt-1 font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {stat.getCount(customers).toLocaleString()}
                </p>

                <p className="mt-2 text-xs text-zinc-500">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Customer Table */}
      <Card className="overflow-hidden border-zinc-800/80 bg-zinc-900/40 text-white shadow-sm">
        <CardHeader className="flex flex-col gap-3 space-y-0 border-b border-zinc-800 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-white">
              All Customers
            </CardTitle>

            <p className="mt-1 text-sm text-zinc-500">
              View and manage your registered customers.
            </p>
          </div>

          <Badge
            variant="outline"
            className="w-fit border-zinc-700 bg-zinc-800/50 text-zinc-400"
          >
            {filteredCustomers.length} customers
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          {/* Search and Filters */}
          <div className="flex flex-col gap-3 border-b border-zinc-800 p-4 md:flex-row md:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email, customer ID..."
                className="h-10 border-zinc-800 bg-zinc-950/60 pl-9 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-amber-500/40"
              />
            </div>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              aria-label="Filter by customer status"
              className="h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 outline-none focus:border-amber-500/50"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              aria-label="Filter by customer type"
              className="h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 outline-none focus:border-amber-500/50"
            >
              <option>All Types</option>
              <option>Regular</option>
              <option>Member</option>
              <option>VIP</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="whitespace-nowrap px-5 text-xs font-medium text-zinc-500">
                    Customer
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Contact
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Location
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Orders
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Total Spent
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Membership
                  </TableHead>

                  <TableHead className="whitespace-nowrap text-xs font-medium text-zinc-500">
                    Status
                  </TableHead>

                  <TableHead className="px-5 text-right text-xs font-medium text-zinc-500">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow
                    key={customer._id}
                    className="border-zinc-800/80 transition-colors hover:bg-zinc-800/30"
                  >
                    {/* Customer */}
                    <TableCell className="px-5">
                      <div className="flex min-w-44 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-semibold text-zinc-300">
                          {customer.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-zinc-200">
                            {customer.name}
                          </p>

                          <p className="text-xs text-zinc-500">
                            {customer._id}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Contact */}
                    <TableCell>
                      <div className="min-w-44 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <Mail className="size-3.5 shrink-0 text-zinc-500" />
                          <span className="truncate">{customer.email}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Phone className="size-3.5 shrink-0" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>

                    {/* Location */}
                    <TableCell>
                      <div className="flex min-w-36 items-center gap-2 text-sm text-zinc-400">
                        <MapPin className="size-3.5 shrink-0 text-zinc-500" />
                        {customer.location}
                      </div>
                    </TableCell>

                    {/* Orders */}
                    <TableCell className="whitespace-nowrap text-sm text-zinc-400">
                      {customer.orders} orders
                    </TableCell>

                    {/* Total Spent */}
                    <TableCell className="whitespace-nowrap font-medium text-zinc-200">
                      {formatPrice(customer.totalSpent)}
                    </TableCell>

                    {/* Membership */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`whitespace-nowrap ${customerTypeStyles[customer.type]}`}
                      >
                        {customer.type === "VIP" && (
                          <Crown className="mr-1 size-3" />
                        )}
                        {customer.type}
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`whitespace-nowrap ${customerStatusStyles[customer.status]}`}
                      >
                        <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                        {customer.status}
                      </Badge>
                    </TableCell>

                    {/* Action */}
                    <TableCell className="px-5 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`View customer ${customer.name}`}
                        className="size-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      >
                        <Eye className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredCustomers.length === 0 && (
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableCell colSpan={8} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-zinc-500">
                        <Users className="size-8 text-zinc-600" />

                        <p className="text-sm font-medium text-zinc-400">
                          No customers found
                        </p>

                        <p className="text-xs">
                          Try changing your search or filters.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer / Pagination */}
          <div className="flex flex-col gap-3 border-t border-zinc-800 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-500">
              Showing{" "}
              <span className="font-medium text-zinc-300">
                {filteredCustomers.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-zinc-300">
                {customers.length}
              </span>{" "}
              customers
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled
                className="h-9 gap-2 border-zinc-800 bg-transparent px-3 text-zinc-400 disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>

              <Button
                variant="outline"
                className="h-9 min-w-9 border-amber-500/30 bg-amber-500/10 px-3 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300"
              >
                1
              </Button>

              <Button
                variant="outline"
                className="h-9 gap-2 border-zinc-800 bg-transparent px-3 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomerPage;

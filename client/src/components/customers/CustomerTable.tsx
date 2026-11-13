
import {
  Users,
  Eye,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import type { Customer } from "@/types/customer";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CustomerTableProps {
  customers: Customer[];
  onView: (customer: Customer) => void;
}

const CustomerTable = ({
  customers,
  onView,
}: CustomerTableProps) => {
  const formatPrice = (price: number) =>
    `${price.toLocaleString("en-US")} MMK`;

  return (
    <Card className="overflow-hidden border-zinc-800/80 bg-zinc-900/40 text-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-800 p-5">
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
          className="border-zinc-700 bg-zinc-800/50 text-zinc-400"
        >
          {customers.length} customers
        </Badge>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="whitespace-nowrap px-5 text-zinc-500">
                  Customer
                </TableHead>

                <TableHead className="text-zinc-500">
                  Contact
                </TableHead>

                <TableHead className="text-zinc-500">
                  Location
                </TableHead>

                <TableHead className="whitespace-nowrap text-zinc-500">
                  Orders
                </TableHead>

                <TableHead className="whitespace-nowrap text-zinc-500">
                  Total Spent
                </TableHead>

                <TableHead className="text-zinc-500">
                  Status
                </TableHead>

                <TableHead className="px-5 text-right text-zinc-500">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {customers.map((customer) => {
                const initials = customer.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("");

                return (
                  <TableRow
                    key={customer._id}
                    className="border-zinc-800/80 transition-colors hover:bg-zinc-800/30"
                  >
                    <TableCell className="px-5">
                      <div className="flex min-w-40 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-semibold text-zinc-300">
                          {initials}
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

                    <TableCell>
                      <div className="min-w-48 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <Mail className="size-3.5 shrink-0 text-zinc-500" />
                          <span className="truncate">
                            {customer.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Phone className="size-3.5 shrink-0" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex min-w-36 items-center gap-2 text-sm text-zinc-400">
                        <MapPin className="size-3.5 shrink-0 text-zinc-500" />
                        {customer.location}
                      </div>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm text-zinc-400">
                      {customer.totalOrders} orders
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm font-medium text-zinc-200">
                      {formatPrice(customer.totalSpent)}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          customer.status === "Active"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-zinc-700 bg-zinc-800 text-zinc-400"
                        }
                      >
                        <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                        {customer.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-5 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView(customer)}
                        aria-label={`View ${customer.name}`}
                        className="size-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      >
                        <Eye className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}

              {customers.length === 0 && (
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableCell colSpan={7} className="h-40 text-center">
                    <div className="flex flex-col items-center gap-2 text-zinc-500">
                      <Users className="size-8 text-zinc-600" />

                      <p className="text-sm font-medium text-zinc-300">
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
      </CardContent>
    </Card>
  );
};

export default CustomerTable;

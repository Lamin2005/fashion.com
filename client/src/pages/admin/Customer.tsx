
import { useMemo, useState } from "react";

import type { Customer } from "@/types/customer";

import { customers as fakeCustomers } from "@/data/customer";

import CustomerHeader from "@/components/customers/CustomerHeader";
import CustomerStats from "@/components/customers/CustomerStats";
import CustomerFilters from "@/components/customers/CustomerFilters";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerPagination from "@/components/customers/CustomerPagination";
import CustomerDetailDialog from "@/components/customers/CustomerDetailDialog";

import { Card } from "@/components/ui/card";

const PAGE_SIZE = 5;

const CustomerPage = () => {
  // Customer data (Fake data for now)
  const [customers] = useState<Customer[]>(fakeCustomers);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Customer Dialog
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter and Sort
  const filteredCustomers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    const filtered = customers.filter((customer) => {
      const matchesSearch =
        customer._id.toLowerCase().includes(keyword) ||
        customer.name.toLowerCase().includes(keyword) ||
        customer.email.toLowerCase().includes(keyword) ||
        customer.phone.toLowerCase().includes(keyword);

      const matchesStatus =
        status === "all" || customer.status === status;

      return matchesSearch && matchesStatus;
    });

    // Sort
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return (
            new Date(a.joinedAt).getTime() -
            new Date(b.joinedAt).getTime()
          );

        case "orders":
          return b.totalOrders - a.totalOrders;

        case "spent":
          return b.totalSpent - a.totalSpent;

        case "newest":
        default:
          return (
            new Date(b.joinedAt).getTime() -
            new Date(a.joinedAt).getTime()
          );
      }
    });
  }, [customers, search, status, sort]);

  // Pagination calculation
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / PAGE_SIZE),
  );

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredCustomers.slice(
      startIndex,
      startIndex + PAGE_SIZE,
    );
  }, [filteredCustomers, currentPage]);

  // Filter handlers
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("all");
    setSort("newest");
    setCurrentPage(1);
  };

  // Customer detail
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-w-0 space-y-6 pb-6">
      {/* Header */}
      <CustomerHeader />

      {/* Statistics */}
      <CustomerStats customers={customers} />

      {/* Customer Table */}
      <Card className="overflow-hidden border-zinc-800/80 bg-zinc-900/40 text-white shadow-sm">
        <CustomerFilters
          search={search}
          status={status}
          sort={sort}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onSortChange={handleSortChange}
          onReset={handleResetFilters}
        />

        <CustomerTable
          customers={paginatedCustomers}
          onView={handleViewCustomer}
        />

        <CustomerPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredCustomers.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </Card>

      {/* Customer Detail Dialog */}
      <CustomerDetailDialog
        customer={selectedCustomer}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default CustomerPage;

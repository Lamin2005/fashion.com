import { useState } from "react";

import type { Customer, CustomerStatus, CustomerSort } from "@/types/customer";

import CustomerHeader from "@/components/customers/CustomerHeader";
import CustomerStats from "@/components/customers/CustomerStats";
import CustomerFilters from "@/components/customers/CustomerFilters";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerPagination from "@/components/customers/CustomerPagination";
import CustomerDetailDialog from "@/components/customers/CustomerDetailDialog";

import {
  useGetAllCustomersQuery,
  useGetCustomerStatsQuery,
} from "@/store/slices/api/customerApi";

import { Card } from "@/components/ui/card";

const PAGE_SIZE = 5;

const CustomerPage = () => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<"all" | CustomerStatus>("all");

  const [sort, setSort] = useState<CustomerSort>("newest");

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: customerData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllCustomersQuery({
    page,
    limit: PAGE_SIZE,
    keyword: search.trim(),
    status,
    sort,
  });

  const { data: statsData, isLoading: isStatsLoading } =
    useGetCustomerStatsQuery();

  const customers = customerData?.customers ?? [];

  const pagination = customerData?.pagination;

  const stats = statsData?.stats;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as "all" | CustomerStatus);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value as CustomerSort);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("all");
    setSort("newest");
    setPage(1);
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  if (isLoading || isStatsLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center text-sm text-zinc-400">
        Loading customers...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-4">
        <p className="text-sm text-red-400">Failed to load customers.</p>

        <button
          onClick={() => refetch()}
          className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-white hover:bg-zinc-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-6 pb-6">
      <CustomerHeader />

      <CustomerStats stats={stats} />

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

        <div className="relative">
          {isFetching && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/40 backdrop-blur-[1px]">
              <p className="text-sm text-zinc-300">Loading...</p>
            </div>
          )}

          <CustomerTable customers={customers} onView={handleViewCustomer} />
        </div>

        <CustomerPagination
          currentPage={pagination?.currentPage ?? 1}
          totalPages={pagination?.totalPages ?? 1}
          totalItems={pagination?.totalCustomers ?? 0}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </Card>

      <CustomerDetailDialog
        customer={selectedCustomer}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default CustomerPage;

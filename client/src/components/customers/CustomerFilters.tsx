
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CustomerFiltersProps {
  search: string;
  status: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

const CustomerFilters = ({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onReset,
}: CustomerFiltersProps) => {
  const hasFilters = search !== "" || status !== "all" || sort !== "newest";

  return (
    <div className="flex flex-col gap-3 border-b border-zinc-800 p-4 lg:flex-row lg:items-center">
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search name, email, phone..."
          className="h-10 border-zinc-800 bg-zinc-950/60 pl-9 text-sm text-white placeholder:text-zinc-500"
        />
      </div>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        aria-label="Filter customer status"
        className="h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 outline-none"
      >
        <option value="all">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort customers"
        className="h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 outline-none"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="orders">Most Orders</option>
        <option value="spent">Highest Spent</option>
      </select>

      {hasFilters && (
        <Button
          variant="ghost"
          onClick={onReset}
          className="h-10 text-zinc-400 hover:text-white"
        >
          <X className="mr-2 size-4" />
          Reset
        </Button>
      )}
    </div>
  );
};

export default CustomerFilters;


import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const CustomerPagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: CustomerPaginationProps) => {
  const start = totalItems === 0
    ? 0
    : (currentPage - 1) * pageSize + 1;

  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-zinc-800 p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-zinc-500">
        Showing{" "}
        <span className="font-medium text-zinc-300">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-zinc-300">
          {totalItems}
        </span>{" "}
        customers
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-9 gap-2 border-zinc-800 bg-transparent px-3 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>

        <span className="flex h-9 min-w-9 items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/10 px-3 text-sm text-amber-400">
          {currentPage} / {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-9 gap-2 border-zinc-800 bg-transparent px-3 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default CustomerPagination;

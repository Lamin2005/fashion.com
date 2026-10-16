import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "./data-table-features";
import { type Product } from "@/types/product";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

export const columns = columnHelper.columns([
  columnHelper.accessor("images", {
    header: "Images",
    cell: ({ row }) => {
      return (
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={row.original.images[0]?.url}
            alt={row.original.name}
          />
          <AvatarFallback>
            {row.original.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  }),
  columnHelper.accessor("name", {
    header: "Product Name",
    cell: ({ row }) => (
      <span className="font-medium text-zinc-100">{row.original.name}</span>
    ),
  }),

  columnHelper.accessor("category", {
    header: "Category",
    cell: ({ row }) => (
      <span className="font-medium text-zinc-100">{row.original.category}</span>
    ),
  }),

  columnHelper.accessor("price", {
    header: "Price",
    cell: ({ row }) => (
      <span className="font-medium text-zinc-100">
        {row.original.price.toLocaleString()} Ks
      </span>
    ),
  }),

  columnHelper.accessor("sizes", {
    header: "Sizes",
    cell: ({ row }) => row.original.sizes.join(", "),
  }),

  columnHelper.accessor("colors", {
    header: "Colors",
    cell: ({ row }) => row.original.colors.join(", "),
  }),

  columnHelper.accessor("rating_count", {
    header: "Rating Count",
  }),

  columnHelper.accessor("is_new_arrival", {
    header: "New Arrival",
    cell: ({ row }) => (row.original.is_new_arrival ? "Yes" : "No"),
  }),

  columnHelper.accessor("is_feature", {
    header: "Featured",
    cell: ({ row }) => (row.original.is_feature ? "Yes" : "No"),
  }),
]);

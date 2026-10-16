import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "./data-table-features";
import { type Product } from "@/types/product";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Badge } from "../ui/badge";

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

export const columns = columnHelper.columns([
  columnHelper.accessor("images", {
    header: "Images",
    cell: ({ row }) => {
      return (
        <AvatarGroup className="flex items-center justify-center">
          {row.original.images?.slice(0, 3).map((image, index) => (
            <Avatar
              key={image.url ?? index}
              className="h-10 w-10 border-2 border-background"
            >
              <AvatarImage src={image.url} alt={row.original.name} />

              <AvatarFallback>
                {row.original.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+{row.original.images?.length}</AvatarGroupCount>
        </AvatarGroup>
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
    cell: ({ getValue }) => (
      <Badge variant={"secondary"}>{getValue() as string}</Badge>
    ),
  }),

  columnHelper.accessor("price", {
    header: "Price",
    cell: ({ getValue }) => (
      <span className="font-medium text-zinc-100">{getValue() as number}</span>
    ),
  }),

  columnHelper.accessor("sizes", {
    header: "Sizes",
    cell: ({ row }) => row.original.sizes.join(", "),
  }),

  columnHelper.accessor("instock_count", {
    header: "Stocks",
    cell: ({ getValue }) => {
      const stocks = getValue() as number;

      return (
        <Badge
          variant="outline"
          className={
            stocks > 10
              ? "border-blue-200 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
              : stocks === 0
                ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
                : "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300"
          }
        >
          {stocks}
        </Badge>
      );
    },
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

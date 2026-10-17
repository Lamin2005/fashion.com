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
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

export const useProductColumn = () => {
  const navigate = useNavigate();

  return columnHelper.columns([
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
        <span className="font-medium text-zinc-100">
          {getValue() as number}
        </span>
      ),
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

    columnHelper.accessor("is_new_arrival", {
      header: "New Arrival",
      cell: ({ row }) => (row.original.is_new_arrival ? "Yes" : "No"),
    }),

    columnHelper.accessor("is_feature", {
      header: "Featured",
      cell: ({ row }) => (row.original.is_feature ? "Yes" : "No"),
    }),

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-52 border border-white/10 bg-[#18181b] p-1.5 text-gray-200 shadow-xl shadow-black/20"
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </DropdownMenuLabel>

              <DropdownMenuItem
                className="cursor-pointer gap-2 rounded-md px-2 py-2 text-sm focus:bg-white/10 focus:text-white"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <Eye /> View Detail
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 bg-white/10" />
              <DropdownMenuItem
                className="cursor-pointer gap-2 rounded-md px-2 py-2 text-sm focus:bg-white/10 focus:text-white"
                onClick={() => navigate(`/admin/edit-products/${product._id}`)}
              >
                <Edit /> Edit Product
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer gap-2 rounded-md px-2 py-2 text-sm focus:bg-white/10 focus:text-white">
                <Trash />
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ]);
};

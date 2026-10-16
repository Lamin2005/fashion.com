import { NavLink } from "react-router-dom";
import { Boxes, AlertTriangle, XCircle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import ProductStatusCard from "@/components/admin/ProductStatusCard";
import { useGetProductsQuery } from "@/store/slices/productApi";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ProductTable } from "@/components/product/ProductTable";
import { columns } from "../../components/product/useProductColumn";

function ProductPage() {
  const { data: product, isLoading } = useGetProductsQuery({});
  const products = product?.products || [];

  console.log(products);

  return (
    <div className="min-w-0 space-y-6 pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Products
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Manage your products, inventory, and stock levels.
          </p>
        </div>

        <Button
          asChild
          className="w-full bg-amber-400 font-semibold text-zinc-950 hover:bg-amber-300 sm:w-auto"
        >
          <NavLink to="/admin/create-products">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </NavLink>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ProductStatusCard
          title="In Stock"
          count={products?.length || 0}
          icon={<Boxes className="h-6 w-6" />}
          status="In Stock"
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="Low Stock"
          count={products?.length || 0}
          icon={<AlertTriangle className="h-6 w-6" />}
          status="Low Stock"
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="Out of Stock"
          count={products?.length || 0}
          icon={<XCircle className="h-6 w-6" />}
          status="Out of Stock"
          isLoading={isLoading}
        />
      </div>

      <Card className=" bg-zinc-900/40 text-white shadow-sm">
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>

        <CardContent>
          <ProductTable
            columns={columns}
            data={products ?? []}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductPage;

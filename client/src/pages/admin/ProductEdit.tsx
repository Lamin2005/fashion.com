import ProductForm from "../../components/admin/ProductForm";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from "../../store/slices/productApi";
import { type ProductFormInput } from "../../schema/products";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

function ProductEdit() {
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isError,
    isLoading,
  } = useGetProductDetailQuery(id as string);
  const navigate = useNavigate();

  const onSubmit = async (data: ProductFormInput) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    formData.append("instock_count", data.instock_count.toString());
    formData.append("rating_count", data.rating_count.toString());
    formData.append("is_new_arrival", String(data.is_new_arrival));
    formData.append("is_feature", String(data.is_feature));

    data.colors.forEach((color) => {
      formData.append("colors", color);
    });

    data.sizes.forEach((size) => {
      formData.append("sizes", size);
    });

    const existingImages = data?.images
      ? data.images
          .filter((image) => image && image.public_id)
          .map((image) => image.public_id)
      : [];

    const newImages = data?.images
      ? data.images.filter((image) => image && image.file)
      : [];

    formData.append("existingImages", JSON.stringify(existingImages));

    newImages.forEach((image) => {
      formData.append("images", image.file as File);
    });

    try {
      if (!id) {
        toast.error("Product ID is missing.");
        return;
      }
      const response = await updateProduct({ id, data: formData }).unwrap();
      console.log("Product updated successfully:", response);
      toast.success(`${response.message}`);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  if (isError) {
    navigate("/admin");
    return;
  }

  return (
    <div>
      <ProductForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        initialData={product}
        isUpdating={isUpdating}
      />
    </div>
  );
}

export default ProductEdit;

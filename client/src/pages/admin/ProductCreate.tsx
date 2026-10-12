import ProductForm from "../../components/admin/ProductForm";
import { useCreateProductMutation } from "../../store/slices/productApi";
import { type ProductFormInput } from "../../schema/products";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ProductCreate() {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: ProductFormInput) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    formData.append("instock_count", data.instock_count.toString());
    formData.append("rating_count", data.rating_count);
    formData.append("is_new_arrival", String(data.is_new_arrival));
    formData.append("is_feature", String(data.is_feature));

    data.colors.forEach((color) => {
      formData.append("colors", color);
    });

    data.sizes.forEach((size) => {
      formData.append("sizes", size);
    });

    data.images.forEach((img) => {
      if (img.file) {
        formData.append("images", img.file as File);
      }
    });
    try {
      const response = await createProduct(formData).unwrap();
      console.log("Product created successfully:", response);
      toast.success(`${response.message}`);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product.");
    }
  };

  return (
    <div>
      <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}

export default ProductCreate;

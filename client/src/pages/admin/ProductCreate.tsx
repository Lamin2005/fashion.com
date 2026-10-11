import ProductForm from "../../components/admin/ProductForm";
import {
  type CreateProductRequest,
  useCreateProductMutation,
} from "../../store/slices/productApi";
import { type ProductFormInput } from "../../schema/products";
import { toast } from "sonner";

function ProductCreate() {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit = async (data: ProductFormInput) => {
    const productData: CreateProductRequest = {
      ...data,
      images: data.images.map(({ preview }) => ({ file: preview })),
    };

    try {
      const response = await createProduct(productData).unwrap();
      console.log("Product created successfully:", response);
      toast.success(`${response.message}`);
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

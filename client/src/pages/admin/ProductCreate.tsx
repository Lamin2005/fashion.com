import ProductForm from "../../components/admin/ProductForm";
import { useCreateProductMutation } from "../../store/slices/productApi";
import { productSchema, type ProductFormInput } from "../../schema/products";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";

function ProductCreate() {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      sizes: [],
      colors: [],
      instock_count: 0,
      rating_count: "0",
      images: [],
      is_new_arrival: false,
      is_feature: false,
    },
  });

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
      form.reset({
        name: "",
        description: "",
        category: "",
        price: 0,
        sizes: [],
        colors: [],
        instock_count: 0,
        rating_count: "0",
        images: [],
        is_new_arrival: false,
        is_feature: false,
      });
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

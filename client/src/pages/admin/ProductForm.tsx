import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { productSchema, type ProductFormInput } from "@/schema/products";
// import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ProductFormProp } from "@/types/product";
import ImageUpload from "./ImageUpload";
import Category from "./Category";
import Colorpicker from "./Colorpicker";
import Sizes from "./Sizes";

export default function ProductForm({
  initialData,
  onSubmit,
  isLoading,
}: ProductFormProp) {
  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Name</FieldLabel>

            <Input type="name" placeholder="eg. T-Shirt" {...field} />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="price"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Price</FieldLabel>

            <Input
              type="number"
              placeholder="eg.$2000"
              {...field}
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
            />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="instock_count"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>In Stock Count</FieldLabel>

            <Input
              type="number"
              placeholder="eg. 100"
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="images"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Image</FieldLabel>
            <ImageUpload image={field.value} onChange={field.onChange} />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="category"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Category</FieldLabel>

            <Category value={field.value} onChange={field.onChange} />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="colors"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Colors</FieldLabel>

            <Colorpicker colors={field.value} onChange={field.onChange} />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="sizes"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Sizes</FieldLabel>

            <Sizes sizes={field.value} onChange={field.onChange} />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Button type="submit" className="cursor-pointer" disabled={isLoading}>
        Create Product
      </Button>
    </form>
  );
}

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { productSchema, type ProductFormInput } from "@/schema/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ProductFormProp } from "@/types/product";
import ImageUpload from "./ImageUpload";
import Category from "./Category";
import Colorpicker from "./Colorpicker";
import Sizes from "./Sizes";
import Tiptap from "../editor/Tiptap";
import { ArrowLeft } from "lucide-react";

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

  const inputClassName =
    "h-11 w-full border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-500";

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="min-h-screen w-full bg-zinc-950 px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8"
    >
      {/* Header */}
      <div className="mb-8 border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Create Product
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Add product details, manage inventory, and configure how your product
          appears in the store.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="min-w-0 space-y-6">
          {/* Basic Information */}
          <section className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold">Basic Information</h2>

              <p className="mt-1 text-sm text-zinc-400">
                Enter the main information about your product.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Product Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="mb-2 text-sm font-medium text-zinc-200">
                      Product Name
                    </FieldLabel>

                    <Input
                      {...field}
                      type="name"
                      placeholder="eg. T-Shirt"
                      className={inputClassName}
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              {/* Price */}
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="mb-2 text-sm font-medium text-zinc-200">
                      Price
                    </FieldLabel>

                    <Input
                      type="number"
                      placeholder="eg. 2000"
                      className={inputClassName}
                      aria-invalid={fieldState.invalid}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              {/* Stock Quantity */}
              <Controller
                name="instock_count"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="mb-2 text-sm font-medium text-zinc-200">
                      Stock Quantity
                    </FieldLabel>

                    <Input
                      type="number"
                      placeholder="eg. 100"
                      className={inputClassName}
                      aria-invalid={fieldState.invalid}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              {/* Category */}
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="mb-2 text-sm font-medium text-zinc-200">
                      Category
                    </FieldLabel>

                    <Category value={field.value} onChange={field.onChange} />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>
          </section>

          {/* Product Images */}
          <section className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold">Product Images</h2>

              <p className="mt-1 text-sm text-zinc-400">
                Upload images to display your product.
              </p>
            </div>

            <Controller
              name="images"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <ImageUpload image={field.value} onChange={field.onChange} />

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </section>

          {/* Product Variants */}
          <section className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold">Product Variants</h2>

              <p className="mt-1 text-sm text-zinc-400">
                Configure the available colors and sizes.
              </p>
            </div>

            <div className="space-y-6">
              {/* Colors */}
              <Controller
                name="colors"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="mb-3 text-sm font-medium text-zinc-200">
                      Available Colors
                    </FieldLabel>

                    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                      <Colorpicker
                        colors={field.value}
                        onChange={field.onChange}
                      />
                    </div>

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              {/* Sizes */}
              <Controller
                name="sizes"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="mb-3 text-sm font-medium text-zinc-200">
                      Available Sizes
                    </FieldLabel>

                    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                      <Sizes sizes={field.value} onChange={field.onChange} />
                    </div>

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>
          </section>

          {/* Display Settings */}
          <section className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold">Display Settings</h2>

              <p className="mt-1 text-sm text-zinc-400">
                Configure how your product appears in the store.
              </p>
            </div>

            <div className="space-y-4">
              {/* New Arrival Toggle */}
              <Controller
                name="is_new_arrival"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                    <div>
                      <p className="text-sm font-medium text-white">
                        New Arrival
                      </p>

                      <p className="mt-1 text-xs text-zinc-400">
                        Mark this product as newly added.
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={field.value}
                      onClick={() => field.onChange(!field.value)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        field.value ? "bg-white" : "bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full transition-all ${
                          field.value
                            ? "left-[22px] bg-black"
                            : "left-0.5 bg-white"
                        }`}
                      />
                    </button>
                  </div>
                )}
              />

              {/* Featured Toggle */}
              <Controller
                name="is_feature"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Featured Product
                      </p>

                      <p className="mt-1 text-xs text-zinc-400">
                        Highlight this product in the store.
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={field.value}
                      onClick={() => field.onChange(!field.value)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        field.value ? "bg-white" : "bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full transition-all ${
                          field.value
                            ? "left-[22px] bg-black"
                            : "left-0.5 bg-white"
                        }`}
                      />
                    </button>
                  </div>
                )}
              />
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN — TIPTAP EDITOR */}
        <div className="min-w-0 lg:sticky lg:top-6">
          <section className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold">Product Description</h2>

              <p className="mt-1 text-sm text-zinc-400">
                Write and format your product description.
              </p>
            </div>

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Tiptap content={field.value} onChange={field.onChange} />

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </section>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-between border-t border-zinc-800 pt-6">
        <Button type="submit" className="flex items-center gap-2 h-11 w-full cursor-pointer bg-zinc-800 px-8 font-medium text-white hover:bg-zinc-700 sm:w-auto">
          <ArrowLeft />
          Back
        </Button>
        <Button
          type="submit"
          className="h-11 w-full cursor-pointer bg-white px-8 font-medium text-black hover:bg-zinc-200 sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
}

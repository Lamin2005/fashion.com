import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import z from "zod";
import type { nameSchma } from "@/schema/auth";

type FormValues = z.infer<typeof nameSchma>;

export default function NameUpdateForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Updated name:", values.name);

    // Example API call
    // await fetch("/api/update-name", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Name</FieldLabel>

            <Input type="name" placeholder="john does" {...field} />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Button type="submit">Update name</Button>
    </form>
  );
}

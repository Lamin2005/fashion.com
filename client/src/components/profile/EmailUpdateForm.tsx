import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import z from "zod";
import type { emailSchma } from "@/schema/auth";

type FormValues = z.infer<typeof emailSchma>;

export default function EmailUpdateForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Updated Email:", values.email);

    // Example API call
    // await fetch("/api/update-email", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Email</FieldLabel>

            <Input type="email" placeholder="example@gmail.com" {...field} />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Button type="submit">Update Email</Button>
    </form>
  );
}

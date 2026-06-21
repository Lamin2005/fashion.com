import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import z from "zod";
import type { passwordSchma } from "@/schema/auth";

type FormValues = z.infer<typeof passwordSchma>;

export default function PasswordUpdateForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      oldPassword: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Updated password:", values.password);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <Controller
        name="oldPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Old Password</FieldLabel>

            <Input
              type="password"
              placeholder="Enter old password"
              {...field}
            />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>New Password</FieldLabel>

            <Input
              type="password"
              placeholder="Enter new password"
              {...field}
            />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Button type="submit" className="cursor-pointer">Update password</Button>
    </form>
  );
}

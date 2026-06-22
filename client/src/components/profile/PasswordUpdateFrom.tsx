import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import z from "zod";
import { passwordSchma } from "@/schema/auth";
import { useUpdatePasswordMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = z.infer<typeof passwordSchma>;

export default function PasswordUpdateForm() {
  const form = useForm<FormValues>({
    resolver : zodResolver(passwordSchma),
    defaultValues: {
      oldPassword: "",
      password: "",
    },
  });

  const [updatePasswordMutation, { isLoading }] = useUpdatePasswordMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await updatePasswordMutation(data).unwrap();
      toast.success(`${response.message}`);
    } catch (error) {
      console.log("Password Update Error : ", error);
      toast.error(`${(error as { data: { message: string } }).data.message}`);
    } finally {
      form.reset();
    }
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

      <Button type="submit" className="cursor-pointer" disabled={isLoading}>
        Update password
      </Button>
    </form>
  );
}

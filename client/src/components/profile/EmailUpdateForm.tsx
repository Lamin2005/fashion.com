import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import z from "zod";
import type { emailSchma } from "@/schema/auth";
import { useUpdateEmailMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useEffect } from "react";

type FormValues = z.infer<typeof emailSchma>;

interface EmailUpdateForm {
  email: string;
}

export default function EmailUpdateForm({ email }: EmailUpdateForm) {
  const form = useForm<FormValues>({
    defaultValues: {
      email,
    },
  });

  const [updateEmailMutation] = useUpdateEmailMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await updateEmailMutation(data).unwrap();
      toast.success(`${response.message}`);
    } catch (error) {
      console.log("Update Email Error : ", error);
      toast.error(`${(error as { data: { message: string } }).data.message}`);
    }
  };

  useEffect(() => {
    form.reset({ email });
  }, [email, form]);

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

      <Button type="submit" className="cursor-pointer">
        Update Email
      </Button>
    </form>
  );
}

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import z from "zod";
import type { nameSchma } from "@/schema/auth";
import { useUpdateNameMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useEffect } from "react";

type FormValues = z.infer<typeof nameSchma>;

interface NameUpdateForm {
  name: string;
}

export default function NameUpdateForm({ name }: NameUpdateForm) {
  const form = useForm<FormValues>({
    defaultValues: {
      name,
    },
  });

  const [updateNameMutation] = useUpdateNameMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await updateNameMutation(data).unwrap();
      toast.success(`${response.message}`);
    } catch (error) {
      console.log("Update Name Error : ", error);
      toast.error(`${(error as { data: { message: string } }).data.message}`);
    }
  };

  useEffect(()=>{
    form.reset({name});
  },[name,form])

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

      <Button type="submit" className="cursor-pointer">
        Update name
      </Button>
    </form>
  );
}

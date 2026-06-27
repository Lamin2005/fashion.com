import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import z from "zod";
import { emailSchma } from "@/schema/auth";
import { useForgotPasswordMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import type { RootState } from "@/store";
import { ArrowRight, AlertCircleIcon } from "lucide-react";

type FormValues = z.infer<typeof emailSchma>;

export default function ExternalForgotPasswordForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(emailSchma),
    defaultValues: {
      email: "",
    },
  });

  const [forgotPasswordMutation, { isLoading, reset }] =
    useForgotPasswordMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await forgotPasswordMutation(data).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error(
        `${(error as { data: { message: string } }).data.message}`
      );
    } finally {
      reset();
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 flex items-center justify-center pt-28 pb-16 px-4">
      <div className="w-full max-w-md bg-white border border-zinc-100 p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">

        <div className="text-center space-y-2 mb-8">
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-600 block">
            [ Password Recovery ]
          </span>

          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 uppercase">
            Forgot Password
          </h1>

          <p className="text-xs text-zinc-400 font-light max-w-72 mx-auto">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">
                  Email Address
                </FieldLabel>

                <Input
                  type="email"
                  placeholder="alex@example.com"
                  {...field}
                  className="w-full text-sm px-4 py-3 border border-zinc-200 rounded-none focus:border-zinc-900"
                />

                {fieldState.error && (
                  <FieldError className="text-xs text-red-500 mt-1">
                    <AlertCircleIcon
                      className="inline-block mr-1"
                      size={12}
                    />
                    {fieldState.error.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest py-6 transition-colors duration-300 flex items-center justify-center gap-2 group border border-zinc-900 rounded-none cursor-pointer"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}

            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Button>
        </form>

        <div className="text-center pt-8 border-t border-zinc-100 mt-8">
          <p className="text-xs text-zinc-400 font-light">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-zinc-900 font-semibold underline underline-offset-4 hover:text-amber-600 transition-colors"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
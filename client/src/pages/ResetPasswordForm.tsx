import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { resetPasswordSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  // useLogoutMutation,
  useResetPasswordMutation,
} from "@/store/slices/userApi";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

type FormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();
  // const [logoutMutation] = useLogoutMutation();
  const { token } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await resetPasswordMutation({
        password: data.password,
        token: token!,
      }).unwrap();
      navigate("/");
      toast.success(`${response.message}`);
    } catch (error) {
      console.error(error);
      toast.error(`${(error as { data: { message: string } }).data.message}`);
    }
  };
  return (
    <div className="w-full min-h-screen bg-zinc-50 flex items-center justify-center pt-28 pb-16 px-4">
      <div className="w-full max-w-md bg-white border border-zinc-100 p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-600 block">
            [ Secure Reset Access ]
          </span>

          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 uppercase">
            Reset Password
          </h1>

          <p className="text-xs text-zinc-400 font-light max-w-70 mx-auto">
            Enter your new password and confirm it to update your account
            password.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">
                  New Password
                </label>

                <Input
                  type="password"
                  placeholder="Enter new password"
                  {...field}
                  className="w-full text-sm px-4 py-3 bg-white border border-zinc-200 outline-none focus:border-zinc-900 transition-all rounded-none"
                />

                {fieldState.error && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">
                  Confirm Password
                </label>

                <Input
                  type="password"
                  placeholder="Confirm new password"
                  {...field}
                  className="w-full text-sm px-4 py-3 bg-white border border-zinc-200 outline-none focus:border-zinc-900 transition-all rounded-none"
                />

                {fieldState.error && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest py-4 transition-colors duration-300 flex items-center justify-center gap-2 group cursor-pointer border border-zinc-900 mt-2"
          >
            Update Password
          </Button>
        </form>

        <div className="text-center pt-8 border-t border-zinc-100 mt-8">
          <p className="text-xs text-zinc-400 font-light">
            Make sure your password is strong and secure.
          </p>
        </div>
      </div>
    </div>
  );
}

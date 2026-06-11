import { useState } from "react";
import { Eye, EyeOff, ArrowRight, AlertCircleIcon } from "lucide-react";
import { loginSchema } from "../schema/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver as hookFormResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useLoginMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/slices/auth";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  type FomrData = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FomrData>({
    resolver: hookFormResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginMutation] = useLoginMutation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submit = async (data: FomrData) => {
    try {
      const response = await loginMutation(data).unwrap();
      toast.success(`${response.message}`);
      console.log("Login successful:", response);
      dispatch(setUserInfo(response.user));
    } catch (error) {
      toast.error(`${(error as { data: { message: string } }).data.message}`);
      console.error("Login failed:", error);
    } finally {
      reset();
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 flex items-center justify-center pt-28 pb-16 px-4">
      <div className="w-full max-w-md bg-white border border-zinc-100 p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-600 block">
            [ Premium Account Access ]
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 uppercase">
            Sign In
          </h1>
          <p className="text-xs text-zinc-400 font-light max-w-70 mx-auto">
            Welcome back. Enter your credentials to access your curations.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(submit)}>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">
              Email Address
            </label>
            <input
              type="email"
              placeholder="alex@example.com"
              {...register("email")}
              className="w-full text-sm px-4 py-3 bg-white border border-zinc-200 outline-none focus:border-zinc-900 transition-all rounded-none"
            />
            <span className="text-xs text-red-500 mt-1 block">
              {errors.email && (
                <>
                  <AlertCircleIcon className="inline-block mr-1" size={12} />
                  {errors.email.message}
                </>
              )}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">
                Password
              </label>
              <a
                href="#"
                className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors underline underline-offset-2"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                {...register("password")}
                className="w-full text-sm px-4 py-3 bg-white border border-zinc-200 outline-none focus:border-zinc-900 transition-all rounded-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <span className="text-xs text-red-500 mt-1 block">
              {errors.password && (
                <>
                  <AlertCircleIcon className="inline-block mr-1" size={12} />
                  {errors.password.message}
                </>
              )}
            </span>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-zinc-900 border-zinc-300 rounded-none focus:ring-zinc-900 accent-zinc-900 cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-xs font-light text-zinc-500 cursor-pointer select-none"
            >
              Keep me logged in
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest py-4 transition-colors duration-300 flex items-center justify-center gap-2 group cursor-pointer border border-zinc-900 mt-2"
          >
            Enter Wardrobe
            <ArrowRight
              size={14}
              className="transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </form>

        <div className="text-center pt-8 border-t border-zinc-100 mt-8">
          <p className="text-xs text-zinc-400 font-light">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="text-zinc-900 font-semibold underline underline-offset-4 hover:text-amber-600 transition-colors"
            >
              Create Profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/store/slices/userApi";

interface Prop {
  email: string;
}

export default function ForgotPasswordForm({ email }: Prop) {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();

  const handleSendResetLink = async () => {
    try {
      const response = await forgotPasswordMutation({ email }).unwrap();
      toast.success(`${response.message}`);
    } catch (error) {
      console.log("Forgot Password Form Error : ", error);
      toast.error(`${(error as { data: { message: string } }).data.message}`);
    }
  };

  return (
    <Button
      onClick={handleSendResetLink}
      disabled={isLoading}
      className="
        w-full
        bg-zinc-900
        hover:bg-zinc-800
        text-white
        text-xs
        font-bold
        uppercase
        tracking-widest
        py-3
        transition-all
        duration-300
        border border-zinc-900
        cursor-pointer
        disabled:opacity-60
        disabled:cursor-not-allowed
        flex items-center justify-center gap-2
      "
    >
      {isLoading ? "Sending Link..." : "Send Reset Link"}
    </Button>
  );
}

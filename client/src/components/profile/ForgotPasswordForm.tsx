import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  const handleSendResetLink = async () => {
    try {
      setLoading(true);

      await new Promise((res) => setTimeout(res, 1500));

      toast.success("Password reset link sent to your email");
    } catch (error) {
      console.log("Forgot Password Form Error : ", error);

      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSendResetLink}
      disabled={loading}
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
      {loading ? "Sending Link..." : "Send Reset Link"}
    </Button>
  );
}

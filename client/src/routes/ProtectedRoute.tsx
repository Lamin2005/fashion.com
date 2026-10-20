import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useProfileQuery } from "@/store/slices/userApi";

function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useProfileQuery(undefined, {
    skip: !userInfo,
    refetchOnMountOrArgChange: true,
  });

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-zinc-600">
        Checking your session...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-zinc-600">
        <p>
          Could not verify your session. Check your connection and try again.
        </p>
        <button
          type="button"
          className="cursor-pointer underline"
          onClick={() => void refetch()}
        >
          Try again
        </button>
      </div>
    );
  }

  if (adminOnly && profile?.user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

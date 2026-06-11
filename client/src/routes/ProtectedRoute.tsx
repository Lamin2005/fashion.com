import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({children}: { children: React.ReactNode }) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  if (!userInfo) {
    navigate("/login");
  }

  return <>{children}</>;
}

export default ProtectedRoute;

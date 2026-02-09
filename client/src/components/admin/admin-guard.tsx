import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import type { PropsWithChildren } from "react";

const AdminGuard = ({ children }: PropsWithChildren) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  const role = user.role ?? (user.email === "admin@gmail.com" ? "admin" : "user");
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;

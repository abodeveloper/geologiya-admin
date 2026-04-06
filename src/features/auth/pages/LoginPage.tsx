import Image from "@/assets/login-image.png";
import { CompanyBranding } from "@/features/company/components/CompanyBranding";
import { useAuthStore } from "@/store/auth-store";
import { Navigate, useLocation } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuthStore();
  const location = useLocation();

  if (isAuthenticated && !loading) {
    return <Navigate to={"/dashboard"} state={{ from: location }} replace />;
  }

  // Login sahifasi UI
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <CompanyBranding variant="login" />
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={Image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

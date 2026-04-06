import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormValues, loginSchema } from "../schemas/login-schema";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useLoginForm = () => {

  const {t} = useTranslation();

  const navigate = useNavigate();
  const { login: loginToStore, loading } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: ({ username, password }: LoginFormValues) => loginToStore(username, password),
    onSuccess: () => {
      // Success toast store'da ko'rsatiladi
    },
    onError: (error: unknown) => {
      // Toast auth-store.login catch da (response.detail) — bu yerda takrorlamaslik
      console.error("Login error:", error);
    },
  });

  useEffect(() => {
    if (loginMutation.isSuccess && !loading) {
      navigate("/dashboard", { replace: true });
    }
  }, [loginMutation.isSuccess, loading, navigate]);

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return {
    form,
    loginMutation,
    onSubmit,
  };
};
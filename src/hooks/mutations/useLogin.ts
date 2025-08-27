import { useMutation } from "react-query";
import { loginUser } from "@/services/api/user";
import { LoginPayload, LoginResponse  } from "@/types/User";
import { toast } from "react-toastify";

export function useLogin() {
  return useMutation<LoginResponse, any, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login realizado com sucesso!");

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      window.location.href = "/feed";
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Erro inesperado ao fazer login.";
      toast.error(message);
    },
  });
}

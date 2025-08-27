import { useMutation } from "react-query";
import { RegisterResponse } from "@/types/User"; 
import { registerUser } from "@/services/api/user";
import { toast } from "react-toastify";
import { UserBasicSchema } from "@/schemas/userSchema";

export function useRegister() {
  return useMutation<RegisterResponse, Error, UserBasicSchema>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Conta criada com sucesso!");

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      window.location.href = "/feed";
    },
    onError: (error: any) => {
      const message = (error.response?.data?.message as string) || "Erro ao criar conta.";
      toast.error(message);
    },
  });
}

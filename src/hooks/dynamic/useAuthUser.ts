import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export function useAuthUser<T = any>() {
  const [authUser, setAuthUser] = useState<T | null>(null);
  const { refetch, user } = useAuth();

  useEffect(() => {    
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        refetch();
      }
      setAuthUser(user || storedUser && JSON.parse(storedUser));
    } catch (err) {
      console.error("Erro ao ler user do localStorage:", err);
    }
  }, []);

  return authUser;
}

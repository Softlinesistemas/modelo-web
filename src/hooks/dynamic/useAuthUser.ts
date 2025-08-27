import { useState, useEffect } from "react";

export function useAuthUser<T = any>() {
  const [authUser, setAuthUser] = useState<T | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setAuthUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Erro ao ler user do localStorage:", err);
    }
  }, []);

  return authUser;
}

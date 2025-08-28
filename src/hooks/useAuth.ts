import { useState, useEffect } from "react";
import { server } from "@/utils/server";

interface User {
  CodUsuario: number;
  Nome: string;
  Usuario: string;
  Email?: string;
  Telefone: string;
  FotoPerfil?: string;
  Apresentacao?: string;
  Cidade: string;
  Estado: string;
  Pais: string;
  AtividadePrincipalId?: number;
  AtividadePrincipalCategoria?: string;
  AtividadePrincipalModalidade?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await server.get("/user");
      console.log(response)
      setUser(response.data);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return {
    user,
    loading,
    isAuthenticated,
    logout,
    refetch: checkAuth,
  };
};

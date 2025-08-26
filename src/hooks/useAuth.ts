import { useState, useEffect } from 'react';
import { server } from '@/utils/server';

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
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await server.get('/user');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    loading,
    isAuthenticated,
    logout,
    refetch: checkAuth
  };
};


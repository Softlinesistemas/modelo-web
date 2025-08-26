import { useState, useEffect } from 'react';
import { server } from '@/utils/server';

interface FeedPost {
  id: number;
  texto: string;
  imagens: string[];
  dataPublicacao: string;
  likes: number;
  comentarios: number;
}

interface UserFeedData {
  CodUsuario: number;
  Nome: string;
  Usuario: string;
  FotoPerfil?: string;
  Apresentacao?: string;
  Cidade: string;
  Estado: string;
  Pais: string;
  AtividadePrincipalCategoria?: string;
  AtividadePrincipalModalidade?: string;
  Telefone: string;
  Email?: string;
  Whatsapp?: string;
  Site?: string;
  Instagram?: string;
  Facebook?: string;
  Youtube?: string;
  posts: FeedPost[];
}

export const useFeed = (userId?: number) => {
  const [feedData, setFeedData] = useState<UserFeedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Se não tem userId, busca dados do usuário logado
      const endpoint = userId ? `/user/${userId}` : '/user';
      const response = await server.get(endpoint);
      
      // Buscar posts do usuário
      const postsEndpoint = userId ? `/posts/user/${userId}` : '/posts/my';
      let posts: FeedPost[] = [];
      
      try {
        const postsResponse = await server.get(postsEndpoint);
        posts = postsResponse.data || [];
      } catch (postsError) {
        console.warn('Erro ao buscar posts, usando array vazio:', postsError);
        posts = [];
      }

      const userData: UserFeedData = {
        ...response.data,
        posts
      };

      setFeedData(userData);
    } catch (err: any) {
      console.error('Erro ao buscar dados do feed:', err);
      setError(err.response?.data?.message || 'Erro ao carregar dados do feed');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (texto: string, imagens: File[] = []) => {
    try {
      const formData = new FormData();
      formData.append('texto', texto);
      
      imagens.forEach((imagem, index) => {
        formData.append(`imagem_${index}`, imagem);
      });

      await server.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Recarregar dados do feed após criar post
      await fetchFeedData();
      return true;
    } catch (err: any) {
      console.error('Erro ao criar post:', err);
      throw new Error(err.response?.data?.message || 'Erro ao criar post');
    }
  };

  const likePost = async (postId: number) => {
    try {
      await server.post(`/posts/${postId}/like`);
      // Recarregar dados do feed após curtir
      await fetchFeedData();
    } catch (err: any) {
      console.error('Erro ao curtir post:', err);
      throw new Error(err.response?.data?.message || 'Erro ao curtir post');
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, [userId]);

  return {
    feedData,
    loading,
    error,
    refetch: fetchFeedData,
    createPost,
    likePost
  };
};


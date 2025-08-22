import axios from "axios";
import Cookies from "js-cookie";

export const server = axios.create({
  baseURL:"http://10.71.0.104:3001/api/v1",
  withCredentials:true
  
});

server.interceptors.response.use(
  (response) => {
    // Qualquer resposta 2xx passa normalmente
    return response;
  },
  (error) => {
    const skipGlobalError =
      error.config?.headers?.['x-skip-global-error'] === '1';

    if (skipGlobalError) {
      // Ignora alertas globais para requisições específicas (ex: validação usuário)
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      // Usuário não autorizado → redirecionar ou alertar
      alert('Unauthorized access. Please log in again.');
      console.error('Unauthorized:', error);
    } else {
      // Outros erros do servidor
      alert('An error occurred. Please try again later.');
      console.error('Server error:', error.message);
    }

    return Promise.reject(error);
  }
);


server.interceptors.request.use(
  (config) => {
    const sessionToken = Cookies.get("token") || localStorage.getItem("token");
    if (sessionToken) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export function getGenres() {
  return server.get("/genero");
}
export function getRaces() {
  return server.get("/raca")}
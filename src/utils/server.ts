import axios from "axios";
import Cookies from "js-cookie";

export const server = axios.create({
  baseURL:"http://10.71.0.104:3001/api/v1",
  
});


server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      alert("Unauthorized access. Please log in again.");
      console.error(error);
    }  else {
      // Handle other errors
      alert("An error occurred. Please try again later.");
      console.error("An error occurred:", error.message);
    }
    return Promise.reject(error);
  }
);

server.interceptors.request.use(
  (config) => {
    const sessionToken = Cookies.get("token");
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
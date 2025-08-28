import { server } from "@/utils/server";
import { Publicacoes } from "@/types/Posts";

export async function getPostsInfo(){
    const { data } = await server.get("/posts");
    return data as Publicacoes[]
}

export async function getPostsByUserName(userName: string | number) {
  const { data } = await server.get(`/posts/user/${userName}`);
  return data as Publicacoes[];
}

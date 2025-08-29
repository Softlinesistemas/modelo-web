import { server } from "@/utils/server";
import { Publicacoes, CreatePostInput } from "@/types/Posts";

export async function getPostsInfo(){
    const { data } = await server.get("/posts");
    return data as Publicacoes[]
}

export async function getPostsByUserName(userName: string | number) {
  const { data } = await server.get(`/posts/user/${userName}`);
  return data as Publicacoes[];
}

export async function createPost(payload: CreatePostInput): Promise<Publicacoes> {
  const formData = new FormData();

  if (payload.Legenda) formData.append("Legenda", payload.Legenda);
  if (payload.DataEncontro) formData.append("DataEncontro", payload.DataEncontro);

  if (payload.files) {
    payload.files.forEach((file) => formData.append("files", file));
  }

  const { data } = await server.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data as Publicacoes;
}

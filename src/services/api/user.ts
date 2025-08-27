import { server } from "@/utils/server";
import { Usuario } from "@/types/User";

export async function getUserInfo(){
    const { data } = await server.get("/user");
    return data as Usuario
}

export async function getUserByUserName(userName: string | number) {
  const { data } = await server.get(`/user/${userName}`);
  return data as Usuario;
}
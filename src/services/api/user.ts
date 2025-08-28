import { server } from "@/utils/server";
import { Usuario, RegisterResponse, LoginPayload, LoginResponse } from "@/types/User";
import { UserBasicSchema } from "@/schemas/userSchema";

export async function getUserInfo(){
    const { data } = await server.get("/user");
    return data as Usuario
}

export async function getUserByUserName(userName: string | number) {
  const { data } = await server.get(`/user/profile/${userName}`);
  return data?.user as Usuario;
}

export async function registerUser(data: UserBasicSchema) {
  const { data: response } = await server.post<RegisterResponse>("/auth/register", data);
  return response;
}

export async function loginUser(data: LoginPayload) {
  const { data: response } = await server.post<LoginResponse>("/auth/login", data);
  console.log(response)
  return response;
}
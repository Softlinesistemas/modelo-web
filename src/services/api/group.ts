import { server } from "@/utils/server";
import { Grupo } from "@/types/Group";

export async function getGroupInfo(){
    const { data } = await server.get("/group");
    return data as Grupo
}
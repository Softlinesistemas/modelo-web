import { server } from "@/utils/server";
import { Empresa } from "@/types/Company";

export async function getCompanyInfo(){
    const { data } = await server.get("/enterprise");
    return data as Empresa
}
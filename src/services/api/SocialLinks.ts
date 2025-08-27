import { server } from "@/utils/server";
import { VinculoSocial } from "@/types/SocialLinks";

export async function getSocialLinksInfo(){
    const { data } = await server.get("/user/social-links");
    return data as VinculoSocial
}
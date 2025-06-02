import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      admin?: boolean;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    admin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    admin?: boolean;
    image?: string | null
  }
}

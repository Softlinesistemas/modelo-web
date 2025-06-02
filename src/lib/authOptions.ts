import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import type { AuthOptions, SessionStrategy } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "User", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const response = await axios.post(
            `${process.env.NEXTAUTH_URL}/api/user/login`,
            credentials
          );

          const { user } = response.data;

          if (user) {
            return {
              id: user?.id,
              name: user?.name,
              email: user?.email,
              admin: user?.admin === "X",
              image: user?.image,
            };
          }

          return null;
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            const status = error.response?.status;

            if (status === 503) {
              throw new Error("Database is unavailable. Please try again later.");
            }

            if (status === 500) {
              throw new Error("Internal server error.");
            }
          }

          throw new Error("Login failed. Please check your credentials.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.admin = user.admin;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          admin: token.admin,
          image: token.image,
        };
      }
      return session;
    },
  },
};

export default authOptions;

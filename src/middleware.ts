import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";
import { Usuario } from "./types/User";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const protectedPaths: string[] = [
  "/amigos",
  "/buscador",
  "/chat",
  "/contato",
  "/configuracoes",
  "/dashboard",
  "/feed",
  "/fornecedores",
  "/galeria",
  "/group",
  "/grupos",
  "/mensageiro",
  "/message",
  "/sobre",
];

const routePermissions: Record<string, string[]> = {
  "/dashboard": ["ADMIN"],
  "/feed": ["ADMIN", "USER", "MOD"],
};

function redirectToLogin(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("token");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.includes(pathname);

  const token = request.cookies.get("token")?.value;
  if (!token) {
    if (isProtected) return redirectToLogin(request);
    return NextResponse.next();
  }

  let decoded: JWTPayload & Partial<Usuario>;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    decoded = payload as JWTPayload & Usuario;
  } catch {
    return redirectToLogin(request);
  }

  if (isProtected && !decoded?.CodUsuario) {
    return redirectToLogin(request);
  }

  const requiredRoles = routePermissions[pathname];
  if (requiredRoles && !requiredRoles.includes(decoded?.Role as string)) {
    return redirectToLogin(request);
  }

  const response = NextResponse.next();

  if (decoded) {
    const safeUser: Partial<Usuario> = {
      CodUsuario: decoded.CodUsuario,
      Usuario: decoded.Usuario,
      Nome: decoded.Nome,
      Role: decoded.Role,
      PerfilId: decoded.PerfilId,
      Fornecedor: decoded.Fornecedor,
    };

    response.headers.set("x-user-token", JSON.stringify(safeUser));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    ...protectedPaths,
  ],
};

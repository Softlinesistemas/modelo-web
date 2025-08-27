import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

interface SafeUser {
  CodUsuario: string;
  Usuario: string;
  Nome: string;
  Role: string;
  PerfilId: string;
  Fornecedor: boolean;
}

const protectedPaths = [
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.includes(pathname);

  const token = request.cookies.get("token")?.value;
  let decoded: any = null;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);
    decoded = payload
  } catch (err) {    
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔒 bloqueia rota protegida se não tiver token válido
  if (isProtected && (!decoded || !decoded.CodUsuario)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const requiredRoles = routePermissions[pathname];
  if (requiredRoles && !requiredRoles.includes(decoded?.Role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();

  if (decoded) {
    const safeUser: SafeUser = {
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
    "/login",
    "/",
    ...protectedPaths,
  ],
};

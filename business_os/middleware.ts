import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Si se accede a la ruta raíz, redirige a /auth
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Aplica el middleware a la ruta raíz
};

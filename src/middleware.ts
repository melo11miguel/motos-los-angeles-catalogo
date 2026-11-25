import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_SESION, sesionValida } from "@/lib/sesion";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/entrar") return NextResponse.next();
  if (await sesionValida(req.cookies.get(COOKIE_SESION)?.value)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/admin/entrar";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/admin", "/admin/:path*"] };

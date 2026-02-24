import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // 🔐 PROTECTED ROUTES
  const protectedRoutes = [
    "/dashboard",
    "/addrecipe",
    "/fav",
    "/myrecepie",
    "/profileedit",
  ];

  // Check if route is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // ❌ No token → redirect to login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔁 Logged-in user should not visit login/register again
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to relevant routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/addrecipe",
    "/fav",
    "/myrecepie",
    "/profileedit",
    "/login",
    "/register",
  ],
};

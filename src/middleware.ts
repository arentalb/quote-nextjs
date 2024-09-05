import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/types";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

const adminOnlyRoutes = ["/admin"]; // For only admins
const userOnlyRoutes = ["/user"]; // For users only
const authRoutes = ["/dashboard", "/profile"]; // For any authenticated user
const notAuthRoutes = ["/login", "/signup"]; // For not authenticated users
const publicRoutes = ["/qoute", "/about", "/contact"]; // For anyone

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const cookie = cookies().get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  const role = session?.role;
  const isAuthenticated = !!session?.userId;

  const isAdminRoute = adminOnlyRoutes.includes(path);
  const isUserOnlyRoute = userOnlyRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  const isNotAuthRoute = notAuthRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (isAdminRoute && role !== Role.Admin) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isUserOnlyRoute && role !== Role.User) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isAuthRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isNotAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (
    isPublicRoute ||
    (!isAdminRoute && !isUserOnlyRoute && !isAuthRoute && !isNotAuthRoute)
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

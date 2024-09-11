import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // const response = await fetch(new URL("/api/auth", req.url).toString(), {
  //   headers: {
  //     Cookie: req.headers.get("cookie") || "",
  //   },
  // });
  //
  // const data = await response.json();
  //
  // const { user, session } = data;
  // const defaultLoginRedirect = "/dashboard";
  // const isLoggedIn = !user && session;
  //
  // const apiAuthPrefix = "/api/auth";
  // const publicRoutes = ["/", "/qoute"];
  // const authRoutes = ["/signin", "/signup"];
  // const adminRoutes = ["/dashboard"];
  //
  // const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  // const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  //
  // if (isApiAuthRoute) {
  //   return NextResponse.next();
  // }
  //
  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return NextResponse.redirect(new URL(defaultLoginRedirect, req.url));
  //   }
  //   return NextResponse.next();
  // }
  //
  // if (!isLoggedIn && !isPublicRoute) {
  //   return NextResponse.redirect(new URL("auth/signin", req.url));
  // }

  //in api/auth/route.ts
  // import { NextResponse } from "next/server";
  // import { getAuth } from "@/lib/auth/getAuth";
  //
  // export async function GET() {
  //   const authData = await getAuth();
  //   return NextResponse.json(authData);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

// src/middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ROLES } from "./app/api/users"; // adjust path if needed

const AUTH_REQUIRED_PATHS = [
  "/cart",
  "/checkout",
  "/my-account",
  "/order",
  "/order-stats",
  "/wishlist",
];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  const role = token?.role;

  /* ---------- prevent auth redirect loops ---------- */
  if (pathname === "/signin" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  /* ------------------ ADMIN ONLY ------------------ */
  if (pathname.startsWith("/admin")) {
    if (!token || ![ROLES.admin, ROLES.manager].includes(role)) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next();
  }

  /* --------------- AUTH REQUIRED ---------------- */
  const needsAuth = AUTH_REQUIRED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (needsAuth && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/cart",
    "/checkout",
    "/my-account",
    "/order",
    "/order-stats",
    "/wishlist",
    "/signin",
  ],
};

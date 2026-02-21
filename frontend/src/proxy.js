import { NextResponse } from "next/server";

export function proxy(req) {
  const cookie = req.cookies.get(process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME)?.value;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/Admin");

  if (isAdminRoute && !cookie) {
    return NextResponse.redirect(
      new URL("/Admin-login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Admin/:path*"],
};

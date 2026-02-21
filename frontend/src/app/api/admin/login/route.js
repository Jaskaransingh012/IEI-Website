import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdmin } from "../../../../lib/auth";

export async function POST(req) {
  try {
    const { adminId, password } = await req.json();

    const isValid = verifyAdmin(adminId, password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set(process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete(process.env.ADMIN_COOKIE_NAME);

  return NextResponse.json({ success: true });
}

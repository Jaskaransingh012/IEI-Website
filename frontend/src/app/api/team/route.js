import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Team from "../../../models/TeamModel";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const existing = await Team.findOne({ email: body.email });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const member = await Team.create(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
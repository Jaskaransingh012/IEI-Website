import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

export async function POST(req) {
  try {
    const { image } = await req.json();

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "team-members",
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
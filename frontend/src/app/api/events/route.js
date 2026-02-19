import { NextResponse } from "next/server";
import {connectDB} from "../../../lib/db";
import Event from "../../../models/Event.model";

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ start_datetime: 1 });
    console.log(events);

    return NextResponse.json(
      { success: true, events },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching events:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

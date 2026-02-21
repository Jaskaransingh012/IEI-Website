import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Event from "../../../../models/Event.model";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      title,
      description,
      event_type,
      start_datetime,
      end_datetime,
      venue,
      mode,
      registration_link,
      poster_url,
      max_participants,
      registration_deadline,
    } = body;

    const event = new Event({
      title,
      description,
      event_type,
      start_datetime: new Date(start_datetime),
      end_datetime: new Date(end_datetime),
      venue,
      mode,
      registration_link,
      poster_url,
      max_participants,
      registration_deadline: new Date(registration_deadline),
    });

    await event.save();

    const events = await Event.find().sort({ start_datetime: 1 });

    return NextResponse.json(
      { success: true, events },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error creating event:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create event" },
      { status: 500 }
    );
  }
}

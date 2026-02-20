import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["upcoming", "live", "completed"],
      required: true,
      default: "upcoming",
    },
    description: String,
    event_type: {
      type: String,
      enum: ["workshop", "hackathon", "seminar", "competition", "webinar", "meetup"],
      required: true,
    },
    start_datetime: { type: Date, required: true },
    end_datetime: Date,
    venue: String,
    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
    },
    registration_link: String,
    poster_url: String,
    max_participants: Number,
    registration_deadline: Date,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// ✅ IMPORTANT FIX
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;

import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Core", "Head", "Executive"],
    required: true
  },
  team: {
    type: String,
    enum: ["Organization", "Web", "Marketing", "Discipline", "Content", "Media"],
    required: true
  },
  bio: String,
  email: {
    type: String,
    required: true
  },
  linkedin: String,
  github: String,
  image: String
}, { timestamps: true });

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
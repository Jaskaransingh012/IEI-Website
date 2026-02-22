import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Core", "Head", "Co-Head" ,"Executive"],
    required: true
  },
  team: {
    type: String,
    enum: ["Organization", "Web", "Marketing", "Discipline", "Content", "Media", "Graphics","Promotions"],
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
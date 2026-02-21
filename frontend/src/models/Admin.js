import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  adminId: { type: String, unique: true },
  password: { type: String }, // hashed
  role: { type: String, default: "admin" }
});

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

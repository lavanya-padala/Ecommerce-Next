import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyToken: { type: String },
    tokenExpiry: { type: Date },
    profile: { type: String },
    isVerified:  { type: Boolean, default: false },
    tokenExpiry: { type: Date, required: false}
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.user || mongoose.model("user", userSchema);
export default UserModel;

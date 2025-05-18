import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String },
    isVerified: { type: Boolean, default: false, required: true },
    verifyToken: { type: String },
    verifyCode: { type: String },
    codeExpiry: { type: Date },
    tokenExpiry: { type: Date }
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;

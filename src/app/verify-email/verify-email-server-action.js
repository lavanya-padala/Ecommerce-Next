"use server"
import { DBconnection } from "../utils/config/db";
import UserModel from "@/app/utils/models/user";

export async function verifyEmailServerAction(email, code) {
  await DBconnection();

  const existingUser = await UserModel.findOne({
    email: email,
    verifyCode: code, // corrected key name
    codeExpiry: { $gt: new Date() }, // Date.now() is also okay
  });

  if (!existingUser) {
    return { error: "Code incorrect or expired. Try resending the code!" };
  }

  existingUser.verifyCode = undefined;
  existingUser.codeExpiry = undefined;
  existingUser.isVerified = true; // typo fixed: was `isVerifies`

  await existingUser.save();

  return { success: true };
}

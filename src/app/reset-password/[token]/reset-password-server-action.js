"use server"
import { DBconnection } from "@/app/utils/config/db";
import UserModel from "@/app/utils/models/user";
import bcrypt from "bcrypt";

export async function resetPasswordAction(password,token){
    await DBconnection();

    const existingUser = await UserModel.findOne({
        verifyToken: token,
        tokenExpiry: { $gt: Date.now() },
    });

    if (!existingUser) {
        throw new Error("Invalid or expired Link");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    existingUser.password = hashedPassword;
    existingUser.verifyToken = undefined;
    existingUser.tokenExpiry = undefined;
    await existingUser.save();

    return { success: true,email:existingUser.email };
}
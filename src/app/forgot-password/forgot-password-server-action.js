'use server';
import { DBconnection } from '@/app/utils/config/db';
import UserModel from "../utils/models/user";
import transporter from '../utils/config/mail';
import { nanoid }from "nanoid"

// forgot-password-server-action.js
export const forgotPasswordAction = async (prevState, formData) => {
  await DBconnection();
  const email = formData.get('email')?.toString().toLowerCase();
  if (!email) return { error: 'Email is required' };

  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) return { error: 'User not exists' };

  try {
    const token = nanoid(32);
    const content = `Click here to <a href=${process.env.BASE_URL}/reset-password/${token}>Reset Password</a>`;
    const resetLink = {
      from: '"Lavanya Padala" <lavanyapadala666@gmail.com>',
      to: email,
      subject: "Reset Password Link",
      html: content,
    };

    await transporter.sendMail(resetLink);

    const expiryTime = Date.now() + 3600000; // 1 hour
    await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          verifyToken: token,
          tokenExpiry: new Date(expiryTime),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return { success: true }; // ✅ success response
  } catch (error) {
    console.log(error + "error");
    return { error: "Something Went Wrong! Try Again Later" };
  }
};

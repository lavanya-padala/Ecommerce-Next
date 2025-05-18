'use server';
import { DBconnection } from '@/app/utils/config/db';
import UserModel from '@/app/utils/models/user';
import crypto from 'crypto';
import sendEmail from '@/app/utils/lib/sendEmail';

export async function forgotPasswordAction(prevState, formData) {
  await DBconnection();

  const email = formData.get('email')?.toString().toLowerCase();
  if (!email) {
    return { error: 'Email is required' };
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return { error: 'No user found with that email' };
  }

  const verifyToken = crypto.randomBytes(32).toString('hex');
  const tokenExpiry = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

  user.verifyToken = verifyToken;
  user.tokenExpiry = tokenExpiry;
  await user.save();

  const resetLink = `${process.env.BASE_URL}/reset-password?token=${verifyToken}&email=${email}`;

  await sendEmail({
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  });

  return { success: 'Password reset link sent to your email' };
}

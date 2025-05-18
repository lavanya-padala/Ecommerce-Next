'use server';
import { redirect } from 'next/navigation';
import { DBconnection } from '@/app/utils/config/db';
import UserModel from '@/app/utils/models/user';

export async function checkUserExist(prevState, formData) {
  const email = formData.get('email')?.trim().toLowerCase();

  if (!email) {
    return { error: 'Email is required' };
  }

  await DBconnection();
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    redirect(`/signin?email=${encodeURIComponent(email)}`);
  } else {
    redirect(`/user-exist?email=${encodeURIComponent(email)}`);
  }
}

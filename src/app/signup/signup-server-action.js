'use server';
import { DBconnection } from "../utils/config/db"
import UserModel from '../utils/models/user';
import bcrypt from 'bcrypt';

const connectDB = async () => {
  await DBconnection();
};
connectDB();

export async function createUser({ email, name, password }) {
  
  const existingUser = await UserModel.findOne({ email: email });
  if (existingUser) {
    return { error: 'User with this email already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserModel.create({
    email:email,
    name:name,
    password: hashedPassword,
  });

  return { success: true };
}

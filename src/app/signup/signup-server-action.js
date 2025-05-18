'use server';
import { DBconnection } from "../utils/config/db"
import transporter from '../utils/config/mail';
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
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit

  await UserModel.create({
    email:email,
    name:name,
    password: hashedPassword,
    verifyCode: code,
    codeExpiry: Date.now() + 15 * 60 * 1000, // 15 min
  });
  const content=`Your verification code is ${code}`;
  const verificationCode = {
      from: '"Lavanya Padala" <lavanyapadala666@gmail.com>',
      to: email,
      subject: "Verification Code",
      html: content,
    };
  await transporter.sendMail(verificationCode);

  return { success: true };
}

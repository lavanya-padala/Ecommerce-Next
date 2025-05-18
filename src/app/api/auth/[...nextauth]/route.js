import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DBconnection } from "@/app/utils/config/db";
import UserModel from "@/app/utils/models/user";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await DBconnection();
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found with given email");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",        
    maxAge: 60 * 60 * 1,     
    updateAge: 60 * 60 * 0.5 
  },

  pages: {
    // signIn: "/signin",
  },

  secret: process.env.AUTH_SECRET,
};

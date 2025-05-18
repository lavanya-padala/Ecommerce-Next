"use server"
import { DBconnection } from "../utils/config/db";
import transporter from "../utils/config/mail";
import UserModel from "../utils/models/user";

export async function resetCodeAction(email) {
    await DBconnection();
    const existingUser=await UserModel.findOne({email:email});
    if(!existingUser){
        return{error:"User doesn't exist"}
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const expiryTime = Date.now() + 3600000;
    existingUser.verifyCode = code;
    existingUser.codeExpiry = new Date(expiryTime);
    const content=`Your verification code is ${code}`;
    const verificationCode = {
        from: '"Lavanya Padala" <lavanyapadala666@gmail.com>',
        to: email,
        subject: "Verification Code",
        html: content,
    };
    await existingUser.save();

     await transporter.sendMail(verificationCode);
    return{success:true}  
}
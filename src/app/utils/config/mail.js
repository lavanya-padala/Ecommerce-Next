import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.BRAVO_HOST,
  port: Number(process.env.BRAVO_PORT),
  secure: false,
  auth: {
    user: process.env.BRAVO_USER,
    pass: process.env.BRAVO_PASS,
  },
});

export default transporter;

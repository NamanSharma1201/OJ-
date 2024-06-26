import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const tranporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default tranporter;

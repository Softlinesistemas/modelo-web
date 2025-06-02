import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  tls: {rejectUnauthorized: false,},
  secure: true,
  auth: {
    user: process.env.GMAIL_LOGIN,
    pass: process.env.GMAIL_PSWD,
  },
});

export default transporter;

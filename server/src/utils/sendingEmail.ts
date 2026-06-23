import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface Options {
  receiver_email: string;
  subject: string;
  html: string;
}

export const sendingEmail = async ({
  receiver_email,
  subject,
  html,
}: Options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  } as SMTPTransport.Options);

  const mail = {
    from: `"${process.env.EMAIL_USER}" <${process.env.EMAIL_ADDRESS}>`,
    to: receiver_email,
    subject,
    html,
  };

  await transporter.sendMail(mail);
};

import nodemailer from "nodemailer";
import config from "../config";

interface EmailSenderParams {
  subject: string;
  email: string;
  html: string;
}

const emailSender = async ({
  subject,
  email,
  html,
}: EmailSenderParams): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: config.nodeMiller.email_host,
    port: Number(config.nodeMiller.email_port),
    secure: false,
    auth: {
      user: config.nodeMiller.email_user,
      pass: config.nodeMiller.email_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: config.nodeMiller.email_from,
    to: email,
    subject,
    html,
  });

  console.log("Message sent:", info.messageId);
};

export default emailSender;
/* eslint-disable @typescript-eslint/no-explicit-any */

import verifyEmail_Link from "../../template/verifyEmail/verifyEmail_Link";
import emailSender from "../../utils/emailSender";


export const sendMail = async (payload: any) => {

  await emailSender({
    subject: "Test mail 01",
    html: verifyEmail_Link(),
    email: "irfan.official.work24@gmail.com"
  })

  return {};
};
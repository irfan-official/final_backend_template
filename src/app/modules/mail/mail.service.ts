/* eslint-disable @typescript-eslint/no-explicit-any */

import verifyEmail_Link from "../../template/verifyEmail/verifyEmail_Link";
import verifyEmail_Code from "../../template/verifyEmail/verifyEmail_Code";
import resetPassword from "../../template/resetPassword/resetPassword";
import emailSender from "../../utils/emailSender";

export const sendMail = async (payload: any) => {
  await emailSender({
    subject: "Test mail 03",
    html: verifyEmail_Link(),
    email: "blackmaster2465@gmail.com",
  });

  return {};
};

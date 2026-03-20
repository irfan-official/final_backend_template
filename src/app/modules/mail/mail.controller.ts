import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import * as MailService from "./mail.service";

export const sendMail = catchAsync(async (req: Request, res: Response) => {
  const result = await MailService.sendMail(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "mail send successfully",
    data: result,
  });
});
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import * as ServeFileService from "./serveFile.service";

export const getCompanyLogo = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ServeFileService.getServeFile(req.query);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "serveFile retrieved successfully",
      data: result,
    });
  },
);

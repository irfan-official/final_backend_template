import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import * as DashboardService from "./dashboard.service";

export const getDashboard = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getDashboard(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "dashboard retrieved successfully",
    data: result,
  });
});
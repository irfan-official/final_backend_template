import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import * as WaitingListService  from "./waitingList.service";

export const createWaitingList = catchAsync(async (req: Request, res: Response) => {
  const result = await WaitingListService.createWaitingList(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "waitingList created successfully",
    data: result,
  });
});
export const getWaitingList = catchAsync(async (req: Request, res: Response) => {
  const result = await WaitingListService.getWaitingList(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Retrieve waitingList successfully",
    data: result,
  });
});
export const updateWaitingList = catchAsync(async (req: Request, res: Response) => {
  const result = await WaitingListService.updateWaitingList(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Update waitingList successfully",
    data: result,
  });
});
export const deleteWaitingList = catchAsync(async (req: Request, res: Response) => {
  const result = await WaitingListService.deleteWaitingList(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "waitingList deleted successfully",
    data: result,
  });
});


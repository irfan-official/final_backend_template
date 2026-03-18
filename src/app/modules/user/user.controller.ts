/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import * as UserService from "./user.service";

// account create
export const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.createUser(req);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "user created successfully",
        data: user
    })
});

// user profile
export const getUserById = catchAsync(async (req: Request & { user?: any }, res: Response) => {

    const decodedUser = req.user as any;

    const user = await UserService.getUserById(decodedUser.userId);


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Current user retrieved successfully",
        data: user
    });
});

// update user profile
export const updateUser = catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const decodedUser = req.user as any;;
    const payload = req.body;

    const result = await UserService.updateUser(decodedUser.userId, payload)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User profile updated successfully",
        data: result
    });
})

// delete user profile
export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.deleteUser(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully",
        data: user
    })
});




import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import * as AuthServices from "./auth.service";
import ApiError from "../../errors/apiError";
import HttpStatus from "http-status";


export const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.login(req.body);
    const { accessToken, refreshToken } = result;

    res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60
    })
    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 90
    })
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User loggedin successfully!",
        data: {
            result
        }
    })
})

export const logout = catchAsync(async (req: Request, res: Response) => {


    const cookieOptions = {
        secure: true,
        httpOnly: true,
        sameSite: "none" as const,
        maxAge: 0
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User logged out successfully!",
        data: null
    });
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
    await AuthServices.forgotPassword(req.body);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Check your email for reset password link",
        data: null,
    });
});

export const checkResetPasswordToken = catchAsync(async (req: Request, res: Response) => {

    const token = req.params.token as string;

    if (!token) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Reset token is required!");
    }

    const result = await AuthServices.checkResetPasswordToken(token);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Reset password token checked successfully!",
        data: result,
    });
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const token = req.params.token as string;

    if (!token) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Reset token is required!");
    }

    await AuthServices.resetPassword(token, req.body);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Password reset successfully!",
        data: null,
    });
});
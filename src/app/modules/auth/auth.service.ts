
import config from "../../config";
import ApiError from "../../errors/apiError";
import { prisma } from "../../prisma/prisma";
import httpStatus from "http-status";
import { jwtHelper } from "../../utils/JwtHelper";
import bcrypt from 'bcrypt'
import emailSender from "../../utils/emailSender";
import resetPasswordTemplate from "../../template/resetPassword/resetPassword";
import crypto from "crypto";

export const login = async (payload: { email: string, password: string }) => {

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })

    if (!user || !user.password) {
        throw new ApiError(401, "Invalid credentials");
    }

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);

    if (!isCorrectPassword) {
        throw new ApiError(401, "Invalid credentials");
    }


    const accessToken = jwtHelper.generateToken(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
            type: "access"
        },
        config.jwt.accessToken as string,
        config.jwt.accessTokenExpiresIn as string
    );

    const refreshToken = jwtHelper.generateToken(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
            type: "refresh"
        },
        config.jwt.refreshToken as string,
        config.jwt.refreshTokenExpiresIn as string
    );


    return {
        accessToken,
        refreshToken,

    }
}

export const forgotPassword = async (payload: { email: string }) => {
    const user = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    // ✅ Generate random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // ✅ Hash token for DB
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // ✅ Expiry (24h)
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // ✅ Save in DB
    await prisma.user.update({
        where: { id: user.id },
        data: {
            passwordResetToken: hashedToken,
            passwordResetExpiry: expiry,
        },
    });

    const resetLink = `http://localhost:8111/api/v1/auth/reset-password/${resetToken}`;

    await emailSender({
        subject: "Reset Your Password",
        email: user.email,
        html: resetPasswordTemplate({
            verifyResetPasswordUrl: resetLink,
            userName: user.name,
        }),
    });

    return { message: "Reset password email sent" };
};

export const resetPassword = async (
    token: string,
    payload: { password: string }
) => {
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await prisma.user.findFirst({
        where: {
            passwordResetToken: hashedToken,
            passwordResetExpiry: {
                gte: new Date(),
            },
        },
    });

    if (!user) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid or expired token");
    }

    const newPassword = await bcrypt.hash(
        payload.password,
        Number(config.bcrypt.salt_rounds)
    );

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: newPassword,

            // ✅ invalidate token
            passwordResetToken: null,
            passwordResetExpiry: null,
        },
    });

    return { message: "Password reset successful" };
};

export const checkResetPasswordToken = async (token: string) => {
    if (!token) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Token missing");
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await prisma.user.findFirst({
        where: {
            passwordResetToken: hashedToken,
            passwordResetExpiry: {
                gte: new Date(),
            },
        },
    });

    if (!user) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid or expired token");
    }

    return {
        valid: true,
        message: "Token is valid",
    };
};

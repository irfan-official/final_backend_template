
import config from "../../config";
import ApiError from "../../errors/apiError";
import { prisma } from "../../prisma/prisma";
import httpStatus from "http-status";
import { jwtHelper } from "../../utils/JwtHelper";
import bcrypt from 'bcrypt'
import { Secret } from "jsonwebtoken";
import emailSender from "../../utils/emailSender";


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
    const userData = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });

    if (!userData) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const resetToken = jwtHelper.generateToken(
        {
            id: userData.id,
            email: userData.email,
            role: userData.role,
        },
        config.jwt.reset_pass_secret as Secret,
        config.jwt.reset_pass_token_expires_in as string
    );

    const backend_base_url = config.setup.node_env !== "development"
        ? `https://${config.setup.domain}/api/v1`
        : `http://${config.setup.domain}:${config.setup.port}/api/v1`

    const resetLink =
        `${backend_base_url}/reset-password?token=${resetToken}`;

    await emailSender(
        "Reset Your Password",
        userData.email,
        `
        <p>Hello ${userData.name || "User"},</p>
        <p>Click the link below to reset your password:</p>
         <a href="${resetLink}" style="text-decoration: none;">
            <button style="background-color: #007BFF; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
              Reset Password
            </button>
          </a>
        <p>If you didn’t request this, ignore this email.</p>
        `
    );

    return { message: "Reset password email sent" };
};

export const resetPassword = async (
    token: string,
    payload: { password: string }
) => {
    // Verify token
    const decoded = jwtHelper.verifyToken(
        token,
        config.jwt.reset_pass_secret as Secret
    );

    if (!decoded) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid or expired token!");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    });

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    // Hash password
    const newHashedPassword = await bcrypt.hash(
        payload.password,
        Number(config.bcrypt.salt_rounds)
    );

    // Update password
    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: newHashedPassword,
        },
    });

    return { message: "Password reset successful" };
};


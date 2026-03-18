/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcryptjs";
import { Request } from "express";
import ApiError from "../../errors/apiError";
import { prisma } from "../../prisma/prisma";
import { UserRole } from "@prisma/client";
import * as passTsValidation from "../../utils/passTsValidation"

export const createUser = async (req: Request) => {
  const { password } = req.body;

  const isExistingUser = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  })

  if (!password) {
    throw new ApiError(500, "password is required")
  }

  const hashPassword = await bcrypt.hash(password, 10)

  if (isExistingUser) {
    throw new ApiError(403, "User already exists!")
  }

  const result = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role ?? UserRole.USER,
    }
  })

  const { password: _, ...modifiedResult } = result;

  // pass the unused variable _
  passTsValidation.unUsedPass(_);

  return modifiedResult
};

export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true
      }
    });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  } catch (error) {
    throw new ApiError(500, `Error finding user: ${error}`);
  }
};

export const updateUser = async (userId: string, payload: any) => {
  const { name, oldPassword, newPassword } = payload;


  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updateData: any = {};

  // update name
  if (name) {
    updateData.name = name;
  }

  // update password
  if (oldPassword && newPassword) {

    if (!user.password) {
      throw new Error("Password not set for this user");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    updateData.password = await bcrypt.hash(newPassword, 10);
  }


  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  return updatedUser;
};

export const deleteUser = async (userId: string) => {
  return prisma.user.delete({
    where: { id: userId },
  });
};




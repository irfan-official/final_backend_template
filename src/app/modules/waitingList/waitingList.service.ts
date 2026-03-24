import { Request } from "express";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";
import { prisma } from "../../prisma/prisma";
import { Prisma, WaitingStatus } from "@prisma/client";

export const createWaitingList = async (req: Request) => {
  const { email } = req.body;

  const existing = await prisma.waitingList.findFirst({
    where: { email },
  });

  if (existing) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "This email is already on the waiting list."
    );
  }

  const waitingList = await prisma.waitingList.create({
    data: {
      email,
      status: "ACTIVE", // explicit (optional, since default exists)
    },
  });

  return waitingList;
};

export const getWaitingList = async (req: Request) => {
  const page  = Number(req.query.page)  || 1;
  const limit = Number(req.query.limit) || 10;
  const skip  = (page - 1) * limit;

  const search = req.query.search as string | undefined;
  const status = req.query.status as WaitingStatus | undefined;

  const whereCondition: Prisma.WaitingListWhereInput = {
    ...(search && {
      email: {
        contains: search,
        mode: Prisma.QueryMode.insensitive, // ✅ FIX
      },
    }),

    ...(status && {
      status, // ✅ typed enum
    }),
  };

  const [waitingList, total] = await Promise.all([
    prisma.waitingList.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.waitingList.count({ where: whereCondition }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: waitingList,
  };
};

export const updateWaitingList = async (req: Request) => {

  const id = req.params.id as string
  const { email, status } = req.body;

  const existing = await prisma.waitingList.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, "Waiting list entry not found.");
  }

  // Email uniqueness check
  if (email && email !== existing.email) {
    const emailTaken = await prisma.waitingList.findFirst({
      where: {
        email,
        id: { not: id },
      },
    });

    if (emailTaken) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "This email is already on the waiting list."
      );
    }
  }

  const updated = await prisma.waitingList.update({
    where: { id },
    data: {
      ...(email && { email }),
      ...(status && { status }), // enum: ACCEPTED | ACTIVE | PENDING
    },
  });

  return updated;
};

export const deleteWaitingList = async (req: Request) => {
  
  const id = req.params.id as string

  const existing = await prisma.waitingList.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, "Waiting list entry not found.");
  }

  await prisma.waitingList.delete({ where: { id } });

  return null;
};


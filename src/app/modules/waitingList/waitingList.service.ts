import { Request } from "express";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";
import { prisma } from "../../prisma/prisma";

export const createWaitingList = async (req: Request) => {
  const { email } = req.body;

  // Check if email already exists
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
    data: { email },
  });

  return waitingList;
};

export const getWaitingList = async (req: Request) => {
  const page  = Number(req.query.page)  || 1;
  const limit = Number(req.query.limit) || 1000000000;
  const skip  = (page - 1) * limit;

  const search = req.query.search as string | undefined;

  const whereCondition = search
    ? {
        OR: [
          { email: { contains: search, mode: "insensitive" as const } },
          { phone: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [waitingList, total] = await Promise.all([
    prisma.waitingList.findMany({
      where:   whereCondition,
      skip,
      take:    limit,
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
  const { id }          = req.params;
  const { email, phone } = req.body;

  const existing = await prisma.waitingList.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, "Waiting list entry not found.");
  }

  // If email is being changed, check it's not taken by another entry
  if (email && email !== existing.email) {
    const emailTaken = await prisma.waitingList.findFirst({
      where: { email, id: { not: id } },
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
      ...(phone && { phone }),
    },
  });

  return updated;
};

export const deleteWaitingList = async (req: Request) => {
  const { id } = req.params;

  const existing = await prisma.waitingList.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, "Waiting list entry not found.");
  }

  await prisma.waitingList.delete({ where: { id } });

  return null;
};


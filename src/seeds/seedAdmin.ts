import * as bcrypt from "bcrypt";
import config from "../app/config";
import { UserRole } from "@prisma/client";
import { prisma } from "../app/prisma/prisma";


interface IUser {
  name: string;
  email: string;
  phoneNumber: string;
  password: string,
  role: UserRole;
}


export const seedAdmin = async () => {
   try{

    
  const users: IUser[] = [
    {
      name: "Super Admin",
      email: config.super_admin.email as string,
      phoneNumber: config.super_admin.phone as string,
      password: config.super_admin.password as string,
      role: UserRole.SUPER_ADMIN,
    },
    {
      name: "Admin",
      email: config.admin.email as string,
      phoneNumber: config.admin.phone as string,
      password: config.admin.password as string,
      role: UserRole.ADMIN,
    },
  ];

  for (const payload of users) {

    const isExistUser = await prisma.user.findUnique({
      where: { email: payload.email, phoneNumber: payload.phoneNumber },
    });

    if (isExistUser) {
      console.log(`${payload.role} already exists`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt.salt_rounds)
    );

    const result = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        role: payload.role,
        password: hashedPassword,
      },
    });

    console.log(`${payload.role} created`, result.email);
  }

   }catch(error){
    console.error(error)
   }
};
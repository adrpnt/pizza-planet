import { hash } from "bcryptjs";

import { type UserType } from "../types/UserType.ts";
import prismaClient from "../prisma/index.ts";

class User {
  async create({ name, email, password }: UserType) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);
    const user = await prismaClient.user.create({
      data: { name, email, password: passwordHash },
    });

    return user;
  }
}

export { User };

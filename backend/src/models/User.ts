import "dotenv/config";

import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

import { type AuthType } from "../types/AuthType.ts";
import { type UserType } from "../types/UserType.ts";
import prismaClient from "../prisma/index.ts";

const { sign } = jwt;

class User {
  async auth({ email, password }: AuthType) {
    const user = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      throw new Error("User not exists");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Wrong password");
    }

    const token = sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      { subject: user.id, expiresIn: "30d" },
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }

  async get(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: { id: user_id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error("User not exists");
    }

    return user;
  }

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
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}

export { User };

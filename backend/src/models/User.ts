import "dotenv/config";

import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

import { type AuthType } from "../types/AuthType.ts";
import { type UserType } from "../types/UserType.ts";
import prismaClient from "../prisma/index.ts";
import { AppError } from "../errors/AppError.ts";

const { sign } = jwt;

class User {
  async auth({ email, password }: AuthType) {
    const user = await prismaClient.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new AppError("User not exists", 404);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Wrong password", 401);
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

  async get(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError("User not exists", 404);
    }

    return user;
  }

  async create({ name, email, password }: UserType) {
    const userAlreadyExists = await prismaClient.user.findUnique({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists", 409);
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

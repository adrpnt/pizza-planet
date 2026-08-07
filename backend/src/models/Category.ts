import prismaClient from "../prisma/index.ts";
import { AppError } from "../errors/AppError.ts";

import { type CategoryType } from "../types/CategoryType.ts";

class Category {
  async get(categoryId: string) {
    const category = await prismaClient.category.findUnique({
      where: { id: categoryId },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    if (!category) {
      throw new AppError("Category not exists", 404);
    }

    return category;
  }

  async create({ name }: CategoryType) {
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: { name: name },
    });

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists", 409);
    }

    const category = await prismaClient.category.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return category;
  }
}

export { Category };

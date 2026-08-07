import { type Request, type Response } from "express";

import { Category } from "../models/Category.ts";

class CategoryController {
  async store(req: Request, res: Response) {
    const { name } = req.body;
    const categoryModel = new Category();
    const category = await categoryModel.create({ name });

    res.json({ message: "Category created", data: category });
  }
}

export { CategoryController };

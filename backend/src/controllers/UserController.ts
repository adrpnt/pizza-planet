import { type Request, type Response } from "express";

import { User } from "../models/User.ts";

class UserController {
  async auth(req: Request, res: Response) {
    const { email, password } = req.body;
    const userModel = new User();
    const user = await userModel.auth({ email, password });

    res.json({ message: "User logged in successfully", data: user });
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userModel = new User();
    const user = await userModel.create({ name, email, password });

    res.json({ message: "User created successfully", data: user });
  }
}

export { UserController };

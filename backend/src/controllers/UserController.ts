import { type Request, type Response } from "express";

import { User } from "../models/User.ts";

class UserController {
  async auth(req: Request, res: Response) {
    const { email, password } = req.body;
    const userModel = new User();
    const user = await userModel.auth({ email, password });

    res.json({ message: "User logged in", data: user });
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userModel = new User();
    const user = await userModel.create({ name, email, password });

    res.json({ message: "User created", data: user });
  }

  async show(req: Request, res: Response) {
    const { id } = req.body;
    const userModel = new User();

    const user = await userModel.get(id);

    res.json({ message: "User retrieved", data: user });
  }
}

export { UserController };

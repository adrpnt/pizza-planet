import { type Request, type Response } from "express";

import { User } from "../models/User.ts";

class UserController {
  async store(req: Request, res: Response) {
    // const { name, email, password } = req.body;
    const userModel = new User();
    const user = await userModel.create();

    res.json({ message: user });
  }
}

export { UserController };

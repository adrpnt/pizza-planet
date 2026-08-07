import { type Request, type Response, type NextFunction } from "express";

import { User } from "../models/User.ts";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  const userModel = new User();
  const user = await userModel.get(userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (!user.role || user.role !== "ADMIN") {
    res.status(403).json({ message: "Access denied" });
    return;
  }

  return next();
};

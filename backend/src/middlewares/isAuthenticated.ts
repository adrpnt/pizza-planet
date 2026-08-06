import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

const { verify } = jwt;

interface TokenPayload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token!,
      process.env.JWT_SECRET as string,
    ) as TokenPayload;

    req.userId = sub;

    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

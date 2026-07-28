import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Pizza Planet!" });
});

export { router };

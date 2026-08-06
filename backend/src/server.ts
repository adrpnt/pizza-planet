import "dotenv/config";

import cors from "cors";
import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { router } from "./routes.ts";
import { AppError } from "./errors/AppError.ts";

const app: Express = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(router);

app.use((error: Error, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error instanceof AppError ? error.statusCode : 500;

  res.status(statusCode).json({
    message: error.message || "Internal Server Error",
    // Only show stack traces in development mode
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
});

app.listen(PORT, () => console.log("SERVER ONLINE ON PORT: " + PORT));

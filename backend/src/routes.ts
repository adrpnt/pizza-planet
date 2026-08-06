import { Router } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated.ts";
import { sessionRateLimiter } from "./middlewares/sessionRateLimiter.ts";
import { validateSchema } from "./middlewares/validateSchema.ts";
import { authUserSchema, createUserSchema } from "./schemas/userSchema.ts";
import { UserController } from "./controllers/UserController.ts";

const router = Router();
const userController = new UserController();

router.post("/users", validateSchema(createUserSchema), userController.store);

router.post(
  "/session",
  sessionRateLimiter,
  validateSchema(authUserSchema),
  userController.auth,
);

router.get("/me", isAuthenticated, userController.show);

export { router };

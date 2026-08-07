import { Router } from "express";

import { isAdmin } from "./middlewares/isAdmin.ts";
import { isAuthenticated } from "./middlewares/isAuthenticated.ts";
import { sessionRateLimiter } from "./middlewares/sessionRateLimiter.ts";
import { validateSchema } from "./middlewares/validateSchema.ts";

import { authUserSchema, createUserSchema } from "./schemas/userSchema.ts";
import { createCategorySchema } from "./schemas/categorySchema.ts";

import { UserController } from "./controllers/UserController.ts";
import { CategoryController } from "./controllers/CategoryController.ts";

const router = Router();
const userController = new UserController();
const categoryController = new CategoryController();

router.post("/users", validateSchema(createUserSchema), userController.store);

router.post(
  "/session",
  sessionRateLimiter,
  validateSchema(authUserSchema),
  userController.auth,
);

router.get("/me", isAuthenticated, userController.show);

router.post(
  "/categories",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  categoryController.store,
);

export { router };

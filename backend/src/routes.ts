import { Router } from "express";

import { UserController } from "./controllers/UserController.ts";
import { validateSchema } from "./middlewares/validateSchema.ts";
import { createUserSchema } from "./schemas/userSchema.ts";

const router = Router();
const userController = new UserController();

router.post("/users", validateSchema(createUserSchema), userController.store);

export { router };

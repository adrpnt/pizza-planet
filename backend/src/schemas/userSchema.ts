import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "The name field is required" })
      .min(3, { message: "The name field must contain at least 3 letters" }),
    email: z.email({
      message: "The email field must contain a valid email address",
    }),
    password: z.string({ message: "The password field is required" }).min(6, {
      message: "The password field must contain at least 6 characters",
    }),
  }),
});

export { createUserSchema };

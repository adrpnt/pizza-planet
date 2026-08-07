import { z } from "zod";

const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ message: "The name field is required and must be a string" })
      .min(3, { message: "The name field must contain at least 3 letters" }),
  }),
});

export { createCategorySchema };

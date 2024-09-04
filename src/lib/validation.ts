import { z } from "zod";

export const UserFormValidation = z.object({
  username: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(2, "password must be at least 2 characters")
    .max(50, "password must be at most 50 characters"),
});

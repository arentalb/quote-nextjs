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

export const UserLoginFormValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(2, "password must be at least 2 characters")
    .max(50, "password must be at most 50 characters"),
});

export const UserUpdateProfileValidation = z.object({
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
});

export const QuoteCreateValidation = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),
  body: z.string().min(2, "Body must be at least 2 characters"),
  author: z.string().min(2, "Author must be at least 2 characters"),
});

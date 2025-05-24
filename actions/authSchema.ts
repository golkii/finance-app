import { z } from "zod";

export const registerSchema = z
  .object({
    login: z.string().min(3),
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
    passwordRepeat: z.string(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords don't match",
    path: ["passwordRepeat"],
  });

export const loginSchema = z.object({
  login: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .regex(/^\S+$/g),
  password: z.string().min(6),
});

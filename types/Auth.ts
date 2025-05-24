import type { User } from "@/prisma/generated";

export type LoginData = Pick<User, "login" | "password">;
export type RegisterData = Pick<User, "login" | "password" | "email" | "name">;

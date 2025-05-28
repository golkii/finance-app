"use server"
import { PrismaClient } from "@/prisma/generated";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { loginSchema, registerSchema } from "./authSchema";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function signup(
  _: unknown,
  { login, email, name, password }: z.infer<typeof registerSchema>
) {
  const existedUser = await prisma.user.findUnique({
    where: { login, email },
  });
  if (existedUser) return "Такой пользователь существует";
  const pwHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, name, login, password: pwHash },
  });
  await createSession(user.id);
  redirect("/");
}

export async function signin(_: unknown, data: z.infer<typeof loginSchema>) {
  const user = await prisma.user.findFirst({ where: { login: data.login } });
  if (!user) return "Пользователь не найден";
  const compareRes = await bcrypt.compare(data.password, user.password);
  if (!compareRes) return "Неверный пароль";
  await createSession(user.id);
  redirect("/");
}

export async function signout() {
  await deleteSession();
  redirect("/login");
}

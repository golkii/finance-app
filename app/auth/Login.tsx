"use client";

import { signin } from "@/actions/auth";
import { loginSchema } from "@/actions/authSchema";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: "", password: "" },
  });

  const [errors, setErrors] = useState("");

  const { formState } = form;
  const login = async (formData: z.infer<typeof loginSchema>) => {
    setErrors("");
    const res = await signin(null, formData);
    if (res) setErrors(res);
  };

  function handleFormSubmit(data: z.infer<typeof loginSchema>) {
      startTransition(() => {
        login(data);
      });
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <div className="mb-4">
              <Label htmlFor="login">Логин</Label>
              <Input {...field} />
              <p className="text-red-400">{formState.errors?.login?.message}</p>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <div className="mb-4">
              <Label htmlFor="password">Пароль</Label>
              <Input type="password" {...field} />
              <p className="text-red-400">
                {formState.errors?.password?.message}
              </p>
            </div>
          )}
        />
        {errors}
        <Button type="submit" className="w-full">
          Войти
        </Button>
      </form>
    </Form>
  );
}

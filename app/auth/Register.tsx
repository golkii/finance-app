"use client";
import signup from "@/actions/auth";
import { registerSchema } from "@/actions/authSchema";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      login: "",
      password: "",
      email: "",
      name: "",
      passwordRepeat: "",
    },
  });
  const { formState } = form;
  const [registerError /* setRegisterError */] = useState("");
  const [, action, pending] = useActionState(signup, undefined);
  function handleFormSubmit(data: z.infer<typeof registerSchema>) {
    startTransition(() => {
      action(data);
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
          name="name"
          render={({ field }) => (
            <div className="mb-4">
              <Label htmlFor="name">Имя</Label>
              <Input {...field} />
              <p className="text-red-400">{formState.errors?.name?.message}</p>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <div className="mb-4">
              <Label htmlFor="email">Почта</Label>
              <Input type="email" {...field} />
              <p className="text-red-400">{formState.errors?.email?.message}</p>
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
        <FormField
          control={form.control}
          name="passwordRepeat"
          render={({ field }) => (
            <div className="mb-4">
              <Label htmlFor="passwordRepeat">Повторите пароль</Label>
              <Input type="password" {...field} />
              <p className="text-red-400">
                {formState.errors?.passwordRepeat?.message}
              </p>
            </div>
          )}
        />
        {!!registerError && registerError}
        <Button disabled={pending} type="submit" className="w-full">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
};

export default Register;

"use client";
import { login } from "@/actions/register";
import { loginSchema, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { /* Control, FieldErrors, */ useForm } from "react-hook-form";
import { z } from "zod";

// function FormInput<DataSchema extends Record<string, string>>({
//   control,
//   errors,
//   fieldName,
//   label,
// }: {
//   control: Control<DataSchema>;
//   errors: FieldErrors<DataSchema>;
//   label: string;
//   fieldName: string;
// }) {
//   <FormField
//     control={control}
//     name={fieldName}
//     render={({ field }) => (
//       <div className="mb-4">
//         <Label htmlFor={fieldName}>{label}</Label>
//         <Input {...field} />
//         <p className="text-red-400">{errors?.[fieldName]?.message}</p>
//       </div>
//     )}
//   />;
// }

export default function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: "", password: "" },
  });

  const { formState } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)}>
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
        <Button type="submit" className="w-full">
          Войти
        </Button>
      </form>
    </Form>
  );
}

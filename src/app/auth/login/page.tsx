"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/index.Schema";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage, SuccessMessage } from "@/components/ui/customMessage";
import { login } from "@/actions/login";
import { LoaderCircle } from "lucide-react";

const LoginPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    startTransition(() => {
      login(data).then((data) => {
        if (data) {
          setError(data.error);
          //setSuccess(data.success);
        }
      });
    });
  };
  return (
    <div className="flex min-h-screen items-center justify-center max-w-2xl mx-auto">
      {/* second div */}
      <div className="w-1/2 h-auto flex shadow rounded-r-md p-5">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...register("email")}
                aria-invalid={!!errors.email}
                required
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <div className="flex ">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
                placeholder="your password"
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
              <Button size="sm" variant="link" asChild className="px-0 w-fit">
                <Link href="/auth/reset">Forget Password</Link>
              </Button>
            </div>
            <SuccessMessage message={success} />
            <ErrorMessage message={error} />

            <div className="flex flex-col gap-3 ">
              <Button
                type="submit"
                className="w-full bg-custom-primary hover:bg-custom-primary/80 hover:cursor-pointer"
              >
                {isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Contact Admin
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

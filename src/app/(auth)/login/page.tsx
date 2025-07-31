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
      {/* first div */}
      <div className="w-1/2 bg-gradient-to-br from-[#2159ab] to-[#143566] p-4 rounded-md text-white space-y-4">
        {/* image */}
        <div className="flex justify-center w-full mt-10">
          <Image
            src="/logo.png"
            width={120}
            height={120}
            alt="logo"
            className=""
          />
        </div>
        {/* title section */}
        <div className="w-full text-center font-mukta mb-30">
          <p className=" text-lg ">नेपाल सरकार</p>
          <hr className="bg-white w-1/2 mx-auto my-6" />
          <p className=" font-bold text-2xl mb-2">सामाजिक सुरक्षा एकाई</p>
          <p className="">मा तपाईलाई स्वागत छ</p>
        </div>
        {/* credit area */}
        <div className="font-mukta text-md text-center">
          <Link href="https://rabinthami.com.np" target="_bank">
            &copy; रविन थामी{" "}
          </Link>
        </div>
      </div>
      {/* second div */}
      <div className="w-1/2 h-auto  flex items-center justify-center shadow rounded-r-md p-5">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
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

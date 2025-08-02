"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/schema/index.Schema";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage, SuccessMessage } from "@/components/ui/customMessage";
import { LoaderCircle, MoveLeft } from "lucide-react";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    //console.log(data);
    startTransition(() => {
      newPassword(data, token).then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
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
              <p className="text-center text-md font-medium">Reset Password</p>
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                {...register("password")}
                aria-invalid={!!errors.password}
                required
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
                  "Send a Reset Email"
                )}
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            <Button variant="link" className="w-fit mx-0" asChild>
              <Link href="/auth/login" className="flex items-center">
                <MoveLeft />
                Go back
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordForm;

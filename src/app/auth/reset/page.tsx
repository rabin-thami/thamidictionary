"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { resetPasswordSchema } from "@/schema/indexSchema";
import { useState, useTransition } from "react";
import { resetPasswordAction } from "@/action";
import type { StatusMessage } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleCheckBig, CircleX, LoaderCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const PasswordResetPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState<StatusMessage | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const handleRedirect = () => {
    router.push("/auth/login");
  };

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      token: token || "",
    },
    values: {
      // Keep token in sync with URL
      password: "",
      token: token || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    if (!token) {
      setMessage({ type: "error", message: "Missing token in URL" });
      return;
    }

    startTransition(() => {
      setMessage(null);
      resetPasswordAction(values).then((data) => {
        if (data?.error) {
          setMessage({ type: "error", message: data.error || "" });
        } else {
          setMessage({ type: "success", message: data.success || "" });
          setTimeout(handleRedirect, 3000);
        }
      });
    });
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="p-6 md:p-8"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <h1 className="text-2xl font-bold">
                        Reset your password
                      </h1>
                      <p className="text-muted-foreground text-balance w-full">
                        Enter a new password for your account.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="password">New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pr-10"
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Hidden token field to submit with form */}
                    <input
                      type="hidden"
                      value={token || ""}
                      {...form.register("token")}
                    />

                    {message && (
                      <Alert
                        variant={
                          message.type === "error" ? "destructive" : "success"
                        }
                        timeout={5000}
                        onTimeout={() => setMessage(null)}
                      >
                        {message.type === "error" ? (
                          <CircleX className="h-4 w-4" />
                        ) : (
                          <CircleCheckBig className="h-4 w-4" />
                        )}
                        <AlertDescription>{message.message}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={!token}>
                      {isPending ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Reset Password"
                      )}
                    </Button>

                    <div className="text-center text-sm">
                      Remembered your password?{" "}
                      <Link
                        href="/auth/login"
                        className="underline underline-offset-4"
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;

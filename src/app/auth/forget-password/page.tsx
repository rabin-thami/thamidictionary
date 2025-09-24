"use client";
import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import type { StatusMessage } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgetPasswordSchema } from "@/schema/indexSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleCheckBig, CircleX, LoaderCircle } from "lucide-react";
import { forgetPasswordAction } from "@/action";
import Link from "next/link";

const ForgetPasswordPage = () => {
  const [message, setMessage] = useState<StatusMessage | null>(null);
  const [isPending, startTransition] = useTransition();

  //function to handle form
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  //function to handle form submit
  const onSubmit = async (values: z.infer<typeof forgetPasswordSchema>) => {
    startTransition(() => {
      setMessage(null);
      forgetPasswordAction(values).then((data) => {
        if (data?.error) {
          setMessage({ type: "error", message: data.error || "" });
        } else {
          setMessage({ type: "success", message: data.success || "" });
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
                        Forgot your password?
                      </h1>
                      <p className="text-muted-foreground text-balance w-full">
                        Type in your email and we'll send you a code to reset
                        link
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              id="email"
                              placeholder="email@mail.com"
                              tabIndex={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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
                    <Button type="submit" className="w-full">
                      {isPending ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Send Reset Email"
                      )}
                    </Button>

                    <div className="text-center text-sm">
                      Already have an account?{" "}
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
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;

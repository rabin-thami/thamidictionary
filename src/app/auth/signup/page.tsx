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
import { signupSchema } from "@/schema/indexSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleCheckBig, CircleX, LoaderCircle } from "lucide-react";
import { signupAction } from "@/action";
import Link from "next/link";
import SocialButton from "@/components/ui/social-button";

const SignupPage = () => {
  const [message, setMessage] = useState<StatusMessage | null>(null);
  const [isPending, startTransition] = useTransition();

  //function to handle form
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //function to handle form submit
  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    startTransition(() => {
      setMessage(null);
      signupAction(values).then((data) => {
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
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Get started</h1>
                      <p className="text-muted-foreground text-balance">
                        Create a new account
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              id="name"
                              placeholder="John Doe"
                              tabIndex={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between w-full">
                            <FormLabel htmlFor="password">Password</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="*******"
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
                        "Sign Up"
                      )}
                    </Button>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or continue with
                      </span>
                    </div>
                    <div>
                      <SocialButton />
                    </div>
                    <div className="text-center text-sm">
                      Don&apos;t have an account?{" "}
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

export default SignupPage;

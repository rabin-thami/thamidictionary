"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { StatusMessage } from "@/types";
import type z from "zod";
import { settingsSchema } from "@/schema/indexSchema";
import { settingsAction } from "@/action";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleCheckBig, CircleX, LoaderCircle } from "lucide-react";

const Page = () => {
  const [message, setMessage] = useState<StatusMessage | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof settingsSchema>) => {
    startTransition(() => {
      setMessage(null);
      settingsAction(values).then((data) => {
        if (data?.error) {
          setMessage({ type: "error", message: data.error || "" });
        } else if (data?.success) {
          setMessage({ type: "success", message: data.success || "" });
          // Clear password fields after success
          form.reset({
            ...values,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
        }
      });
    });
  };

  return (
    <div className="bg-muted/30 flex w-full justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold">Account Settings</h1>
                  <p className="text-muted-foreground">Update your profile information and change your password.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <FormControl>
                          <Input id="name" placeholder="Your name" {...field} />
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
                          <Input id="email" type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="currentPassword">Current password</FormLabel>
                          <FormControl>
                            <Input id="currentPassword" type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="newPassword">New password</FormLabel>
                          <FormControl>
                            <Input id="newPassword" type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="confirmNewPassword">Confirm new password</FormLabel>
                        <FormControl>
                          <Input id="confirmNewPassword" type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {message && (
                  <Alert
                    variant={message.type === "error" ? "destructive" : "success"}
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

                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? <LoaderCircle className="animate-spin" /> : "Save changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;

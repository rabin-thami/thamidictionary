"use server";
import type { z } from "zod";
import { loginSchema } from "@/schema/indexSchema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validateFields = loginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Credentials Fields!" };
  }

  const { email, password } = validateFields.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    // If successful, redirect manually
    return { success: true, redirect: DEFAULT_LOGIN_REDIRECT };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Somethings went wrong!" };
      }
    }
    throw error;
  }
};

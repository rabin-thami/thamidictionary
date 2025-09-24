"use server";
import type { z } from "zod";
import { loginSchema } from "@/schema/indexSchema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/helper"; // 👈 make sure you have this

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validateFields = loginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Credentials Fields!" };
  }

  const { email, password } = validateFields.data;

  // 🔹 Check user manually before login
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Invalid credentials!" };
  }

  if (existingUser.verificationStatus !== "VERIFIED") {
    return { error: "Please verify your email before logging in!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, redirect: DEFAULT_LOGIN_REDIRECT };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

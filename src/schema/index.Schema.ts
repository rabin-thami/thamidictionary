import { z } from "zod";

const mainstreamEmailProviders = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
];

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return mainstreamEmailProviders.includes(domain);
      },
      {
        message: "Only mainstream email providers are allowed.",
      }
    ),
  password: z
    .string()
    .min(2, { message: "Please enter a valid password address" }),
});

export const resetSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return mainstreamEmailProviders.includes(domain);
      },
      {
        message: "Only mainstream email providers are allowed.",
      }
    ),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[\W_]/, "Password must contain at least one special character."),
});

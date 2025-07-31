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

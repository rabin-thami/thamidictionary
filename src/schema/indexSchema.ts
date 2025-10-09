import { z } from "zod";

const mainstreamEmailProviders = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "admin.com",
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
        message: "Only mainstream emails are allowed.",
      },
    ),
  password: z.string().min(2, { message: "Please enter a valid password" }),
});

export const signupSchema = z.object({
  name: z.string().min(2, { message: "Please enter a valid name" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return mainstreamEmailProviders.includes(domain);
      },
      {
        message: "Only mainstream emails are allowed.",
      },
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be a maximum of 32 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ),
});

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return mainstreamEmailProviders.includes(domain);
      },
      {
        message: "Only mainstream emails are allowed.",
      },
    ),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be a maximum of 32 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ),
  token: z.string().min(1, { message: "Invalid token" }),
});

//Word Schema Start from here

enum partOfSpeechEnum {
  noun = "noun",
  verb = "verb",
  adjective = "adjective",
  adverb = "adverb",
  pronoun = "pronoun",
  conjunction = "conjunction",
  preposition = "preposition",
  interjection = "interjection",
  article = "article",
}

enum wordCategoryEum {
  noun = "noun",
  verb = "verb",
  adjective = "adjective",
  adverb = "adverb",
  pronoun = "pronoun",
  conjunction = "conjunction",
}

export const WordFormSchema = z.object({
  word: z.string().min(1, { message: "Please enter a valid word" }),
  partOfSpeech: partOfSpeechEnum,
  category: wordCategoryEum,
  exmaples: z.array(z.string()),
  definition: z.string().min(1, { message: "Please enter a valid definition" }),
  synonyms: z.array(z.string()),
});

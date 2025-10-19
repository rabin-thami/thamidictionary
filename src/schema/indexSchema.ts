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

enum wordCategoryEnum {
  noun = "noun",
  verb = "verb",
  adjective = "adjective",
  adverb = "adverb",
  pronoun = "pronoun",
  conjunction = "conjunction",
}

export const WordFormSchema = z.object({
  // Words in three languages
  wordEnglish: z.string().min(1, { message: "Please enter the English word" }),
  wordNepali: z.string().min(1, { message: "Please enter the Nepali word" }),
  wordThami: z.string().min(1, { message: "Please enter the Thami word" }),

  // Part of speech and category
  partOfSpeech: z.nativeEnum(partOfSpeechEnum, {
    // @ts-ignore
    required_error: "Please select a part of speech",
  }),
  category: z.nativeEnum(wordCategoryEnum, {
    // @ts-ignore
    required_error: "Please select a category",
  }),

  // Definitions in three languages
  definitionEnglish: z
    .string()
    .min(1, { message: "Please enter the English definition" }),
  definitionNepali: z
    .string()
    .min(1, { message: "Please enter the Nepali definition" }),
  definitionThami: z
    .string()
    .min(1, { message: "Please enter the Thami definition" }),

  // Examples in three languages
  examplesEnglish: z
    .array(z.string().min(1))
    .min(1, { message: "Please add at least one English example" }),
  examplesNepali: z
    .array(z.string().min(1))
    .min(1, { message: "Please add at least one Nepali example" }),
  examplesThami: z
    .array(z.string().min(1))
    .min(1, { message: "Please add at least one Thami example" }),

  // Synonyms in three languages
  synonymsEnglish: z.array(z.string().min(1)),
  synonymsNepali: z.array(z.string().min(1)),
  synonymsThami: z.array(z.string().min(1)),
});

export type WordFormData = z.infer<typeof WordFormSchema>;

export { partOfSpeechEnum, wordCategoryEnum, searchLanguageEnum };

enum searchLanguageEnum {
  english = "english",
  nepali = "nepali",
  thami = "thami",
}

export const homePageSearchSchema = z.object({
  query: z.string().min(1, { message: "Please enter a search term" }),
  searchLanguage: z.nativeEnum(searchLanguageEnum, {
    // @ts-ignore
    required_error: "Please select a part of speech",
  }),
});

export const settingsSchema = z.object({
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
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .optional()
    .refine(
      (password) => {
        if (!password) return true; // If password is not provided, skip validation
        return (
          password.length >= 8 &&
          password.length <= 32 &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).+$/.test(
            password
          )
        );
      },
      {
        message:
          "Password must be 8-32 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    ),
  confirmNewPassword: z.string().optional(),
}).refine(
  (data) => {
    if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
      return false;
    }
    return true;
  },
  {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  },
).refine(
  (data) => {
    if (data.newPassword && !data.currentPassword) {
      return false;
    }
    return true;
  },
  {
    message: "Current password is required to set a new password",
    path: ["currentPassword"],
  },
);

// auth.config.ts (NO Prisma here!)
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { loginSchema } from "@/schema/indexSchema";
import { getUserByEmail } from "@/helper";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validationFields = loginSchema.safeParse(credentials);

        if (validationFields.success) {
          const { email, password } = validationFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const isPasswordMatch = await bcryptjs.compare(
            password,
            user.password,
          );

          if (isPasswordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

"use server";
import type { z } from "zod";
import { signupSchema } from "@/schema/indexSchema";
import { getUserByEmail, mailer } from "@/helper";
import { db } from "@/lib/db";
import { tokenGenerator } from "@/helper";
import bcryptjs from "bcryptjs";

export const signupAction = async (values: z.infer<typeof signupSchema>) => {
  const validateFields = signupSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Credentials Fields!" };
  }

  const { name, email, password } = validateFields.data;
  const hashedPassword = await bcryptjs.hash(password, 12);

  const existingUser = await getUserByEmail(email);

  // 🚫 Already verified
  if (existingUser && existingUser.verificationStatus === "VERIFIED") {
    return { error: "Email already exists!" };
  }

  // ⚠️ Pending verification
  if (existingUser && existingUser.verificationStatus === "PENDING") {
    const tokenRecord = await db.verificationToken.findFirst({
      where: {
        userId: existingUser.id,
        identifier: "EMAIL_VERIFICATION",
      },
      orderBy: { createdAt: "desc" },
    });

    if (tokenRecord) {
      const isExpired = tokenRecord.expires < new Date();

      if (!isExpired) {
        return {
          error:
            "Email is already pending verification. Please check your inbox.",
        };
      }

      // Delete old expired tokens
      await db.verificationToken.deleteMany({
        where: {
          userId: existingUser.id,
          identifier: "EMAIL_VERIFICATION",
        },
      });
    }

    // Generate new token
    const newToken = tokenGenerator();
    await db.verificationToken.create({
      data: {
        userId: existingUser.id,
        identifier: "EMAIL_VERIFICATION",
        token: newToken,
        expires: new Date(Date.now() + 1000 * 10 * 60), // 1 hour
      },
    });

    await mailer(email, newToken, "verify");
    return { success: "Verification email resent!" };
  }

  // 🆕 Create a new user
  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationStatus: "PENDING",
      },
    });

    const newToken = tokenGenerator();
    await db.verificationToken.create({
      data: {
        userId: user.id,
        identifier: "EMAIL_VERIFICATION",
        token: newToken,
        expires: new Date(Date.now() + 1000 * 10 * 60), // 1 hour
      },
    });

    await mailer(email, newToken, "verify");
    return { success: "User created. Verification email sent!" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};

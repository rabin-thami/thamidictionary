"use server";
import type { z } from "zod";
import { forgetPasswordSchema } from "@/schema/indexSchema";
import { getUserByEmail, mailer, tokenGenerator } from "@/helper";
import { db } from "@/lib/db";

export const forgetPasswordAction = async (
  value: z.infer<typeof forgetPasswordSchema>,
) => {
  const validateFields = forgetPasswordSchema.safeParse(value);
  if (!validateFields.success) {
    return { error: "Invalid Credentials Fields!" };
  }
  const { email } = validateFields.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User not found!" };
  }

  if (user.verificationStatus === "PENDING") {
    return { error: "Please verify your email first!" };
  }

  const newToken = tokenGenerator();
  await db.verificationToken.create({
    data: {
      userId: user.id,
      identifier: "PASSWORD_RESET",
      token: newToken,
      expires: new Date(Date.now() + 1000 * 10 * 60), // 10 min
    },
  });

  await mailer(email, newToken, "reset");
  return { success: "Password reset email sent successfully!" };
};

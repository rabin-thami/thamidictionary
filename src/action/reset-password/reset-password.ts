"use server";
import type { z } from "zod";
import { resetPasswordSchema } from "@/schema/indexSchema";
import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";

export const resetPasswordAction = async (
  values: z.infer<typeof resetPasswordSchema>,
) => {
  const parsed = resetPasswordSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  const { token, password } = parsed.data;

  // Find token record
  const tokenRecord = await db.verificationToken.findUnique({
    where: { token },
  });

  if (!tokenRecord) {
    return { error: "Invalid or used token" };
  }

  if (tokenRecord.identifier !== "PASSWORD_RESET") {
    return { error: "Invalid token identifier" };
  }

  if (tokenRecord.expires < new Date()) {
    return { error: "Token expired" };
  }

  // Hash the new password
  const hashed = await bcryptjs.hash(password, 12);

  // Update user password
  await db.user.update({
    where: { id: tokenRecord.userId },
    data: { password: hashed },
  });

  // Invalidate all reset tokens for this user
  await db.verificationToken.deleteMany({
    where: { userId: tokenRecord.userId, identifier: "PASSWORD_RESET" },
  });

  return { success: "Password has been reset successfully" };
};

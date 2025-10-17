"use server";
import { db } from "@/lib/db";

export const signupVerificationAction = async (token: string) => {
  if (!token) {
    return { error: "Invalid token!" };
  }

  const tokenRecord = await db.verificationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!tokenRecord) {
    return { error: "Token not found!" };
  }

  if (tokenRecord.expires < new Date()) {
    return { error: "Token expired!" };
  }

  switch (tokenRecord.identifier) {
    case "EMAIL_VERIFICATION": {
      await db.user.update({
        where: { id: tokenRecord.userId },
        data: {
          verificationStatus: "VERIFIED",
          emailVerified: new Date(),
        },
      });

      await db.verificationToken.delete({
        where: { id: tokenRecord.id },
      });

      return { success: "Email verified successfully!" };
    }

    default: {
      return { error: "Invalid token identifier!" };
    }
  }
};

"use server";
import type { z } from "zod";
import { settingsSchema } from "@/schema/indexSchema";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/helper";
import bcrypt from "bcryptjs";

export const settingsAction = async (
  values: z.infer<typeof settingsSchema>,
) => {
  const validatedFields = settingsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized!" };
  }

  const { name, email, currentPassword, newPassword } = validatedFields.data;

  try {
    // Get the current user
    const currentUser = await db.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) {
      return { error: "User not found!" };
    }

    // Check if email is being changed and if it's already in use
    if (email !== currentUser.email) {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return { error: "Email already in use!" };
      }
    }

    // If changing password, verify the current password
    if (newPassword && currentPassword) {
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        currentUser.password || "",
      );

      if (!isPasswordValid) {
        return { error: "Current password is incorrect!" };
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      // Update user with new password
      await db.user.update({
        where: { id: userId },
        data: {
          name,
          email,
          password: hashedNewPassword,
        },
      });
    } else {
      // Update user without changing password
      await db.user.update({
        where: { id: userId },
        data: {
          name,
          email,
        },
      });
    }

    return { success: "Settings updated successfully!" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};

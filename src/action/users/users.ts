"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export type GetUsersInput = {
  page?: number;
  limit?: number;
  search?: string;
};

export type GetUsersOutput = {
  data: Array<{
    id: string;
    name: string | null;
    email: string;
    role?: string | null;
    createdAt: Date;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const getUsersAction = async (
  params: GetUsersInput = {},
): Promise<GetUsersOutput> => {
  const { page = 1, limit = 10, search = "" } = params;

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [total, users] = await Promise.all([
    db.user.count({ where } as any),
    db.user.findMany({
      where } as any,
      {
        select: {
          id: true,
          name: true,
          email: true,
          // role may not exist in schema; select conditionally by casting any
          role: true as any,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      } as any,
    ),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    data: users as any,
    pagination: { page, limit, total, totalPages },
  };
};

export const deleteUserAction = async (id: string) => {
  const session = await auth();
  const currentUserId = session?.user?.id;
  const currentUserRole = (session as any)?.user?.role;

  if (!currentUserId) return { error: "Unauthorized" } as const;

  // Basic guard: disallow deleting self; require admin role if available
  if (currentUserId === id) return { error: "You cannot delete your own account" } as const;

  if (typeof currentUserRole !== "undefined" && currentUserRole !== "ADMIN") {
    return { error: "Forbidden" } as const;
  }

  try {
    await db.user.delete({ where: { id } });
    return { success: "User deleted successfully" } as const;
  } catch (e) {
    console.error(e);
    return { error: "Failed to delete user" } as const;
  }
};

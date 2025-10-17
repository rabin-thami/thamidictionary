import { auth } from "@/auth";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10"); // 👈 default 10
  const search = searchParams.get("search") || "";

  const skip = (page - 1) * limit;

  const userId = session.user.id as string;

  const where: Prisma.WordWhereInput = search
    ? {
        userId,
        OR: [
          { wordEnglish: { contains: search, mode: "insensitive" } },
          { wordNepali: { contains: search, mode: "insensitive" } },
          { wordThami: { contains: search, mode: "insensitive" } },
        ],
      }
    : { userId };

  const [totalWords, words] = await Promise.all([
    db.word.count({ where }),
    db.word.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
  ]);

  return NextResponse.json({
    data: words,
    pagination: {
      total: totalWords,
      page,
      limit,
      totalPages: Math.ceil(totalWords / limit),
    },
  });
}

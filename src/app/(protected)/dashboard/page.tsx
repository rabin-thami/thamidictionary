import { auth } from "@/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import DashboardWidgets from "../_components/dashboard-widgets";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    // In the protected segment, this likely won't render without auth, but guard anyway
    return null;
  }
  const userId = session.user.id as string;

  const [totalWords, recentWords, posGroups] = await Promise.all([
    db.word.count({ where: { userId } }),
    db.word.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        wordEnglish: true,
        wordNepali: true,
        wordThami: true,
        partOfSpeech: true,
        createdAt: true,
      },
    }),
    db.word
      .groupBy({
        by: ["partOfSpeech"],
        where: { userId },
        _count: { _all: true },
      })
      .catch(() => [] as { partOfSpeech: string; _count: { _all: number } }[]),
  ]);

  const stats = {
    totalWords,
    byPartOfSpeech: posGroups
      .map((g) => ({ label: g.partOfSpeech, value: g._count._all }))
      .sort((a, b) => b.value - a.value),
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Words</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalWords}</div>
            <p className="text-sm text-muted-foreground mt-1">
              All words you have added
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 flex-wrap">
            <Link
              href="/words/add-word"
              className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground shadow hover:opacity-90"
            >
              Add Word
            </Link>
            <Link
              href="/words"
              className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm shadow-sm hover:bg-accent"
            >
              Manage Words
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Parts of Speech</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.byPartOfSpeech.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data</p>
            ) : (
              <ul className="space-y-2">
                {stats.byPartOfSpeech.slice(0, 4).map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span className="capitalize">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Use the search below to quickly find your recent words.</li>
              <li>Click a word to view its full details.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Words</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="text-sm text-muted-foreground">Loading...</div>
            }
          >
            <DashboardWidgets
              recentWords={recentWords}
              posData={stats.byPartOfSpeech}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

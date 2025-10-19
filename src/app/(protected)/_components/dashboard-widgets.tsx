"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

type RecentWord = {
  id: string;
  wordEnglish: string | null;
  wordNepali: string | null;
  wordThami: string | null;
  partOfSpeech: string;
  createdAt: string | Date;
};

type ChartDatum = { label: string; value: number };

export default function DashboardWidgets({
  recentWords,
  posData,
}: {
  recentWords: RecentWord[];
  posData: ChartDatum[];
}) {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState<"english" | "nepali" | "thami">("english");

  const filtered = useMemo(() => {
    if (!query.trim()) return recentWords;
    const q = query.toLowerCase();
    return recentWords.filter((w) =>
      [w.wordEnglish, w.wordNepali, w.wordThami]
        .filter(Boolean)
        .some((t) => (t as string).toLowerCase().includes(q)),
    );
  }, [query, recentWords]);

  const maxVal = Math.max(1, ...posData.map((d) => d.value));

  return (
    <div className="grid gap-6 lg:grid-cols-2 font-eczar">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search recent words..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-fit"
          />
          <div className="flex rounded-md border overflow-hidden">
            {(["english", "nepali", "thami"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-sm capitalize ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <ul className="divide-y rounded-md border">
          {filtered.length === 0 && (
            <li className="p-4 text-sm text-muted-foreground">No matches.</li>
          )}
          {filtered.map((w) => {
            const title =
              lang === "english"
                ? w.wordEnglish || w.wordNepali || w.wordThami || "—"
                : lang === "nepali"
                  ? w.wordNepali || w.wordEnglish || w.wordThami || "—"
                  : w.wordThami || w.wordEnglish || w.wordNepali || "—";
            return (
              <li
                key={w.id}
                className="flex items-center justify-between gap-3 p-3"
              >
                <div className="min-w-0">
                  <Link
                    href={`/words/${w.id}`}
                    className="font-medium hover:underline truncate block"
                    title={title}
                  >
                    {title}
                  </Link>
                  <p className="text-xs text-muted-foreground capitalize">
                    {w.partOfSpeech}
                  </p>
                </div>
                <Link
                  href={`/words/${w.id}`}
                  className="text-xs rounded-md border px-2 py-1 hover:bg-accent whitespace-nowrap"
                >
                  View
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Words by Part of Speech</h3>
        {posData.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data to display.</p>
        ) : (
          <div className="space-y-2">
            {posData.map((d) => (
              <div key={d.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="capitalize text-muted-foreground">
                    {d.label}
                  </span>
                  <span className="font-medium">{d.value}</span>
                </div>
                <div className="h-2 w-full rounded bg-muted/60 overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${Math.max(4, Math.round((d.value / maxVal) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

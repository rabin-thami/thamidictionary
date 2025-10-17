"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Keep in sync with Prisma model fields used on list
type Word = {
  id: string;
  wordEnglish: string;
  wordNepali: string;
  wordThami: string;
  partOfSpeech: string;
  category: string;
  definitionEnglish: string;
  definitionNepali: string;
  definitionThami: string;
  examplesEnglish: string[];
  examplesNepali: string[];
  examplesThami: string[];
  synonymsEnglish: string[];
  synonymsNepali: string[];
  synonymsThami: string[];
  createdAt?: string;
  updatedAt?: string;
};

export default function WordDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let abort = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/words/${id}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({} as any));
          throw new Error(body?.error || `Failed: ${res.status}`);
        }
        const data = await res.json();
        if (!abort) setWord(data.data as Word);
      } catch (e: any) {
        if (!abort) setError(e.message || "Failed to load word");
      } finally {
        if (!abort) setLoading(false);
      }
    }
    if (id) load();
    return () => {
      abort = true;
    };
  }, [id]);

  const rows = useMemo(() => {
    if (!word) return [] as { label: string; values: string[] }[];
    return [
      { label: "Word", values: [word.wordEnglish, word.wordNepali, word.wordThami] },
      { label: "Definition", values: [word.definitionEnglish, word.definitionNepali, word.definitionThami] },
    ];
  }, [word]);

  const examples = useMemo(() => {
    if (!word) return [] as { en?: string; ne?: string; th?: string }[];
    const maxLen = Math.max(
      word.examplesEnglish?.length || 0,
      word.examplesNepali?.length || 0,
      word.examplesThami?.length || 0
    );
    return Array.from({ length: maxLen }).map((_, i) => ({
      en: word.examplesEnglish?.[i],
      ne: word.examplesNepali?.[i],
      th: word.examplesThami?.[i],
    }));
  }, [word]);

  const synonyms = useMemo(() => {
    if (!word) return [] as { en?: string; ne?: string; th?: string }[];
    const maxLen = Math.max(
      word.synonymsEnglish?.length || 0,
      word.synonymsNepali?.length || 0,
      word.synonymsThami?.length || 0
    );
    return Array.from({ length: maxLen }).map((_, i) => ({
      en: word.synonymsEnglish?.[i],
      ne: word.synonymsNepali?.[i],
      th: word.synonymsThami?.[i],
    }));
  }, [word]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push("/words")}>Back to list</Button>
        {word && (
          <div className="text-sm text-muted-foreground">
            POS: <span className="capitalize">{word.partOfSpeech}</span> • Category: <span className="capitalize">{word.category}</span>
          </div>
        )}
      </div>

      <Card className="p-4">
        {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {!loading && error && (
          <div className="text-sm text-destructive">{error}</div>
        )}
        {!loading && !error && word && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Overview</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>English</TableHead>
                    <TableHead>Nepali</TableHead>
                    <TableHead>Thami</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.label}>
                      <TableCell className="font-medium">{r.label}</TableCell>
                      <TableCell className="font-eczar">{r.values[0]}</TableCell>
                      <TableCell className="font-eczar">{r.values[1]}</TableCell>
                      <TableCell className="font-eczar">{r.values[2]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Examples</h2>
              {examples.length === 0 ? (
                <div className="text-sm text-muted-foreground">No examples</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>EN</TableHead>
                      <TableHead>NE</TableHead>
                      <TableHead>TH</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examples.map((ex, i) => (
                      <TableRow key={i}>
                        <TableCell className="w-10">{i + 1}</TableCell>
                        <TableCell className="font-eczar">{ex.en || ""}</TableCell>
                        <TableCell className="font-eczar">{ex.ne || ""}</TableCell>
                        <TableCell className="font-eczar">{ex.th || ""}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Synonyms</h2>
              {synonyms.length === 0 ? (
                <div className="text-sm text-muted-foreground">No synonyms</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>EN</TableHead>
                      <TableHead>NE</TableHead>
                      <TableHead>TH</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {synonyms.map((sn, i) => (
                      <TableRow key={i}>
                        <TableCell className="w-10">{i + 1}</TableCell>
                        <TableCell className="font-eczar">{sn.en || ""}</TableCell>
                        <TableCell className="font-eczar">{sn.ne || ""}</TableCell>
                        <TableCell className="font-eczar">{sn.th || ""}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

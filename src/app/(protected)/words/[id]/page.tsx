"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Quote, List, Tag, Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import WordCard from "@/components/ui/WordCard";
import PageHeader from "@/protected-components/page-header";

// Types matching list page
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
};

type LanguageKey = "English" | "Nepali" | "Thami";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    let ignore = false;
    async function fetchWord() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/words?id=${encodeURIComponent(id)}`);
        if (!res.ok) {
          throw new Error(`Failed to load (status ${res.status})`);
        }
        const json = await res.json();
        const data: Word | undefined = json?.data;
        if (!ignore) setWord(data ?? null);
      } catch (e: any) {
        if (!ignore) setError(e?.message || "Failed to load");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    if (id) fetchWord();
    return () => {
      ignore = true;
    };
  }, [id]);

  const sections = useMemo(() => {
    if (!word)
      return [] as {
        label: LanguageKey;
        w: string;
        def: string;
        ex: string[];
        syn: string[];
      }[];
    return [
      {
        label: "Nepali" as const,
        w: word.wordNepali,
        def: word.definitionNepali,
        ex: word.examplesNepali || [],
        syn: word.synonymsNepali || [],
      },
      {
        label: "Thami" as const,
        w: word.wordThami,
        def: word.definitionThami,
        ex: word.examplesThami || [],
        syn: word.synonymsThami || [],
      },
      {
        label: "English" as const,
        w: word.wordEnglish,
        def: word.definitionEnglish,
        ex: word.examplesEnglish || [],
        syn: word.synonymsEnglish || [],
      },
    ];
  }, [word]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <Button
          onClick={handleBack}
          variant="outline"
          className="inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to words
        </Button>
        <Button className="inline-flex items-center gap-2" onClick={() => router.push(`/words/${id}/edit`)}>
          <Pencil />
          Edit
        </Button>
      </div>

      {loading && (
        <Card className="w-full">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-6 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-4 w-full max-w-[600px]" />
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 grid sm:grid-cols-2 gap-6">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-destructive">Failed to load</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {!loading && !error && word && (
        <Card className="w-full">
          <CardHeader className="pb-0">
            <div className="flex flex-col gap-3">
              <CardTitle className="font-eczar text-2xl sm:text-3xl">
                <span className="font-semibold">
                  {word.wordEnglish || word.wordNepali || word.wordThami}
                </span>
                <span className="ml-2 text-base font-normal italic">
                  ({word.partOfSpeech})
                </span>
              </CardTitle>

              {/*<div className="flex flex-wrap items-center gap-2">*/}
              {/*  <Badge variant="outline" className="text-xs sm:text-sm">*/}
              {/*    <Tag className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />*/}
              {/*    Part of Speech: {word.partOfSpeech}*/}
              {/*  </Badge>*/}
              {/*</div>*/}

              <CardDescription className="text-sm">
                Below are the entries in Nepali, Thami and English.
              </CardDescription>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-0 font-eczar">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {sections.map((sec) => (
                <div key={sec.label} className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    {sec.label}
                  </div>
                  <WordCard
                    word={sec.w || "—"}
                    definition={sec.def}
                    part_of_speech={word.partOfSpeech}
                    examples={sec.ex}
                    synonyms={sec.syn}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;

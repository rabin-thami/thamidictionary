"use client";
import { useState, useTransition } from "react";
import Navbar from "@/components/ui/navbar/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type * as z from "zod";

import WordCard from "@/components/ui/WordCard";
import WordOfTheDay from "@/components/ui/wordOfTheDay";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  homePageSearchSchema,
  partOfSpeechEnum,
  searchLanguageEnum,
} from "@/schema/indexSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addWordAction, searchWordAction } from "@/action";
import { toast } from "sonner";
import { X } from "lucide-react";

const HomePage = () => {
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof homePageSearchSchema>>({
    resolver: zodResolver(homePageSearchSchema),
    defaultValues: {
      query: "",
      searchLanguage: searchLanguageEnum.english,
    },
  });

  const onSubmit = async (values: z.infer<typeof homePageSearchSchema>) => {
    const trimmedQuery = values.query.trim();

    // Prevent submitting if the query is empty after trimming
    if (!trimmedQuery) {
      toast.error("Please enter a word to search");
      setHasSearched(false);
      setResults([]);
      return;
    }

    // Mark that the user has attempted a search so we can adjust UI states
    setHasSearched(true);

    const payload = { ...values, query: trimmedQuery } as z.infer<
      typeof homePageSearchSchema
    >;

    startTransition(() => {
      searchWordAction(payload).then((data) => {
        if (data?.error) {
          toast.error(data.error);
          setResults([]);
        } else if (data?.success) {
          toast.success(data.success);
          // data.data is the array of results from the server
          // ensure we always have an array
          // @ts-ignore
          if (Array.isArray(data.data)) setResults(data.data);
          else setResults([]);
        }
      });
    });
  };

  return (
    <main>
      <h1 className="sr-only">Thami Dictionary</h1>
      <div className="mb-5">
        <Navbar />
      </div>

      {/*Search Section*/}

      <section
        className={`px-4 sm:px-6 lg:px-8 ${!hasSearched ? "min-h-[60vh] flex items-center flex-col justify-center" : ""}`}
      >
        {!hasSearched && (
          <div className="max-w-3xl mx-auto text-center space-y-8 mt-10 font-eczar">
            <div className="space-y-4">
              <h1 className="md:text-4xl font-medium tracking-tight ">
                <span className="flex items-center justify-center gap-2">
                  Nepali <X /> Thami <X /> English
                </span>
                Language Dictionary
              </h1>
            </div>
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-lg mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
            aria-label="Dictionary search"
          >
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      id="query"
                      placeholder="Enter your word here ..."
                      tabIndex={0}
                      className="w-80 py-6 px-4"
                    />
                  </FormControl>
                  {/*<FormMessage />*/}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="searchLanguage"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="py-6 w-32">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(searchLanguageEnum).map((sle) => (
                        <SelectItem key={sle} value={sle}>
                          {sle.charAt(0).toUpperCase() + sle.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="py-6" disabled={isPending}>
              {isPending ? "Searching..." : "Search"}
            </Button>
          </form>
        </Form>
      </section>

      {/*result section*/}
      {hasSearched && (
        <section
          aria-labelledby="results-heading"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {isPending ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i.toFixed()}
                  className="w-full border rounded-md p-4 h-[15em]"
                >
                  <div className="animate-pulse space-y-4">
                    <div className="h-5 bg-muted rounded w-1/3" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : results.length > 0 ? (
              results.flatMap((item, idx) =>
                item.translations.map((t: any, tIdx: number) => (
                  <WordCard
                    key={`${idx}-${tIdx.toFixed()}`}
                    word={t.word}
                    definition={
                      (item.definitions && item.definitions[t.language]) || ""
                    }
                    part_of_speech={item.partOfSpeech}
                    // No pronunciation field in current data; pass nothing
                    examples={
                      (item.examples && item.examples[t.language]) || []
                    }
                    synonyms={
                      (item.synonyms && item.synonyms[t.language]) || []
                    }
                  />
                )),
              )
            ) : (
              <div className="col-span-full">
                <div className="text-center text-sm text-muted-foreground py-8 border rounded-md">
                  Word not found
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/*  todo:I will implement this section later */}
      {/*<section*/}
      {/*  aria-labelledby="today-heading"*/}
      {/*  className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6"*/}
      {/*>*/}
      {/*  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">*/}
      {/*    <WordOfTheDay*/}
      {/*      word="Eloquent"*/}
      {/*      partOfSpeech="Adjective"*/}
      {/*      meaning="Fluent or persuasive in speaking or writing."*/}
      {/*      example="She gave an eloquent speech."*/}
      {/*      pronunciation="/ˈeləkwənt/"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</section>*/}
    </main>
  );
};
export default HomePage;

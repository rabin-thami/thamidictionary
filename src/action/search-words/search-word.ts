"use server";

import { homePageSearchSchema, searchLanguageEnum } from "@/schema/indexSchema";
import type { z } from "zod";
import { db } from "@/lib/db";

export type PublicSearchResult = {
  // the word that matched the user's query language
  matchLanguage: searchLanguageEnum;
  matchWord: string;
  // the two other languages to show
  translations: Array<{
    language:
      | Exclude<searchLanguageEnum, "english">
      | Exclude<searchLanguageEnum, "nepali">
      | Exclude<searchLanguageEnum, "thami">;
    word: string;
  }>;
  // include basic metadata for richer UI if needed
  partOfSpeech: string;
  // optional definitions mapped per language
  definitions: {
    english: string;
    nepali: string;
    thami: string;
  };
  // examples mapped per language
  examples: {
    english: string[];
    nepali: string[];
    thami: string[];
  };
  // synonyms mapped per language
  synonyms: {
    english: string[];
    nepali: string[];
    thami: string[];
  };
};

export const searchWordAction = async (
  value: z.infer<typeof homePageSearchSchema>,
) => {
  const validatedFields = homePageSearchSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid search fields" } as const;
  }
  const { query, searchLanguage } = validatedFields.data;

  // Trim the query to avoid issues with leading/trailing spaces
  const q = query.trim();

  // If query becomes empty after trim, short-circuit with no results
  if (q.length === 0) {
    return {
      success: "No results found",
      data: [] as PublicSearchResult[],
    } as const;
  }

  // Determine which field to search by based on language, using trimmed query
  let whereClause: any;
  switch (searchLanguage) {
    case searchLanguageEnum.english:
      whereClause = { wordEnglish: { contains: q, mode: "insensitive" } };
      break;
    case searchLanguageEnum.nepali:
      whereClause = { wordNepali: { contains: q, mode: "insensitive" } };
      break;
    case searchLanguageEnum.thami:
      whereClause = { wordThami: { contains: q, mode: "insensitive" } };
      break;
    default:
      whereClause = {
        OR: [
          { wordEnglish: { contains: q, mode: "insensitive" } },
          { wordNepali: { contains: q, mode: "insensitive" } },
          { wordThami: { contains: q, mode: "insensitive" } },
        ],
      };
  }

  // Public search — do not scope by userId so the dictionary is global
  const words = await db.word.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    select: {
      wordEnglish: true,
      wordNepali: true,
      wordThami: true,
      partOfSpeech: true,
      definitionEnglish: true,
      definitionNepali: true,
      definitionThami: true,
      examplesEnglish: true,
      examplesNepali: true,
      examplesThami: true,
      synonymsEnglish: true,
      synonymsNepali: true,
      synonymsThami: true,
    },
    take: 50, // reasonable cap
  });

  if (words.length === 0) {
    return {
      success: "No results found",
      data: [] as PublicSearchResult[],
    } as const;
  }

  const result: PublicSearchResult[] = words.map((w) => {
    // common mapped fields
    const definitions = {
      english: w.definitionEnglish,
      nepali: w.definitionNepali,
      thami: w.definitionThami,
    } as const;
    const examples = {
      english: w.examplesEnglish ?? [],
      nepali: w.examplesNepali ?? [],
      thami: w.examplesThami ?? [],
    } as const;
    const synonyms = {
      english: w.synonymsEnglish ?? [],
      nepali: w.synonymsNepali ?? [],
      thami: w.synonymsThami ?? [],
    } as const;

    // build translation list based on the selected language: show another two
    if (searchLanguage === searchLanguageEnum.english) {
      return {
        matchLanguage: searchLanguageEnum.english,
        matchWord: w.wordEnglish,
        translations: [
          { language: searchLanguageEnum.nepali, word: w.wordNepali },
          { language: searchLanguageEnum.thami, word: w.wordThami },
        ],
        partOfSpeech: w.partOfSpeech,
        definitions,
        examples,
        synonyms,
      };
    }
    if (searchLanguage === searchLanguageEnum.nepali) {
      return {
        matchLanguage: searchLanguageEnum.nepali,
        matchWord: w.wordNepali,
        translations: [
          { language: searchLanguageEnum.thami, word: w.wordThami },
          { language: searchLanguageEnum.english, word: w.wordEnglish },
        ],
        partOfSpeech: w.partOfSpeech,
        definitions,
        examples,
        synonyms,
      };
    }
    // thami
    return {
      matchLanguage: searchLanguageEnum.thami,
      matchWord: w.wordThami,
      translations: [
        { language: searchLanguageEnum.english, word: w.wordEnglish },
        { language: searchLanguageEnum.nepali, word: w.wordNepali },
      ],
      partOfSpeech: w.partOfSpeech,
      definitions,
      examples,
      synonyms,
    };
  });

  return { success: "Search completed", data: result } as const;
};

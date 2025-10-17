"use server";

import { auth } from "@/auth";
import { WordFormSchema, type WordFormData } from "@/schema/indexSchema";
import { db } from "@/lib/db";

export const addWordAction = async (values: WordFormData) => {
  const session = await auth();
  if (!session?.user || !session.user.id) return { error: "Unauthorized!" };

  const validated = WordFormSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid form data!" };

  const data = validated.data;

  // Normalize core words
  const wordThami = data.wordThami.trim().toLowerCase();
  const wordNepali = data.wordNepali.trim().toLowerCase();
  const wordEnglish = data.wordEnglish.trim().toLowerCase();

  // Check duplicates for this user
  const duplicate = await db.word.findFirst({
    where: {
      userId: session.user.id,
      OR: [{ wordThami }, { wordNepali }, { wordEnglish }],
    },
  });

  if (duplicate) {
    return { error: "This word already exists in your dictionary!" };
  }

  // ✅ Insert with all required fields
  const normalizeArray = (arr: string[]) =>
    arr
      .map((item) => item.trim().toLowerCase())
      .filter((item) => item.length > 0);

  await db.word.create({
    data: {
      userId: session.user.id,
      wordThami,
      wordNepali,
      wordEnglish,
      partOfSpeech: data.partOfSpeech,
      category: data.category,
      definitionEnglish: data.definitionEnglish.trim(),
      definitionNepali: data.definitionNepali.trim(),
      definitionThami: data.definitionThami.trim(),
      examplesEnglish: normalizeArray(data.examplesEnglish),
      examplesNepali: normalizeArray(data.examplesNepali),
      examplesThami: normalizeArray(data.examplesThami),
      synonymsEnglish: normalizeArray(data.synonymsEnglish),
      synonymsNepali: normalizeArray(data.synonymsNepali),
      synonymsThami: normalizeArray(data.synonymsThami),
    },
  });

  return { success: "Word added successfully!", redirect: "/words" };
};

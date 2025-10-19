"use server";

import { auth } from "@/auth";
import { WordFormSchema, type WordFormData } from "@/schema/indexSchema";
import { db } from "@/lib/db";

export const updateWordAction = async (id: string, values: WordFormData) => {
  const session = await auth();
  if (!session?.user || !session.user.id) return { error: "Unauthorized!" };

  if (!id) return { error: "Invalid id!" };

  const validated = WordFormSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid form data!" };

  const data = validated.data;

  // Normalize core words
  const wordThami = data.wordThami.trim().toLowerCase();
  const wordNepali = data.wordNepali.trim().toLowerCase();
  const wordEnglish = data.wordEnglish.trim().toLowerCase();

  // Helper
  const normalizeArray = (arr: string[]) =>
    arr
      .map((item) => item.trim().toLowerCase())
      .filter((item) => item.length > 0);

  try {
    // Ensure the word belongs to the current user
    const existing = await db.word.findFirst({ where: { id, userId: session.user.id } });
    if (!existing) return { error: "Word not found or access denied." };

    await db.word.update({
      where: { id },
      data: {
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

    return { success: "Word updated successfully!", redirect: `/words/${id}` };
  } catch (e: any) {
    return { error: "Failed to update word. Please try again." };
  }
};

export type StatusType = "success" | "error";
export interface StatusMessage {
  type: StatusType;
  message: string;
}

export interface WordCardProps {
  word: string; // The word itself
  part_of_speech: string; // e.g., noun, verb, interjection
  examples: string[]; // Array of example sentences
  pronunciation?: string; // Optional
  synonyms?: string[]; // Optional array of synonyms
  category?: string; // Optional category, e.g., "greeting"
  frequency_rank?: number; // Optional; e.g., 1 = most frequent
}

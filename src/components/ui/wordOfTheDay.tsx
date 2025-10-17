import type React from "react";
import { Sparkles, Mic, Info } from "lucide-react";

interface WordOfTheDayProps {
  word: string;
  partOfSpeech?: string;
  meaning: string;
  example?: string;
  pronunciation?: string;
}

const WordOfTheDay: React.FC<WordOfTheDayProps> = ({
  word,
  partOfSpeech,
  meaning,
  example,
  pronunciation,
}) => {
  return (
    <div className="word-of-the-day-card p-4 border rounded-md shadow-sm h-full font-eczar">
      <h2 className="text-lg sm:text-xl font-bold mb-1 text-muted-foreground font-space-grotesk flex items-center gap-2">
        <Sparkles
          className="h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        <span>Word of the Day</span>
      </h2>
      <h3 className="text-xl sm:text-2xl font-semibold text-primary">{word}</h3>

      {(pronunciation || partOfSpeech) && (
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {pronunciation && (
            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-muted-foreground italic gap-1">
              <Mic className="h-3.5 w-3.5" aria-hidden="true" />
              {pronunciation}
            </span>
          )}
          {partOfSpeech && (
            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-muted-foreground gap-1">
              <Info className="h-3.5 w-3.5" aria-hidden="true" />
              {partOfSpeech}
            </span>
          )}
        </div>
      )}

      <hr className="my-3 border-t" />

      <p className="text-sm sm:text-base">{meaning}</p>
      {example && (
        <p className="mt-2 text-gray-700 text-sm sm:text-base italic">
          “{example}”
        </p>
      )}
    </div>
  );
};

export default WordOfTheDay;

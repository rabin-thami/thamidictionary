import type React from "react";

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
    <div className="word-of-the-day-card p-4 border rounded-md shadow-sm h-full">
      <h2 className="text-lg sm:text-xl font-bold mb-1 text-muted-foreground">
        Word of the Day
      </h2>
      <h3 className="text-xl sm:text-2xl font-semibold">{word}</h3>
      {pronunciation && <p className="italic text-gray-600 text-sm">{pronunciation}</p>}
      {partOfSpeech && <p className="text-sm text-gray-500">{partOfSpeech}</p>}
      <p className="mt-2 text-sm sm:text-base">{meaning}</p>
      {example && (
        <p className="mt-2 text-gray-700 text-sm sm:text-base">
          <strong>Example:</strong> {example}
        </p>
      )}
    </div>
  );
};

export default WordOfTheDay;

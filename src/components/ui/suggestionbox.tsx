"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SuggestionBoxProps {
  word: string;
  onSubmitSuggestion: (word: string, partOfSpeech: string) => void;
}

const partOfSpeechOptions = ["Noun", "Verb", "Adjective", "Adverb"];

const SuggestionBox: React.FC<SuggestionBoxProps> = ({
  word,
  onSubmitSuggestion,
}) => {
  const [selectedPOS, setSelectedPOS] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedPOS) return;
    onSubmitSuggestion(word, selectedPOS);
    setSubmitted(true);
  };

  return (
    <div className="p-4 border rounded-md shadow-sm max-w-md mx-auto h-full w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-3 text-muted-foreground">
        Suggest Part of Speech
      </h2>
      <p className="text-base sm:text-lg mb-4">
        Word: <strong>{word}</strong>
      </p>

      {/* Button-style POS selection */}
      <div className="flex gap-2 flex-wrap mb-4">
        {partOfSpeechOptions.map((pos) => (
          <button
            key={pos}
            type="button"
            onClick={() => setSelectedPOS(pos)}
            className={`px-3 sm:px-4 py-2 rounded border transition-colors text-sm ${
              selectedPOS === pos
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {pos}
          </button>
        ))}
      </div>

      {/* Submit button */}
      {!submitted ? (
        <Button
          className={`px-4 py-2 rounded w-full sm:w-auto`}
          onClick={handleSubmit}
          disabled={!selectedPOS}
        >
          Submit
        </Button>
      ) : (
        <p className="text-green-600 font-semibold mt-2 text-sm sm:text-base">
          Thanks! Your suggestion has been recorded.
        </p>
      )}
    </div>
  );
};

export default SuggestionBox;

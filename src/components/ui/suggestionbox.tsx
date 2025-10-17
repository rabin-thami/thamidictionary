"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb } from "lucide-react";

interface SuggestionBoxProps {
  word: string;
  onSubmitSuggestion: (word: string, partOfSpeech: string) => void;
}

const partOfSpeechOptions = [
  "Noun",
  "Verb",
  "Adjective",
  "Adverb",
  "Pronoun",
  "Preposition",
  "Conjunction",
  "Interjection",
  "Determiner",
  "Other",
];

const SuggestionBox: React.FC<SuggestionBoxProps> = ({
  word,
  onSubmitSuggestion,
}) => {
  const [selectedPOS, setSelectedPOS] = useState<string | null>(null);
  const [customPOS, setCustomPOS] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const finalPOS =
      selectedPOS === "Other" ? customPOS.trim() : selectedPOS?.trim() || "";
    if (!finalPOS) return;
    onSubmitSuggestion(word, finalPOS);
    setSubmitted(true);
  };

  return (
    <div className="p-4 border rounded-md shadow-sm max-w-md mx-auto h-full w-full bg-card font-space-grotesk">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb
          className="h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        <h2 className="text-lg sm:text-xl font-bold text-foreground">
          Suggest Part of Speech
        </h2>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Help us classify this word for better search.
      </p>
      <p className="text-base sm:text-lg mb-4">
        Word: <strong className="text-primary font-eczar">{word}</strong>
      </p>

      {/* Button-style POS selection */}
      <div className="flex gap-2 flex-wrap mb-4">
        {partOfSpeechOptions.map((pos) => (
          <button
            key={pos}
            type="button"
            onClick={() => setSelectedPOS(pos)}
            className={`px-3 sm:px-4 py-1 rounded-full border text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
              selectedPOS === pos
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-muted/60 text-foreground/80 border-transparent hover:bg-muted/80"
            }`}
          >
            {pos}
          </button>
        ))}
      </div>

      {selectedPOS === "Other" && (
        <div className="mb-4 w-full">
          <label htmlFor="custom-pos" className="sr-only">
            Enter part of speech
          </label>
          <Input
            id="custom-pos"
            type="text"
            value={customPOS}
            onChange={(e) => setCustomPOS(e.target.value)}
            placeholder="Enter part of speech..."
            aria-label="Custom part of speech"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            For example: Particle, Postposition, Auxiliary, etc.
          </p>
        </div>
      )}

      {/* Submit button/status */}
      {!submitted ? (
        <Button
          className={`px-4 py-2 rounded w-full sm:w-auto`}
          onClick={handleSubmit}
          disabled={!selectedPOS}
        >
          Submit
        </Button>
      ) : (
        <p
          className="text-green-600 font-semibold mt-2 text-sm sm:text-base"
          aria-live="polite"
        >
          Thanks! Your suggestion has been recorded.
        </p>
      )}
    </div>
  );
};

export default SuggestionBox;

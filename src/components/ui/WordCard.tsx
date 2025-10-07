"use client";
import { Volume2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { WordCardProps } from "@/types";

const WordCard = ({
  word,
  part_of_speech,
  examples,
  pronunciation,
  synonyms,
  category,
  frequency_rank,
}: WordCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-2">
        <div className="w-full">
          <CardTitle className="text-xl sm:text-2xl font-semibold capitalize">
            {word}{" "}
            <span className="text-sm sm:text-base font-normal italic">
              ({part_of_speech})
            </span>
          </CardTitle>

          {pronunciation && <p className="text-sm italic">/{pronunciation}/</p>}
        </div>
        <Button variant="ghost" size="icon" className="self-end sm:self-center">
          <Volume2 className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {synonyms && synonyms.length > 0 && (
          <div>
            <span className="font-medium text-sm sm:text-base">Synonyms: </span>
            <span className="text-sm">{synonyms.join(", ")}</span>
          </div>
        )}

        {examples && examples.length > 0 && (
          <div>
            <span className="font-medium text-sm sm:text-base">Examples: </span>
            <ul className="list-disc list-inside text-sm mt-1 space-y-1">
              {examples.map((example, index) => (
                <li key={index.toFixed()} className="italic break-words">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WordCard;

"use client";
import { Volume2, Mic, Info, Quote, List } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { WordCardProps } from "@/types";

const WordCard = ({
  word,
  definition,
  part_of_speech,
  examples,
  pronunciation,
  synonyms,
}: WordCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-2 font-eczar">
        <div className="w-full">
          <CardTitle className="text-xl sm:text-2xl font-semibold capitalize">
            {word}{" "}
            <span className="text-sm sm:text-base font-normal italic">
              ({part_of_speech})
            </span>
          </CardTitle>

          {/*{pronunciation && (*/}
          {/*  <p className="text-sm italic text-muted-foreground inline-flex items-center gap-1">*/}
          {/*    <Mic className="h-3.5 w-3.5" aria-hidden="true" />/{pronunciation}*/}
          {/*    /*/}
          {/*  </p>*/}
          {/*)}*/}
        </div>
        <Button variant="ghost" size="icon" className="self-end sm:self-center">
          <Volume2 className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {definition && definition.length > 0 && (
          <div className="flex items-center">
            <p>{definition}</p>
          </div>
        )}
        {/*synonyms*/}
        {synonyms && synonyms.length > 0 && (
          <div className="flex items-center">
            <span className="font-medium text-sm sm:text-base inline-flex items-center gap-2">
              <List
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              Synonyms:
            </span>
            <span className="text-sm px-2">{synonyms.join(", ")}</span>
          </div>
        )}

        {/*example*/}
        {examples && examples.length > 0 && (
          <div className="">
            <span className="font-medium text-sm sm:text-base inline-flex items-center gap-2">
              <Quote
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              Examples:
            </span>
            <ul className="list-disc list-inside text-sm ml-8 space-y-1">
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

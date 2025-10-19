"use client";
import { Volume2, Quote, List } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { WordCardProps } from "@/types";
import { Badge } from "@/ui/badge";

const WordCard = ({
  word,
  definition,
  part_of_speech,
  examples,
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

      <CardContent className="space-y-3 font-eczar">
        {definition && definition.length > 0 && (
          <div className="flex items-center">
            <p>{definition}</p>
          </div>
        )}

        <div className="mb-4">
          <span className="font-medium inline-flex items-center gap-2">
            <Quote className="h-4 w-4 text-muted-foreground" />
            Examples
          </span>
          {examples && examples.length > 0 ? (
            <ul className="list-disc list-inside text-sm mt-2 space-y-1 pl-8">
              {examples.map((example, index) => (
                <li key={index.toFixed()} className="italic break-words">
                  {example}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">No examples</p>
          )}
        </div>
        <div>
          <span className="font-medium inline-flex items-center gap-2">
            <List className="h-4 w-4 text-muted-foreground" />
            Synonyms{" "}
          </span>
          {synonyms && synonyms.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2 pl-8">
              {synonyms.map((syn, index) => (
                <Badge
                  key={index.toFixed()}
                  variant="secondary"
                  className="text-xs"
                >
                  {syn}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">No synonyms</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WordCard;

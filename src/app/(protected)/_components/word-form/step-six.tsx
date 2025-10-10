"use client";

import type { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WordFormSchema } from "@/schema/indexSchema";
import type z from "zod";

interface StepSixProps {
  form: UseFormReturn<z.infer<typeof WordFormSchema>>;
}

export function StepSix({ form }: StepSixProps) {
  const data = form.watch();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Review Your Entry</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Please review all the information before submitting.
        </p>

        <div className="grid gap-4">
          {/* Words */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Words</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-2">
                <span className="text-sm font-medium">English:</span>
                <span className="text-sm">{data.wordEnglish || "—"}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-2">
                <span className="text-sm font-medium">Nepali:</span>
                <span className="text-sm">{data.wordNepali || "—"}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-2">
                <span className="text-sm font-medium">Thami:</span>
                <span className="text-sm">{data.wordThami || "—"}</span>
              </div>
            </CardContent>
          </Card>

          {/* Classification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-sm font-medium">Part of Speech:</span>
                <Badge variant="secondary">{data.partOfSpeech || "—"}</Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-sm font-medium">Category:</span>
                <Badge variant="secondary">{data.category || "—"}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Definitions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Definitions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">English:</p>
                <p className="text-sm text-muted-foreground break-words">
                  {data.definitionEnglish || "—"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Nepali:</p>
                <p className="text-sm text-muted-foreground break-words">
                  {data.definitionNepali || "—"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Thami:</p>
                <p className="text-sm text-muted-foreground break-words">
                  {data.definitionThami || "—"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">English:</p>
                <ul className="list-disc list-inside space-y-1">
                  {data.examplesEnglish?.filter(Boolean).map((example, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground break-words"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Nepali:</p>
                <ul className="list-disc list-inside space-y-1">
                  {data.examplesNepali?.filter(Boolean).map((example, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground break-words"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Thami:</p>
                <ul className="list-disc list-inside space-y-1">
                  {data.examplesThami?.filter(Boolean).map((example, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground break-words"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Synonyms */}
          {(data.synonymsEnglish?.length > 0 ||
            data.synonymsNepali?.length > 0 ||
            data.synonymsThami?.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Synonyms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.synonymsEnglish?.filter(Boolean).length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">English:</p>
                    <div className="flex flex-wrap gap-2">
                      {data.synonymsEnglish
                        .filter(Boolean)
                        .map((synonym, i) => (
                          <Badge key={i} variant="outline">
                            {synonym}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
                {data.synonymsNepali?.filter(Boolean).length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Nepali:</p>
                    <div className="flex flex-wrap gap-2">
                      {data.synonymsNepali.filter(Boolean).map((synonym, i) => (
                        <Badge key={i} variant="outline">
                          {synonym}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {data.synonymsThami?.filter(Boolean).length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Thami:</p>
                    <div className="flex flex-wrap gap-2">
                      {data.synonymsThami.filter(Boolean).map((synonym, i) => (
                        <Badge key={i} variant="outline">
                          {synonym}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

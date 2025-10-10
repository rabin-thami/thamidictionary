"use client";

import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WordFormSchema } from "@/schema/indexSchema";
import { Plus, X } from "lucide-react";
import type z from "zod";

interface StepFiveProps {
  form: UseFormReturn<z.infer<typeof WordFormSchema>>;
}

export function StepFive({ form }: StepFiveProps) {
  const { register, control } = form;

  const {
    fields: synonymsEnglishFields,
    append: appendEnglish,
    remove: removeEnglish,
  } = useFieldArray({
    control,
    name: "synonymsEnglish",
  });

  const {
    fields: synonymsNepaliFields,
    append: appendNepali,
    remove: removeNepali,
  } = useFieldArray({
    control,
    name: "synonymsNepali",
  });

  const {
    fields: synonymsThamiFields,
    append: appendThami,
    remove: removeThami,
  } = useFieldArray({
    control,
    name: "synonymsThami",
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Synonyms (Optional)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add synonyms for the word in each language. This step is optional.
        </p>

        {/* English Synonyms */}
        <div className="space-y-3 mb-6">
          <Label>English Synonyms</Label>
          {synonymsEnglishFields.length === 0 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendEnglish("")}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add English Synonym
            </Button>
          ) : (
            <>
              {synonymsEnglishFields.map((field, index) => (
                <div key={field.id} className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder={`Synonym ${index + 1} in English`}
                    {...register(`synonymsEnglish.${index}`)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeEnglish(index)}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendEnglish("")}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another English Synonym
              </Button>
            </>
          )}
        </div>

        {/* Nepali Synonyms */}
        <div className="space-y-3 mb-6">
          <Label>Nepali Synonyms (नेपाली समानार्थी)</Label>
          {synonymsNepaliFields.length === 0 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendNepali("")}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Nepali Synonym
            </Button>
          ) : (
            <>
              {synonymsNepaliFields.map((field, index) => (
                <div key={field.id} className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder={`समानार्थी ${index + 1} नेपालीमा`}
                    {...register(`synonymsNepali.${index}`)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeNepali(index)}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendNepali("")}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Nepali Synonym
              </Button>
            </>
          )}
        </div>

        {/* Thami Synonyms */}
        <div className="space-y-3">
          <Label>Thami Synonyms</Label>
          {synonymsThamiFields.length === 0 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendThami("")}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Thami Synonym
            </Button>
          ) : (
            <>
              {synonymsThamiFields.map((field, index) => (
                <div key={field.id} className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder={`Synonym ${index + 1} in Thami`}
                    {...register(`synonymsThami.${index}`)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeThami(index)}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendThami("")}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Thami Synonym
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

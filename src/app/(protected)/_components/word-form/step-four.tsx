"use client";

import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WordFormSchema } from "@/schema/indexSchema";
import { Plus, X } from "lucide-react";
import type z from "zod";

interface StepFourProps {
  form: UseFormReturn<z.infer<typeof WordFormSchema>>;
}

export function StepFour({ form }: StepFourProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const {
    fields: examplesEnglishFields,
    append: appendEnglish,
    remove: removeEnglish,
  } = useFieldArray({
    control,
    name: "examplesEnglish",
  });

  const {
    fields: examplesNepaliFields,
    append: appendNepali,
    remove: removeNepali,
  } = useFieldArray({
    control,
    name: "examplesNepali",
  });

  const {
    fields: examplesThamiFields,
    append: appendThami,
    remove: removeThami,
  } = useFieldArray({
    control,
    name: "examplesThami",
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Usage Examples</h3>

        {/* English Examples */}
        <div className="space-y-3 mb-6">
          <Label>English Examples *</Label>
          {examplesEnglishFields.map((field, index) => (
            <div key={field.id} className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder={`Example ${index + 1} in English`}
                {...register(`examplesEnglish.${index}`)}
                className="flex-1"
              />
              {examplesEnglishFields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeEnglish(index)}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
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
            Add English Example
          </Button>
          {errors.examplesEnglish && (
            <p className="text-sm text-destructive">
              {errors.examplesEnglish.message}
            </p>
          )}
        </div>

        {/* Nepali Examples */}
        <div className="space-y-3 mb-6">
          <Label>Nepali Examples (नेपाली उदाहरण) *</Label>
          {examplesNepaliFields.map((field, index) => (
            <div key={field.id} className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder={`उदाहरण ${index + 1} नेपालीमा`}
                {...register(`examplesNepali.${index}`)}
                className="flex-1"
              />
              {examplesNepaliFields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeNepali(index)}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
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
            Add Nepali Example
          </Button>
          {errors.examplesNepali && (
            <p className="text-sm text-destructive">
              {errors.examplesNepali.message}
            </p>
          )}
        </div>

        {/* Thami Examples */}
        <div className="space-y-3">
          <Label>Thami Examples *</Label>
          {examplesThamiFields.map((field, index) => (
            <div key={field.id} className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder={`Example ${index + 1} in Thami`}
                {...register(`examplesThami.${index}`)}
                className="flex-1"
              />
              {examplesThamiFields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeThami(index)}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
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
            Add Thami Example
          </Button>
          {errors.examplesThami && (
            <p className="text-sm text-destructive">
              {errors.examplesThami.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { WordFormData } from "@/schema/indexSchema";
import { Plus, X } from "lucide-react";

interface StepFiveProps {
  form: UseFormReturn<WordFormData>;
}

export const StepFive = ({ form }: StepFiveProps) => {
  const { control } = form;
  const {
    fields: synonymsEnglishFields,
    append: appendEnglish,
    remove: removeEnglish,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "synonymsEnglish",
  });

  const {
    fields: synonymsNepaliFields,
    append: appendNepali,
    remove: removeNepali,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "synonymsNepali",
  });

  const {
    fields: synonymsThamiFields,
    append: appendThami,
    remove: removeThami,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "synonymsThami",
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Synonyms (Optional)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add synonyms for the word in each language. This step is optional.
        </p>

        <div className="space-y-3 mb-6">
          <FormLabel>
            Nepali Synonyms <span className="font-eczar">(नेपाली समानार्थी)</span>
          </FormLabel>
          {synonymsNepaliFields.length === 0 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendNepali("")}
              className="w-full font-eczar"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Nepali Synonym
            </Button>
          ) : (
            <>
              {synonymsNepaliFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={control}
                  name={`synonymsNepali.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <FormControl>
                          <Input
                            placeholder={`समानार्थी ${index + 1} नेपालीमा`}
                            {...field}
                            className="flex-1 font-eczar"
                          />
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

        <div className="space-y-3 mb-6">
          <FormLabel>
            Thami Synonyms <span className="font-eczar">(थामी समानार्थी)</span>
          </FormLabel>
          {synonymsThamiFields.length === 0 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendThami("")}
              className="w-full font-eczar"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Thami Synonym
            </Button>
          ) : (
            <>
              {synonymsThamiFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={control}
                  name={`synonymsThami.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <FormControl>
                          <Input
                            placeholder={`समानार्थी ${index + 1} थामी`}
                            {...field}
                            className="flex-1 font-eczar"
                          />
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
        <div className="space-y-3 mb-6">
          <FormLabel>English Synonyms</FormLabel>
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
                <FormField
                  key={field.id}
                  control={control}
                  name={`synonymsEnglish.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <FormControl>
                          <Input
                            placeholder={`Synonym ${index + 1} in English`}
                            {...field}
                            className="flex-1"
                          />
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
      </div>
    </div>
  );
};

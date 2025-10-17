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

interface StepFourProps {
  form: UseFormReturn<WordFormData>;
}

export function StepFour({ form }: StepFourProps) {
  const { control } = form;

  const {
    fields: examplesEnglishFields,
    append: appendEnglish,
    remove: removeEnglish,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "examplesEnglish",
  });

  const {
    fields: examplesNepaliFields,
    append: appendNepali,
    remove: removeNepali,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "examplesNepali",
  });

  const {
    fields: examplesThamiFields,
    append: appendThami,
    remove: removeThami,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "examplesThami",
  });

  return (
    <div className="space-y-6 px-4 py-0">
      <div>
        <h3 className="text-lg font-semibold mb-4">Usage Examples</h3>

        <div className="space-y-3 mb-6">
          <FormLabel>
            Nepali Examples <span className="font-eczar">(नेपाली उदाहरण)</span> *
          </FormLabel>
          {examplesNepaliFields.map((field, index) => (
            <FormField
              key={field.id}
              control={control}
              name={`examplesNepali.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <FormControl>
                      <Input
                        placeholder={`उदाहरण ${index + 1} नेपालीमा`}
                        {...field}
                        className="flex-1 font-eczar"
                      />
                    </FormControl>
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
            className="w-full font-eczar"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Nepali Example
          </Button>
        </div>

        <div className="space-y-3 mb-6">
          <FormLabel>
            Thami Examples <span className="font-eczar">(थामी उदाहरण)</span>*
          </FormLabel>
          {examplesThamiFields.map((field, index) => (
            <FormField
              key={field.id}
              control={control}
              name={`examplesThami.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <FormControl>
                      <Input
                        placeholder={`उदाहरण ${index + 1} थामी`}
                        {...field}
                        className="flex-1 font-eczar"
                      />
                    </FormControl>
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
            Add Thami Example
          </Button>
        </div>

        <div className="space-y-3 mb-6">
          <FormLabel>English Examples *</FormLabel>
          {examplesEnglishFields.map((field, index) => (
            <FormField
              key={field.id}
              control={control}
              name={`examplesEnglish.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <FormControl>
                      <Input
                        placeholder={`Example ${index + 1} in English`}
                        {...field}
                        className="flex-1"
                      />
                    </FormControl>
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
            Add English Example
          </Button>
        </div>
      </div>
    </div>
  );
}

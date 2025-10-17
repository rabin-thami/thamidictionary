"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { WordFormData } from "@/schema/indexSchema";

interface StepThreeProps {
  form: UseFormReturn<WordFormData>;
}

export const StepThree = ({ form }: StepThreeProps) => {
  return (
    <div className="space-y-6 px-4 py-0">
      <div>
        <h3 className="text-lg font-semibold mb-4">Definitions</h3>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="definitionNepali"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nepali Definition{" "}
                  <span className="font-eczar">(नेपाली परिभाषा)</span> *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="नेपालीमा परिभाषा प्रविष्ट गर्नुहोस्"
                    rows={3}
                    {...field}
                    className="font-eczar"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="definitionThami"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Thami Definition{" "}
                  <span className="font-eczar">(थामी परिभाषा)</span>*
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter definition in Thami"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="definitionEnglish"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Definition *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter definition in English"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

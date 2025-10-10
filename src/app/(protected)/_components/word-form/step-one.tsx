"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { WordFormSchema, WordFormData } from "@/schema/indexSchema";

interface StepOneProps {
  form: UseFormReturn<WordFormData>;
}

export const StepOne = ({ form }: StepOneProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Enter the word in all three languages
        </h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="wordEnglish"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Word *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter word in English" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wordNepali"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nepali Word (नेपाली शब्द) *</FormLabel>
                <FormControl>
                  <Input placeholder="नेपालीमा शब्द प्रविष्ट गर्नुहोस्" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wordThami"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thami Word *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter word in Thami" {...field} />
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

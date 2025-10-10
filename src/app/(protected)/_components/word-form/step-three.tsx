"use client";

import type { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type z from "zod";
import type { WordFormSchema } from "@/schema/indexSchema";

interface StepThreeProps {
  form: UseFormReturn<z.infer<typeof WordFormSchema>>;
}

export function StepThree({ form }: StepThreeProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Definitions</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="definitionEnglish">English Definition *</Label>
            <Textarea
              id="definitionEnglish"
              placeholder="Enter definition in English"
              rows={3}
              {...register("definitionEnglish")}
            />
            {errors.definitionEnglish && (
              <p className="text-sm text-destructive">
                {errors.definitionEnglish.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="definitionNepali">
              Nepali Definition (नेपाली परिभाषा) *
            </Label>
            <Textarea
              id="definitionNepali"
              placeholder="नेपालीमा परिभाषा प्रविष्ट गर्नुहोस्"
              rows={3}
              {...register("definitionNepali")}
            />
            {errors.definitionNepali && (
              <p className="text-sm text-destructive">
                {errors.definitionNepali.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="definitionThami">Thami Definition *</Label>
            <Textarea
              id="definitionThami"
              placeholder="Enter definition in Thami"
              rows={3}
              {...register("definitionThami")}
            />
            {errors.definitionThami && (
              <p className="text-sm text-destructive">
                {errors.definitionThami.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

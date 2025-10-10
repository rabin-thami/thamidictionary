"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { WordFormSchema, type WordFormData } from "@/schema/indexSchema";

import { StepOne } from "@/protected-components/word-form/step-one";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Words", description: "Enter words in all languages" },
  { id: 2, name: "Classification", description: "Part of speech & category" },
  { id: 3, name: "Definitions", description: "Define in all languages" },
  { id: 4, name: "Examples", description: "Add usage examples" },
  { id: 5, name: "Synonyms", description: "Add synonyms (optional)" },
  { id: 6, name: "Review", description: "Review and submit" },
];

const WordStepperForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WordFormData>({
    resolver: zodResolver(WordFormSchema),
    defaultValues: {
      wordEnglish: "",
      wordNepali: "",
      wordThami: "",
      definitionEnglish: "",
      definitionNepali: "",
      definitionThami: "",
      examplesEnglish: [""],
      examplesNepali: [""],
      examplesThami: [""],
      synonymsEnglish: [],
      synonymsNepali: [],
      synonymsThami: [],
    },
    mode: "onChange",
  });

  const onSubmit = async (data: WordFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    alert("Word data submitted successfully!");
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof WordFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["wordEnglish", "wordNepali", "wordThami"];
        break;
      case 2:
        fieldsToValidate = ["partOfSpeech", "category"];
        break;
      case 3:
        fieldsToValidate = [
          "definitionEnglish",
          "definitionNepali",
          "definitionThami",
        ];
        break;
      case 4:
        fieldsToValidate = [
          "examplesEnglish",
          "examplesNepali",
          "examplesThami",
        ];
        break;
      case 5:
        fieldsToValidate = [
          "synonymsEnglish",
          "synonymsNepali",
          "synonymsThami",
        ];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            Multilingual Word Entry
          </CardTitle>
          <CardDescription>
            Add word data in English, Nepali, and Thami languages
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Stepper Navigation */}
          <nav aria-label="Progress" className="mb-8 overflow-x-auto">
            <ol className="flex items-center justify-between min-w-max sm:min-w-0">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className="relative flex-1 min-w-[80px] sm:min-w-0"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={cn(
                          "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                          currentStep > step.id
                            ? "bg-primary border-primary text-primary-foreground"
                            : currentStep === step.id
                              ? "border-primary text-primary"
                              : "border-muted-foreground/30 text-muted-foreground",
                        )}
                      >
                        {currentStep > step.id ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <span className="text-xs sm:text-sm font-semibold">
                            {step.id}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-center px-1">
                        <p
                          className={cn(
                            "text-xs sm:text-sm font-medium",
                            currentStep >= step.id
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {step.name}
                        </p>
                        <p className="text-xs text-muted-foreground hidden md:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "h-0.5 w-full mx-1 sm:mx-2 transition-colors",
                          currentStep > step.id
                            ? "bg-primary"
                            : "bg-muted-foreground/30",
                        )}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          {/* Form Steps */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="max-h-[60vh] overflow-y-auto pr-2">
                {currentStep === 1 && <StepOne form={form} />}
                {/*{currentStep === 2 && <StepTwo form={form} />}*/}
                {/*{currentStep === 3 && <StepThree form={form} />}*/}
                {/*{currentStep === 4 && <StepFour form={form} />}*/}
                {/*{currentStep === 5 && <StepFive form={form} />}*/}
                {/*{currentStep === 6 && <StepSix form={form} />}*/}
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="w-full sm:w-auto bg-transparent"
                >
                  Previous
                </Button>
                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full sm:w-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordStepperForm;

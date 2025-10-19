"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { WordFormSchema, type WordFormData } from "@/schema/indexSchema";
import { StepOne } from "@/protected-components/word-form/step-one";
import { StepTwo } from "@/protected-components/word-form/step-two";
import { StepThree } from "@/protected-components/word-form/step-three";
import { StepFour } from "@/protected-components/word-form/step-four";
import { StepFive } from "@/protected-components/word-form/step-five";
import { StepSix } from "@/protected-components/word-form/step-six";
import { updateWordAction } from "@/action";

const steps = [
  { id: 1, name: "Words" },
  { id: 2, name: "Classification" },
  { id: 3, name: "Definitions" },
  { id: 4, name: "Examples" },
  { id: 5, name: "Synonyms" },
  { id: 6, name: "Review" },
];

export default function EditWordPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const form = useForm<WordFormData>({
    resolver: zodResolver(WordFormSchema),
    defaultValues: {
      wordEnglish: "",
      wordNepali: "",
      wordThami: "",
      partOfSpeech: undefined as any,
      category: undefined as any,
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

  useEffect(() => {
    let ignore = false;
    async function fetchWord() {
      try {
        setLoading(true);
        const res = await fetch(`/api/words?id=${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error("Failed to load");
        const json = await res.json();
        const w = json?.data as any;
        if (!w) throw new Error("Not found");

        const toArray = (v: any): string[] => {
          if (Array.isArray(v)) return v.map((x) => String(x));
          if (typeof v === "string")
            return v
              .split(",")
              .map((x) => x.trim())
              .filter(Boolean);
          return [];
        };

        const defaults: WordFormData = {
          wordEnglish: w.wordEnglish || "",
          wordNepali: w.wordNepali || "",
          wordThami: w.wordThami || "",
          partOfSpeech: w.partOfSpeech,
          category: w.category,
          definitionEnglish: w.definitionEnglish || "",
          definitionNepali: w.definitionNepali || "",
          definitionThami: w.definitionThami || "",
          examplesEnglish: toArray(w.examplesEnglish).length
            ? toArray(w.examplesEnglish)
            : [""],
          examplesNepali: toArray(w.examplesNepali).length
            ? toArray(w.examplesNepali)
            : [""],
          examplesThami: toArray(w.examplesThami).length
            ? toArray(w.examplesThami)
            : [""],
          synonymsEnglish: toArray(w.synonymsEnglish),
          synonymsNepali: toArray(w.synonymsNepali),
          synonymsThami: toArray(w.synonymsThami),
        };

        if (!ignore) form.reset(defaults);
      } catch (e: any) {
        if (!ignore) toast.error(e?.message || "Failed to load word");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    if (id) fetchWord();
    return () => {
      ignore = true;
    };
  }, [id, form.reset]);

  const onSubmit = async (values: WordFormData) => {
    startTransition(() => {
      updateWordAction(id, values).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        } else if (data?.success) {
          toast.success(data.success);
          const redirect = (data as any).redirect || `/words/${id}`;
          router.push(redirect);
        }
      });
    });
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
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full mx-auto p-4 sm:p-6">
      <Card>
        <CardContent>
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

          <Form {...form}>
            <div className="space-y-6">
              <div className="max-h-[60vh] overflow-y-auto pr-2">
                {currentStep === 1 && <StepOne form={form} />}
                {currentStep === 2 && <StepTwo form={form} />}
                {currentStep === 3 && <StepThree form={form} />}
                {currentStep === 4 && <StepFour form={form} />}
                {currentStep === 5 && <StepFive form={form} />}
                {currentStep === 6 && <StepSix form={form} />}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-10 border-t">
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
                    disabled={loading}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled={isPending || loading}
                    onClick={form.handleSubmit(onSubmit)}
                    className="w-full sm:w-auto"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

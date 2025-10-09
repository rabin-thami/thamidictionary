"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import WordForm from "@/protected-components/word-form";

const AddWord = () => {
  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };
  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col space-y-4">
      <div className="flex-shrink-0">
        <Button onClick={handleBackButton} variant="outline">
          <ArrowLeft />
          Back
        </Button>
      </div>
      <div className="flex-1 min-h-0">
        <WordForm />
      </div>
    </div>
  );
};

export default AddWord;

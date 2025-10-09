"use client";
import { useState } from "react";
import Navbar from "@/components/ui/navbar/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import WordCard from "@/components/ui/WordCard";
import WordOfTheDay from "@/components/ui/wordOfTheDay";
import SuggestionBox from "@/components/ui/suggestionbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HomePage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const handleSuggestion = (word: string, partOfSpeech: string) => {
    // Push to your DB (e.g., via API)
    console.log(`Word: ${word}, Suggested POS: ${partOfSpeech}`);
  };
  return (
    <main>
      <div className="mb-5">
        <Navbar />
      </div>
      {/*Search Section*/}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Input
            className="px-4 py-3 sm:py-6 w-full"
            placeholder="Search your word ..."
          />
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-full sm:w-40 py-6">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="nepali">Nepali</SelectItem>
              <SelectItem value="thami">Thami</SelectItem>
            </SelectContent>
          </Select>
          <Button className="py-3 sm:py-6 w-full sm:w-auto">Search</Button>
        </div>
      </section>

      {/*result section*/}
      <section className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-4 px-4 sm:px-6 lg:px-8">
        <WordCard
          word="Work"
          part_of_speech="noun"
          pronunciation="wɜːk"
          examples={[
            "He went to work early today. He went to work early today.He went to work early today.He went to work early today.He went to work early today.",
            "She works as a teacher.",
            "The machine doesn't work properly.",
          ]}
          synonyms={["employment", "labor", "job"]}
        />

        <WordCard
          word="Hello"
          part_of_speech="interjection"
          pronunciation="həˈloʊ"
          examples={[
            "Hello, how are you?",
            "She said hello to her neighbor.",
            "Hello! Is anyone there?",
          ]}
          synonyms={["hi", "greetings", "hey"]}
        />
      </section>
      <section className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 px-4 sm:px-6 lg:px-8">
        <WordOfTheDay
          word="Eloquent"
          partOfSpeech="Adjective"
          meaning="Fluent or persuasive in speaking or writing."
          example="She gave an eloquent speech."
          pronunciation="/ˈeləkwənt/"
        />
        <SuggestionBox word="Eloquent" onSubmitSuggestion={handleSuggestion} />
      </section>
    </main>
  );
};
export default HomePage;

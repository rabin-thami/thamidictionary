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
  const [query, setQuery] = useState("");
  const handleSuggestion = (word: string, partOfSpeech: string) => {
    // Push to your DB (e.g., via API)
    console.log(`Word: ${word}, Suggested POS: ${partOfSpeech}`);
  };
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    // TODO: wire up to real search once API is ready
    console.log(`Searching for "${trimmed}" in ${selectedLanguage}`);
  };
  return (
    <main>
      <h1 className="sr-only">Thami Dictionary</h1>
      <div className="mb-5">
        <Navbar />
      </div>
      {/*Search Section*/}
      <section className="px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSearch}
          className="max-w-lg mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
          aria-label="Dictionary search"
        >
          <label htmlFor="search" className="sr-only">
            Search word
          </label>
          <Input
            id="search"
            className="px-4 py-3 sm:py-6 w-full"
            placeholder="Search your word ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search word"
          />
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger
              className="w-full sm:w-40 py-6"
              aria-label="Language"
            >
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="nepali">Nepali</SelectItem>
              <SelectItem value="thami">Thami</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="py-3 sm:py-6 w-full sm:w-auto"
            disabled={!query.trim()}
          >
            Search
          </Button>
        </form>
      </section>

      {/*result section*/}
      <section
        aria-labelledby="results-heading"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WordCard
            word="Work"
            definition="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vehicula varius magna vel eleifend. Nulla blandit diam nibh, lacinia maximus arcu finibus quis. Nunc sagittis vulputate euismod. Praesent finibus, "
            part_of_speech="noun"
            pronunciation="wɜːk"
            examples={[
              "She works as a teacher.",
              "The machine doesn't work properly.",
            ]}
            synonyms={["employment", "labor", "job"]}
          />

          <WordCard
            word="Hello"
            definition="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vehicula varius magna vel eleifend. Nulla blandit diam nibh, lacinia maximus arcu finibus quis. Nunc sagittis vulputate euismod. Praesent finibus,"
            part_of_speech="interjection"
            pronunciation="həˈloʊ"
            examples={["Hello, how are you?"]}
            synonyms={["hi", "greetings", "hey"]}
          />
        </div>
      </section>
      <section
        aria-labelledby="today-heading"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WordOfTheDay
            word="Eloquent"
            partOfSpeech="Adjective"
            meaning="Fluent or persuasive in speaking or writing."
            example="She gave an eloquent speech."
            pronunciation="/ˈeləkwənt/"
          />
          {/*<SuggestionBox*/}
          {/*  word="Eloquent"*/}
          {/*  onSubmitSuggestion={handleSuggestion}*/}
          {/*/>*/}
        </div>
      </section>
    </main>
  );
};
export default HomePage;

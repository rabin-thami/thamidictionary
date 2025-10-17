"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, Search, Plus, Loader2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Types that match the API/Prisma model
type Word = {
  id: string;
  wordEnglish: string;
  wordNepali: string;
  wordThami: string;
  partOfSpeech: string;
  definitionEnglish: string;
  definitionNepali: string;
  definitionThami: string;
  examplesEnglish: string[];
  examplesNepali: string[];
  examplesThami: string[];
};

const Words = () => {
  const router = useRouter();

  const [words, setWords] = useState<Word[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    alert("Edit word with ID: " + id);
  };

  const handleDelete = (id: string) => {
    alert("Delete word with ID: " + id);
  };

  const handleWordLink = (id: string) => {
    router.push(`/words/${id}`);
  };

  const handleAddWord = () => {
    router.push("/words/add-word");
  };

  const tableHeading = [
    "Word",
    "Part of Speech",
    "Definition",
    "Examples",
    "Action",
  ];

  // English-only examples
  const getEnglishExamples = (w: Word) => {
    return (w.examplesEnglish || []).filter(Boolean);
  };

  // Fetch words from API
  useEffect(() => {
    const controller = new AbortController();

    async function fetchWords() {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (appliedSearch.trim()) params.set("search", appliedSearch.trim());

        const res = await fetch(`/api/words?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}) as any);
          throw new Error(body?.error || `Request failed: ${res.status}`);
        }
        const data = await res.json();
        setWords(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotal(data.pagination?.total || 0);
      } catch (e: any) {
        if (e.name !== "AbortError")
          setError(e.message || "Failed to load words");
      } finally {
        setLoading(false);
      }
    }

    fetchWords();

    return () => controller.abort();
  }, [page, limit, appliedSearch]);

  // Pages array for numbered pagination
  const pages = useMemo(() => {
    const arr: number[] = [];
    for (let i = 1; i <= totalPages; i++) arr.push(i);
    return arr;
  }, [totalPages]);

  return (
  <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Your Words</h1>
          <p className="text-sm text-muted-foreground">Manage your dictionary entries. Search, view, and edit your saved words.</p>
        </div>
        <div>
          <Button
            className="rounded-sm"
            onClick={handleAddWord}
            variant="default"
            aria-label="Add new word"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Word
          </Button>
        </div>
      </div>

      <div className="py-2 mb-2 flex flex-wrap justify-between items-center gap-2">
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <Input
            className="sm:w-80"
            placeholder="Search words..."
            aria-label="Search words"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setAppliedSearch(searchTerm);
              }
            }}
          />
          <Button
            className="rounded-sm"
            variant="outline"
            onClick={() => {
              setPage(1);
              setAppliedSearch(searchTerm);
            }}
            disabled={loading}
            aria-label="Search"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
          {(searchTerm || appliedSearch) && (
            <Button
              type="button"
              variant="ghost"
              className="rounded-sm"
              onClick={() => {
                setSearchTerm("");
                setAppliedSearch("");
                setPage(1);
              }}
              disabled={loading}
              aria-label="Clear search"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {(appliedSearch || total) && (
        <div className="-mt-2 text-xs text-muted-foreground">
          {appliedSearch ? (
            <>Showing results for "{appliedSearch}" — {total} found</>
          ) : (
            <>{total} total words</>
          )}
        </div>
      )}
      <Card className="py-2 px-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {tableHeading.map((heading) => (
                <TableHead className="w-[150px]" key={heading}>
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-sm text-muted-foreground"
                >
                  <span className="inline-flex items-center gap-2 justify-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </span>
                </TableCell>
              </TableRow>
            )}
            {!loading && error && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-sm text-destructive"
                >
                  {error}
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && words.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-sm text-muted-foreground"
                >
                  No words found{appliedSearch ? ` for "${appliedSearch}"` : ""}
                  .
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              !error &&
              words.map((w) => {
                const englishExamples = getEnglishExamples(w);
                return (
                  <TableRow key={w.id}>
                    <TableCell
                      onClick={() => handleWordLink(w.id)}
                      className="hover:cursor-pointer underline underline-offset-2"
                    >
                      <div className="flex flex-col space-y-1 text-sm text-muted-foreground font-eczar">
                        <div className="font-semibold">{w.wordEnglish}</div>
                      </div>
                    </TableCell>

                    <TableCell className="capitalize">
                      {w.partOfSpeech}
                    </TableCell>
                    <TableCell>{w.definitionEnglish}</TableCell>
                    <TableCell>
                      <table className="w-full text-sm">
                        <tbody>
                          {englishExamples.map((ex, i) => (
                            <tr key={i.toFixed()} className="border-b last:border-0">
                              <td className="pr-2 font-semibold">EN</td>
                              <td className="font-eczar">{ex}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(w.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(w.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">{total} results • Page {page} of {totalPages}</div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.max(1, p - 1));
                  }}
                  aria-disabled={page === 1}
                />
              </PaginationItem>
              {pages.map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(p);
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.min(totalPages, p + 1));
                  }}
                  aria-disabled={page === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Words;

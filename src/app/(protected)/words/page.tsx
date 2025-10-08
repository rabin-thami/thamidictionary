"use client";
import {
  Table,
  TableBody,
  TableCaption,
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
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
const Words = () => {
  const handleEdit = (id: string) => {
    alert("Edit invoice with ID: " + id);
  };

  const handleDelete = (id: string) => {
    alert("Delete invoice with ID: " + id);
  };

  const tableHeading = [
    "Word",
    "Part of Speech",
    "Synonyms",
    "Examples",
    "Pronunciation",
    "Definition",
    "Action",
  ];
  const tableData = [
    {
      word: "hello",
      part_of_speech: "interjection",
      synonyms: ["hi", "greetings"],
      examples: ["Hello, Rabin!", "Hello everyone!"],
      pronunciation: "heh-loh",
      definition: "A greeting or expression of goodwill.",
    },
    {
      word: "run",
      part_of_speech: "verb",
      synonyms: ["sprint", "dash", "jog"],
      examples: ["He runs every morning.", "The program is running smoothly."],
      pronunciation: "ruhn",
      definition: "To move swiftly on foot or to operate.",
    },
    {
      word: "beautiful",
      part_of_speech: "adjective",
      synonyms: ["lovely", "pretty", "stunning"],
      examples: ["She has a beautiful smile.", "The sunset was beautiful."],
      pronunciation: "byoo-tuh-fuhl",
      definition: "Pleasing the senses or mind aesthetically.",
    },
    {
      word: "book",
      part_of_speech: "noun",
      synonyms: ["volume", "tome", "publication"],
      examples: [
        "I read a book about Thami culture.",
        "The book is on the table.",
      ],
      pronunciation: "buk",
      definition: "A set of written or printed pages bound together.",
    },
    {
      word: "thank you",
      part_of_speech: "expression",
      synonyms: ["thanks", "much obliged", "appreciated"],
      examples: ["Thank you for your help.", "Thank you, that was kind."],
      pronunciation: "thangk-yoo",
      definition: "An expression of gratitude.",
    },
  ];
  return (
    <div>
      <div className=" py-2 mb-2 flex justify-between items-center gap-2">
        <Input className="max-w-lg" placeholder="Search words..." />
        <Button className="rounded-sm">Add New Word</Button>
      </div>
      <div className="max-w-fit">
        <Card className="py-2 px-4">
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableRow>
                {tableHeading.map((heading) => (
                  <TableHead className="w-[150px]" key={heading}>
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="w-full overflow-x-none">
              {tableData.map((data) => (
                <TableRow key={data.word}>
                  <TableCell className="font-medium">{data.word}</TableCell>
                  <TableCell>{data.part_of_speech}</TableCell>
                  <TableCell>{data.synonyms.join(", ")}</TableCell>
                  <TableCell>{data.examples.join(" | ")}</TableCell>
                  <TableCell>{data.pronunciation}</TableCell>
                  <TableCell>{data.definition}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit("INV001")}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete("INV001")}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Words;

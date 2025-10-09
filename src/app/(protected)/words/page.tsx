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
import { MoreHorizontal, Edit, Trash2, Search, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Fragment } from "react";
import { useRouter } from "next/navigation";

const Words = () => {
  const router = useRouter();
  const handleEdit = (id: string) => {
    alert("Edit invoice with ID: " + id);
  };

  const handleDelete = (id: string) => {
    alert("Delete invoice with ID: " + id);
  };

  const handleWordLink = (id: string) => {
    alert("work link");
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
  const tableData = [
    {
      id: "INV001",
      nepali: "उपमहानगरपालिका ",
      thami: "उपमहानगरपालिका",
      english: "stone",
      part_of_speech: "noun",
      definition: "A hard, solid nonmetallic mineral matter.",
      examples: [
        { en: "He threw a stone.", ne: "उसले ढुंगा फाल्यो।", th: "उसले ढुंगा फाल्यो।" },
      ],
    },
    {
      id: "INV002",
      nepali: "उपमहानगरपालिका ",
      thami: "उपमहानगरपालिका",
      english: "stone",
      part_of_speech: "noun",
      definition: "A hard, solid nonmetallic mineral matter.",
      examples: [
        { en: "He threw a stone.", ne: "उसले ढुंगा फाल्यो।", th: "उसले ढुंगा फाल्यो।" },
      ],
    },
  ];
  return (
    <div>
      <div className=" py-2 mb-2 flex justify-between items-center gap-2">
        <div className="flex gap-2 items-center w-full">
          <Input className="w-fit" placeholder="Search words..." />
          <Button className="rounded-sm" variant="outline">
            <Search />
            Search
          </Button>
        </div>
        <div>
          <Button
            className="rounded-sm"
            onClick={handleAddWord}
            variant="default"
          >
            <Plus />
            Add New Word
          </Button>
        </div>
      </div>
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
            {tableData.map((data) => (
              <TableRow key={data.id}>
                <TableCell
                  onClick={() => handleWordLink(data.id)}
                  className="hover:cursor-pointer underline underline-offset-2"
                >
                  <div className="flex flex-col space-y-1 text-sm text-muted-foreground font-eczar">
                    <div>{data.nepali}</div>
                    <div className="italic">{data.thami}</div>
                    <div className="font-semibold">{data.english}</div>
                  </div>
                </TableCell>

                <TableCell>{data.part_of_speech}</TableCell>
                <TableCell>{data.definition}</TableCell>
                <TableCell>
                  <table className="w-full text-sm">
                    <tbody>
                      {data.examples.map((ex, i) => (
                        <Fragment key={i.toFixed()}>
                          {ex.ne && (
                            <tr className="border-b last:border-0">
                              <td className="pr-2 font-semibold">NE</td>
                              <td className="font-eczar">{ex.ne}</td>
                            </tr>
                          )}
                          {ex.th && (
                            <tr className="border-b last:border-0">
                              <td className="pr-2 font-semibold">TH</td>
                              <td className="font-eczar">{ex.th}</td>
                            </tr>
                          )}
                          {ex.en && (
                            <tr className="border-b last:border-0">
                              <td className="pr-2 font-semibold">EN</td>
                              <td className="font-eczar">{ex.en}</td>
                            </tr>
                          )}

                          {/* Optional separator between multiple examples */}
                          {i < data.examples.length - 1 && (
                            <tr>
                              <td colSpan={2}>
                                <hr className="my-1 border-muted" />
                              </td>
                            </tr>
                          )}
                        </Fragment>
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
  );
};

export default Words;

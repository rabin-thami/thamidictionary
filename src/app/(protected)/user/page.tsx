"use client";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Edit, Loader2, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteUserAction, getUsersAction } from "@/action";

// Minimal user type matching action output
interface UserRow {
  id: string;
  name: string | null;
  email: string;
  role?: string | null;
  createdAt: string; // converted to ISO string in client
}

const Page = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [users, setUsers] = useState<UserRow[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = () => {
    // Navigate to signup or user creation page if exists
    router.push("/auth/signup");
  };

  const handleEdit = (id: string) => {
    // If there's a user edit page, navigate; else no-op
    router.push(`/user/${id}`);
  };

  const handleDelete = (id: string) => {
    const prev = users;
    setUsers((u) => u.filter((x) => x.id !== id));

    startTransition(async () => {
      const res = await deleteUserAction(id);
      if (res && "error" in res) {
        setUsers(prev);
        toast.error(res.error || "Failed to delete user");
      } else {
        toast.success((res as any)?.success || "User deleted successfully");
      }
    });
  };

  const tableHeading = ["Name", "Email", "Role", "Joined", "Action"];

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await getUsersAction({
          page,
          limit,
          search: appliedSearch,
        });
        if (!isMounted) return;
        setUsers(
          (res.data || []).map((u: any) => ({
            ...u,
            createdAt: new Date(u.createdAt).toISOString(),
          })),
        );
        setTotalPages(res.pagination?.totalPages || 1);
        setTotal(res.pagination?.total || 0);
      } catch (e: any) {
        if (!isMounted) return;
        setError(e?.message || "Failed to load users");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [page, limit, appliedSearch]);

  const pages = useMemo(() => {
    const arr: number[] = [];
    for (let i = 1; i <= totalPages; i++) arr.push(i);
    return arr;
  }, [totalPages]);

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage users. Search, view, and manage accounts.
          </p>
        </div>
        <div>
          <Button
            className="rounded-sm"
            onClick={handleAddUser}
            variant="default"
            aria-label="Add new user"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>
      </div>

      <div className="py-2 mb-2 flex flex-wrap justify-between items-center gap-2">
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <Input
            className="sm:w-80"
            placeholder="Search users..."
            aria-label="Search users"
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching
              </>
            ) : (
              "Search"
            )}
          </Button>
          {appliedSearch && (
            <Button
              className="rounded-sm"
              variant="ghost"
              onClick={() => {
                setAppliedSearch("");
                setSearchTerm("");
                setPage(1);
              }}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground">Total: {total}</div>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeading.map((heading) => (
                <TableHead key={heading} className="whitespace-nowrap px-10">
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx.toFixed()}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="text-sm text-red-600">{error}</div>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="text-sm text-muted-foreground">
                    No users found
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium px-10">
                    {u.name || "—"}
                  </TableCell>
                  <TableCell className="px-10">{u.email}</TableCell>
                  <TableCell className="px-10">{u.role || "—"}</TableCell>
                  <TableCell className="px-10">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-label="Actions"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/*<DropdownMenuItem onClick={() => handleEdit(u.id)}>*/}
                        {/*  <Edit className="mr-2 h-4 w-4" /> Edit*/}
                        {/*</DropdownMenuItem>*/}
                        <DropdownMenuItem
                          onClick={() => handleDelete(u.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4 text-red-600" />{" "}
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <div className="py-2 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
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
    </div>
  );
};

export default Page;

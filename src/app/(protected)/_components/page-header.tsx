"use client";

import { usePathname } from "next/navigation";

const PageHeader = () => {
  const pathname = usePathname(); // e.g. "/words/add-word"

  if (!pathname) return null;

  // Split path by "/" and filter out empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Take only the last segment for the header
  const lastSegment = segments[segments.length - 1];

  // Replace hyphens with spaces and capitalize each word
  const formatted = lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <span
      className="font-medium
  "
    >
      {formatted}
    </span>
  );
};

export default PageHeader;

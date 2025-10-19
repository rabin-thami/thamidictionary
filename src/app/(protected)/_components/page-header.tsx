"use client";

import { usePathname } from "next/navigation";

interface PageHeaderProps {
  title?: string;
  className?: string;
}

const PageHeader = ({ title, className }: PageHeaderProps) => {
  const pathname = usePathname();

  // ✅ If title is explicitly passed, use it
  if (title) {
    return <span className={`font-medium ${className ?? ""}`}>{title}</span>;
  }

  if (!pathname) return null;

  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  // ✅ Detect likely database IDs (random strings)
  const isLikelyId =
    /^[A-Za-z0-9]{10,}$/.test(lastSegment) ||
    /^[A-Za-z0-9_-]{15,}$/.test(lastSegment);

  // ✅ Fallback text if it's an ID
  const displayText = isLikelyId
    ? "Word Details"
    : lastSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

  return (
    <span className={`font-medium ${className ?? ""}`}>{displayText}</span>
  );
};

export default PageHeader;

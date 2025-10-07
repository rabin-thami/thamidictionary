"use client";

import { usePathname } from "next/navigation";

const PageHeader = () => {
  const pathname = usePathname(); // e.g. "/dashboard"

  if (!pathname) return null;

  const formatted =
    pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);

  return <span>{formatted}</span>;
};

export default PageHeader;

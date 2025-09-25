"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  children?: React.ReactNode;
}
export const LogoutButton = () => {
  const onClick = () => {
    signOut();
  };

  return (
    <Button onClick={onClick} className="w-full text-left">
      Sign out
    </Button>
  );
};

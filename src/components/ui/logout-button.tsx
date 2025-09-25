"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

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

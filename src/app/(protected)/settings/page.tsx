"use client";
import { auth } from "@/auth";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const settings = () => {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <div>
      {JSON.stringify(user)}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
export default settings;

"use client";
import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/ui/logout-button";
const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div>
      <p>Hello From {session?.user?.name}</p>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;

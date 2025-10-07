import type { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  FileType,
  LayoutDashboard,
  Lightbulb,
  Settings,
  SquarePen,
  User,
} from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";
import NavUser from "@/components/ui/user-nav";
import DashboardNav from "@/app/(protected)/_compoents/dashboard-nav";
import PageHeader from "@/app/(protected)/_compoents/page-header";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();
  const user = session?.user;

  const navItem = [
    { name: "Dashboard", href: "/dashboard", icons: <LayoutDashboard /> },
    { name: "Words", href: "/words", icons: <FileType /> },
    { name: "user", href: "/user", icons: <User /> },
    { name: "Suggestions", href: "/suggestions", icons: <Lightbulb /> },
    { name: "Settings", href: "/settings", icons: <Settings /> },
  ];

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 py-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Thami Dictionary</span>
              <span className="truncate text-xs text-muted-foreground">
                Your own Language
              </span>
            </div>
          </div>
          {/*<SidebarInput placeholder="Search..." />*/}
        </SidebarHeader>

        {/*sidebar content here */}
        <DashboardNav navItem={navItem} />

        <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center px-4 border-b">
            <SidebarTrigger className="-ml-1" />
            <PageHeader />
          </header>
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

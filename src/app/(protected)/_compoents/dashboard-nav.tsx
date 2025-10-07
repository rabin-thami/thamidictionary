"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icons: ReactNode;
}

interface DashboardNavProps {
  navItem: NavItem[];
}

const DashboardNav = ({ navItem }: DashboardNavProps) => {
  const pathname = usePathname();
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItem.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <SidebarMenuItem key={item.name}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className="hover:cursor-pointer"
                    >
                      {item.icons}
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default DashboardNav;


"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { LayoutDashboard, PawPrint, Users, LogOut, Home, MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full overflow-hidden">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <PawPrint className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-headline font-bold text-primary tracking-tight">Admin <span className="text-accent">Portal</span></span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"}>
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin/pets"}>
                    <Link href="/admin/pets" className="flex items-center gap-3">
                      <PawPrint className="h-4 w-4" />
                      <span>Manage Pets</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin/applications"}>
                    <Link href="/admin/applications" className="flex items-center gap-3">
                      <Users className="h-4 w-4" />
                      <span>Applications</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            
            <SidebarGroup className="mt-auto">
              <SidebarGroupLabel>Other</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/" className="flex items-center gap-3">
                      <Home className="h-4 w-4" />
                      <span>Main Site</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-destructive hover:text-destructive">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-auto p-8 md:p-12">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

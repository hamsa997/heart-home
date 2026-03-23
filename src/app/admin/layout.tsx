"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, PawPrint, Users, LogOut, Home, Heart, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-[#fffaf9] w-full overflow-hidden">
        <Sidebar className="border-r border-border bg-white">
          <SidebarHeader className="p-6 md:p-8 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/10">
                <Heart className="h-5 w-5 text-white fill-current" />
              </div>
              <span className="text-xl font-headline font-bold text-primary tracking-tight">Heart<span className="text-accent">Home</span> Admin</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-4 md:p-6">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">Sanctuary Management</SidebarGroupLabel>
              <SidebarMenu className="space-y-2">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"} className="h-12 rounded-xl">
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                      <LayoutDashboard className="h-5 w-5" />
                      <span className="font-medium">Overview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin/pets"} className="h-12 rounded-xl">
                    <Link href="/admin/pets" className="flex items-center gap-3">
                      <PawPrint className="h-5 w-5" />
                      <span className="font-medium">The Inventory</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin/applications"} className="h-12 rounded-xl">
                    <Link href="/admin/applications" className="flex items-center gap-3">
                      <Users className="h-5 w-5" />
                      <span className="font-medium">Open Hearts</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            
            <SidebarGroup className="mt-auto">
              <SidebarGroupLabel className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">System</SidebarGroupLabel>
              <SidebarMenu className="space-y-2">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-12 rounded-xl">
                    <Link href="/" className="flex items-center gap-3">
                      <Home className="h-5 w-5" />
                      <span className="font-medium">Main Site</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-destructive hover:text-destructive h-12 rounded-xl">
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile Header */}
          <header className="md:hidden flex items-center h-16 px-6 border-b border-border bg-white sticky top-0 z-30">
            <SidebarTrigger>
              <Menu className="h-6 w-6 text-muted-foreground" />
            </SidebarTrigger>
            <span className="ml-4 font-headline font-bold text-primary">Admin Panel</span>
          </header>

          <main className="flex-1 overflow-auto p-6 md:p-12 lg:p-16">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

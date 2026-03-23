"use client";

import Link from "next/link";
import { PawPrint, Menu, X, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-lg group-hover:bg-accent transition-colors">
                <PawPrint className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-headline font-bold text-primary tracking-tight">
                PawPals <span className="text-accent">Hub</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/pets" className="text-muted-foreground hover:text-primary transition-colors font-medium">Browse Pets</Link>
            <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors font-medium">How it Works</Link>
            <Link href="/admin/dashboard" className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors font-medium">
              <Settings className="h-4 w-4" /> Admin
            </Link>
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-white shadow-md">
              <Link href="/pets">Adopt Today</Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-muted-foreground p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-border p-4 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <Link href="/pets" className="block text-lg font-medium text-muted-foreground">Browse Pets</Link>
          <Link href="/how-it-works" className="block text-lg font-medium text-muted-foreground">How it Works</Link>
          <Link href="/admin/dashboard" className="block text-lg font-medium text-muted-foreground">Admin Panel</Link>
          <Button asChild className="w-full bg-primary">
            <Link href="/pets">Adopt Today</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

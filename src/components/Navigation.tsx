"use client";

import Link from "next/link";
import { Menu, X, PawPrint, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Pets", href: "/pets" },
    { name: "About", href: "/how-it-works" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-xl group-hover:scale-105 transition-transform shadow-md">
                <PawPrint className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-headline font-bold text-foreground tracking-tight">
                Pet<span className="text-primary">Adopt</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="bg-accent hover:bg-accent/90 text-white rounded-full px-6 shadow-sm">
              <Link href="/pets/post" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Post a Pet
              </Link>
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
        <div className="md:hidden bg-white border-b border-border p-6 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="block text-lg font-medium text-muted-foreground hover:text-primary" 
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="w-full bg-accent rounded-full">
            <Link href="/pets/post" onClick={() => setIsOpen(false)}>Post a Pet</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
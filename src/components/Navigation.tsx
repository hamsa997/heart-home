"use client";

import Link from "next/link";
import { Menu, X, Heart, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                <Heart className="h-6 w-6 text-white fill-current" />
              </div>
              <span className="text-2xl font-headline font-bold text-primary tracking-tight">
                Heart<span className="text-accent">Home</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/pets" className="text-muted-foreground hover:text-primary transition-colors font-medium">Browse Pets</Link>
            <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors font-medium">The Journey</Link>
            <Link href="/contact" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-medium">
              <Mail className="h-4 w-4" /> Contact
            </Link>
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-full px-6">
              <Link href="/pets">Adopt a Buddy</Link>
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
          <Link href="/pets" className="block text-lg font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>Browse Pets</Link>
          <Link href="/how-it-works" className="block text-lg font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>The Journey</Link>
          <Link href="/contact" className="block text-lg font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>Contact Us</Link>
          <Button asChild className="w-full bg-primary rounded-full">
            <Link href="/pets" onClick={() => setIsOpen(false)}>Adopt a Buddy</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

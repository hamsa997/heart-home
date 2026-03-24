"use client";

import Link from "next/link";
import { Menu, X, Heart, Mail, PawPrint } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Browse Pets", href: "/pets", icon: PawPrint },
    { name: "The Journey", href: "/how-it-works", icon: Heart },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
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
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5"
              >
                {link.name}
              </Link>
            ))}
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-full px-8 h-11">
              <Link href="/pets">Find a Friend</Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-muted-foreground p-2 hover:bg-muted rounded-lg transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-border p-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary py-2" 
              onClick={() => setIsOpen(false)}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <Button asChild className="w-full bg-primary rounded-full h-14 text-lg font-bold shadow-lg shadow-primary/20">
              <Link href="/pets" onClick={() => setIsOpen(false)}>Find a Friend</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

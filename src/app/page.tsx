
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { PawPrint, Heart, ShieldCheck, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full text-primary font-medium text-sm">
                <Heart className="h-4 w-4 fill-primary" />
                Find your perfect companion
              </div>
              <h1 className="text-5xl lg:text-7xl font-headline font-bold text-foreground leading-[1.1]">
                Every Pet Deserves a <span className="text-primary">Loving Home</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                PetMatch Connect bridges the gap between animal rescues and loving families. Browse hundreds of available pets waiting to meet you today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-14 px-8 shadow-xl hover:shadow-primary/20 transition-all">
                  <Link href="/pets" className="flex items-center gap-2">
                    <Search className="h-5 w-5" /> Browse Pets
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 text-lg h-14 px-8">
                  <Link href="/how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/10 rounded-[3rem] blur-2xl -z-10 animate-pulse"></div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image 
                  src="https://picsum.photos/seed/hero-dog/800/800"
                  alt="Happy dog and human"
                  width={800}
                  height={800}
                  className="object-cover"
                  priority
                  data-ai-hint="happy dog"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                <div className="bg-accent/20 p-3 rounded-xl">
                  <PawPrint className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-headline text-foreground">1,200+</div>
                  <div className="text-sm text-muted-foreground">Successful Adoptions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-headline font-bold text-foreground">Why Choose PetMatch?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">We simplify the adoption process to ensure every pet finds its ideal match.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Smart Filtering</h3>
              <p className="text-muted-foreground">Find exactly who you're looking for by filtering by species, age, size, and temperament.</p>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Vetted Shelters</h3>
              <p className="text-muted-foreground">We partner with only the most reputable animal rescues to ensure animal health and safety.</p>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Supportive Process</h3>
              <p className="text-muted-foreground">Our team guides you through every step of the adoption application to post-adoption care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <PawPrint className="h-6 w-6 text-primary" />
            <span className="text-xl font-headline font-bold text-primary">PetMatch Connect</span>
          </div>
          <p className="text-muted-foreground">© 2024 PetMatch Connect Adoption System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

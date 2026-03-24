"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Home as HomeIcon, CheckCircle, Search, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, limit, orderBy } from "firebase/firestore";
import { PetCard } from "@/components/PetCard";

export default function Home() {
  const db = useFirestore();
  const petsRef = useMemoFirebase(() => query(collection(db, "pets"), orderBy("createdAt", "desc"), limit(4)), [db]);
  const { data: recentPets, isLoading } = useCollection(petsRef);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[#F9FAFB] py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground leading-[1.1]">
                Find Your Perfect <br/><span className="text-primary italic">Companion</span> 🐾
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Connect directly with pet owners and give pets a loving home. A simple, personal way to adopt your next best friend.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-16 px-10 text-lg font-bold shadow-lg">
                  <Link href="/pets">Browse Pets</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full h-16 px-10 text-lg font-bold border-2">
                  <Link href="/pets/post">Post a Pet</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image 
                  src="https://picsum.photos/seed/happy-dog-hero/800/1000"
                  alt="Happy pet"
                  width={800}
                  height={1000}
                  className="object-cover h-[500px] w-full"
                  priority
                  data-ai-hint="happy dog"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-bold">Featured Pets</h2>
              <p className="text-muted-foreground text-lg">New buddies waiting for their forever homes.</p>
            </div>
            <Button asChild variant="ghost" className="text-primary font-bold group">
              <Link href="/pets" className="flex items-center gap-2">
                View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-3xl bg-muted animate-pulse" />
              ))
            ) : recentPets?.map((pet) => (
              <PetCard key={pet.id} pet={pet as any} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <h2 className="text-3xl md:text-5xl font-bold">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: PlusCircle, title: "Post a Pet", desc: "List your pet with photos and details to find them a new loving home." },
              { icon: Search, title: "Connect", desc: "Adopters browse and send direct requests to pet owners." },
              { icon: HomeIcon, title: "Adopt Easily", desc: "Meet up, finalize the adoption, and start a new journey together." }
            ].map((step, i) => (
              <div key={i} className="space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-primary rounded-[3rem] p-12 md:p-20 text-white space-y-8 shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-bold">Ready to adopt or <br/>rehome a pet?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-full h-16 px-12 text-lg font-bold">
              <Link href="/pets">Find a Pet</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 rounded-full h-16 px-12 text-lg font-bold">
              <Link href="/pets/post">Post a Listing</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border text-center text-muted-foreground text-sm">
        <p>© 2024 PetAdopt Platform. Connecting paws with hearts directly.</p>
      </footer>
    </div>
  );
}

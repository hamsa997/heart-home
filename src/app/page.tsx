"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Star, ArrowRight, ShieldCheck, Users, PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, limit, orderBy } from "firebase/firestore";
import { getPetImageUrl } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export default function Home() {
  const db = useFirestore();
  const petsRef = useMemoFirebase(() => query(collection(db, "pets"), orderBy("createdAt", "desc"), limit(4)), [db]);
  const { data: recentPets, isLoading } = useCollection(petsRef);

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20 selection:text-primary">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[#fffaf9] pt-12 md:pt-24 pb-24 md:pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 md:space-y-10 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2.5 rounded-full text-primary font-bold text-sm animate-in fade-in slide-in-from-bottom-2 duration-700 uppercase tracking-widest">
                <Heart className="h-4 w-4 fill-primary" />
                Find Your Forever Bestie
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold text-foreground leading-[0.95] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Where Happy <br/><span className="text-primary italic">Endings</span> Begin.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                HeartHome connects lonely paws with loving hearts. Every tail deserves a wag, and every family deserves a companion.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-xl h-16 md:h-20 px-10 md:px-12 rounded-full shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 font-bold">
                  <Link href="/pets" className="flex items-center gap-3">
                    Meet Our Pets <ArrowRight className="h-6 w-6" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 text-xl h-16 md:h-20 px-10 md:px-12 rounded-full hover:bg-primary/5 bg-white/50 backdrop-blur-sm transition-all hover:border-primary/30 active:scale-95 font-bold">
                  <Link href="/how-it-works">Our Process</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative mt-12 lg:mt-0">
              <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] md:border-[16px] border-white md:-rotate-1 transform transition-transform hover:rotate-0 duration-700">
                <Image 
                  src="https://picsum.photos/seed/happy-dog-hero/800/1000"
                  alt="A happy dog ready for its forever home"
                  width={800}
                  height={1000}
                  className="object-cover h-[500px] md:h-[750px] w-full"
                  priority
                  data-ai-hint="happy dog"
                />
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-2xl flex flex-col items-center gap-2 border border-white/50 animate-bounce duration-[4000ms]">
                <div className="bg-accent p-4 rounded-2xl shadow-lg shadow-accent/20">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold font-headline text-foreground">1.5k+</div>
                <div className="text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-widest">Lives Changed</div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="hidden sm:flex absolute -bottom-10 -left-10 md:-bottom-16 md:-left-16 bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] shadow-2xl items-center gap-4 md:gap-6 border border-white/50">
                <div className="bg-primary/10 p-4 md:p-5 rounded-2xl md:rounded-3xl">
                  <PawPrint className="h-6 w-6 md:h-10 md:w-10 text-primary" />
                </div>
                <div>
                  <div className="text-2xl md:text-4xl font-bold font-headline text-foreground">2,500+</div>
                  <div className="text-xs md:text-sm text-muted-foreground font-bold uppercase tracking-widest">Happy Adoptions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Missions */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16 md:space-y-24">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-foreground">HeartHome Values</h2>
            <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">We don't just find homes; we create perfect matches based on love and compatibility.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {[
              { icon: Sparkles, title: "Curated Matching", desc: "Every pet has a soul. We help you find the one that speaks to yours.", color: "bg-primary/10 text-primary" },
              { icon: Heart, title: "Total Wellbeing", desc: "From nutrition to affection, our pets arrive healthy, happy, and ready.", color: "bg-accent/10 text-accent", fill: true },
              { icon: ShieldCheck, title: "Always There", desc: "Adoption is just the beginning. Our support lasts a lifetime.", color: "bg-primary/10 text-primary" }
            ].map((feature, i) => (
              <div key={i} className="group p-10 md:p-14 rounded-[3rem] bg-[#fffaf9] border border-transparent hover:border-primary/20 transition-all hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)]">
                <div className={`${feature.color} w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mb-8 md:mb-10 mx-auto transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <feature.icon className={`h-10 w-10 md:h-12 md:w-12 ${feature.fill ? 'fill-current' : ''}`} />
                </div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold mb-6">{feature.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals with Real Data */}
      <section className="py-24 md:py-40 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-headline font-bold">Newly Arrived Hearts</h2>
              <p className="text-muted-foreground text-xl max-w-xl">These gentle souls are waiting for their first family hug.</p>
            </div>
            <Button asChild variant="ghost" className="text-primary font-bold text-xl hover:bg-primary/10 px-8 h-14 rounded-full group">
              <Link href="/pets" className="flex items-center gap-3">
                View All Pets <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-[2.5rem] bg-muted animate-pulse" />
              ))
            ) : recentPets?.map((pet) => (
              <Link href={`/pets/${pet.id}`} key={pet.id} className="group">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white transition-all group-hover:shadow-2xl group-hover:-translate-y-2">
                  <Image 
                    src={pet.mainPhotoUrl || getPetImageUrl(pet.species, pet.breed, pet.name)}
                    alt={pet.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-white">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">{pet.breed}</p>
                    <h4 className="text-2xl md:text-3xl font-headline font-bold">{pet.name}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-40 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="rounded-[4rem] bg-primary p-12 md:p-24 relative overflow-hidden border-none shadow-3xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 text-center space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-headline font-bold text-white leading-tight">
                Ready to find <br/>your <span className="italic underline decoration-accent/50 underline-offset-8">missing piece?</span>
              </h2>
              <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
                Join thousands of families who found their best friend at HeartHome. Your journey starts with a single wag.
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-xl h-16 md:h-20 px-12 md:px-16 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 font-bold">
                <Link href="/pets">Browse Available Pets</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-10">
          <div className="flex items-center justify-center gap-3 group">
            <div className="bg-primary p-2.5 rounded-2xl shadow-xl shadow-primary/20">
              <Heart className="h-8 w-8 text-white fill-current" />
            </div>
            <span className="text-4xl font-headline font-bold text-primary tracking-tight">HeartHome</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 text-lg font-bold text-muted-foreground uppercase tracking-widest">
            <Link href="/pets" className="hover:text-primary transition-colors">Find Pets</Link>
            <Link href="/how-it-works" className="hover:text-primary transition-colors">Process</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="#" className="hover:text-primary transition-colors">Support</Link>
          </div>

          <div className="h-px w-32 bg-border mx-auto opacity-50"></div>
          
          <div className="space-y-6">
            <p className="text-muted-foreground text-xl font-medium italic">Creating families, one paw at a time.</p>
            <p className="text-xs text-muted-foreground uppercase tracking-[0.4em] font-bold">© 2024 HeartHome Adoption Sanctuary.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

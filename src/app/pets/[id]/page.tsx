"use client";

import { use, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Heart, Info, CheckCircle2, Share2, ArrowLeft, Dog, Cat, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AdoptionForm } from "@/components/AdoptionForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getPetImageUrl } from "@/lib/utils";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

export default function PetDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  const petRef = useMemoFirebase(() => doc(db, "pets", id), [db, id]);
  const { data: pet, isLoading } = useDoc(petRef);
  const [isApplicationSent, setIsApplicationSent] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Getting buddy details...</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Buddy Not Found</h1>
        <p className="text-muted-foreground">This pet might have already found their forever home.</p>
        <Button asChild><Link href="/pets">Back to Listings</Link></Button>
      </div>
    );
  }

  const SpeciesIcon = pet.species?.toLowerCase() === "cat" ? Cat : Dog;
  const imageHint = `cartoon ${pet.species?.toLowerCase()}`;
  const dynamicImageUrl = pet.mainPhotoUrl || getPetImageUrl(pet.species || "dog", pet.breed || "mixed", pet.name);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        <Link href="/pets" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to listings
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={dynamicImageUrl}
                alt={`${pet.name} - ${pet.breed}`}
                fill
                className="object-cover"
                unoptimized
                data-ai-hint={imageHint}
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <Badge className="bg-white/90 text-primary text-md px-4 py-1.5 shadow-lg backdrop-blur-sm border-none hover:bg-white/90">
                  {pet.isAvailable ? "Available" : "Adopted"}
                </Badge>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">{pet.name}</h1>
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <SpeciesIcon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {pet.location || "Sanctuary"}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{pet.breed || "Mixed"}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{pet.ageInYears} years</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl"><Heart className="h-6 w-6" /></Button>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl"><Share2 className="h-6 w-6" /></Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white p-6 rounded-2xl border border-border space-y-1 text-center">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">Gender</p>
                  <p className="text-lg font-headline font-bold text-primary">{pet.gender}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-border space-y-1 text-center">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">Age</p>
                  <p className="text-lg font-headline font-bold text-primary">{pet.ageInYears}y</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-border space-y-1 text-center">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">Species</p>
                  <p className="text-lg font-headline font-bold text-primary">{pet.species}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                  <Info className="h-6 w-6 text-primary" /> About {pet.name}
                </h2>
                <div className="text-lg text-muted-foreground leading-relaxed bg-white p-8 rounded-3xl border border-border whitespace-pre-wrap">
                  {pet.description}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-headline font-bold">Personality Traits</h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.personalityTraits?.map((trait: string) => (
                      <Badge key={trait} variant="secondary" className="px-4 py-1.5 text-sm rounded-lg bg-secondary/50 text-primary border-none">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-headline font-bold">Adoption Requirements</h3>
                  <ul className="space-y-2">
                    {pet.adoptionRequirements?.map((req: string) => (
                      <li key={req} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="rounded-3xl border-border shadow-xl overflow-hidden sticky top-24">
              <div className="bg-primary p-8 text-white space-y-2">
                <h3 className="text-2xl font-headline font-bold">Interested in {pet.name}?</h3>
                <p className="opacity-90">Start your journey today by submitting an inquiry.</p>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-accent/10 p-2 rounded-lg text-accent">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span>Health check completed</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-accent/10 p-2 rounded-lg text-accent">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span>Vaccinations up to date</span>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild disabled={!pet.isAvailable}>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-white h-14 text-lg shadow-lg hover:shadow-accent/20">
                      {pet.isAvailable ? "Submit Adoption Application" : "Currently Adopted"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] rounded-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-headline font-bold">Adoption Inquiry</DialogTitle>
                    </DialogHeader>
                    <AdoptionForm pet={pet as any} onSuccess={() => setIsApplicationSent(true)} />
                  </DialogContent>
                </Dialog>

                <p className="text-xs text-muted-foreground text-center">
                  By applying, you agree to our pet care policies and sanctuary terms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
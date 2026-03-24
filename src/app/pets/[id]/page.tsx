"use client";

import { use, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Info, CheckCircle2, ArrowLeft, Phone, Mail, User, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { AdoptionForm } from "@/components/AdoptionForm";

export default function PetDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  const petRef = useMemoFirebase(() => doc(db, "pets", id), [db, id]);
  const { data: pet, isLoading } = useDoc(petRef);

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary h-12 w-12" /></div>;
  if (!pet) return <div className="h-screen flex items-center justify-center">Pet not found.</div>;

  const altText = pet.petName ? `Portrait of ${pet.petName}` : "Pet portrait";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <Link href="/pets" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Browse
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden shadow-xl">
              <Image 
                src={pet.imageUrl || `https://picsum.photos/seed/${pet.id}/1200/800`}
                alt={altText}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold">{pet.petName}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground font-medium">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {pet.city}</span>
                    <span>•</span>
                    <span>{pet.breed}</span>
                    <span>•</span>
                    <span>{pet.age}</span>
                  </div>
                </div>
                <Badge className="bg-primary px-4 py-1 text-md rounded-full">{pet.status || "Available"}</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Gender", value: pet.gender },
                  { label: "Color", value: pet.color },
                  { label: "Vaccinated", value: pet.vaccinated ? "Yes" : "No" },
                  { label: "Type", value: pet.type }
                ].map((item) => (
                  <div key={item.label} className="bg-white p-4 rounded-2xl border border-border text-center">
                    <p className="text-xs text-muted-foreground font-bold uppercase">{item.label}</p>
                    <p className="text-lg font-bold text-primary">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2"><Info className="h-6 w-6 text-primary" /> Story</h2>
                <div className="text-lg text-muted-foreground leading-relaxed bg-white p-6 rounded-3xl border border-border whitespace-pre-wrap">
                  {pet.description}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Temperament</h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.temperament?.split(',').map((trait: string) => (
                      <Badge key={trait} variant="secondary" className="px-4 py-1 rounded-full">{trait.trim()}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Reason for Rehoming</h3>
                  <p className="text-muted-foreground">{pet.reasonForRehoming}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="rounded-[2rem] border-none shadow-xl overflow-hidden">
              <div className="bg-primary p-6 text-white text-center">
                <h3 className="text-2xl font-bold">Ready to Adopt?</h3>
                <p className="opacity-90">Contact the owner directly.</p>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-3 rounded-full"><User className="h-5 w-5 text-primary" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase">Owner</p>
                      <p className="font-bold">{pet.ownerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-3 rounded-full"><Phone className="h-5 w-5 text-primary" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase">Phone</p>
                      <p className="font-bold">{pet.ownerPhone || "Provided on request"}</p>
                    </div>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-accent hover:bg-accent/90 h-14 text-lg rounded-full">Send Adoption Request</Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Request to Adopt {pet.petName}</DialogTitle>
                    </DialogHeader>
                    <AdoptionForm pet={pet as any} />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

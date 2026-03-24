"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint, Users, Heart, Clock, Loader2 } from "lucide-react";
import Image from "next/image";
import { getPetImageUrl } from "@/lib/utils";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const db = useFirestore();

  const petsRef = useMemoFirebase(() => query(collection(db, "pets"), orderBy("createdAt", "desc"), limit(3)), [db]);
  const appsRef = useMemoFirebase(() => query(collection(db, "adoptionApplications"), orderBy("submissionDate", "desc"), limit(3)), [db]);
  const allPetsRef = useMemoFirebase(() => collection(db, "pets"), [db]);
  const allAppsRef = useMemoFirebase(() => collection(db, "adoptionApplications"), [db]);

  const { data: recentPets, isLoading: petsLoading } = useCollection(petsRef);
  const { data: recentApps, isLoading: appsLoading } = useCollection(appsRef);
  const { data: allPets } = useCollection(allPetsRef);
  const { data: allApps } = useCollection(allAppsRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted || !dateString) return "...";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  const stats = [
    { title: "Total Pets", value: allPets?.length || 0, icon: PawPrint, color: "bg-primary" },
    { title: "Active Applications", value: allApps?.length || 0, icon: Users, color: "bg-accent" },
    { title: "Adoptions (Goal)", value: "12", icon: Heart, color: "bg-primary" },
    { title: "New This Week", value: allApps?.filter(a => a.status === "New").length || 0, icon: Clock, color: "bg-accent" },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground">System Overview</h1>
        <p className="text-sm md:text-base text-muted-foreground">Welcome back. Here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border shadow-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold font-headline">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <Card className="rounded-2xl border-border">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-headline">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appsLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="animate-spin h-6 w-6 text-primary" /></div>
              ) : recentApps?.length ? (
                recentApps.map(app => (
                  <div key={app.id} className="flex items-center justify-between p-3 md:p-4 bg-muted/30 rounded-xl">
                    <div className="min-w-0 flex items-center gap-3">
                      <div className="w-10 h-10 relative rounded-lg overflow-hidden shrink-0 bg-muted">
                        {app.petPhotoUrl && (
                          <Image src={app.petPhotoUrl} alt={app.petName || 'Pet'} fill className="object-cover" unoptimized />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold truncate">{app.applicantName}</p>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">Applying for <span className="text-primary font-medium">{app.petName}</span></p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] md:text-xs text-muted-foreground">
                        {formatDate(app.submissionDate)}
                      </p>
                      <span className="text-[10px] md:text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold uppercase">{app.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">No applications yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl border-border">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-headline">Recently Added Pets</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {petsLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="animate-spin h-6 w-6 text-primary" /></div>
              ) : recentPets?.length ? (
                recentPets.map(pet => {
                  const dynamicImageUrl = pet.mainPhotoUrl || getPetImageUrl(pet.species, pet.breed, pet.name);
                  return (
                    <div key={pet.id} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-xl">
                      <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-lg overflow-hidden shrink-0">
                        <Image 
                          src={dynamicImageUrl} 
                          alt={pet.name || 'Pet'} 
                          fill 
                          className="object-cover" 
                          unoptimized
                          data-ai-hint={`cartoon ${(pet.species || 'pet').toLowerCase()}`}
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold truncate">{pet.name || 'Buddy'}</p>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">{pet.species || 'Pet'} • {pet.breed || 'Mixed'}</p>
                      </div>
                      <span className="text-[10px] md:text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold shrink-0">{pet.isAvailable ? 'Available' : 'Adopted'}</span>
                    </div>
                  );
                })
              ) : (
                <p className="text-center py-8 text-muted-foreground">No pets added yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

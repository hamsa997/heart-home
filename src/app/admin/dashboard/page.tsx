"use client";

import { useEffect, useState } from "react";
import { INITIAL_PETS, INITIAL_APPLICATIONS } from "@/app/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint, Users, Heart, Clock } from "lucide-react";
import Image from "next/image";
import { getPetImageUrl } from "@/lib/utils";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return "...";
    return new Date(dateString).toLocaleDateString();
  };

  const stats = [
    { title: "Total Pets", value: INITIAL_PETS.length, icon: PawPrint, color: "bg-primary" },
    { title: "Active Applications", value: INITIAL_APPLICATIONS.length, icon: Users, color: "bg-accent" },
    { title: "Adoptions This Month", value: "12", icon: Heart, color: "bg-primary" },
    { title: "Pending Reviews", value: "3", icon: Clock, color: "bg-accent" },
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
              {INITIAL_APPLICATIONS.map(app => (
                <div key={app.id} className="flex items-center justify-between p-3 md:p-4 bg-muted/30 rounded-xl">
                  <div className="min-w-0">
                    <p className="font-bold truncate">{app.fullName}</p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">Applying for <span className="text-primary font-medium">{app.petName}</span></p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      {formatDate(app.submittedAt)}
                    </p>
                    <span className="text-[10px] md:text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">New</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl border-border">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-headline">Recently Added Pets</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {INITIAL_PETS.slice(0, 3).map(pet => {
                const dynamicImageUrl = getPetImageUrl(pet.species, pet.breed, pet.name);
                return (
                  <div key={pet.id} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-xl">
                    <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-lg overflow-hidden shrink-0">
                      <Image 
                        src={dynamicImageUrl} 
                        alt={pet.name} 
                        fill 
                        className="object-cover" 
                        data-ai-hint={`cartoon ${pet.species.toLowerCase()}`}
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-bold truncate">{pet.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground truncate">{pet.species} • {pet.breed}</p>
                    </div>
                    <span className="text-[10px] md:text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold shrink-0">{pet.status}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

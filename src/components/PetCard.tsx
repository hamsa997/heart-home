"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PetCardProps {
  pet: {
    id: string;
    petName: string;
    breed: string;
    age: string;
    city: string;
    imageUrl: string;
    status?: string;
  };
}

export function PetCard({ pet }: PetCardProps) {
  const altText = pet.petName ? `${pet.petName}, a ${pet.breed}` : "Pet portrait";

  return (
    <Link href={`/pets/${pet.id}`} className="group block h-full">
      <Card className="rounded-[2rem] overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image 
            src={pet.imageUrl || `https://picsum.photos/seed/${pet.id}/600/800`}
            alt={altText}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/90 text-primary hover:bg-white px-3 py-1 rounded-full shadow-sm">
              {pet.status || "Available"}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6 flex-grow space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold truncate">{pet.petName || "Buddy"}</h3>
            <Heart className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
          </div>
          <p className="text-muted-foreground font-medium">{pet.breed} • {pet.age}</p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{pet.city}</span>
          </div>
        </CardContent>
        
        <CardFooter className="px-6 py-4 bg-muted/10 group-hover:bg-primary/5 transition-colors">
          <div className="flex items-center justify-between w-full">
            <span className="text-primary font-bold text-sm">View Details</span>
            <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

import { Pet } from "@/app/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Heart, ArrowRight, Dog, Cat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPetImageUrl } from "@/lib/utils";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  const SpeciesIcon = pet.species === "Dog" ? Dog : Cat;
  const imageHint = `cartoon ${pet.species?.toLowerCase()}`;
  const dynamicImageUrl = getPetImageUrl(pet.species, pet.breed, pet.name);

  return (
    <Link href={`/pets/${pet.id}`}>
      <Card className="group overflow-hidden border-border bg-white hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image 
            src={dynamicImageUrl}
            alt={`${pet.name} - ${pet.breed}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            data-ai-hint={imageHint}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant={pet.status === "Available" ? "default" : "secondary"} className={pet.status === "Available" ? "bg-accent hover:bg-accent" : ""}>
              {pet.status}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6 flex-grow space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-headline font-bold text-foreground truncate">{pet.name}</h3>
                <div className="bg-primary/10 p-1 rounded-md shrink-0">
                  <SpeciesIcon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground truncate">{pet.breed} • {pet.age}</p>
            </div>
            <button className="text-muted-foreground hover:text-destructive transition-colors shrink-0 ml-2">
              <Heart className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {pet.description}
          </p>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{pet.location}</span>
          </div>
        </CardContent>
        
        <CardFooter className="px-6 py-4 border-t border-border bg-muted/5 group-hover:bg-primary/5 transition-colors">
          <div className="flex items-center justify-between w-full">
            <span className="text-primary font-bold text-sm">View Details</span>
            <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

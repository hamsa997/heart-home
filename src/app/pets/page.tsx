"use client";

import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { INITIAL_PETS } from "@/app/lib/mock-data";
import { PetCard } from "@/components/PetCard";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PetListing() {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");
  const [age, setAge] = useState("all");

  const filteredPets = useMemo(() => {
    return INITIAL_PETS.filter(pet => {
      const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) || 
                           pet.breed.toLowerCase().includes(search.toLowerCase());
      const matchesSpecies = species === "all" || pet.species.toLowerCase() === species.toLowerCase();
      
      let matchesAge = true;
      if (age !== "all") {
        const petAgeLower = pet.age.toLowerCase();
        if (age === "younger") {
          // Matches kittens, puppies, or 1 year olds
          matchesAge = petAgeLower.includes("kitten") || 
                       petAgeLower.includes("puppy") || 
                       petAgeLower.includes("1 year") ||
                       petAgeLower.includes("month");
        } else if (age === "adult") {
          // Matches 2+ years or explicitly "adult" or "senior"
          const isOneYear = petAgeLower.includes("1 year");
          matchesAge = (petAgeLower.includes("year") && !isOneYear) || 
                       petAgeLower.includes("adult") || 
                       petAgeLower.includes("senior");
        }
      }
      
      return matchesSearch && matchesSpecies && matchesAge;
    });
  }, [search, species, age]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-headline font-bold text-foreground">Meet Your New <span className="text-primary">Best Friend</span></h1>
          <p className="text-muted-foreground text-lg">Browse our available pets and find the perfect addition to your family.</p>
        </header>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or breed..." 
              className="pl-10 h-12 bg-background/50" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="w-full md:w-40">
              <Select value={species} onValueChange={setSpecies}>
                <SelectTrigger className="h-12 bg-background/50">
                  <SelectValue placeholder="Species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="dog">Dogs</SelectItem>
                  <SelectItem value="cat">Cats</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-40">
              <Select value={age} onValueChange={setAge}>
                <SelectTrigger className="h-12 bg-background/50">
                  <SelectValue placeholder="Age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Age</SelectItem>
                  <SelectItem value="younger">Younger</SelectItem>
                  <SelectItem value="adult">Adult</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Listing Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-headline">{filteredPets.length} pets available</h2>
          </div>
          
          {filteredPets.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 space-y-4">
              <div className="bg-muted/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold font-headline">No pets found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters to find more results.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

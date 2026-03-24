"use client";

import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { PetCard } from "@/components/PetCard";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";

export default function PetListing() {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");
  const [ageRange, setAgeRange] = useState("all");

  const db = useFirestore();
  const petsRef = useMemoFirebase(() => query(collection(db, "pets"), orderBy("createdAt", "desc")), [db]);
  const { data: pets, isLoading } = useCollection(petsRef);

  const filteredPets = useMemo(() => {
    if (!pets) return [];
    return pets.filter(pet => {
      const petName = (pet.name || "").toLowerCase();
      const petBreed = (pet.breed || "").toLowerCase();
      const petSpecies = (pet.species || "").toLowerCase();
      const petAgeYears = Number(pet.ageInYears) || 0;

      const matchesSearch = petName.includes(search.toLowerCase()) || 
                           petBreed.includes(search.toLowerCase());
      
      const matchesSpecies = species === "all" || petSpecies === species.toLowerCase();
      
      let matchesAge = true;
      if (ageRange !== "all") {
        if (ageRange === "young") {
          matchesAge = petAgeYears < 2;
        } else if (ageRange === "adult") {
          matchesAge = petAgeYears >= 2 && petAgeYears < 7;
        } else if (ageRange === "senior") {
          matchesAge = petAgeYears >= 7;
        }
      }
      
      return matchesSearch && matchesSpecies && matchesAge;
    });
  }, [pets, search, species, ageRange]);

  const clearFilters = () => {
    setSearch("");
    setSpecies("all");
    setAgeRange("all");
  };

  return (
    <div className="min-h-screen bg-[#fffaf9]">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <header className="space-y-6 text-center md:text-left">
          <h1 className="text-5xl lg:text-7xl font-headline font-bold text-foreground tracking-tight">
            Meet Your <br/><span className="text-primary italic">Perfect Buddy</span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl">
            Every animal in our sanctuary has a unique story and a mountain of love to give.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-border flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search by name or breed..." 
              className="pl-12 h-14 rounded-2xl bg-[#fffaf9] border-none text-lg focus-visible:ring-primary/20" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="min-w-[140px] md:w-48">
              <Select value={species} onValueChange={setSpecies}>
                <SelectTrigger className="h-14 rounded-2xl bg-[#fffaf9] border-none text-lg">
                  <SelectValue placeholder="Species" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="dog">Dogs</SelectItem>
                  <SelectItem value="cat">Cats</SelectItem>
                  <SelectItem value="bird">Birds</SelectItem>
                  <SelectItem value="rabbit">Rabbits</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="min-w-[140px] md:w-48">
              <Select value={ageRange} onValueChange={setAgeRange}>
                <SelectTrigger className="h-14 rounded-2xl bg-[#fffaf9] border-none text-lg">
                  <SelectValue placeholder="Age Group" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">Any Age</SelectItem>
                  <SelectItem value="young">Young (&lt; 2y)</SelectItem>
                  <SelectItem value="adult">Adult (2-7y)</SelectItem>
                  <SelectItem value="senior">Senior (7y+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(search || species !== "all" || ageRange !== "all") && (
              <Button 
                variant="ghost" 
                onClick={clearFilters}
                className="h-14 rounded-2xl px-4 text-muted-foreground hover:text-primary"
              >
                <X className="h-5 w-5 mr-2" /> Clear
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-10">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <h2 className="text-2xl font-bold font-headline">
              {isLoading ? "Searching..." : `${filteredPets.length} buddies looking for homes`}
            </h2>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="h-16 w-16 animate-spin text-primary opacity-20" />
              <p className="text-muted-foreground text-xl font-medium animate-pulse">Consulting the crystal ball...</p>
            </div>
          ) : filteredPets.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredPets.map(pet => (
                <PetCard key={pet.id} pet={pet as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 space-y-8 bg-white rounded-[3rem] border border-dashed border-border">
              <div className="bg-primary/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                <Filter className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold font-headline">No buddies matched your search</h3>
                <p className="text-muted-foreground text-xl max-w-md mx-auto">
                  Try broadening your search or clearing filters. Your soulmate might be just one click away!
                </p>
              </div>
              <Button 
                onClick={clearFilters} 
                variant="outline" 
                className="h-14 px-8 rounded-full border-2 border-primary/20 text-primary font-bold hover:bg-primary/5"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-border py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground uppercase tracking-widest font-bold text-sm">Every tail tells a story. Find yours today.</p>
        </div>
      </footer>
    </div>
  );
}

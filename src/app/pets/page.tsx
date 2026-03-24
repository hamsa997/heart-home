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
  const [type, setType] = useState("all");
  const [city, setCity] = useState("all");

  const db = useFirestore();
  const petsRef = useMemoFirebase(() => query(collection(db, "pets"), orderBy("createdAt", "desc")), [db]);
  const { data: pets, isLoading } = useCollection(petsRef);

  const filteredPets = useMemo(() => {
    if (!pets) return [];
    return pets.filter(pet => {
      const petName = (pet.petName || "").toLowerCase();
      const petBreed = (pet.breed || "").toLowerCase();
      const petType = (pet.type || "").toLowerCase();
      const petCity = (pet.city || "").toLowerCase();

      const matchesSearch = petName.includes(search.toLowerCase()) || 
                           petBreed.includes(search.toLowerCase());
      
      const matchesType = type === "all" || petType === type.toLowerCase();
      const matchesCity = city === "all" || petCity === city.toLowerCase();
      
      return matchesSearch && matchesType && matchesCity;
    });
  }, [pets, search, type, city]);

  const cities = useMemo(() => {
    if (!pets) return [];
    const uniqueCities = Array.from(new Set(pets.map(p => p.city).filter(Boolean)));
    return uniqueCities.sort();
  }, [pets]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Adopt a Friend</h1>
          <p className="text-muted-foreground text-xl">Browse pets posted directly by owners looking for new homes.</p>
        </header>

        {/* Filters */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-border flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search by name or breed..." 
              className="pl-12 h-12 rounded-2xl bg-muted/30 border-none" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="h-12 w-32 rounded-2xl bg-muted/30 border-none">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dog">Dogs</SelectItem>
                <SelectItem value="cat">Cats</SelectItem>
                <SelectItem value="bird">Birds</SelectItem>
              </SelectContent>
            </Select>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-12 w-40 rounded-2xl bg-muted/30 border-none">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary opacity-20" />
            <p className="text-muted-foreground font-medium">Finding pets near you...</p>
          </div>
        ) : filteredPets.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPets.map(pet => (
              <PetCard key={pet.id} pet={pet as any} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold">No pets matched your search</h3>
            <p className="text-muted-foreground mb-6">Try different filters or search terms.</p>
            <Button onClick={() => { setSearch(""); setType("all"); setCity("all"); }} variant="outline">Clear All</Button>
          </div>
        )}
      </main>
    </div>
  );
}
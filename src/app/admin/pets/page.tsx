"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/badge";
import { Plus, Edit, Trash2, Search, MoreHorizontal, Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getPetImageUrl } from "@/lib/utils";
import { useCollection, useFirestore, useMemoFirebase, deleteDocumentNonBlocking } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function AdminPets() {
  const db = useFirestore();
  const { toast } = useToast();
  const petsRef = useMemoFirebase(() => collection(db, "pets"), [db]);
  const { data: pets, isLoading } = useCollection(petsRef);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name}?`)) {
      deleteDocumentNonBlocking(doc(db, "pets", id));
      toast({
        title: "Pet Removed",
        description: `${name} has been removed from the sanctuary inventory.`,
      });
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground">Pet Inventory</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage pet profiles, availability and descriptions.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg rounded-xl h-11 md:h-12 px-6">
          <Link href="/admin/pets/new" className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> Add New Pet
          </Link>
        </Button>
      </header>

      <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/10 flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Filter pets by name, breed, or species..." className="pl-10 h-10 bg-white" />
          </div>
          <div className="flex gap-2">
             <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table className="min-w-[600px]">
              <TableHeader className="bg-muted/5">
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Species</TableHead>
                  <TableHead className="hidden md:table-cell">Breed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pets?.map((pet) => {
                  const dynamicImageUrl = pet.mainPhotoUrl || getPetImageUrl(pet.species, pet.breed, pet.name);
                  return (
                    <TableRow key={pet.id} className="hover:bg-muted/5 transition-colors">
                      <TableCell>
                        <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-lg overflow-hidden border border-border">
                          <Image 
                            src={dynamicImageUrl} 
                            alt={pet.name} 
                            fill 
                            className="object-cover" 
                            unoptimized
                            data-ai-hint={`cartoon ${pet.species?.toLowerCase()}`}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-foreground">{pet.name}</TableCell>
                      <TableCell>{pet.species}</TableCell>
                      <TableCell className="hidden md:table-cell">{pet.breed}</TableCell>
                      <TableCell>
                        <Badge variant={pet.isAvailable ? "default" : "secondary"} className={pet.isAvailable ? "bg-accent/20 text-accent hover:bg-accent/20 border-none text-[10px] md:text-xs" : "bg-muted text-muted-foreground border-none text-[10px] md:text-xs"}>
                          {pet.isAvailable ? "Available" : "Adopted"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 md:gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(pet.id, pet.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

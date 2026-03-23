"use client";

import { INITIAL_PETS } from "@/app/lib/mock-data";
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
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function AdminPets() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">Pet Inventory</h1>
          <p className="text-muted-foreground">Manage pet profiles, availability and descriptions.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg rounded-xl h-12 px-6">
          <Link href="/admin/pets/new" className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> Add New Pet
          </Link>
        </Button>
      </header>

      <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/10 flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Filter pets by name, breed, or species..." className="pl-10 h-10 bg-white" />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/5">
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Breed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INITIAL_PETS.map((pet) => (
                <TableRow key={pet.id} className="hover:bg-muted/5 transition-colors">
                  <TableCell>
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-border">
                      <Image 
                        src={pet.imageUrl} 
                        alt={pet.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-foreground">{pet.name}</TableCell>
                  <TableCell>{pet.species}</TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell>
                    <Badge variant={pet.status === "Available" ? "default" : "secondary"} className={pet.status === "Available" ? "bg-accent/20 text-accent hover:bg-accent/20 border-none" : "bg-muted text-muted-foreground border-none"}>
                      {pet.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

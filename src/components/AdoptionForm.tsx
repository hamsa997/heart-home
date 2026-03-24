"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useFirestore, addDocumentNonBlocking } from "@/firebase";
import { collection } from "firebase/firestore";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  adopterName: z.string().min(2, "Full name is required"),
  adopterEmail: z.string().email("Invalid email"),
  adopterPhone: z.string().min(10, "Phone is required"),
  adopterCity: z.string().min(2, "City is required"),
  address: z.string().min(5, "Address is required"),
  occupation: z.string().min(2, "Occupation is required"),
  existingPets: z.string().min(2, "Please state if you have pets"),
  reason: z.string().min(20, "Please tell the owner why you'd like to adopt (min 20 chars)"),
});

interface AdoptionFormProps {
  pet: {
    id: string;
    petName?: string;
    name?: string; // Fallback for inconsistency
    ownerEmail: string;
  };
}

export function AdoptionForm({ pet }: AdoptionFormProps) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const db = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adopterName: "",
      adopterEmail: "",
      adopterPhone: "",
      adopterCity: "",
      address: "",
      occupation: "",
      existingPets: "",
      reason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const requestData = {
        ...values,
        petId: pet.id,
        petName: pet.petName || pet.name || "Unknown Pet",
        ownerEmail: pet.ownerEmail || "unknown@example.com",
        submittedAt: new Date().toISOString(),
      };

      await addDocumentNonBlocking(collection(db, "adoptionRequests"), requestData);
      setSubmitted(true);
      toast({ title: "Request Sent!", description: "The owner will contact you if they think it's a match." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to send request. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold">Request Sent!</h3>
          <p className="text-muted-foreground max-w-xs mx-auto text-lg">
            The owner of {pet.petName || pet.name} has been notified. Keep an eye on your messages!
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[80vh] px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField control={form.control} name="adopterName" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Your Name</FormLabel>
                <FormControl><Input placeholder="Jane Doe" {...field} className="h-12 rounded-xl bg-muted/30" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="adopterEmail" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email</FormLabel>
                <FormControl><Input type="email" placeholder="jane@example.com" {...field} className="h-12 rounded-xl bg-muted/30" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField control={form.control} name="adopterPhone" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Phone</FormLabel>
                <FormControl><Input placeholder="(555) 123-4567" {...field} className="h-12 rounded-xl bg-muted/30" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="adopterCity" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">City</FormLabel>
                <FormControl><Input placeholder="Chicago, IL" {...field} className="h-12 rounded-xl bg-muted/30" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Full Address</FormLabel>
              <FormControl><Input placeholder="123 Maple St, Suite 4..." {...field} className="h-12 rounded-xl bg-muted/30" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="occupation" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Occupation</FormLabel>
              <FormControl><Input placeholder="Teacher, Engineer, etc." {...field} className="h-12 rounded-xl bg-muted/30" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="existingPets" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Do you have other pets?</FormLabel>
              <FormControl><Input placeholder="Yes, a small dog and a cat..." {...field} className="h-12 rounded-xl bg-muted/30" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="reason" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Why do you want to adopt?</FormLabel>
              <FormControl><Textarea placeholder="Tell the owner about your home and lifestyle..." {...field} className="min-h-[120px] rounded-[1.5rem] bg-muted/30 p-4" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 h-16 rounded-full font-bold text-lg shadow-xl shadow-primary/20"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /> Sending...</span>
            ) : (
              "Send Request"
            )}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
}

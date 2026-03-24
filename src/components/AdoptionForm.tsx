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

export function AdoptionForm({ pet }: { pet: any }) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
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
    const requestData = {
      ...values,
      petId: pet.id,
      petName: pet.petName,
      ownerEmail: pet.ownerEmail,
      submittedAt: new Date().toISOString(),
    };

    await addDocumentNonBlocking(collection(db, "adoptionRequests"), requestData);
    setSubmitted(true);
    toast({ title: "Request Sent!", description: "The owner will contact you if they think it's a match." });
  }

  if (submitted) {
    return (
      <div className="py-8 text-center space-y-4">
        <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
        <h3 className="text-2xl font-bold">Request Sent!</h3>
        <p className="text-muted-foreground">The owner has been notified of your interest. Keep an eye on your email or phone!</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="adopterName" render={({ field }) => (
            <FormItem><FormLabel>Your Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="adopterEmail" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="adopterPhone" render={({ field }) => (
            <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="(555) 123-4567" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="adopterCity" render={({ field }) => (
            <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Chicago, IL" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField control={form.control} name="address" render={({ field }) => (
          <FormItem><FormLabel>Full Address</FormLabel><FormControl><Input placeholder="123 Maple St..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="occupation" render={({ field }) => (
          <FormItem><FormLabel>Occupation</FormLabel><FormControl><Input placeholder="Teacher, Engineer, etc." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="existingPets" render={({ field }) => (
          <FormItem><FormLabel>Do you have other pets?</FormLabel><FormControl><Input placeholder="Yes, a small dog..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="reason" render={({ field }) => (
          <FormItem><FormLabel>Why do you want to adopt {pet.petName}?</FormLabel><FormControl><Textarea placeholder="Tell the owner about your home..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" className="w-full bg-primary h-12 rounded-full font-bold">Send Request</Button>
      </form>
    </Form>
  );
}
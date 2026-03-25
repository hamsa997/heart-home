"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth, useFirestore, useUser, addDocumentNonBlocking } from "@/firebase";
import { collection } from "firebase/firestore";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, PawPrint, User, Info } from "lucide-react";

const formSchema = z.object({
  ownerName: z.string().min(2, "Name is required"),
  ownerEmail: z.string().email("Invalid email"),
  ownerPhone: z.string().min(10, "Phone is required"),
  city: z.string().min(2, "City is required"),
  petName: z.string().min(2, "Pet name is required"),
  type: z.string().min(2, "Type is required (Dog, Cat, etc.)"),
  breed: z.string().min(2, "Breed is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(2, "Gender is required"),
  color: z.string().optional(),
  vaccinated: z.boolean().default(false),
  temperament: z.string().min(5, "Tell us about their personality"),
  reasonForRehoming: z.string().min(10, "Please explain the reason"),
  description: z.string().min(20, "Add more details for the adopter"),
  imageUrl: z.string().url("Valid image URL required").or(z.string().length(0)),
});

export default function PostPet() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) initiateAnonymousSignIn(auth);
  }, [user, isUserLoading, auth]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
      city: "",
      petName: "",
      type: "",
      breed: "",
      age: "",
      gender: "",
      color: "",
      vaccinated: false,
      temperament: "",
      reasonForRehoming: "",
      description: "",
      imageUrl: "",
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    setIsSubmitting(true);
    try {
      const petData = {
        ...values,
        imageUrl: values.imageUrl || `https://picsum.photos/seed/${Math.random()}/800/600`,
        status: "Available",
        createdAt: new Date().toISOString(),
        ownerUid: user.uid,
      };
      await addDocumentNonBlocking(collection(db, "pets"), petData);
      toast({ title: "Success!", description: "Your pet listing is now live!" });
      router.push("/pets");
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Failed to post listing." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Post a Pet Listing</h1>
          <p className="text-muted-foreground text-lg">Help your companion find a new loving home.</p>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
              <div className="bg-primary/5 p-6 border-b border-border flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">1. Owner Information</h3>
              </div>
              <CardContent className="p-8 grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="ownerName" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="ownerEmail" render={({ field }) => (
                  <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="john@example.com" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="ownerPhone" render={({ field }) => (
                  <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="(555) 000-0000" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Los Angeles, CA" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
              <div className="bg-primary/5 p-6 border-b border-border flex items-center gap-3">
                <PawPrint className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">2. Pet Information</h3>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="petName" render={({ field }) => (
                    <FormItem><FormLabel>Pet's Name</FormLabel><FormControl><Input placeholder="Buddy" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem><FormLabel>Type (Dog/Cat/etc.)</FormLabel><FormControl><Input placeholder="Dog" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="breed" render={({ field }) => (
                    <FormItem><FormLabel>Breed</FormLabel><FormControl><Input placeholder="Golden Retriever" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem><FormLabel>Age</FormLabel><FormControl><Input placeholder="2 years" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem><FormLabel>Gender</FormLabel><FormControl><Input placeholder="Male" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="color" render={({ field }) => (
                    <FormItem><FormLabel>Color (Optional)</FormLabel><FormControl><Input placeholder="Golden" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="vaccinated" render={({ field }) => (
                  <FormItem className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <FormLabel className="text-base">Is your pet vaccinated?</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
              <div className="bg-primary/5 p-6 border-b border-border flex items-center gap-3">
                <Info className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">3. Additional Details</h3>
              </div>
              <CardContent className="p-8 space-y-6">
                <FormField control={form.control} name="temperament" render={({ field }) => (
                  <FormItem><FormLabel>Temperament / Personality</FormLabel><FormControl><Textarea placeholder="Playful, quiet, good with kids..." {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="reasonForRehoming" render={({ field }) => (
                  <FormItem><FormLabel>Reason for Rehoming</FormLabel><FormControl><Textarea placeholder="Moving away, allergies, etc." {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Full Description</FormLabel><FormControl><Textarea placeholder="Tell more about your pet..." {...field} className="min-h-[150px] rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                  <FormItem><FormLabel>Image URL (Optional)</FormLabel><FormControl><Input placeholder="https://example.com/photo.jpg" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-full text-xl font-bold bg-primary shadow-xl">
              {isSubmitting ? <Loader2 className="animate-spin h-6 w-6" /> : "Publish Listing"}
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
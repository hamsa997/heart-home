"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth, useFirestore, useUser, addDocumentNonBlocking } from "@/firebase";
import { collection } from "firebase/firestore";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  message: z.string().min(20, "Please tell us more about your experience (min 20 chars)"),
});

interface AdoptionFormProps {
  pet: {
    id: string;
    name: string;
  };
  onSuccess?: () => void;
}

export function AdoptionForm({ pet, onSuccess }: AdoptionFormProps) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({
        title: "Please wait",
        description: "Connecting to secure services...",
        variant: "destructive",
      });
      return;
    }

    const applicationData = {
      petId: pet.id,
      applicantUid: user.uid,
      applicantName: values.fullName,
      applicantEmail: values.email,
      applicantPhone: values.phone,
      applicantAddress: values.address,
      message: values.message,
      status: "New",
      submissionDate: new Date().toISOString(),
      lastUpdatedStatusDate: new Date().toISOString(),
    };

    addDocumentNonBlocking(collection(db, "adoptionApplications"), applicationData);
    
    setSubmitted(true);
    toast({
      title: "Application Submitted!",
      description: "We've received your inquiry for " + pet.name + ". Our team will contact you soon.",
    });
    onSuccess?.();
  }

  if (submitted) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-10 w-10 text-accent" />
        </div>
        <h3 className="text-2xl font-bold font-headline">Thank you!</h3>
        <p className="text-muted-foreground">Your application for {pet.name} has been sent successfully. Check your email for further instructions.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        {isUserLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            Initializing secure application...
          </div>
        )}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className="rounded-xl h-12" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} className="rounded-xl h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 000-0000" {...field} className="rounded-xl h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Residential Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Heart Lane, Companion City" {...field} className="rounded-xl h-12" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell us about your home and experience</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us why you're a good match for this pet..." 
                  className="rounded-xl min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary h-12 rounded-xl text-lg font-bold" disabled={isUserLoading}>
          {isUserLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
          Submit Application
        </Button>
      </form>
    </Form>
  );
}

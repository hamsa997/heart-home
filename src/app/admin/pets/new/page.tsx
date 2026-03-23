"use client";

import { useState } from "react";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowLeft, Loader2, PawPrint, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { generatePetDescription } from "@/ai/flows/generate-pet-description";
import { generatePetImage } from "@/ai/flows/generate-pet-image";
import Image from "next/image";

const petFormSchema = z.object({
  name: z.string().min(2),
  species: z.enum(["dog", "cat"]),
  breed: z.string().optional(),
  age: z.string().min(1),
  gender: z.string().min(1),
  size: z.string().optional(),
  personalityTraits: z.string().describe("Comma separated traits"),
  likes: z.string().describe("Comma separated likes"),
  story: z.string().optional(),
  description: z.string().min(10),
  imageUrl: z.string().min(1, "A pet photo is required"),
});

export default function NewPetPage() {
  const { toast } = useToast();
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  
  const form = useForm<z.infer<typeof petFormSchema>>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: "",
      species: "dog",
      breed: "",
      age: "2 years",
      gender: "male",
      size: "medium",
      personalityTraits: "playful, loving, active",
      likes: "long walks, treats, belly rubs",
      story: "",
      description: "",
      imageUrl: "",
    },
  });

  const handleAiGenerateDesc = async () => {
    const values = form.getValues();
    if (!values.name || !values.species) {
      toast({
        title: "Missing Info",
        description: "Please enter at least a name and species for AI to generate a description.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingDesc(true);
    try {
      const result = await generatePetDescription({
        name: values.name,
        species: values.species,
        breed: values.breed,
        age: values.age,
        gender: values.gender,
        size: values.size,
        personalityTraits: values.personalityTraits.split(",").map(s => s.trim()),
        likes: values.likes.split(",").map(s => s.trim()),
        story: values.story,
      });
      
      form.setValue("description", result.description);
      toast({
        title: "AI Description Generated!",
        description: "Review and edit the generated description below.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "Something went wrong while using AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  const handleAiGenerateImg = async () => {
    const values = form.getValues();
    if (!values.species) {
      toast({
        title: "Missing Info",
        description: "Please select a species first.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingImg(true);
    try {
      const result = await generatePetImage({
        species: values.species,
        breed: values.breed,
        personalityTraits: values.personalityTraits.split(",").map(s => s.trim()),
      });
      
      form.setValue("imageUrl", result.imageUrl);
      toast({
        title: "AI Portrait Generated!",
        description: "A beautiful portrait has been created for your pet buddy.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "Image generation failed. Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const onSubmit = (values: z.infer<typeof petFormSchema>) => {
    console.log("Saving pet profile", values);
    toast({
      title: "Pet Profile Created!",
      description: `${values.name} has been added to the system.`,
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <header className="space-y-4">
        <Link href="/admin/pets" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to inventory
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl">
            <PawPrint className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Add New Pet Profile</h1>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="rounded-2xl border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Core Information</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pet Name</FormLabel>
                        <FormControl><Input placeholder="e.g. Buddy" {...field} className="rounded-xl h-11" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="species"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Species</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl h-11">
                              <SelectValue placeholder="Select species" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dog">Dog</SelectItem>
                            <SelectItem value="cat">Cat</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="breed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Breed (Optional)</FormLabel>
                        <FormControl><Input placeholder="e.g. Labrador Mix" {...field} className="rounded-xl h-11" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl><Input placeholder="e.g. 3 years or Kitten" {...field} className="rounded-xl h-11" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl h-11">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl h-11">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                            <SelectItem value="extra-large">Extra Large</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xl font-headline">Profile Content</CardTitle>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleAiGenerateDesc}
                    disabled={isGeneratingDesc}
                    className="flex items-center gap-2 border-accent text-accent hover:bg-accent/5 rounded-xl"
                  >
                    {isGeneratingDesc ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Generate Description
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="personalityTraits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personality Traits</FormLabel>
                          <FormControl><Input placeholder="Friendly, calm, brave..." {...field} className="rounded-xl h-11" /></FormControl>
                          <FormDescription>Separate by commas</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="likes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Likes</FormLabel>
                          <FormControl><Input placeholder="Toys, kids, runs..." {...field} className="rounded-xl h-11" /></FormControl>
                          <FormDescription>Separate by commas</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="story"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pet Story / Background (Optional)</FormLabel>
                        <FormControl><Textarea placeholder="Brief anecdote or how they came to the shelter..." className="rounded-xl min-h-[80px]" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Public Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Detailed profile text that adopters will see..." 
                            className="rounded-xl min-h-[250px] leading-relaxed text-base" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg font-headline">Pet Photo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative aspect-square rounded-2xl bg-muted/30 border-2 border-dashed border-border flex flex-col items-center justify-center overflow-hidden">
                    {form.watch("imageUrl") ? (
                      <Image 
                        src={form.watch("imageUrl")} 
                        alt="Preview" 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-center p-6 space-y-2">
                        <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto" />
                        <p className="text-xs text-muted-foreground">No photo yet. Generate one with AI!</p>
                      </div>
                    )}
                    {isGeneratingImg && (
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                        <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                        <p className="text-sm font-medium">Creating masterpiece...</p>
                      </div>
                    )}
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11 rounded-xl border-primary text-primary hover:bg-primary/5 flex items-center gap-2"
                    onClick={handleAiGenerateImg}
                    disabled={isGeneratingImg}
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate AI Portrait
                  </Button>
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl><Input type="hidden" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="sticky top-24 space-y-4">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-xl text-lg font-bold shadow-lg">
                  Publish Profile
                </Button>
                <Button asChild variant="outline" className="w-full h-12 rounded-xl">
                  <Link href="/admin/pets">Cancel</Link>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

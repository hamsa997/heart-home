"use client";

import { useState, useMemo } from "react";
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, ArrowLeft, Loader2, PawPrint, ImageIcon, Wand2, Link as LinkIcon, Info } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { generatePetDescription } from "@/ai/flows/generate-pet-description";
import { generatePetImage } from "@/ai/flows/generate-pet-image";
import Image from "next/image";
import { useFirestore, setDocumentNonBlocking } from "@/firebase";
import { doc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { getPetImageUrl } from "@/lib/utils";

const petFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  species: z.enum(["dog", "cat", "bird", "rabbit"]),
  breed: z.string().min(2, "Breed is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1),
  size: z.string().optional(),
  personalityTraits: z.string().optional(),
  likes: z.string().optional(),
  story: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().optional(),
  imageStyle: z.enum(["realistic", "cartoon", "artistic"]).default("cartoon"),
});

export default function NewPetPage() {
  const { toast } = useToast();
  const router = useRouter();
  const db = useFirestore();
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  
  const form = useForm<z.infer<typeof petFormSchema>>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: "",
      species: "dog",
      breed: "",
      age: "",
      gender: "male",
      size: "medium",
      personalityTraits: "",
      likes: "",
      story: "",
      description: "",
      imageUrl: "",
      imageStyle: "cartoon",
    },
  });

  const watchImageUrl = form.watch("imageUrl");
  const watchBreed = form.watch("breed");
  const watchSpecies = form.watch("species");
  const watchName = form.watch("name");

  const breedMatchedUrl = useMemo(() => {
    if (!watchBreed) return null;
    return getPetImageUrl(watchSpecies, watchBreed, watchName || 'preview');
  }, [watchSpecies, watchBreed, watchName]);

  const activePreviewUrl = watchImageUrl || breedMatchedUrl;

  const handleAiGenerateDesc = async () => {
    const values = form.getValues();
    if (!values.name || !values.breed) {
      toast({
        title: "Missing Info",
        description: "Please enter at least a name and breed for AI to generate a description.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingDesc(true);
    try {
      const result = await generatePetDescription({
        name: values.name,
        species: values.species === "dog" || values.species === "cat" ? values.species : "dog",
        breed: values.breed,
        age: values.age + " years",
        gender: values.gender,
        size: values.size,
        personalityTraits: values.personalityTraits?.split(",").map(s => s.trim()) || [],
        likes: values.likes?.split(",").map(s => s.trim()) || [],
        story: values.story,
      });
      
      form.setValue("description", result.description);
      toast({
        title: "AI Description Generated!",
        description: "Review and edit the generated description below.",
      });
    } catch (error) {
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
    if (!values.species || !values.breed) {
      toast({
        title: "Missing Info",
        description: "Please provide species and breed for the AI artist.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingImg(true);
    try {
      const result = await generatePetImage({
        species: values.species === "dog" || values.species === "cat" ? values.species : "dog",
        breed: values.breed,
        personalityTraits: values.personalityTraits?.split(",").map(s => s.trim()) || [],
        style: values.imageStyle,
      });
      
      form.setValue("imageUrl", result.imageUrl);
      toast({
        title: "AI Portrait Generated!",
        description: "A magical portrait has been created for your buddy.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Image generation failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const onSubmit = (values: z.infer<typeof petFormSchema>) => {
    const newPetRef = doc(collection(db, "pets"));
    const petData = {
      id: newPetRef.id,
      name: values.name,
      species: values.species.charAt(0).toUpperCase() + values.species.slice(1),
      breed: values.breed,
      ageInYears: parseInt(values.age) || 0,
      gender: values.gender,
      isAvailable: true,
      description: values.description,
      personalityTraits: values.personalityTraits?.split(",").map(s => s.trim()) || [],
      adoptionRequirements: values.likes?.split(",").map(s => s.trim()) || [],
      mainPhotoUrl: values.imageUrl || breedMatchedUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDocumentNonBlocking(newPetRef, petData, { merge: true });
    
    toast({
      title: "Pet Profile Created!",
      description: `${values.name} has been added to the database.`,
    });
    router.push("/admin/pets");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <header className="space-y-4">
        <Link href="/admin/pets" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to inventory
        </Link>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <PawPrint className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Add New Pet Profile</h1>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2rem] border-border shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/5 border-b border-border/50">
                  <CardTitle className="text-xl font-headline">Core Information</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6 p-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pet Name</FormLabel>
                        <FormControl><Input placeholder="e.g. Buddy" {...field} className="rounded-xl h-12" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="species"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl h-12">
                              <SelectValue placeholder="Select species" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dog">Dog</SelectItem>
                            <SelectItem value="cat">Cat</SelectItem>
                            <SelectItem value="bird">Bird</SelectItem>
                            <SelectItem value="rabbit">Rabbit</SelectItem>
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
                        <FormLabel>Breed</FormLabel>
                        <FormControl><Input placeholder="e.g. Labrador Mix" {...field} className="rounded-xl h-12" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age (Years)</FormLabel>
                        <FormControl><Input placeholder="e.g. 3" type="number" {...field} className="rounded-xl h-12" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-border shadow-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between bg-muted/5 border-b border-border/50">
                  <CardTitle className="text-xl font-headline">Profile Content</CardTitle>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleAiGenerateDesc}
                    disabled={isGeneratingDesc}
                    className="flex items-center gap-2 border-accent/30 text-accent hover:bg-accent/5 rounded-full px-6"
                  >
                    {isGeneratingDesc ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Magic Description
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pet Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Detailed profile text that adopters will see..." 
                            className="rounded-2xl min-h-[250px] leading-relaxed text-base p-6" 
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

            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2rem] border-border shadow-sm overflow-hidden sticky top-24">
                <CardHeader className="bg-muted/5 border-b border-border/50">
                  <CardTitle className="text-xl font-headline">Pet Portrait</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="relative aspect-square rounded-[2rem] bg-muted/30 border-2 border-dashed border-border flex flex-col items-center justify-center overflow-hidden transition-all hover:bg-muted/40 group">
                    {activePreviewUrl ? (
                      <>
                        <Image 
                          src={activePreviewUrl} 
                          alt="Preview" 
                          fill 
                          className="object-cover animate-in fade-in duration-1000"
                          unoptimized
                        />
                        {!watchImageUrl && (
                          <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md p-2 rounded-xl text-[10px] text-white flex items-center gap-2">
                            <Info className="h-3 w-3" />
                            Live breed preview active
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center p-6 space-y-4">
                        <div className="bg-background/50 p-4 rounded-full w-fit mx-auto shadow-sm">
                          <ImageIcon className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-foreground">No portrait yet</p>
                          <p className="text-xs text-muted-foreground">Type a breed to see preview!</p>
                        </div>
                      </div>
                    )}
                    {isGeneratingImg && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center space-y-4">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                        <div className="space-y-1">
                          <p className="font-headline font-bold text-lg">Creating Magic...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Tabs defaultValue="ai" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 rounded-xl h-12 bg-muted/50 p-1">
                      <TabsTrigger value="ai" className="rounded-lg">AI Artist</TabsTrigger>
                      <TabsTrigger value="manual" className="rounded-lg">Manual URL</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ai" className="pt-4 space-y-4">
                      <FormField
                        control={form.control}
                        name="imageStyle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-wider opacity-60">Artistic Style</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="rounded-xl h-11">
                                  <SelectValue placeholder="Select style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="cartoon">Charming Cartoon</SelectItem>
                                <SelectItem value="realistic">Natural Realistic</SelectItem>
                                <SelectItem value="artistic">Digital Painting</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="button" 
                        className="w-full h-12 rounded-xl bg-accent hover:bg-accent/90 text-white shadow-lg flex items-center justify-center gap-3 group transition-all"
                        onClick={handleAiGenerateImg}
                        disabled={isGeneratingImg}
                      >
                        <Wand2 className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                        Generate AI Portrait
                      </Button>
                    </TabsContent>
                    <TabsContent value="manual" className="pt-4 space-y-4">
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-wider opacity-60">Image Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="https://example.com/photo.jpg" {...field} className="pl-10 rounded-xl h-11" />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>

                  <div className="pt-6 border-t border-border space-y-4">
                    <Button type="submit" className="w-full h-14 rounded-full bg-primary text-white font-bold text-lg hover:opacity-90 shadow-xl shadow-primary/20">
                      Save Pet Details
                    </Button>
                    <Button asChild variant="ghost" className="w-full h-12 rounded-full">
                      <Link href="/admin/pets">Cancel</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

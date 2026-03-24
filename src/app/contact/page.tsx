"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground">
              Get in <span className="text-primary italic">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about adoption or our sanctuary? We're here to help you every step of the way.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <Card className="rounded-[2rem] border-border shadow-sm">
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Email Us</h3>
                      <p className="text-muted-foreground">hello@hearthome.org</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-xl text-accent">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Call Us</h3>
                      <p className="text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Visit Us</h3>
                      <p className="text-muted-foreground">123 Sanctuary Road<br/>Companion City, CP 12345</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-accent/5 p-8 rounded-[2rem] text-center space-y-4">
                <Heart className="h-10 w-10 text-accent mx-auto fill-current" />
                <p className="font-medium italic">"The greatness of a nation can be judged by the way its animals are treated."</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card className="rounded-[2.5rem] border-border shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Your Name</label>
                        <Input placeholder="John Doe" className="h-14 rounded-2xl bg-muted/30" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
                        <Input type="email" placeholder="john@example.com" className="h-14 rounded-2xl bg-muted/30" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Subject</label>
                      <Input placeholder="Inquiry about adoption" className="h-14 rounded-2xl bg-muted/30" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Message</label>
                      <Textarea placeholder="How can we help you?" className="min-h-[200px] rounded-[2rem] bg-muted/30 p-6" required />
                    </div>
                    <Button type="submit" size="lg" className="w-full md:w-auto h-16 px-12 rounded-full bg-primary hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20">
                      <Send className="mr-2 h-5 w-5" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">© 2024 HeartHome Adoption Sanctuary. We'd love to hear from you.</p>
        </div>
      </footer>
    </div>
  );
}

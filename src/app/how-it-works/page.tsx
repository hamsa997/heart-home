
"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Heart, Search, MessageSquare, Home, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Find Your Match",
      description: "Browse our curated list of pets looking for their forever homes. Use our filters to find the perfect personality fit for your lifestyle.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: MessageSquare,
      title: "Start a Conversation",
      description: "Found a buddy? Submit a simple application. Our dedicated team reviews every inquiry to ensure a safe and loving match.",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: ShieldCheck,
      title: "Meet & Greet",
      description: "Visit the sanctuary to spend quality time with your potential companion. We'll guide you through their needs and history.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Home,
      title: "Welcome Them Home",
      description: "Once the match is finalized, you'll receive a 'Homecoming Kit' and ongoing support to help your new family member settle in.",
      color: "bg-accent/10 text-accent"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-primary/5 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground">
              The Path to <span className="text-primary italic">Parenthood</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Adopting a pet is a journey of the heart. Here is how we help you find your forever companion, every step of the way.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-4 w-8 h-px bg-border z-0" />
                  )}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-border h-full flex flex-col items-center text-center space-y-6 hover:shadow-xl transition-all duration-300 relative z-10">
                    <div className={`${step.color} p-5 rounded-2xl group-hover:scale-110 transition-transform`}>
                      <step.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-headline font-bold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="bg-white py-24 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-accent font-semibold text-sm">
                  <Sparkles className="h-4 w-4" />
                  The HeartHome Difference
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                  We're with you <br/><span className="text-accent underline decoration-primary/30">long after</span> the first wag.
                </h2>
                <div className="space-y-6">
                  {[
                    "Lifetime behavioral support & guidance",
                    "A community of fellow pet parents",
                    "Discounts on vet-approved essentials",
                    "Health and vaccination tracking"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Heart className="h-4 w-4 text-primary fill-current" />
                      </div>
                      <span className="text-lg font-medium text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-14 px-8 text-lg">
                  <Link href="/pets">
                    Start Your Search <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://picsum.photos/seed/adoption-journey/800/1000" 
                    alt="Happy pet adoption"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-current" />
            <span className="text-xl font-headline font-bold text-primary tracking-tight">HeartHome</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 HeartHome Adoption Sanctuary. Every soul deserves a home.</p>
        </div>
      </footer>
    </div>
  );
}

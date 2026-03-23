
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Home as HomeIcon, Star, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const testimonials = [
    {
      text: "Luna didn't just join our family; she completed it. Every purr is a reminder of the love we found at HeartHome.",
      author: "Sarah & Mark",
      role: "Adopted Luna in 2023"
    },
    {
      text: "Finding Cooper was the best thing that happened to us. HeartHome made the journey so special and personal.",
      author: "The Rodriguez Family",
      role: "Adopted Cooper in 2024"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-background pt-12 md:pt-20 pb-24 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 md:space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold text-sm">
                <Heart className="h-4 w-4 fill-primary" />
                Find the missing piece of your heart
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-foreground leading-[1.1] tracking-tight">
                Because Every Wag is a <span className="text-primary italic">Promise</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                At HeartHome, we believe no soul should walk alone. We connect gentle paws with loving hearts, creating forever stories that begin with a single click.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-14 md:h-16 px-8 md:px-10 rounded-full shadow-2xl shadow-primary/30 transition-all hover:scale-105">
                  <Link href="/pets" className="flex items-center gap-2">
                    Meet Your Forever Buddy
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 text-lg h-14 md:h-16 px-8 md:px-10 rounded-full hover:bg-primary/5">
                  <Link href="/how-it-works">The Journey</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] -z-10 opacity-50"></div>
              <div className="rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-4 md:border-[12px] border-white md:rotate-2 hover:rotate-0 transition-transform duration-700">
                <Image 
                  src="https://picsum.photos/seed/heart-dog/800/1000"
                  alt="A girl hugging her newly adopted dog"
                  width={800}
                  height={1000}
                  className="object-cover h-[400px] md:h-[600px] w-full"
                  priority
                  data-ai-hint="happy pet"
                />
              </div>
              {/* Floating Badge - Hidden on small mobile, adjusted positioning */}
              <div className="hidden sm:flex absolute -bottom-8 -left-8 md:-bottom-10 md:-left-10 bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl items-center gap-3 md:gap-5 border border-primary/10">
                <div className="bg-accent/30 p-2 md:p-4 rounded-xl md:rounded-2xl">
                  <Star className="h-5 w-5 md:h-8 md:w-8 text-accent fill-current" />
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-bold font-headline text-foreground">2,500+</div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Happy Tails Found</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 md:space-y-20">
          <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground">Why HeartHome?</h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">We don't just facilitate adoptions; we nurture connections that last a lifetime.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="group p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-background border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl">
              <div className="bg-primary/10 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 mx-auto group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-headline font-bold mb-4">A Match of Souls</h3>
              <p className="text-muted-foreground leading-relaxed">Our AI-assisted matching doesn't just look at size and age; it looks at personalities and lifestyles.</p>
            </div>
            
            <div className="group p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-background border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl">
              <div className="bg-accent/10 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 mx-auto group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 md:h-10 md:w-10 text-accent fill-current" />
              </div>
              <h3 className="text-xl md:text-2xl font-headline font-bold mb-4">Vetted with Love</h3>
              <p className="text-muted-foreground leading-relaxed">Every shelter in our family is hand-picked for their dedication to animal well-being and happiness.</p>
            </div>
            
            <div className="group p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-background border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl">
              <div className="bg-primary/10 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 mx-auto group-hover:scale-110 transition-transform">
                <HomeIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-headline font-bold mb-4">Forever Support</h3>
              <p className="text-muted-foreground leading-relaxed">Your journey doesn't end at adoption. We provide guidance and community for the life of your pet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Heartfelt Quotes Section */}
      <section className="py-20 md:py-32 bg-primary/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <Heart className="absolute -top-10 -left-10 h-32 w-32 md:h-64 md:w-64 text-primary" />
          <Heart className="absolute -bottom-10 -right-10 h-32 w-32 md:h-64 md:w-64 text-accent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">Heartfelt Stories</h2>
            <p className="text-muted-foreground mt-4 italic">The moments that make it all worthwhile.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-primary/5 flex flex-col items-center text-center space-y-4 md:space-y-6 relative group hover:scale-[1.02] transition-transform">
                <Quote className="h-8 w-8 md:h-12 md:w-12 text-accent/30 absolute top-6 left-6 md:top-8 md:left-8" />
                <p className="text-lg md:text-xl text-foreground font-medium italic leading-relaxed pt-4 md:pt-6">
                  "{t.text}"
                </p>
                <div className="space-y-1">
                  <h4 className="font-headline font-bold text-primary text-lg">{t.author}</h4>
                  <p className="text-sm text-muted-foreground font-medium">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12 md:py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 group cursor-pointer">
            <Heart className="h-8 w-8 text-primary fill-current group-hover:scale-125 transition-transform" />
            <span className="text-2xl font-headline font-bold text-primary tracking-tight">HeartHome</span>
          </div>
          <p className="text-muted-foreground font-medium italic">Building families, one paw at a time.</p>
          <div className="h-px w-20 bg-primary/20 mx-auto"></div>
          <p className="text-sm text-muted-foreground">© 2024 HeartHome Adoption Sanctuary. Made with love.</p>
        </div>
      </footer>
    </div>
  );
}

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Home as HomeIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[#fffaf9] pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold text-sm animate-bounce-slow">
                <Heart className="h-4 w-4 fill-primary" />
                Find the missing piece of your heart
              </div>
              <h1 className="text-6xl lg:text-7xl font-headline font-bold text-foreground leading-[1.05] tracking-tight">
                Because Every Wag is a <span className="text-primary italic">Promise</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                At HeartHome, we believe no soul should walk alone. We connect gentle paws with loving hearts, creating forever stories that begin with a single click.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-16 px-10 rounded-full shadow-2xl shadow-primary/30 transition-all hover:scale-105">
                  <Link href="/pets" className="flex items-center gap-2">
                    Meet Your Forever Buddy
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 text-lg h-16 px-10 rounded-full hover:bg-primary/5">
                  <Link href="/how-it-works">Our Mission</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] -z-10 opacity-50"></div>
              <div className="rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-[12px] border-white rotate-2 hover:rotate-0 transition-transform duration-700">
                <Image 
                  src="https://picsum.photos/seed/heart-dog/800/1000"
                  alt="A girl hugging her newly adopted dog"
                  width={800}
                  height={1000}
                  className="object-cover h-[600px] w-full"
                  priority
                  data-ai-hint="happy pet"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl flex items-center gap-5 border border-primary/10">
                <div className="bg-accent/30 p-4 rounded-2xl">
                  <Star className="h-8 w-8 text-accent fill-current" />
                </div>
                <div>
                  <div className="text-3xl font-bold font-headline text-foreground">2,500+</div>
                  <div className="text-sm text-muted-foreground font-medium">Happy Tails Found</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-20">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-headline font-bold text-foreground">Why HeartHome?</h2>
            <p className="text-muted-foreground text-xl leading-relaxed">We don't just facilitate adoptions; we nurture connections that last a lifetime.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group p-12 rounded-[3rem] bg-[#fffaf9] border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl">
              <div className="bg-primary/10 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">A Match of Souls</h3>
              <p className="text-muted-foreground leading-relaxed">Our AI-assisted matching doesn't just look at size and age; it looks at personalities and lifestyles.</p>
            </div>
            
            <div className="group p-12 rounded-[3rem] bg-[#fffaf9] border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl">
              <div className="bg-accent/10 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                <Heart className="h-10 w-10 text-accent fill-current" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Vetted with Love</h3>
              <p className="text-muted-foreground leading-relaxed">Every shelter in our family is hand-picked for their dedication to animal well-being and happiness.</p>
            </div>
            
            <div className="group p-12 rounded-[3rem] bg-[#fffaf9] border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl">
              <div className="bg-primary/10 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                <HomeIcon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Forever Support</h3>
              <p className="text-muted-foreground leading-relaxed">Your journey doesn't end at adoption. We provide guidance and community for the life of your pet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-16 mt-auto">
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

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Home as HomeIcon, Star, Quote, ArrowRight, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { INITIAL_PETS } from "@/app/lib/mock-data";
import { getPetImageUrl } from "@/lib/utils";

export default function Home() {
  const testimonials = [
    {
      text: "Luna didn't just join our family; she completed it. Every purr is a reminder of the love we found at HeartHome.",
      author: "Sarah & Mark",
      role: "Adopted Luna in 2023",
      avatar: "https://picsum.photos/seed/avatar1/100/100"
    },
    {
      text: "Finding Cooper was the best thing that happened to us. HeartHome made the journey so special and personal.",
      author: "The Rodriguez Family",
      role: "Adopted Cooper in 2024",
      avatar: "https://picsum.photos/seed/avatar2/100/100"
    }
  ];

  const recentPets = INITIAL_PETS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-background pt-12 md:pt-20 pb-24 md:pb-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 md:space-y-8 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold text-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
                <Heart className="h-4 w-4 fill-primary" />
                Find the missing piece of your heart
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-foreground leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Because Every Wag is a <span className="text-primary italic">Promise</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                At HeartHome, we believe no soul should walk alone. We connect gentle paws with loving hearts, creating forever stories that begin with a single click.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-14 md:h-16 px-8 md:px-10 rounded-full shadow-2xl shadow-primary/30 transition-all hover:scale-105">
                  <Link href="/pets" className="flex items-center gap-2">
                    Meet Your Forever Buddy <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 text-lg h-14 md:h-16 px-8 md:px-10 rounded-full hover:bg-primary/5 bg-white/50 backdrop-blur-sm">
                  <Link href="/how-it-works">The Journey</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0 group">
              <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] -z-10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-4 md:border-[12px] border-white md:rotate-2 group-hover:rotate-0 transition-all duration-700">
                <Image 
                  src="https://picsum.photos/seed/happy-dog-hero/800/1000"
                  alt="A happy dog ready for its forever home"
                  width={800}
                  height={1000}
                  className="object-cover h-[450px] md:h-[650px] w-full"
                  priority
                  data-ai-hint="happy dog"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Floating Impact Badge */}
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex flex-col items-center gap-1 border border-primary/10 animate-bounce duration-[3000ms]">
                <div className="bg-accent/10 p-3 rounded-xl">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div className="text-xl md:text-2xl font-bold font-headline text-foreground">1.2k+</div>
                <div className="text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-wider">Volunteers</div>
              </div>

              <div className="hidden sm:flex absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl items-center gap-3 md:gap-5 border border-primary/10">
                <div className="bg-primary/10 p-2 md:p-4 rounded-xl md:rounded-2xl">
                  <Star className="h-5 w-5 md:h-8 md:w-8 text-primary fill-current" />
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
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground">A Different Kind of Sanctuary</h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">We don't just facilitate adoptions; we nurture connections that last a lifetime.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: Sparkles, title: "A Match of Souls", desc: "Our AI-assisted matching doesn't just look at size and age; it looks at personalities and lifestyles.", color: "bg-primary/10 text-primary" },
              { icon: Heart, title: "Vetted with Love", desc: "Every shelter in our family is hand-picked for their dedication to animal well-being and happiness.", color: "bg-accent/10 text-accent", fill: true },
              { icon: ShieldCheck, title: "Forever Support", desc: "Your journey doesn't end at adoption. We provide guidance and community for the life of your pet.", color: "bg-primary/10 text-primary" }
            ].map((feature, i) => (
              <div key={i} className="group p-8 md:p-12 rounded-[2.5rem] bg-background border border-border/50 hover:border-primary/20 transition-all hover:shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                <div className={`${feature.color} w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-6 md:mb-8 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  <feature.icon className={`h-8 w-8 md:h-10 md:w-10 ${feature.fill ? 'fill-current' : ''}`} />
                </div>
                <h3 className="text-xl md:text-2xl font-headline font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pets Grid */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-headline font-bold">New Arrivals</h2>
              <p className="text-muted-foreground text-lg max-w-xl">These gentle souls just arrived at the sanctuary and are ready to start their next chapter.</p>
            </div>
            <Button asChild variant="ghost" className="text-primary font-bold text-lg hover:bg-primary/10 px-6 rounded-full group">
              <Link href="/pets" className="flex items-center gap-2">
                View All Pets <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {recentPets.map((pet) => (
              <Link href={`/pets/${pet.id}`} key={pet.id} className="group">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg border border-white">
                  <Image 
                    src={getPetImageUrl(pet.species, pet.breed)}
                    alt={pet.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    data-ai-hint={`cartoon ${pet.species.toLowerCase()}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full text-white space-y-1">
                    <p className="text-xs md:text-sm font-bold uppercase tracking-wider opacity-80">{pet.breed}</p>
                    <h4 className="text-xl md:text-2xl font-headline font-bold">{pet.name}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Heartfelt Quotes Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-block bg-accent/10 px-4 py-2 rounded-full text-accent font-bold text-sm mb-4">Love Stories</div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground">Letters from Home</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-background/40 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] border border-border/50 flex flex-col space-y-8 relative group hover:bg-white transition-all hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20">
                    <Image src={t.avatar} alt={t.author} width={100} height={100} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-foreground text-xl leading-none">{t.author}</h4>
                    <p className="text-sm text-primary font-medium mt-1">{t.role}</p>
                  </div>
                  <Quote className="h-10 w-10 text-primary/10 ml-auto group-hover:text-primary/20 transition-colors" />
                </div>
                <p className="text-xl md:text-2xl text-foreground font-medium italic leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                  "{t.text}"
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 text-accent fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12 md:py-20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
          <div className="flex items-center justify-center gap-2 group cursor-pointer">
            <div className="bg-primary p-2 rounded-xl group-hover:scale-125 transition-transform shadow-lg shadow-primary/20">
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <span className="text-3xl font-headline font-bold text-primary tracking-tight">HeartHome</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/pets" className="hover:text-primary transition-colors">Browse Pets</Link>
            <Link href="/how-it-works" className="hover:text-primary transition-colors">Our Process</Link>
            <Link href="/admin/dashboard" className="hover:text-primary transition-colors">Admin Portal</Link>
            <Link href="#" className="hover:text-primary transition-colors">Volunteer</Link>
            <Link href="#" className="hover:text-primary transition-colors">Donate</Link>
          </div>

          <div className="h-px w-24 bg-border mx-auto"></div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground font-medium italic">Building families, one paw at a time.</p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">© 2024 HeartHome Adoption Sanctuary. Made with love.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

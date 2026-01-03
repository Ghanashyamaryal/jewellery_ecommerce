import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BrandStory() {
  return (
    <section className="py-8 md:py-12 xl:py-16 bg-muted/50">
      <div className="w-full max-w-390 mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/homeimage.jpg"
                alt="Nepali artisan crafting silver jewelry"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
              Our Heritage
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
              Crafted with Passion,
              <br />
              <span className="italic font-light">Rooted in Tradition</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                For generations, the Aryal family has been at the heart of
                Nepali silversmithing. Our journey began in the ancient streets
                of Patan, where master artisans shaped precious metals into
                works of art.
              </p>
              <p>
                Every piece of jewelry at Aryal Sirin Gems carries the essence
                of this rich heritage. We use only 925 Sterling Silver,
                certified for purity, and source our gemstones ethically from
                the Himalayan region and beyond.
              </p>
              <p>
                Our commitment to quality is unwavering—each creation undergoes
                rigorous inspection before reaching your hands, accompanied by a
                certificate of authenticity.
              </p>
            </div>
            <div className="flex flex-wrap gap-8 py-4">
              <div className="text-center">
                <p className="text-3xl font-serif text-foreground">925</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                  Certified Silver
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-serif text-foreground">15+</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                  Years Heritage
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-serif text-foreground">10K+</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                  Happy Clients
                </p>
              </div>
            </div>
            <Button
              asChild
              variant="default"
              size="lg"
              className="tracking-widest uppercase text-sm"
            >
              <Link href="/about">
                Discover Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

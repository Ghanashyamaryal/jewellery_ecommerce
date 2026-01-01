import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Crafted with Heritage
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            For generations, the Aryal family has been dedicated to preserving
            the ancient art of Nepali silversmithing.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=1000&fit=crop&q=80"
                alt="Master artisan at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif">Our Heritage</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The story of Aryal Sirin Gems begins in the ancient city of
                  Patan, known worldwide for its master metalworkers. For over
                  five decades, our family has dedicated itself to the art of
                  creating exquisite silver jewelry and preserving traditional
                  Nepali craftsmanship.
                </p>
                <p>
                  What started as a small workshop has grown into a respected
                  name in Nepali jewelry, but our values remain unchanged:
                  quality, authenticity, and respect for our craft.
                </p>
                <p>
                  Every piece that leaves our workshop carries with it centuries
                  of tradition, the skill of our master artisans, and the
                  promise of authenticity that defines the Aryal name.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-serif text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Authenticity",
                desc: "Every piece is made from 925 certified sterling silver with genuine, ethically sourced gemstones.",
              },
              {
                title: "Craftsmanship",
                desc: "Our master artisans use traditional techniques passed down through generations of Nepali silversmiths.",
              },
              {
                title: "Sustainability",
                desc: "We source our materials responsibly and support local mining communities in Nepal.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="text-xl font-serif mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-serif mb-6">Experience Our Craft</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Discover our collection of handcrafted jewelry or create something
            uniquely yours with our bespoke service.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild>
              <Link href="/shop">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/bespoke">Custom Design</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

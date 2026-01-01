import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "Signature Rings",
    description: "Handcrafted statement pieces",
    href: "/shop/jewelry/rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop&q=80",
  },
  {
    name: "Statement Necklaces",
    description: "Timeless elegance",
    href: "/shop/jewelry/necklaces",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop&q=80",
  },
  {
    name: "Rare Gemstones",
    description: "Nature's treasures",
    href: "/shop/gemstones",
    image:
      "https://images.unsplash.com/photo-1551122087-f99a4ade0164?w=600&h=800&fit=crop&q=80",
  },
  {
    name: "Silver Lifestyle",
    description: "Pooja items & décor",
    href: "/shop/lifestyle",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=800&fit=crop&q=80",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-8 md:py-12 xl:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Curated Collections
          </p>
          <h2 className="text-3xl md:text-4xl font-serif">
            Explore Our Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group relative aspect-[3/4] overflow-hidden bg-muted animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-primary-foreground">
                <h3 className="text-xl font-serif mb-1">{collection.name}</h3>
                <p className="text-sm text-primary-foreground/70 mb-4">
                  {collection.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

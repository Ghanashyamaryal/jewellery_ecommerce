import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TILES = [
  {
    title: "Deity Idols & Buddha Statues",
    description: "Silver Ganesh, Laxmi, Buddha and more for your altar",
    href: "/shop/idols-statues",
    image: "/images/home/spiritual-idols.jpg",
  },
  {
    title: "Pooja & Silver Home Decor",
    description: "Thali, diyas, kalash, singing bowls and silver utensils",
    href: "/shop/home-decor",
    image: "/images/home/spiritual-pooja.jpg",
  },
];

export function SpiritualSpotlight() {
  return (
    <section className="py-8 md:py-12 xl:py-16 bg-muted/30">
      <div className="w-full max-w-390 mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Spiritual & Home
          </p>
          <h2 className="text-3xl md:text-4xl font-serif">Sacred Silver for Your Home</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TILES.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className="group relative aspect-4/3 overflow-hidden bg-muted"
            >
              <img
                src={tile.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                <h3 className="text-2xl font-serif mb-1">{tile.title}</h3>
                <p className="text-sm text-white/80 mb-4">{tile.description}</p>
                <span className="inline-flex items-center gap-2 text-sm tracking-widest uppercase">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

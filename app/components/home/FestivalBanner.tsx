import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCollectionProducts, getSeasonalCollection } from "@/lib/catalog";

export function FestivalBanner() {
  const collection = getSeasonalCollection("gifts-under-5000");
  if (!collection) return null;
  const products = getCollectionProducts(collection);
  const image = collection.image ?? products[0]?.images[0];

  return (
    <section className="py-8 md:py-12 xl:py-16 bg-background">
      <div className="w-full max-w-390 mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-[70vh] md:min-h-96 bg-foreground text-background overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-6">
            <p className="text-sm tracking-[0.3em] uppercase text-background/70">
              {collection.endsAt ? "Limited Time" : "Gifting Made Easy"}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif">{collection.name}</h2>
            <p className="text-background/70 max-w-md">{collection.description}</p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-fit tracking-widest uppercase text-sm"
            >
              <Link href={`/collections/${collection.slug}`}>
                Shop {products.length} {products.length === 1 ? "piece" : "pieces"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {image && (
            <div className="relative aspect-4/3 md:aspect-auto">
              <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

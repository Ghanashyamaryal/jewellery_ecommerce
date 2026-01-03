import { products } from "@/data/products";
import { ArrowRight, Instagram } from "lucide-react";
import { ProductCard } from "../common/ProductCard";
import { Button } from "../ui/button";
import Link from "next/link";

const instagramPosts = [
  {
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop&q=80",
    href: "#",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&q=80",
    href: "#",
  },
  {
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop&q=80",
    href: "#",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&q=80",
    href: "#",
  },
  {
    image:
      "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=400&h=400&fit=crop&q=80",
    href: "#",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&h=400&fit=crop&q=80",
    href: "#",
  },
];

export function FeaturedProduct() {
  return (
    <section className="py-8 md:py-12 xl:py-16 bg-muted/30">
      <div className="w-full max-w-390 mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground">Discover top-rated products</p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}

        <div className="text-center mt-8">
          <Button
            asChild
            size="lg"
            className="min-w-[200px] tracking-widest uppercase text-sm"
          >
            <Link href="/shop" className="flex items-center">
              All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

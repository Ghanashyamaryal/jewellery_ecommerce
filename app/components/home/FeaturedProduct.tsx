import { getBestsellers, getNewArrivals } from "@/lib/catalog";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ProductTabs } from "./ProductTabs";

export function FeaturedProduct() {
  return (
    <section className="py-8 md:py-12 xl:py-16 bg-muted/30">
      <div className="w-full max-w-390 mx-auto px-4 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Shop the Favourites
          </p>
          <h2 className="text-3xl md:text-4xl font-serif">Loved by Our Customers</h2>
        </div>

        <ProductTabs
          defaultValue="new"
          tabs={[
            { value: "bestsellers", label: "Best Sellers", products: getBestsellers(10) },
            { value: "new", label: "New Arrivals", products: getNewArrivals(10) },
          ]}
        />

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="min-w-50 tracking-widest uppercase text-sm"
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

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/common/ProductCard";

export function RelatedProducts({ products }: { products: any[] }) {
  if (products.length === 0) return null;

  return (
    <div className="bg-muted/50 py-16  rounded-xl">
      <div className="w-full max-w-380 px-4 lg:px-8">
        <h2 className="text-3xl font-serif text-center mb-12">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

import type { Product } from "@/types/catalog";
import { getUnitPrice } from "@/lib/pricing";

export function getProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    image: product.images,
    brand: { "@type": "Brand", name: "Aryal Siring Gems" },
    material: product.metal.slug !== "none" ? product.metal.name : undefined,
    category: product.subcategory?.name ?? product.category.name,
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: getUnitPrice(product),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(product.ratings.count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.ratings.average,
        reviewCount: product.ratings.count,
      },
    }),
  };
}

import type { Product } from "@/types/catalog";
import { getStrikePrice, getUnitPrice } from "@/lib/pricing";

export interface RecentlyViewedItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  strikePrice?: number;
}

export const RECENTLY_VIEWED_KEY = "recentlyViewed";
export const RECENTLY_VIEWED_LIMIT = 8;

export function toRecentlyViewedItem(product: Product): RecentlyViewedItem {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0],
    price: getUnitPrice(product),
    strikePrice: getStrikePrice(product),
  };
}

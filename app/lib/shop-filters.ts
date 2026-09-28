import type { ShopFilters } from "@/types/catalog";

export const getActiveAttributeFilters = (attrs: ShopFilters["attributes"]) =>
  Object.entries(attrs).filter(([, value]) => value && value !== "all");

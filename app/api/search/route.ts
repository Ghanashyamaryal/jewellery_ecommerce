import { NextResponse } from "next/server";
import { getCategoryHref } from "@/lib/catalog";
import { searchCatalog } from "@/lib/search";

// GET /api/search?q=amethese&limit=5
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").slice(0, 100);
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);

  const result = searchCatalog(query, { limit });

  return NextResponse.json({
    query: result.query,
    total: result.total,
    stones: result.stones.map(({ id, slug, name, colorHex }) => ({ id, slug, name, colorHex })),
    categories: result.categories.map((c) => ({ id: c.id, slug: c.slug, name: c.name, href: getCategoryHref(c) })),
    products: result.products.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      price: p.price,
      image: p.images[0],
      category: p.subcategory?.name ?? p.category.name,
    })),
  });
}

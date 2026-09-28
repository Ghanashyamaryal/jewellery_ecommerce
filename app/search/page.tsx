import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { getCategoryHref, getShopFilterOptions, getStones } from "@/lib/catalog";
import { searchCatalog } from "@/lib/search";
import { ShopContent } from "../shop/ShopContent";
import { ShopHeader } from "../shop/_components/ShopHeader";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const POPULAR_STONES = ["amethyst", "turquoise", "amber", "coral", "lapis-lazuli", "garnet", "moonstone", "rudraksha"];
const POPULAR_SEARCHES = ["silver ring", "mens bracelet", "mala", "buddha statue", "pooja items", "earrings"];

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const q = (await searchParams).q;
  return { title: q ? `Search: ${q}` : "Search" };
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw ?? "").trim();
  const result = searchCatalog(query);

  const chips = [
    ...result.stones.map((s) => ({ name: `${s.name} — all items`, href: `/shop?stone=${s.slug}` })),
    ...result.categories.map((c) => ({ name: c.name, href: getCategoryHref(c) })),
  ];

  const popularStones = getStones().filter((s) => POPULAR_STONES.includes(s.slug));

  return (
    <Layout>
      <ShopHeader
        eyebrow="Search"
        title={query ? `Results for “${query}”` : "Search our collection"}
        description={
          query
            ? `${result.total} ${result.total === 1 ? "product" : "products"} found`
            : "Search by stone, product type, metal or occasion — e.g. amethyst ring, turquoise necklace, silver idol."
        }
        chips={chips}
      />

      {result.total > 0 ? (
        <ShopContent
          key={query}
          products={result.products}
          options={getShopFilterOptions(result.products)}
          sortByRelevance
        />
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
            {query && (
              <p className="text-muted-foreground mb-10">
                We couldn&apos;t find anything for “{query}”. Try a different spelling or one of these:
              </p>
            )}
            <h2 className="text-sm tracking-widest uppercase mb-4">Shop by Stone</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {popularStones.map((stone) => (
                <Link
                  key={stone.id}
                  href={`/shop?stone=${stone.slug}`}
                  className="flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground transition-colors text-sm"
                >
                  <span
                    className="h-3 w-3 rounded-full border border-border"
                    style={{ backgroundColor: stone.colorHex }}
                  />
                  {stone.name}
                </Link>
              ))}
            </div>
            <h2 className="text-sm tracking-widest uppercase mb-4">Popular Searches</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {POPULAR_SEARCHES.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-4 py-2 bg-muted hover:bg-muted/70 transition-colors text-sm"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { useTypewriter } from "@/hooks/use-typewriter";

interface Suggestions {
  total: number;
  stones: { id: string; slug: string; name: string; colorHex: string }[];
  categories: { id: string; name: string; href: string }[];
  products: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    category: string;
  }[];
}

const MIN_QUERY = 2;

export function HeaderSearch({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestions | null>(null);
  const [loading, setLoading] = useState(false);

  const animatedPlaceholder = useTypewriter([
    "amethyst rings",
    "turquoise necklaces",
    "silver pendants",
    "rudraksha mala",
    "buddha statues",
    "pooja items",
  ]);

  // Debounced live suggestions
  useEffect(() => {
    const q = query.trim();
    if (q.length < MIN_QUERY) {
      setResults(null);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=5`, {
          signal: controller.signal,
        });
        if (res.ok) setResults(await res.json());
      } catch {
        // aborted or offline — keep the previous suggestions
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 200);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    onClose();
  };

  const showDropdown = query.trim().length >= MIN_QUERY && results;

  return (
    <div className="py-4 border-t border-border animate-fade-in">
      <form onSubmit={handleSubmit} role="search" className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search for ${animatedPlaceholder}|`}
          aria-label="Search products"
          className="w-full pl-12 pr-12 py-3 bg-muted border-0 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          autoFocus
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-1" />}
          <Button type="button" variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close search</span>
          </Button>
        </div>
      </form>

      {showDropdown && (
        <div className="mt-2 border border-border bg-background shadow-lg max-h-[70vh] overflow-y-auto">
          {(results.stones.length > 0 || results.categories.length > 0) && (
            <div className="flex flex-wrap gap-2 p-4 border-b border-border">
              {results.stones.map((stone) => (
                <Link
                  key={stone.id}
                  href={`/shop?stone=${stone.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-1 text-xs border border-border hover:border-foreground transition-colors"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full border border-border"
                    style={{ backgroundColor: stone.colorHex }}
                  />
                  {stone.name}
                </Link>
              ))}
              {results.categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  onClick={onClose}
                  className="px-3 py-1 text-xs bg-muted hover:bg-muted/70 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          {results.products.length > 0 ? (
            <ul>
              {results.products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="h-12 w-12 object-cover bg-muted shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-serif line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <p className="text-sm whitespace-nowrap">
                      NPR {product.price.toLocaleString()}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-sm text-muted-foreground text-center">
              No products match “{query.trim()}”
            </p>
          )}

          {results.total > 0 && (
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs tracking-widest uppercase border-t border-border hover:bg-muted transition-colors"
            >
              View all {results.total} results
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

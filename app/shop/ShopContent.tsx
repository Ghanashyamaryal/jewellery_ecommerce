"use client";

import { useMemo, useRef, useState } from "react";
import { Filter } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  Product,
  ShopFilterOptions,
  ShopFilters,
} from "@/types/catalog";
import { usePagination } from "@/hooks/use-pagination";
import { getActiveAttributeFilters } from "@/lib/shop-filters";
import { ShopPagination } from "./_components/ShopPagination";

const PAGE_SIZE = 20;

const baseSortOptions = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
];

const toKebab = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

interface ShopContentProps {
  products: Product[];
  options: ShopFilterOptions;
  initialFilters?: Partial<Omit<ShopFilters, "priceRange">>;
  initialSort?: string;
  /** Adds a "Best Match" sort that keeps the incoming (search-ranked) order */
  sortByRelevance?: boolean;
}

export function ShopContent({
  products,
  options,
  initialFilters,
  initialSort,
  sortByRelevance = false,
}: ShopContentProps) {
  const sortOptions = sortByRelevance
    ? [{ label: "Best Match", value: "relevance" }, ...baseSortOptions]
    : baseSortOptions;

  const defaultFilters: ShopFilters = {
    category: "all",
    metalType: "all",
    stoneType: "all",
    gender: "all",
    occasion: "all",
    attributes: {},
    priceRange: [0, options.maxPrice],
  };

  const [sortBy, setSortBy] = useState(
    sortOptions.some((o) => o.value === initialSort)
      ? initialSort!
      : sortOptions[0].value
  );
  const [filters, setFilters] = useState<ShopFilters>({
    ...defaultFilters,
    ...initialFilters,
  });

  const handleFilterChange = <K extends keyof ShopFilters>(
    key: K,
    value: ShopFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleAttributeChange = (key: string, value: string) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      attributes: { ...prev.attributes, [key]: value },
    }));
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter (top-level or subcategory slug)
    if (filters.category !== "all") {
      result = result.filter(
        (p) =>
          p.category.slug === filters.category ||
          p.subcategory?.slug === filters.category
      );
    }

    // Any metal on the piece counts (e.g. silver clasp on a bead necklace)
    if (filters.metalType !== "all") {
      result = result.filter((p) =>
        p.metals.some((m) => m.metal.slug === filters.metalType)
      );
    }

    // A product can carry several stones; match any of them
    if (filters.stoneType !== "all") {
      result = result.filter((p) =>
        filters.stoneType === "no-stone"
          ? p.stones.length === 0
          : p.stones.some((s) => s.stone.slug === filters.stoneType)
      );
    }

    // Unisex pieces show under both men and women
    if (filters.gender !== "all") {
      result = result.filter(
        (p) => p.gender === filters.gender || p.gender === "unisex"
      );
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.occasion !== "all") {
      result = result.filter((p) =>
        p.occasion?.some((o) => toKebab(o) === filters.occasion)
      );
    }

    // Attribute filters: ring size, deity, earring type… (matches attributes or any variant)
    for (const [key, value] of getActiveAttributeFilters(filters.attributes)) {
      result = result.filter((p) => p.attributeIndex[key]?.includes(value));
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            Number(!!b.isNew) - Number(!!a.isNew) ||
            b.createdAt.localeCompare(a.createdAt)
        );
        break;
      case "popular":
        result.sort(
          (a, b) =>
            Number(!!b.isFeatured) - Number(!!a.isFeatured) ||
            (b.rating ?? 0) - (a.rating ?? 0)
        );
        break;
    }

    return result;
  }, [products, filters, sortBy]);

  const { page, totalPages, setPage, pageItems, rangeStart, rangeEnd } =
    usePagination(filteredProducts, PAGE_SIZE);
  const gridTopRef = useRef<HTMLDivElement>(null);

  const goToPage = (next: number) => {
    setPage(next);
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setPage(1);
  };

  const activeFiltersCount =
    ["category", "metalType", "stoneType", "gender", "occasion"].filter(
      (key) => filters[key as keyof ShopFilters] !== "all"
    ).length +
    getActiveAttributeFilters(filters.attributes).length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < options.maxPrice ? 1 : 0);

  const clearFilters = () => {
    setFilters(defaultFilters);
    setPage(1);
  };

  const filtersPanel = (
    <ProductFilters
      filters={filters}
      options={options}
      onFilterChange={handleFilterChange}
      onAttributeChange={handleAttributeChange}
      clearFilters={clearFilters}
      activeFiltersCount={activeFiltersCount}
    />
  );

  return (
    <>
      {/* Shop Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-64 shrink-0">{filtersPanel}</div>

            <div ref={gridTopRef} className="flex-1 scroll-mt-28">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <span className="ml-1 px-1.5 py-0.5 text-[13px]  text-black">
                            {activeFiltersCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      {filtersPanel}
                    </SheetContent>
                  </Sheet>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    {totalPages > 1
                      ? `Showing ${rangeStart}–${rangeEnd} of ${filteredProducts.length} products`
                      : `${filteredProducts.length} ${
                          filteredProducts.length === 1 ? "product" : "products"
                        }`}
                  </p>
                </div>

                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 gap-y-12">
                    {pageItems.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  <ShopPagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                  />
                </>
              ) : (
                <div className="text-center py-24">
                  <h3 className="text-xl font-serif mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or browse our full collection
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

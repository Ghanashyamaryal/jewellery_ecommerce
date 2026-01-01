"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
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
import { products } from "@/data/products";

const sortOptions = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
];

export function ShopContent() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    metalType: "all",
    stoneType: searchParams.get("stone") || "all",
    occasion: "all",
    priceRange: [0, 50000] as [number, number],
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.category !== "all") {
      result = result.filter(
        (p) =>
          p.subcategory?.toLowerCase().replace(/\s+/g, "-") ===
            filters.category || p.category.toLowerCase() === filters.category
      );
    }

    // Metal type filter
    if (filters.metalType !== "all") {
      result = result.filter(
        (p) =>
          p.metalType.toLowerCase().replace(/\s+/g, "-") === filters.metalType
      );
    }

    // Stone type filter
    if (filters.stoneType !== "all") {
      result = result.filter(
        (p) => p.stoneType?.toLowerCase() === filters.stoneType
      );
    }

    // Price range filter
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Occasion filter
    if (filters.occasion !== "all") {
      result = result.filter((p) =>
        p.occasion?.some(
          (o) => o.toLowerCase().replace(/\s+/g, "-") === filters.occasion
        )
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew ? -1 : 1));
        break;
      case "popular":
        result.sort((a, b) => (a.isFeatured ? -1 : 1));
        break;
    }

    return result;
  }, [filters, sortBy]);

  const activeFiltersCount = Object.entries(filters).filter(
    ([key, value]) =>
      (key !== "priceRange" && value !== "all") ||
      (key === "priceRange" &&
        Array.isArray(value) &&
        (value[0] > 0 || value[1] < 50000))
  ).length;

  const clearFilters = () => {
    setFilters({
      category: "all",
      metalType: "all",
      stoneType: "all",
      occasion: "all",
      priceRange: [0, 50000],
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Our Collection
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4">Shop All</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover our curated collection of handcrafted Nepali silver jewelry
            and rare gemstones
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-64 shrink-0">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-foreground text-background rounded-full">
                            {activeFiltersCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <ProductFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                      />
                    </SheetContent>
                  </Sheet>

                  <p className="text-sm text-muted-foreground">
                    {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""}
                  </p>

                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs gap-1"
                    >
                      Clear all
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
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

              {/* SEO Footer */}
              <div className="mt-16 pt-8 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Discover authentic Nepali silver jewelry and precious
                  gemstones at Aryal Sirin Gems. Our collection features
                  handcrafted 925 sterling silver rings, necklaces, earrings,
                  and pendants adorned with natural gemstones including
                  amethyst, turquoise, moonstone, garnet, and more. Each piece
                  is crafted by skilled Nepali artisans using traditional
                  techniques passed down through generations. Shop with
                  confidence knowing all our silver is 925 certified and
                  gemstones are ethically sourced.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

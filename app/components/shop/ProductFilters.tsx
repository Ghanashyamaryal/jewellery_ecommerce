"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { categories, metalTypes, stoneTypes, occasions } from "@/data/products";
import { Button } from "../ui/button";
import { Numerals } from "react-day-picker";

interface ProductFiltersProps {
  filters: {
    category: string;
    metalType: string;
    stoneType: string;
    occasion: string;
    priceRange: [number, number];
  };
  activeFiltersCount: number;
  clearFilters?: () => void;
  onFilterChange: (key: string, value: any) => void;
}

export function ProductFilters({
  filters,
  clearFilters,
  activeFiltersCount,
  onFilterChange,
}: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState({
    category: true,
    metal: true,
    stone: true,
    price: true,
    occasion: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium tracking-widest uppercase mb-6">
          Filters
        </h2>
        <div>
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
      </div>

      {/* Category */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-sm font-medium tracking-wider uppercase mb-4"
        >
          Category
          {openSections.category ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.category && (
          <div className="space-y-3">
            {categories.map((cat) => (
              <label
                key={cat.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.category === cat.value}
                  onCheckedChange={() => onFilterChange("category", cat.value)}
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Metal Type */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("metal")}
          className="flex items-center justify-between w-full text-sm font-medium tracking-wider uppercase mb-4"
        >
          Metal Type
          {openSections.metal ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.metal && (
          <div className="space-y-3">
            {metalTypes.map((metal) => (
              <label
                key={metal.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.metalType === metal.value}
                  onCheckedChange={() =>
                    onFilterChange("metalType", metal.value)
                  }
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {metal.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Stone Type */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("stone")}
          className="flex items-center justify-between w-full text-sm font-medium tracking-wider uppercase mb-4"
        >
          Stone Type
          {openSections.stone ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.stone && (
          <div className="space-y-3">
            {stoneTypes.map((stone) => (
              <label
                key={stone.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.stoneType === stone.value}
                  onCheckedChange={() =>
                    onFilterChange("stoneType", stone.value)
                  }
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {stone.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-sm font-medium tracking-wider uppercase mb-4"
        >
          Price Range
          {openSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.price && (
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) =>
                onFilterChange("priceRange", value as [number, number])
              }
              min={0}
              max={500000}
              step={1000}
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>NPR {filters.priceRange[0].toLocaleString()}</span>
              <span>NPR {filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Occasion */}
      <div className="pb-6">
        <button
          onClick={() => toggleSection("occasion")}
          className="flex items-center justify-between w-full text-sm font-medium tracking-wider uppercase mb-4"
        >
          Occasion
          {openSections.occasion ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.occasion && (
          <div className="space-y-3">
            {occasions.map((occ) => (
              <label
                key={occ.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.occasion === occ.value}
                  onCheckedChange={() => onFilterChange("occasion", occ.value)}
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {occ.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

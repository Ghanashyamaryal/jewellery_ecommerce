"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import type {
  FilterOption,
  ShopFilterOptions,
  ShopFilters,
} from "@/types/catalog";

type OptionFilterKey = Exclude<keyof ShopFilters, "priceRange" | "attributes">;

interface ProductFiltersProps {
  filters: ShopFilters;
  options: ShopFilterOptions;
  activeFiltersCount: number;
  clearFilters?: () => void;
  onFilterChange: <K extends keyof ShopFilters>(
    key: K,
    value: ShopFilters[K]
  ) => void;
  onAttributeChange: (key: string, value: string) => void;
}

type SectionKey = string;

function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-sm font-medium tracking-wider uppercase mb-3"
    >
      {title}
      {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </button>
  );
}

export function ProductFilters({
  filters,
  options,
  clearFilters,
  activeFiltersCount,
  onFilterChange,
  onAttributeChange,
}: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    category: true,
    gender: true,
    metal: true,
    stone: true,
    price: true,
    occasion: false,
  });

  // Attribute sections start open when a filter is already applied (e.g. from the URL)
  const isOpen = (section: SectionKey) =>
    openSections[section] ??
    (section.startsWith("attr:") &&
      (filters.attributes[section.slice(5)] ?? "all") !== "all");

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [section]: !isOpen(section) }));
  };

  const optionSections: {
    key: SectionKey;
    title: string;
    filterKey: OptionFilterKey;
    items: FilterOption[];
    scroll?: boolean;
  }[] = [
    { key: "category", title: "Category", filterKey: "category", items: options.categories },
    { key: "gender", title: "Gender", filterKey: "gender", items: options.genders },
    { key: "metal", title: "Metal Type", filterKey: "metalType", items: options.metals },
    { key: "stone", title: "Stone Type", filterKey: "stoneType", items: options.stones, scroll: true },
  ];

  const renderOptions = (
    items: FilterOption[],
    selected: string,
    onSelect: (value: string) => void,
    scroll?: boolean
  ) => (
    <div className={`space-y-2 ${scroll || items.length > 8 ? "max-h-72 overflow-y-auto pr-2" : ""}`}>
      {items.map((item) => (
        <label
          key={item.value}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <Checkbox
            checked={selected === item.value}
            onCheckedChange={() => onSelect(item.value)}
          />
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            {item.name}
          </span>
        </label>
      ))}
    </div>
  );

  return (
    <aside className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium tracking-widest uppercase">
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

      {/* Price Range */}
      <div className="border-b border-border pb-4">
        <SectionHeader
          title="Price Range"
          open={isOpen("price")}
          onToggle={() => toggleSection("price")}
        />
        {isOpen("price") && (
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) =>
                onFilterChange("priceRange", value as [number, number])
              }
              min={0}
              max={options.maxPrice}
              step={500}
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>NPR {filters.priceRange[0].toLocaleString()}</span>
              <span>NPR {filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {optionSections
        // Hide a section when there's nothing to choose besides "All"
        .filter((s) => s.items.length > 2)
        .map((section) => (
          <div key={section.key} className="border-b border-border pb-4">
            <SectionHeader
              title={section.title}
              open={isOpen(section.key)}
              onToggle={() => toggleSection(section.key)}
            />
            {isOpen(section.key) &&
              renderOptions(
                section.items,
                filters[section.filterKey],
                (value) => onFilterChange(section.filterKey, value),
                section.scroll
              )}
          </div>
        ))}

      {/* Category-specific attributes: ring size, deity, earring type, bead size… */}
      {options.attributes.map((attr) => {
        const key = `attr:${attr.key}`;
        return (
          <div key={key} className="border-b border-border pb-4">
            <SectionHeader
              title={attr.label}
              open={isOpen(key)}
              onToggle={() => toggleSection(key)}
            />
            {isOpen(key) &&
              renderOptions(
                attr.options,
                filters.attributes[attr.key] ?? "all",
                (value) => onAttributeChange(attr.key, value)
              )}
          </div>
        );
      })}

      {/* Occasion */}
      <div className="pb-4">
        <SectionHeader
          title="Occasion"
          open={isOpen("occasion")}
          onToggle={() => toggleSection("occasion")}
        />
        {isOpen("occasion") &&
          renderOptions(options.occasions, filters.occasion, (value) =>
            onFilterChange("occasion", value)
          )}
      </div>
    </aside>
  );
}

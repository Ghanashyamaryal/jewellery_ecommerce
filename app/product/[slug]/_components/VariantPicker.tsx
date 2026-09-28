"use client";

import Link from "next/link";
import { Ruler } from "lucide-react";
import type { VariantAxis } from "@/types/catalog";
import { getSizeGuideHref } from "@/lib/size-guide";

interface VariantPickerProps {
  axes: VariantAxis[];
  selected: Record<string, string>;
  onSelect: (key: string, value: string) => void;
  isOptionAvailable: (key: string, value: string) => boolean;
  showErrors: boolean;
}

export function VariantPicker({
  axes,
  selected,
  onSelect,
  isOptionAvailable,
  showErrors,
}: VariantPickerProps) {
  return (
    <div className="space-y-5">
      {axes.map((axis) => {
        const guideHref = getSizeGuideHref(axis.key);
        const current = axis.options.find((o) => o.value === selected[axis.key]);
        const missing = showErrors && !current;

        return (
          <fieldset key={axis.key}>
            <div className="flex items-center justify-between mb-3">
              <legend className="text-sm font-semibold uppercase tracking-wide">
                {axis.label}
                {current && (
                  <span className="ml-2 font-normal normal-case tracking-normal text-muted-foreground">
                    {current.label}
                  </span>
                )}
              </legend>
              {guideHref && (
                <Link
                  href={guideHref}
                  target="_blank"
                  className="flex items-center gap-1.5 text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
                >
                  <Ruler className="h-4 w-4" />
                  Find your size
                </Link>
              )}
            </div>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={axis.label}>
              {axis.options.map((option) => {
                const isSelected = selected[axis.key] === option.value;
                const available = isOptionAvailable(axis.key, option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={!available}
                    onClick={() => onSelect(axis.key, option.value)}
                    className={`min-w-12 h-11 px-3 border text-sm transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:line-through ${
                      isSelected
                        ? "border-foreground bg-foreground text-background"
                        : missing
                          ? "border-destructive hover:border-foreground"
                          : "border-border hover:border-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            {missing && (
              <p className="mt-2 text-sm text-destructive" role="alert">
                Please select a {axis.label.toLowerCase()}
              </p>
            )}
          </fieldset>
        );
      })}
    </div>
  );
}

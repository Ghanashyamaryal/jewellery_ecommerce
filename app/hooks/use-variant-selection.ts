import { useMemo, useState } from "react";
import type { Product } from "@/types/catalog";

// Nothing is preselected: defaulting a ring or bangle size leads to wrong-size orders
export function useVariantSelection(product: Pick<Product, "variants" | "variantAxes">) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const activeVariants = useMemo(
    () => product.variants.filter((v) => v.isActive),
    [product.variants]
  );

  const hasVariants = product.variantAxes.length > 0;
  const missingAxes = product.variantAxes.filter((axis) => !selected[axis.key]);

  const variant = hasVariants && missingAxes.length === 0
    ? activeVariants.find((v) =>
        product.variantAxes.every((axis) => v.options[axis.key] === selected[axis.key])
      )
    : undefined;

  const isOptionAvailable = (key: string, value: string) =>
    activeVariants.some(
      (v) =>
        v.options[key] === value &&
        v.stockCount > 0 &&
        Object.entries(selected).every(([k, val]) => k === key || v.options[k] === val)
    );

  const selectOption = (key: string, value: string) =>
    setSelected((prev) => ({ ...prev, [key]: value }));

  return { hasVariants, selected, selectOption, variant, missingAxes, isOptionAvailable };
}

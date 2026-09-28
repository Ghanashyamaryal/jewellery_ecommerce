import type { Product, ProductVariant } from "@/types/catalog";

/** Price after discount, as shown on the product page */
export function getFinalPrice(
  product: Pick<Product, "price" | "discountType" | "discountValue">
): number {
  if (!product.discountType || !product.discountValue) return product.price;
  const discounted =
    product.discountType === "percentage"
      ? product.price - (product.price * product.discountValue) / 100
      : product.price - product.discountValue;
  return Math.max(0, Math.round(discounted));
}

/** Price for one unit of a product, or of a specific variant when it overrides the price */
export function getUnitPrice(
  product: Pick<Product, "price" | "discountType" | "discountValue">,
  variant?: Pick<ProductVariant, "price">
): number {
  return getFinalPrice({ ...product, price: variant?.price ?? product.price });
}

/** "Was" price to strike through next to the selling price, if any */
export function getStrikePrice(
  product: Pick<Product, "price" | "comparePrice" | "discountType" | "discountValue">,
  variant?: Pick<ProductVariant, "price" | "compareAtPrice">
): number | undefined {
  const base = variant?.price ?? product.price;
  const final = getUnitPrice(product, variant);
  const strike = final < base ? base : (variant?.compareAtPrice ?? product.comparePrice);
  return strike && strike > final ? strike : undefined;
}

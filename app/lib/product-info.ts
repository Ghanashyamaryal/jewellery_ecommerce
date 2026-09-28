import type { Product } from "@/types/catalog";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";

export type TrustPointKind =
  | "shipping"
  | "returns"
  | "purity"
  | "certificate"
  | "natural"
  | "handmade";

export interface TrustPoint {
  kind: TrustPointKind;
  label: string;
  description: string;
}

const WEARABLE_CATEGORIES = new Set(["jewelry", "stone-jewelry"]);

export function getTrustPoints(product: Product): TrustPoint[] {
  const points: TrustPoint[] = [
    product.shipping.freeShipping
      ? { kind: "shipping", label: "Free Shipping", description: "Included on this piece" }
      : {
          kind: "shipping",
          label: "Free Shipping",
          description: `On orders over Rs. ${FREE_SHIPPING_THRESHOLD.toLocaleString()}`,
        },
    { kind: "returns", label: "7-Day Returns", description: "Easy returns & refunds" },
  ];

  if (product.metal.purity) {
    points.push({
      kind: "purity",
      label: product.metal.name,
      description: `${product.metal.purity} pure silver`,
    });
  }

  const certificate = product.certifications.find((c) => c.type !== "other");
  if (certificate) {
    points.push({
      kind: "certificate",
      label:
        certificate.type === "gemstone_lab"
          ? "Lab-Certified Gemstone"
          : "Certificate of Authenticity",
      description: `Issued by ${certificate.issuer}`,
    });
  }

  const naturalStone = product.stones.find((s) => s.role === "primary" && s.isNatural);
  if (naturalStone) {
    points.push({
      kind: "natural",
      label: `Natural ${naturalStone.stone.name}`,
      description: naturalStone.origin
        ? `Sourced from ${naturalStone.origin}`
        : "Genuine stone, not lab-created",
    });
  }

  if (product.flags.isHandmade) {
    points.push({
      kind: "handmade",
      label: "Handcrafted",
      description: `By artisans in ${product.origin?.region ?? product.origin?.country ?? "Nepal"}`,
    });
  }

  return points;
}

export function getCareInstructions(product: Product): string[] {
  const care = [...(product.careInstructions ?? [])];
  if (product.metal.care) care.push(product.metal.care);
  if (WEARABLE_CATEGORIES.has(product.category.slug)) {
    care.push(
      "Put jewellery on after perfume, lotion and hairspray",
      "Remove before bathing, swimming or exercise"
    );
  }
  if (care.length === 0) {
    care.push("Wipe with a soft, dry cloth and store in a dry place");
  }
  return care;
}

export function getShippingNote(product: Product): string {
  const days = product.shipping.processingDays;
  const parts = [
    `Packed in our signature gift box and dispatched within ${days} business ${days === 1 ? "day" : "days"}.`,
  ];
  if (product.shipping.isFragile) {
    parts.push("Fragile pieces are packed with extra protection.");
  }
  parts.push(
    product.shipping.freeShipping
      ? "Shipping is free on this piece."
      : `Free shipping on orders over Rs. ${FREE_SHIPPING_THRESHOLD.toLocaleString()}.`
  );
  return parts.join(" ");
}

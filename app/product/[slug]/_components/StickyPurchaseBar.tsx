"use client";

import { Button } from "@/components/ui/button";

interface StickyPurchaseBarProps {
  name: string;
  price: number;
  actionLabel: string;
  disabled: boolean;
  onAction: () => void;
}

export function StickyPurchaseBar({
  name,
  price,
  actionLabel,
  disabled,
  onAction,
}: StickyPurchaseBarProps) {
  return (
    <div
      data-sticky-cta
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur px-4 py-3 flex items-center gap-4"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-serif line-clamp-1">{name}</p>
        <p className="text-sm font-medium">Rs. {price.toLocaleString()}</p>
      </div>
      <Button
        onClick={onAction}
        disabled={disabled}
        className="tracking-widest uppercase text-xs"
      >
        {actionLabel}
      </Button>
    </div>
  );
}

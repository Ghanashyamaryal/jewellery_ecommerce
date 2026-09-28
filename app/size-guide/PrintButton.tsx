"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 border border-background/40 text-background px-8 py-3 text-sm tracking-widest uppercase cursor-pointer transition-colors hover:bg-background hover:text-foreground"
    >
      <Printer className="h-4 w-4" /> Print This Guide
    </button>
  );
}

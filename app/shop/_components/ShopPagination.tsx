"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPageNumbers } from "@/lib/pagination";

interface ShopPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const baseClass =
  "h-10 min-w-10 px-3 inline-flex items-center justify-center text-sm border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

export function ShopPagination({ page, totalPages, onPageChange }: ShopPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-16 flex justify-center">
      <ul className="flex items-center gap-1.5">
        <li>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={`${baseClass} border-border hover:border-foreground`}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </li>
        {getPageNumbers(page, totalPages).map((item, i) =>
          item === "ellipsis" ? (
            <li key={`gap-${i}`} className="px-1 text-muted-foreground" aria-hidden>
              …
            </li>
          ) : (
            <li key={item}>
              <button
                onClick={() => onPageChange(item)}
                aria-current={item === page ? "page" : undefined}
                aria-label={`Page ${item}`}
                className={`${baseClass} ${
                  item === page
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground"
                }`}
              >
                {item}
              </button>
            </li>
          )
        )}
        <li>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className={`${baseClass} border-border hover:border-foreground`}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

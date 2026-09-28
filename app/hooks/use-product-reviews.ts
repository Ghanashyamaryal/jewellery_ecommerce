import { useCallback, useMemo, useSyncExternalStore } from "react";
import { REVIEWS_KEY, type NewReview, type Review } from "@/lib/reviews";

// Reviews live in this browser's localStorage until there is a backend;
// swap the store below for API calls then — callers won't change.
type ReviewMap = Record<string, Review[]>;

const EMPTY: ReviewMap = {};
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedMap: ReviewMap = EMPTY;

function readRaw() {
  try {
    return localStorage.getItem(REVIEWS_KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): ReviewMap {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed = JSON.parse(raw ?? "{}");
      cachedMap = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : EMPTY;
    } catch {
      cachedMap = EMPTY;
    }
  }
  return cachedMap;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useProductReviews(productId: string) {
  const all = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const reviews = useMemo(() => {
    const saved = all[productId];
    return Array.isArray(saved) ? saved.filter((r) => r?.id && r?.rating) : [];
  }, [all, productId]);

  const addReview = useCallback(
    (input: NewReview) => {
      const review: Review = {
        ...input,
        id: `rev_${Date.now().toString(36)}`,
        productId,
        createdAt: new Date().toISOString(),
      };
      const current = getSnapshot();
      try {
        localStorage.setItem(
          REVIEWS_KEY,
          JSON.stringify({ ...current, [productId]: [review, ...(current[productId] ?? [])] })
        );
      } catch {}
      listeners.forEach((notify) => notify());
    },
    [productId]
  );

  return { reviews, addReview };
}

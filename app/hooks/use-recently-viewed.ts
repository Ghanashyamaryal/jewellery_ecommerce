import { useEffect, useState } from "react";
import {
  RECENTLY_VIEWED_KEY,
  RECENTLY_VIEWED_LIMIT,
  type RecentlyViewedItem,
} from "@/lib/recently-viewed";

function read(): RecentlyViewedItem[] {
  try {
    const saved = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter((i) => i?.id && i?.slug) : [];
  } catch {
    return [];
  }
}

/** Records `current` as viewed and returns the other recently viewed items */
export function useRecentlyViewed(current: RecentlyViewedItem) {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    const previous = read().filter((i) => i.id !== current.id);
    try {
      localStorage.setItem(
        RECENTLY_VIEWED_KEY,
        JSON.stringify([current, ...previous].slice(0, RECENTLY_VIEWED_LIMIT))
      );
    } catch {}
    setItems(previous);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.id]);

  return items;
}

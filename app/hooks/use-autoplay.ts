import { useEffect, useState } from "react";

export function useAutoplay(length: number, intervalMs: number) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % length), intervalMs);
    return () => clearInterval(timer);
  }, [paused, length, intervalMs]);

  return {
    index,
    goTo: setIndex,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}

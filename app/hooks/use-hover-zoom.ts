import { useState, type MouseEvent } from "react";

export function useHoverZoom() {
  const [origin, setOrigin] = useState<string | null>(null);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return {
    isZoomed: origin !== null,
    style: origin ? { transformOrigin: origin, transform: "scale(2)" } : undefined,
    handlers: { onMouseMove, onMouseLeave: () => setOrigin(null) },
  };
}

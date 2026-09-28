"use client";

import { useRef, useState } from "react";
import { useHoverZoom } from "@/hooks/use-hover-zoom";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const zoom = useHoverZoom();

  const select = (index: number) => {
    setSelected(index);
    const track = trackRef.current;
    if (track) track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  const onTrackScroll = () => {
    const track = trackRef.current;
    if (track) setSelected(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <div className="relative lg:hidden">
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none]"
        >
          {images.map((image, index) => (
            <div key={image + index} className="w-full shrink-0 snap-center aspect-square bg-muted">
              <img
                src={image}
                alt={`${name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === selected ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div
        className="hidden lg:block aspect-square max-h-[calc(100svh-17rem)] bg-muted overflow-hidden cursor-zoom-in"
        {...zoom.handlers}
      >
        <img
          src={images[selected]}
          alt={name}
          style={zoom.style}
          className="w-full h-full object-cover transition-transform duration-200"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 lg:flex lg:overflow-x-auto lg:[scrollbar-width:none]">
          {images.map((image, index) => (
            <button
              key={image + index}
              onClick={() => select(index)}
              aria-label={`Show image ${index + 1}`}
              className={`aspect-square shrink-0 lg:w-20 bg-muted overflow-hidden border transition-all ${
                selected === index ? "border-foreground" : "border-transparent"
              }`}
            >
              <img src={image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

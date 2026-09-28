"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAutoplay } from "@/hooks/use-autoplay";

// `tone` is the image's background brightness; text and controls flip to stay readable
const SLIDES = [
  { src: "/hero/gemstone-jewellery.jpg", tone: "dark" },
  { src: "/hero/silver-cz-jewellery.jpg", tone: "light" },
  { src: "/hero/silver-jewellery.jpg", tone: "dark" },
  { src: "/hero/silver-idols.jpg", tone: "dark" },
] as const;

export function HeroSection() {
  const {
    index: currentSlide,
    goTo,
    pause,
    resume,
  } = useAutoplay(SLIDES.length, 2000);
  const isLight = SLIDES[currentSlide].tone === "light";

  return (
    <section
      className="relative h-[70svh] min-h-120 lg:h-[calc(100svh-10.375rem)] max-h-240 flex items-center overflow-hidden bg-[#1a1625]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="100vw"
              // Products sit on the right; keep them in frame when narrow screens crop
              className="object-cover object-[75%_center]"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10  max-w-390 mx-auto px-4 lg:px-8 flex justify-start items-center w-full">
        <div className="max-w-2xl space-y-8 text-left">
          <p
            className={`text-sm md:text-base tracking-[0.3em] uppercase transition-colors duration-1000 ${
              isLight ? "text-foreground/80" : "text-white/90"
            }`}
          >
            Handcrafted in Kathmandu, Nepal
          </p>
          <h1
            className={`text-4xl lg:py-8 md:text-6xl font-serif leading-tight animate-fade-in-up transition-colors duration-1000 ${
              isLight ? "text-foreground" : "text-white"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            Timeless Silver,
            <br />
            <span className="italic font-light">Rare Gemstones</span>
          </h1>
          <div
            className="flex flex-col sm:flex-row items-start justify-start gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              asChild
              size="lg"
              className="min-w-[200px] tracking-widest uppercase text-sm"
            >
              <Link href="/shop" className="flex items-center">
                Discover Collections
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={`min-w-[200px] tracking-widest uppercase text-sm bg-transparent ${
                isLight
                  ? "text-foreground border-foreground/40 hover:bg-foreground hover:text-background"
                  : "text-white border-white/40 hover:bg-white hover:text-black"
              }`}
            >
              <Link href="/bespoke">Custom Design</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-2.5 items-center">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                index === currentSlide
                  ? `w-8 ${isLight ? "bg-foreground" : "bg-white"}`
                  : `w-1.5 ${isLight ? "bg-foreground/30 hover:bg-foreground/60" : "bg-white/30 hover:bg-white/60"}`
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

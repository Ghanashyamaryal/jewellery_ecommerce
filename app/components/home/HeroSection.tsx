"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BACKGROUND_IMAGES = [
  "/home.jpg",
  "/homeimage.jpg",
  "/image1.png",
  "/home.jpg",
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[600px] flex items-center overflow-hidden bg-[#1a1625]">
      <div className="absolute inset-0 z-0">
        {BACKGROUND_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-90" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt="Jewelry"
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-3 lg:px-16 flex justify-start items-center w-full">
        <div className="max-w-2xl space-y-8 text-left">
          {" "}
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-white/90">
            Authentic Nepali Craftsmanship
          </p>
          <h1
            className="text-4xl lg:py-8 md:text-6xl font-serif leading-tight animate-fade-in-up text-white"
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
              className="min-w-[200px] tracking-widest uppercase text-sm bg-transparent text-white border-white/40 hover:bg-white hover:text-black"
            >
              <Link href="/bespoke">Custom Design</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/20 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}

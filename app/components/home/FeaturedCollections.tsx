"use client";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Collection {
  name: string;
  description: string;
  href: string;
  image: string;
}

const collections: Collection[] = [
  {
    name: "Signature Rings",
    description: "Handcrafted statement pieces",
    href: "/shop/jewelry/rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop&q=80",
  },
  {
    name: "Statement Necklaces",
    description: "Timeless elegance",
    href: "/shop/jewelry/necklaces",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop&q=80",
  },
  {
    name: "Rare Gemstones",
    description: "Nature's treasures",
    href: "/shop/gemstones",
    image:
      "https://www.nobbier.com/wp-content/uploads/2024/11/natural-red-diamond-rare-gem-1024x574.jpg",
  },
  {
    name: "Silver Lifestyle",
    description: "Pooja items & décor",
    href: "/shop/lifestyle",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=800&fit=crop&q=80",
  },
  {
    name: "Silver Lifestyles",
    description: "Pooja items & décor",
    href: "/shop/lifestyle",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=800&fit=crop&q=80",
  },
];

export default function FeaturedCollections() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const checkScroll = (): void => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Calculate current index based on scroll position
      const cardWidth = 320 + 24; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right"): void => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 + 24; // card width + gap
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  const scrollToIndex = (index: number): void => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 + 24;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 md:py-12 xl:py-16 bg-background">
      <div className="w-full max-w-390 mx-auto px-4 lg:px-8">
        <div className="text-center mb-8 xl:mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Curated Collections
          </p>
          <h2 className="text-3xl md:text-4xl font-serif">
            Explore Our Categories
          </h2>
        </div>

        {/* Scrollable View - All Screen Sizes */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {collections.map((collection, index) => (
              <a
                key={`${collection.name}-${index}`}
                href="/shop"
                className="group relative flex-shrink-0 min-w-[320px] max-w-[343px] w-full aspect-[3/4] overflow-hidden bg-muted snap-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-primary-foreground">
                  <h3 className="text-xl font-serif mb-1">{collection.name}</h3>
                  <p className="text-sm text-primary-foreground/70 mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase opacity-100 xl:opacity-0 xl:hover:opacity-100 xl:group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Navigation Arrows */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-muted flex items-center justify-center shadow-lg hover:bg-background transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-muted flex items-center justify-center shadow-lg hover:bg-background transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          )}

          <div className="flex justify-center gap-2 mt-6 lg:hidden">
            {collections.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

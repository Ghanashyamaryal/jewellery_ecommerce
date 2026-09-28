import Link from "next/link";
import { getPopularStones } from "@/lib/catalog";

export function ShopByStone() {
  const stones = getPopularStones(10);
  if (stones.length === 0) return null;

  return (
    <section className="py-8 md:py-12 xl:py-16 bg-background">
      <div className="w-full max-w-390 mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Natural Gemstones
          </p>
          <h2 className="text-3xl md:text-4xl font-serif">Shop by Stone</h2>
        </div>
        <ul className="flex gap-6 md:gap-8 overflow-x-auto md:flex-wrap md:justify-center pb-2 [scrollbar-width:none]">
          {stones.map((stone) => (
            <li key={stone.id} className="shrink-0">
              <Link
                href={`/shop?stone=${stone.slug}`}
                className="group flex flex-col items-center gap-3 w-20"
              >
                {stone.image ? (
                  <img
                    src={stone.image}
                    alt=""
                    loading="lazy"
                    className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border border-border transition-transform group-hover:scale-105"
                  />
                ) : (
                  <span
                    className="h-16 w-16 md:h-20 md:w-20 rounded-full border border-border shadow-inner transition-transform group-hover:scale-105"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, #ffffffaa, ${stone.colorHex} 55%)`,
                    }}
                  />
                )}
                <span className="text-sm text-center group-hover:underline underline-offset-4">
                  {stone.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

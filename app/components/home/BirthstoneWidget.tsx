"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const birthstones = [
  {
    month: "January",
    stone: "Garnet",
    color: "bg-red-800",
    description: "Protection & energy",
  },
  {
    month: "February",
    stone: "Amethyst",
    color: "bg-purple-600",
    description: "Peace & clarity",
  },
  {
    month: "March",
    stone: "Aquamarine",
    color: "bg-cyan-400",
    description: "Courage & calm",
  },
  {
    month: "April",
    stone: "Diamond",
    color: "bg-white border border-muted",
    description: "Eternal love",
  },
  {
    month: "May",
    stone: "Emerald",
    color: "bg-emerald-600",
    description: "Rebirth & wisdom",
  },
  {
    month: "June",
    stone: "Moonstone",
    color: "bg-blue-100",
    description: "New beginnings",
  },
  {
    month: "July",
    stone: "Ruby",
    color: "bg-red-600",
    description: "Passion & vitality",
  },
  {
    month: "August",
    stone: "Peridot",
    color: "bg-lime-500",
    description: "Strength & balance",
  },
  {
    month: "September",
    stone: "Sapphire",
    color: "bg-blue-700",
    description: "Truth & loyalty",
  },
  {
    month: "October",
    stone: "Tourmaline",
    color: "bg-pink-400",
    description: "Healing & joy",
  },
  {
    month: "November",
    stone: "Citrine",
    color: "bg-amber-400",
    description: "Success & happiness",
  },
  {
    month: "December",
    stone: "Turquoise",
    color: "bg-teal-500",
    description: "Good fortune",
  },
];

export function BirthstoneWidget() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const selected = selectedMonth !== null ? birthstones[selectedMonth] : null;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Personalized For You
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Find Your Birthstone
          </h2>
          <p className="text-muted-foreground mb-12">
            Discover the gemstone that resonates with your birth month
          </p>

          {/* Month Selector */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-12">
            {birthstones.map((item, index) => (
              <button
                key={item.month}
                onClick={() => setSelectedMonth(index)}
                className={`p-3 text-center transition-all duration-300 border ${
                  selectedMonth === index
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground/50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${item.color} mx-auto mb-2`}
                />
                <span className="text-[10px] uppercase tracking-wider">
                  {item.month.slice(0, 3)}
                </span>
              </button>
            ))}
          </div>

          {/* Selected Stone Display */}
          {selected && (
            <div className="animate-fade-in bg-muted/50 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div
                  className={`w-24 h-24 rounded-full ${selected.color} shadow-lg`}
                />
                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-1">
                    {selected.month} Birthstone
                  </p>
                  <h3 className="text-3xl font-serif mb-2">{selected.stone}</h3>
                  <p className="text-muted-foreground italic mb-4">
                    {selected.description}
                  </p>
                  <Button
                    asChild
                    size="sm"
                    className="tracking-widest uppercase text-xs"
                  >
                    <Link
                      href={`/shop/gemstones?stone=${selected.stone.toLowerCase()}`}
                    >
                      Shop {selected.stone}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

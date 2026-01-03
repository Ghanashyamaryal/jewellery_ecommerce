"use client";

import { useState, useEffect } from "react";
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
    stone: "Pearl",
    color: "bg-slate-100",
    description: "Purity & wisdom",
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
    stone: "Opal",
    color: "bg-pink-300",
    description: "Hope & creativity",
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

const zodiacSigns = [
  {
    sign: "Aries",
    stone: "Diamond",
    color: "bg-white border border-muted",
    description: "Courage & clarity",
    dateRange: "Mar 21 - Apr 19",
  },
  {
    sign: "Taurus",
    stone: "Emerald",
    color: "bg-emerald-600",
    description: "Love & prosperity",
    dateRange: "Apr 20 - May 20",
  },
  {
    sign: "Gemini",
    stone: "Pearl",
    color: "bg-slate-100",
    description: "Balance & wisdom",
    dateRange: "May 21 - Jun 20",
  },
  {
    sign: "Cancer",
    stone: "Ruby",
    color: "bg-red-600",
    description: "Passion & protection",
    dateRange: "Jun 21 - Jul 22",
  },
  {
    sign: "Leo",
    stone: "Peridot",
    color: "bg-lime-500",
    description: "Strength & vitality",
    dateRange: "Jul 23 - Aug 22",
  },
  {
    sign: "Virgo",
    stone: "Sapphire",
    color: "bg-blue-700",
    description: "Wisdom & purity",
    dateRange: "Aug 23 - Sep 22",
  },
  {
    sign: "Libra",
    stone: "Opal",
    color: "bg-pink-300",
    description: "Harmony & balance",
    dateRange: "Sep 23 - Oct 22",
  },
  {
    sign: "Scorpio",
    stone: "Topaz",
    color: "bg-yellow-500",
    description: "Passion & power",
    dateRange: "Oct 23 - Nov 21",
  },
  {
    sign: "Sagittarius",
    stone: "Tanzanite",
    color: "bg-indigo-500",
    description: "Wisdom & adventure",
    dateRange: "Nov 22 - Dec 21",
  },
  {
    sign: "Capricorn",
    stone: "Garnet",
    color: "bg-red-800",
    description: "Discipline & strength",
    dateRange: "Dec 22 - Jan 19",
  },
  {
    sign: "Aquarius",
    stone: "Amethyst",
    color: "bg-purple-600",
    description: "Innovation & peace",
    dateRange: "Jan 20 - Feb 18",
  },
  {
    sign: "Pisces",
    stone: "Aquamarine",
    color: "bg-cyan-400",
    description: "Compassion & calm",
    dateRange: "Feb 19 - Mar 20",
  },
];

export function BirthstoneWidget() {
  const [activeTab, setActiveTab] = useState<"month" | "zodiac">("month");
  const [selectedMonth, setSelectedMonth] = useState<number>(0); // Auto-select January
  const [selectedZodiac, setSelectedZodiac] = useState<number>(0); // Auto-select Aries

  const selectedMonth_data = birthstones[selectedMonth];
  const selectedZodiac_data = zodiacSigns[selectedZodiac];

  return (
    <section className="py-8 md:py-12 xl:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-[1050px] mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Personalized For You
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Find Your {activeTab === "month" ? "Birthstone" : "Zodiac Stone"}
          </h2>
          <p className="text-muted-foreground mb-12">
            Discover the gemstone that resonates with your{" "}
            {activeTab === "month" ? "birth month" : "zodiac sign"}
          </p>

          {/* Tab Selector */}
          <div className="flex justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveTab("month")}
              className={`px-8 py-3 text-sm tracking-widest cursor-pointer uppercase transition-all duration-300 border ${
                activeTab === "month"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50"
              }`}
            >
              By Month
            </button>
            <button
              onClick={() => setActiveTab("zodiac")}
              className={`px-8 py-3 text-sm tracking-widest cursor-pointer uppercase transition-all duration-300 border ${
                activeTab === "zodiac"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50"
              }`}
            >
              By Zodiac
            </button>
          </div>

          {/* Month Selector */}
          {activeTab === "month" && (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-12">
              {birthstones.map((item, index) => (
                <button
                  key={item.month}
                  onClick={() => setSelectedMonth(index)}
                  className={`p-3 text-center transition-all cursor-pointer duration-300 border ${
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
          )}

          {/* Zodiac Selector */}
          {activeTab === "zodiac" && (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-12">
              {zodiacSigns.map((item, index) => (
                <button
                  key={item.sign}
                  onClick={() => setSelectedZodiac(index)}
                  className={`p-3 text-center transition-all cursor-pointer duration-300 border ${
                    selectedZodiac === index
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${item.color} mx-auto mb-2`}
                  />
                  <span className="text-[10px] uppercase tracking-wider">
                    {item.sign}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Selected Stone Display - Month */}
          {activeTab === "month" && (
            <div className="animate-fade-in bg-muted/50 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div
                  className={`w-24 h-24 rounded-full ${selectedMonth_data.color} shadow-lg`}
                />
                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-1">
                    {selectedMonth_data.month} Birthstone
                  </p>
                  <h3 className="text-3xl font-serif mb-2">
                    {selectedMonth_data.stone}
                  </h3>
                  <p className="text-muted-foreground italic mb-4">
                    {selectedMonth_data.description}
                  </p>
                  <Button
                    asChild
                    size="sm"
                    className="tracking-widest cursor-pointer uppercase text-xs"
                  >
                    <Link
                      href={`/shop/gemstones?stone=${selectedMonth_data.stone.toLowerCase()}`}
                    >
                      Shop {selectedMonth_data.stone}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Selected Stone Display - Zodiac */}
          {activeTab === "zodiac" && (
            <div className="animate-fade-in bg-muted/50 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div
                  className={`w-24 h-24 rounded-full ${selectedZodiac_data.color} shadow-lg`}
                />
                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-1">
                    {selectedZodiac_data.sign} ({selectedZodiac_data.dateRange})
                  </p>
                  <h3 className="text-3xl font-serif mb-2">
                    {selectedZodiac_data.stone}
                  </h3>
                  <p className="text-muted-foreground italic mb-4">
                    {selectedZodiac_data.description}
                  </p>
                  <Button
                    asChild
                    size="sm"
                    className="tracking-widest cursor-pointer uppercase text-xs"
                  >
                    <Link
                      href={`/shop/gemstones?stone=${selectedZodiac_data.stone.toLowerCase()}`}
                    >
                      Shop {selectedZodiac_data.stone}
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

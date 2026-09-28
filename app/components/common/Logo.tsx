import { useId } from "react";
import { cn } from "@/lib/utils";

const PETALS: [string, number][] = [
  ["M32,52 C24.16,56.88,15.47,52.09,13.42,48.05 C16.93,45.2,26.83,44.36,32,52Z", 0.28],
  ["M32,52 C37.17,44.36,47.07,45.2,50.58,48.05 C48.53,52.09,39.84,56.88,32,52Z", 0.28],
  ["M32,52 C21.18,52.12,15.64,42.02,16.17,36.72 C21.45,36,31.74,41.18,32,52Z", 0.18],
  ["M32,52 C32.26,41.18,42.55,36,47.83,36.72 C48.36,42.02,42.82,52.12,32,52Z", 0.18],
];

const GRANULES: [number, number][] = [
  [22.56, 37.95], [21.47, 34.84], [21.1, 31.5], [21.47, 28.16], [22.56, 25.05],
  [24.29, 22.38], [26.55, 20.33], [29.18, 19.04], [32, 18.6], [34.82, 19.04],
  [37.45, 20.33], [39.71, 22.38], [41.44, 25.05], [42.53, 28.16], [42.9, 31.5],
  [42.53, 34.84], [41.44, 37.95],
];

export function LogoMark({ className }: { className?: string }) {
  const stoneId = useId();

  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("h-10 w-10 shrink-0", className)}
    >
      <defs>
        <radialGradient id={stoneId} cx=".38" cy=".32" r=".75">
          <stop offset="0" stopColor="#6FD0C6" />
          <stop offset="1" stopColor="#2E9E96" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30.4" fill="none" stroke="currentColor" strokeWidth=".8" />
      <circle cx="32" cy="32" r="27.8" fill="none" stroke="currentColor" strokeWidth=".4" strokeOpacity=".55" />
      {PETALS.map(([d, opacity]) => (
        <path
          key={d}
          d={d}
          fill="currentColor"
          fillOpacity={opacity}
          stroke="currentColor"
          strokeWidth=".8"
          strokeLinejoin="round"
        />
      ))}
      <ellipse cx="32" cy="31.5" rx="9.3" ry="11.3" fill="currentColor" fillOpacity=".9" />
      <ellipse cx="32" cy="31.5" rx="7.6" ry="9.6" fill={`url(#${stoneId})`} />
      <ellipse
        cx="29.6"
        cy="27.9"
        rx="1.9"
        ry="2.8"
        transform="rotate(-20 29.6 27.9)"
        fill="#fff"
        fillOpacity=".55"
      />
      {GRANULES.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r=".8" fill="currentColor" />
      ))}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-10 w-10 md:h-12 md:w-12" />
      <span className="flex flex-col items-center leading-none">
        <span className="font-serif text-lg md:text-xl font-medium tracking-[0.18em] whitespace-nowrap">
          ARYAL SIRING
        </span>
        <span className="mt-1.5 flex w-full items-center gap-2">
          <span className="h-px flex-1 bg-gold" />
          <span className="text-[9px] md:text-[10px] tracking-[0.45em] opacity-70 pl-[0.45em]">
            GEMS
          </span>
          <span className="h-px flex-1 bg-gold" />
        </span>
      </span>
    </span>
  );
}

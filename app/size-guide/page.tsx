import { Metadata } from "next";
import { Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PrintButton } from "./PrintButton";
import { SizeFaq } from "./SizeFaq";

export const metadata: Metadata = {
  title: "Jewelry Size Guide - Aryal Siring Gems",
  description:
    "Find your ring, necklace, bracelet, bangle and earring size with our measuring guides and international size conversion charts.",
};

// Inside diameter / circumference follow the US standard; UK, EU and
// India/Nepal columns are the nearest equivalents.
const RING_SIZES = [
  { us: "3", uk: "F", eu: "44", in: "4", dia: 14.1, circ: 44.2 },
  { us: "3½", uk: "G", eu: "45½", in: "5", dia: 14.5, circ: 45.5 },
  { us: "4", uk: "H", eu: "47", in: "7", dia: 14.9, circ: 46.8 },
  { us: "4½", uk: "I", eu: "48", in: "8", dia: 15.3, circ: 48.0 },
  { us: "5", uk: "J½", eu: "49", in: "9", dia: 15.7, circ: 49.3 },
  { us: "5½", uk: "K½", eu: "50½", in: "11", dia: 16.1, circ: 50.6 },
  { us: "6", uk: "L½", eu: "52", in: "12", dia: 16.5, circ: 51.9 },
  { us: "6½", uk: "M½", eu: "53", in: "13", dia: 16.9, circ: 53.1 },
  { us: "7", uk: "N½", eu: "54½", in: "14", dia: 17.3, circ: 54.4 },
  { us: "7½", uk: "O½", eu: "55½", in: "16", dia: 17.7, circ: 55.7 },
  { us: "8", uk: "P½", eu: "57", in: "17", dia: 18.1, circ: 57.0 },
  { us: "8½", uk: "Q½", eu: "58", in: "18", dia: 18.5, circ: 58.3 },
  { us: "9", uk: "R½", eu: "59½", in: "20", dia: 19.0, circ: 59.5 },
  { us: "9½", uk: "S½", eu: "61", in: "21", dia: 19.4, circ: 60.8 },
  { us: "10", uk: "T½", eu: "62", in: "22", dia: 19.8, circ: 62.1 },
  { us: "10½", uk: "U½", eu: "63½", in: "23", dia: 20.2, circ: 63.4 },
  { us: "11", uk: "V½", eu: "64½", in: "25", dia: 20.6, circ: 64.6 },
  { us: "11½", uk: "W½", eu: "66", in: "26", dia: 21.0, circ: 65.9 },
  { us: "12", uk: "X½", eu: "67", in: "27", dia: 21.4, circ: 67.2 },
  { us: "12½", uk: "Z", eu: "68½", in: "28", dia: 21.8, circ: 68.5 },
  { us: "13", uk: "Z+1", eu: "70", in: "30", dia: 22.2, circ: 69.7 },
];

// `depth` is where the necklace falls in the silhouette diagram (SVG units).
const NECKLACE_LENGTHS = [
  {
    inches: 14,
    cm: 35,
    name: "Collar",
    depth: 142,
    desc: "Sits snugly around the middle of the neck. Best with open necklines.",
  },
  {
    inches: 16,
    cm: 40,
    name: "Choker",
    depth: 160,
    desc: "Rests at the base of the neck. Ideal for dainty gemstone pendants.",
  },
  {
    inches: 18,
    cm: 45,
    name: "Princess",
    depth: 182,
    desc: "Our most popular length. Falls just on the collarbone and suits every neckline.",
  },
  {
    inches: 20,
    cm: 50,
    name: "Matinee (short)",
    depth: 205,
    desc: "Sits a little below the collarbone. Great for layering over an 18\" chain.",
  },
  {
    inches: 22,
    cm: 55,
    name: "Matinee",
    depth: 228,
    desc: "Falls at the top of the bust. Pairs well with crew and high necklines.",
  },
  {
    inches: 24,
    cm: 60,
    name: "Matinee (long)",
    depth: 250,
    desc: "Rests on the bust line. Lets statement pendants stand out.",
  },
  {
    inches: 30,
    cm: 76,
    name: "Opera",
    depth: 300,
    desc: "Falls below the bust. Elegant over evening wear or doubled as a choker.",
  },
  {
    inches: 36,
    cm: 90,
    name: "Rope",
    depth: 345,
    desc: "Our longest length. Wear long, knot it, or wrap it two or three times.",
  },
];

const BRACELET_SIZES = [
  { size: "XS", wrist: "13 – 14", bracelet: "15 – 16" },
  { size: "S", wrist: "14 – 15", bracelet: "16 – 17" },
  { size: "M", wrist: "15 – 16", bracelet: "17 – 18" },
  { size: "L", wrist: "16 – 17", bracelet: "18 – 19" },
  { size: "XL", wrist: "17 – 18", bracelet: "19 – 20" },
  { size: "XXL", wrist: "18 – 19", bracelet: "20 – 21" },
];

// Traditional Nepali / Indian bangle sizing: 2.4 = 2 4⁄16 inches inside diameter.
const BANGLE_SIZES = [
  { size: "2.2", dia: 54.0, circ: 169.6, hand: "Extra small" },
  { size: "2.4", dia: 57.2, circ: 179.6, hand: "Small" },
  { size: "2.6", dia: 60.3, circ: 189.5, hand: "Medium" },
  { size: "2.8", dia: 63.5, circ: 199.5, hand: "Large" },
  { size: "2.10", dia: 66.7, circ: 209.5, hand: "Extra large" },
  { size: "2.12", dia: 69.9, circ: 219.4, hand: "XXL" },
];

const STUD_SIZES = [3, 4, 5, 6, 7, 8, 10];

const EARRING_DROPS = [
  { style: "Studs", length: "Sits on the lobe", note: "Everyday wear" },
  { style: "Huggies", length: "Up to 12 mm", note: "Hugs the lobe" },
  { style: "Short drops", length: "15 – 30 mm", note: "Just below the lobe" },
  { style: "Long drops", length: "40 – 60 mm", note: "Mid-jaw length" },
  { style: "Shoulder dusters", length: "75 mm +", note: "Statement evening wear" },
];

const FAQS = [
  {
    q: "What if I'm between two ring sizes?",
    a: "Choose the larger size. A ring that is slightly loose is more comfortable than one that is tight, and it will be easier to get over the knuckle. For wide bands (6 mm and above), go up a further half size.",
  },
  {
    q: "Should I measure my dominant hand?",
    a: "Yes, if you'll wear the piece on that hand. Fingers on your dominant hand are usually up to half a size larger than the same finger on the other hand.",
  },
  {
    q: "When is the best time to measure?",
    a: "Measure at the end of the day at room temperature. Fingers and wrists swell in heat and shrink in the cold, so avoid measuring right after exercise, a shower, or coming in from the cold.",
  },
  {
    q: "Can I measure a ring I already own?",
    a: "Yes, this is one of the most accurate methods. Measure straight across the inside of the ring from edge to edge in millimetres and find the closest inside diameter in the chart.",
  },
  {
    q: "Are chain lengths measured with the clasp?",
    a: "Yes. All necklace and bracelet lengths are measured end to end, including the clasp. Pendants add their own drop below the chain.",
  },
  {
    q: "Can I get a ring resized after purchase?",
    a: "Many of our designs can be resized by our artisans. Rings with stones set all the way around the band, or with engraving on the inside, may have limited options, so contact us before ordering if you're unsure.",
  },
];

const SECTIONS = [
  { id: "rings", label: "Rings" },
  { id: "necklaces", label: "Necklaces" },
  { id: "bracelets", label: "Bracelets & Bangles" },
  { id: "earrings", label: "Earrings" },
  { id: "faq", label: "FAQ" },
];

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-12">
      <p className="text-sm tracking-[0.3em] uppercase text-gold mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-serif mb-4">{title}</h2>
      {children && (
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          {children}
        </p>
      )}
    </div>
  );
}

function StepCard({
  step,
  title,
  illustration,
  children,
}: {
  step: string;
  title: string;
  illustration: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border bg-background">
      <div className="aspect-4/3 bg-muted/40 flex items-center justify-center p-6 border-b border-border">
        {illustration}
      </div>
      <div className="p-6">
        <p className="text-xs tracking-[0.2em] uppercase text-gold mb-2">
          Method {step}
        </p>
        <h3 className="font-serif text-xl mb-2">{title}</h3>
        <div className="text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------- Illustrations ---------- */

function StringMethodIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full" aria-hidden>
      {/* finger */}
      <rect
        x="30"
        y="10"
        width="44"
        height="170"
        rx="22"
        className="fill-background stroke-foreground/40"
        strokeWidth="1.5"
      />
      <rect
        x="40"
        y="18"
        width="24"
        height="26"
        rx="10"
        className="fill-muted stroke-foreground/20"
      />
      <line
        x1="32"
        y1="80"
        x2="72"
        y2="80"
        className="stroke-foreground/15"
        strokeWidth="1"
      />
      {/* string wrap */}
      <ellipse
        cx="52"
        cy="110"
        rx="24"
        ry="7"
        className="fill-none stroke-gold"
        strokeWidth="2.5"
      />
      <path
        d="M 76 110 Q 100 110 110 140"
        className="fill-none stroke-gold"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      {/* ruler */}
      <rect
        x="100"
        y="140"
        width="130"
        height="30"
        className="fill-background stroke-foreground/40"
        strokeWidth="1.5"
      />
      {Array.from({ length: 13 }).map((_, i) => (
        <line
          key={i}
          x1={105 + i * 10}
          y1="140"
          x2={105 + i * 10}
          y2={i % 5 === 0 ? 154 : 148}
          className="stroke-foreground/50"
          strokeWidth="1"
        />
      ))}
      <line
        x1="105"
        y1="136"
        x2="199"
        y2="136"
        className="stroke-gold"
        strokeWidth="2.5"
      />
      <line
        x1="199"
        y1="128"
        x2="199"
        y2="170"
        className="stroke-foreground"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <text
        x="199"
        y="122"
        textAnchor="middle"
        className="fill-foreground text-[11px] font-medium"
      >
        54.4 mm
      </text>
    </svg>
  );
}

function RingDiameterIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full" aria-hidden>
      <circle
        cx="120"
        cy="90"
        r="62"
        className="fill-none stroke-gold"
        strokeWidth="12"
      />
      <circle
        cx="120"
        cy="90"
        r="68"
        className="fill-none stroke-foreground/20"
        strokeWidth="1"
      />
      <circle
        cx="120"
        cy="90"
        r="56"
        className="fill-none stroke-foreground/20"
        strokeWidth="1"
      />
      <line
        x1="66"
        y1="90"
        x2="174"
        y2="90"
        className="stroke-foreground"
        strokeWidth="1.5"
      />
      <path d="M 66 90 l 8 -5 v 10 z" className="fill-foreground" />
      <path d="M 174 90 l -8 -5 v 10 z" className="fill-foreground" />
      <text
        x="120"
        y="82"
        textAnchor="middle"
        className="fill-foreground text-[12px] font-medium"
      >
        17.3 mm
      </text>
      <text
        x="120"
        y="108"
        textAnchor="middle"
        className="fill-muted-foreground text-[10px]"
      >
        inside diameter
      </text>
    </svg>
  );
}

function StoreVisitIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full" aria-hidden>
      {/* ring sizer keys */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`rotate(${-30 + i * 15} 120 170)`}>
          <line
            x1="120"
            y1="170"
            x2="120"
            y2="70"
            className="stroke-foreground/40"
            strokeWidth="2"
          />
          <circle
            cx="120"
            cy={50}
            r={16 + i * 1.5}
            className={
              i === 2
                ? "fill-none stroke-gold"
                : "fill-none stroke-foreground/40"
            }
            strokeWidth={i === 2 ? 5 : 4}
          />
        </g>
      ))}
      <circle cx="120" cy="170" r="6" className="fill-foreground/60" />
    </svg>
  );
}

function NecklaceIllustration() {
  const neckY = 128;
  return (
    <svg
      viewBox="0 0 300 380"
      className="w-full h-auto max-w-sm mx-auto"
      role="img"
      aria-label="Diagram showing where each necklace length falls on the body"
    >
      {/* silhouette */}
      <ellipse
        cx="150"
        cy="58"
        rx="38"
        ry="46"
        className="fill-muted stroke-foreground/25"
        strokeWidth="1.5"
      />
      <path
        d="M 130 96 L 130 128 Q 70 132 42 170 Q 30 190 30 230 L 30 380 L 270 380 L 270 230 Q 270 190 258 170 Q 230 132 170 128 L 170 96"
        className="fill-muted stroke-foreground/25"
        strokeWidth="1.5"
      />
      {/* collarbones */}
      <path
        d="M 88 150 Q 118 146 146 156 M 154 156 Q 182 146 212 150"
        className="fill-none stroke-foreground/15"
        strokeWidth="1.5"
      />
      {NECKLACE_LENGTHS.map((n, i) => {
        const startY = n.inches === 14 ? 112 : neckY;
        const x1 = n.inches === 14 ? 130 : 128 - Math.min(i, 3) * 2;
        const x2 = 300 - x1;
        const w = 22 + (n.depth - 140) * 0.9;
        const cy = (4 * n.depth - startY) / 3;
        const highlight = n.inches === 18;
        return (
          <g key={n.inches}>
            <path
              d={`M ${x1} ${startY} C ${150 - w} ${cy}, ${150 + w} ${cy}, ${x2} ${startY}`}
              className={
                highlight
                  ? "fill-none stroke-gold"
                  : "fill-none stroke-foreground/50"
              }
              strokeWidth={highlight ? 2.5 : 1.2}
            />
            <circle
              cx="150"
              cy={n.depth}
              r={highlight ? 3.5 : 2.5}
              className={highlight ? "fill-gold" : "fill-foreground/60"}
            />
            <text
              x={i % 2 === 0 ? 10 : 290}
              y={n.depth + 4}
              textAnchor={i % 2 === 0 ? "start" : "end"}
              className={
                highlight
                  ? "fill-gold text-[12px] font-semibold"
                  : "fill-foreground/80 text-[11px]"
              }
            >
              {n.inches}&quot;
            </text>
            <line
              x1={i % 2 === 0 ? 32 : 268}
              y1={n.depth}
              x2={i % 2 === 0 ? 146 : 154}
              y2={n.depth}
              className="stroke-foreground/15"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          </g>
        );
      })}
    </svg>
  );
}

function WristIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full" aria-hidden>
      {/* forearm + hand */}
      <path
        d="M 60 180 L 88 95 Q 92 80 86 60 Q 80 30 100 18 Q 120 8 150 18 Q 168 28 160 60 Q 154 80 158 95 L 186 180"
        className="fill-background stroke-foreground/40"
        strokeWidth="1.5"
      />
      {/* wrist bone */}
      <circle cx="152" cy="104" r="3" className="fill-foreground/20" />
      {/* tape */}
      <ellipse
        cx="123"
        cy="104"
        rx="37"
        ry="9"
        className="fill-none stroke-gold"
        strokeWidth="3"
      />
      <path
        d="M 160 104 L 222 104"
        className="stroke-gold"
        strokeWidth="3"
      />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={i}
          x1={166 + i * 8}
          y1="100"
          x2={166 + i * 8}
          y2="108"
          className="stroke-background"
          strokeWidth="1"
        />
      ))}
      <text
        x="196"
        y="92"
        textAnchor="middle"
        className="fill-foreground text-[11px] font-medium"
      >
        15.5 cm
      </text>
    </svg>
  );
}

function BangleIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full" aria-hidden>
      {/* hand with thumb tucked in, palm facing viewer */}
      <path
        d="M 80 175 L 82 120 Q 70 110 72 90 L 74 40 Q 76 28 86 28 Q 96 28 96 40 L 96 30 Q 98 16 110 16 Q 122 16 122 30 L 122 34 Q 124 22 136 22 Q 148 22 148 36 L 148 48 Q 150 38 160 38 Q 170 40 170 52 L 168 100 Q 166 118 158 124 L 160 175"
        className="fill-background stroke-foreground/40"
        strokeWidth="1.5"
      />
      <path
        d="M 82 96 Q 110 104 130 94"
        className="fill-none stroke-foreground/25"
        strokeWidth="1.5"
      />
      {/* measurement across the knuckles */}
      <line
        x1="70"
        y1="70"
        x2="172"
        y2="70"
        className="stroke-gold"
        strokeWidth="2.5"
      />
      <path d="M 70 70 l 8 -5 v 10 z" className="fill-gold" />
      <path d="M 172 70 l -8 -5 v 10 z" className="fill-gold" />
      <text
        x="200"
        y="74"
        textAnchor="middle"
        className="fill-foreground text-[11px] font-medium"
      >
        widest
      </text>
      <text
        x="200"
        y="87"
        textAnchor="middle"
        className="fill-foreground text-[11px] font-medium"
      >
        point
      </text>
    </svg>
  );
}

/* ---------- Page ---------- */

const SizeGuidePage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-12 xl:py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Size Guide
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Finding Your Perfect Fit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            At Aryal Siring Gems, we want your jewelry to feel as natural as it
            looks. Measure at home in minutes with the guides below, and use
            our charts to convert between US, UK, EU and Nepali / Indian sizes.
          </p>
          <nav
            aria-label="Size guide sections"
            className="flex flex-wrap justify-center gap-2"
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-5 py-2.5 text-xs tracking-widest uppercase border border-border bg-background transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ---------- RINGS ---------- */}
      <section id="rings" className="scroll-mt-24 py-12 md:py-16 xl:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center mb-14">
            <div className="lg:col-span-3">
              <SectionHeading eyebrow="Rings" title="Ring Size Guide">
                We use US standard ring sizing. Choose any of the three methods
                below to find your size, then check the conversion chart. For
                the most accurate result, measure the exact finger you plan to
                wear the ring on.
              </SectionHeading>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Measure at the end of the day, when fingers are at their largest.",
                  "Make sure the ring can slide over your knuckle.",
                  "For wide bands (6 mm and above), go up half a size.",
                  "Between two sizes? Always choose the larger one.",
                ].map((tip) => (
                  <li key={tip} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <img
                src="/images/home/size-ring.jpg"
                alt="Handmade silver ring with a tiger eye stone worn on a finger"
                className="w-full aspect-4/5 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <StepCard
              step="01"
              title="String or Paper"
              illustration={<StringMethodIllustration />}
            >
              <ol className="list-decimal pl-4 space-y-1">
                <li>
                  Wrap a strip of paper or non-stretch string around the base
                  of your finger.
                </li>
                <li>Mark the point where the ends meet.</li>
                <li>
                  Lay it flat against a ruler and measure the length in mm.
                </li>
                <li>Match it to the circumference column in the chart.</li>
              </ol>
            </StepCard>
            <StepCard
              step="02"
              title="Measure an Existing Ring"
              illustration={<RingDiameterIllustration />}
            >
              <ol className="list-decimal pl-4 space-y-1">
                <li>Choose a ring that fits the intended finger well.</li>
                <li>Place it on a flat surface.</li>
                <li>
                  Measure the inside diameter from edge to edge, straight
                  across the centre.
                </li>
                <li>Match it to the inside diameter column in the chart.</li>
              </ol>
            </StepCard>
            <StepCard
              step="03"
              title="Visit a Jeweller"
              illustration={<StoreVisitIllustration />}
            >
              <p>
                The most accurate method. Any local jeweller can size you in
                seconds with a professional ring sizer. Try the sizes on your
                finger, and choose the one that slides over your knuckle with a
                little resistance and doesn&apos;t spin freely.
              </p>
            </StepCard>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
            <h3 className="font-serif text-2xl">
              International Ring Size Chart
            </h3>
            <p className="text-xs text-muted-foreground">
              Scroll sideways on smaller screens.
            </p>
          </div>
          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-160 text-sm text-left">
              <thead className="bg-muted/60 text-xs tracking-widest uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">US / Canada</th>
                  <th className="px-4 py-3 font-medium">UK / Australia</th>
                  <th className="px-4 py-3 font-medium">EU</th>
                  <th className="px-4 py-3 font-medium">Nepal / India</th>
                  <th className="px-4 py-3 font-medium">Inside Diameter</th>
                  <th className="px-4 py-3 font-medium">Circumference</th>
                </tr>
              </thead>
              <tbody>
                {RING_SIZES.map((r) => (
                  <tr
                    key={r.us}
                    className="border-t border-border transition-colors hover:bg-gold/10"
                  >
                    <td className="px-4 py-2.5 font-serif text-base">{r.us}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {r.uk}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {r.eu}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {r.in}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {r.dia.toFixed(1)} mm
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {r.circ.toFixed(1)} mm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Average ring sizes are US 5–7 for women and US 8–10 for men.
          </p>
        </div>
      </section>

      {/* ---------- NECKLACES ---------- */}
      <section
        id="necklaces"
        className="scroll-mt-24 py-12 md:py-16 xl:py-24 bg-muted/30"
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <SectionHeading eyebrow="Necklaces" title="Necklace Length Guide">
            Necklace lengths are measured end to end, including the clasp.
            Where a necklace sits depends on your height, neck size and build,
            so use the diagram as a guide. The quickest check: lay a string
            around your neck at the length you want and measure it.
          </SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="bg-background border border-border p-6 md:p-10">
              <NecklaceIllustration />
              <p className="text-xs text-center text-muted-foreground mt-4">
                Shown on an average 5&apos;5&quot; (165 cm) frame.{" "}
                <span className="text-gold">18&quot;</span> is our most
                popular length.
              </p>
            </div>

            <div className="divide-y divide-border border-y border-border">
              {NECKLACE_LENGTHS.map((n) => (
                <div
                  key={n.inches}
                  className="grid grid-cols-[88px_1fr] gap-4 py-4"
                >
                  <div>
                    <p className="font-serif text-2xl leading-none">
                      {n.inches}&quot;
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {n.cm} cm
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm tracking-widest uppercase mb-1">
                      {n.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {n.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            <img
              src="/images/home/size-necklace.jpg"
              alt="Oxidised silver floral choker necklace worn at the collarbone"
              className="w-full aspect-4/5 md:aspect-auto md:h-full object-cover"
              loading="lazy"
            />
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Choosing a Choker",
                  body: "Measure around your neck and add 5 cm (2\") for a comfortable fit. If your neck measures 35 cm or more, a 16\" chain will sit closer to 18\".",
                },
                {
                  title: "Layering",
                  body: "Leave 5 cm (2\") between each layer so the chains don't tangle — for example 16\", 18\" and 20\". Mix textures and pendant sizes for depth.",
                },
                {
                  title: "Pendants",
                  body: "A pendant adds its own drop below the chain. Heavier pendants pull the chain into a V and sit slightly lower than lighter ones.",
                },
                {
                  title: "Necklines",
                  body: "Crew and high necks suit 20\"+ lengths. V-necks pair well with 18\"–20\" pendants. Strapless and off-shoulder looks are ideal for 14\"–16\".",
                },
              ].map((tip) => (
                <div
                  key={tip.title}
                  className="bg-background border border-border p-6"
                >
                  <h3 className="font-serif text-lg mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tip.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BRACELETS & BANGLES ---------- */}
      <section id="bracelets" className="scroll-mt-24 py-12 md:py-16 xl:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center mb-14">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <img
                src="/images/home/size-bracelet.jpg"
                alt="Ornate silver bracelet worn on a raised wrist in sunlight"
                className="w-full aspect-4/5 object-cover"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-3 order-1 lg:order-2">
              <SectionHeading
                eyebrow="Bracelets & Bangles"
                title="Bracelet & Bangle Size Guide"
              >
                Chain bracelets are sized by length, so start with your wrist.
                Bangles have no clasp and must slide over your hand, so they are
                sized by the widest part of your hand instead.
              </SectionHeading>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Bracelets */}
            <div>
              <StepCard
                step="01"
                title="Chain Bracelets"
                illustration={<WristIllustration />}
              >
                <p className="mb-4">
                  Wrap a soft tape measure (or string) around your wrist just
                  above the wrist bone. Then add length for your preferred fit:
                </p>
                <ul className="space-y-1 mb-6">
                  <li>
                    <span className="text-foreground">Snug:</span> wrist + 1.5
                    cm
                  </li>
                  <li>
                    <span className="text-foreground">Comfort:</span> wrist + 2
                    cm (recommended)
                  </li>
                  <li>
                    <span className="text-foreground">Loose:</span> wrist + 2.5
                    cm
                  </li>
                </ul>
                <div className="overflow-x-auto border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/60 text-xs tracking-widest uppercase text-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Size</th>
                        <th className="px-4 py-3 font-medium">Wrist (cm)</th>
                        <th className="px-4 py-3 font-medium">
                          Bracelet (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {BRACELET_SIZES.map((b) => (
                        <tr
                          key={b.size}
                          className="border-t border-border hover:bg-gold/10"
                        >
                          <td className="px-4 py-2.5 font-serif text-base text-foreground">
                            {b.size}
                          </td>
                          <td className="px-4 py-2.5">{b.wrist}</td>
                          <td className="px-4 py-2.5">{b.bracelet}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </StepCard>
            </div>

            {/* Bangles */}
            <div>
              <StepCard
                step="02"
                title="Bangles & Cuffs"
                illustration={<BangleIllustration />}
              >
                <p className="mb-4">
                  Bring your thumb and little finger together as if putting on
                  a bangle. Measure straight across the widest point of your
                  knuckles, then choose the bangle with an inside diameter just
                  above that number. You can also measure the inside of a
                  bangle you already own.
                </p>
                <div className="overflow-x-auto border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/60 text-xs tracking-widest uppercase text-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Size</th>
                        <th className="px-4 py-3 font-medium">Diameter</th>
                        <th className="px-4 py-3 font-medium">
                          Circumference
                        </th>
                        <th className="px-4 py-3 font-medium">Hand</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BANGLE_SIZES.map((b) => (
                        <tr
                          key={b.size}
                          className="border-t border-border hover:bg-gold/10"
                        >
                          <td className="px-4 py-2.5 font-serif text-base text-foreground">
                            {b.size}
                          </td>
                          <td className="px-4 py-2.5">{b.dia.toFixed(1)} mm</td>
                          <td className="px-4 py-2.5">
                            {b.circ.toFixed(1)} mm
                          </td>
                          <td className="px-4 py-2.5">{b.hand}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-4">
                  Cuffs are adjustable: gently open or close them at the back,
                  never at the ends.
                </p>
              </StepCard>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- EARRINGS ---------- */}
      <section
        id="earrings"
        className="scroll-mt-24 py-12 md:py-16 xl:py-24 bg-muted/30"
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center mb-14">
            <div className="lg:col-span-3">
              <SectionHeading eyebrow="Earrings" title="Earring Size Guide">
                Earrings don&apos;t need to be sized, but knowing the scale
                helps you choose. Stud sizes refer to the width of the stone or
                face; drop lengths are measured from the top of the ear wire or
                post to the bottom of the earring.
              </SectionHeading>
            </div>
            <div className="lg:col-span-2">
              <img
                src="/images/home/size-earrings.jpg"
                alt="Pair of engraved silver drop earrings on black fabric"
                className="w-full aspect-4/3 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-background border border-border p-6 md:p-8 flex flex-col">
              <h3 className="font-serif text-xl mb-2">Stud Sizes</h3>
              <p className="text-sm text-muted-foreground mb-8">
                Relative scale of common stud widths. 4–5 mm is a classic
                everyday size; 7 mm and up makes a statement.
              </p>
              <div className="flex flex-1 items-end justify-between gap-2 py-6">
                {STUD_SIZES.map((mm) => (
                  <div
                    key={mm}
                    className="flex flex-col items-center gap-3 flex-1"
                  >
                    <span
                      className="size-[calc(var(--mm)*3.5px)] sm:size-[calc(var(--mm)*6px)] rounded-full bg-linear-to-br from-gold-light to-gold shadow-sm"
                      style={{ "--mm": mm } as React.CSSProperties}
                    />
                    <span className="text-xs text-muted-foreground">
                      {mm} mm
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background border border-border p-6 md:p-8">
              <h3 className="font-serif text-xl mb-6">Drop Lengths</h3>
              <div className="divide-y divide-border">
                {EARRING_DROPS.map((e) => (
                  <div
                    key={e.style}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <div>
                      <p className="text-sm tracking-widest uppercase">
                        {e.style}
                      </p>
                      <p className="text-xs text-muted-foreground">{e.note}</p>
                    </div>
                    <p className="font-serif text-lg whitespace-nowrap">
                      {e.length}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="scroll-mt-24 py-12 md:py-16 xl:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-gold mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-10">
              Sizing Questions
            </h2>
          </div>
          <SizeFaq faqs={FAQS} />
        </div>
      </section>

      {/* ---------- HELP ---------- */}
      <section className="pb-12 md:pb-16 xl:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="bg-foreground text-background px-6 py-12 md:p-16 text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-gold mb-3">
              Need Help?
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Still Unsure of Your Size?
            </h2>
            <p className="text-background/70 mb-8 max-w-xl mx-auto">
              Our experts can guide you through a virtual fitting on WhatsApp
              and help you choose the right size before you order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/9779860120739"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-90"
              >
                <Phone className="h-4 w-4" /> Chat With an Expert
              </a>
              <PrintButton />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SizeGuidePage;

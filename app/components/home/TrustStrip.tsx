import { Award, Banknote, Hand, Package, RotateCw } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";

const POINTS = [
  {
    icon: Package,
    label: "Free Shipping",
    description: `On orders over NPR ${FREE_SHIPPING_THRESHOLD.toLocaleString()}`,
  },
  { icon: Award, label: "925 Certified Silver", description: "Certificate with every piece" },
  { icon: Hand, label: "Handcrafted in Nepal", description: "By Kathmandu silversmiths" },
  { icon: RotateCw, label: "7-Day Returns", description: "Easy returns & refunds" },
  { icon: Banknote, label: "Cash on Delivery", description: "Pay when it arrives" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-background">
      <ul className="w-full max-w-390 mx-auto px-4 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
        {POINTS.map(({ icon: Icon, label, description }) => (
          <li key={label} className="flex items-start gap-3">
            <Icon className="h-5 w-5 shrink-0 mt-0.5 text-foreground" />
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

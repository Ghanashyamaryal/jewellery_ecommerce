export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  category: string;
  subcategory?: string;
  metalType: string;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  stoneType?: string;
  weight: string;
  rating?: number;
  description: string;
  shortDescription?: string;
  features: string[];
  images: string[];
  inStock: boolean;
  stockCount?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  occasion?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Himalayan Amethyst Ring",
    slug: "himalayan-amethyst-ring",
    price: 12500,
    comparePrice: 13889,
    discountType: "percentage",
    discountValue: 10,
    category: "Jewelry",
    subcategory: "Rings",
    metalType: "925 Sterling Silver",
    stoneType: "Amethyst",
    weight: "12g",
    shortDescription: "Handcrafted ring featuring deep purple Himalayan amethyst in intricate sterling silver filigree.",
    description: "A stunning handcrafted ring featuring a deep purple Himalayan amethyst set in intricate 925 sterling silver filigree work. The design draws inspiration from traditional Nepali motifs.",
    features: ["925 Certified Sterling Silver", "Handcrafted by Master Artisans", "Natural Himalayan Amethyst", "Certificate of Authenticity Included", "Traditional Nepali Design"],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    isNew: true,
    occasion: ["Everyday Wear", "Festive"],
  },
  {
    id: "2",
    name: "Turquoise Statement Necklace",
    slug: "turquoise-statement-necklace",
    price: 28000,
    comparePrice: 35000,
    discountType: "fixed",
    discountValue: 7000,
    category: "Jewelry",
    subcategory: "Necklaces",
    metalType: "925 Sterling Silver",
    stoneType: "Turquoise",
    weight: "45g",
    shortDescription: "Elegant statement necklace with genuine Tibetan turquoise stones crafted using traditional techniques.",
    description: "An elegant statement necklace featuring genuine Tibetan turquoise stones, handcrafted with traditional silversmithing techniques passed down through generations.",
    features: ["925 Certified Sterling Silver", "Handcrafted Traditional Design", "Natural Tibetan Turquoise", "Ethically Sourced Stones", "Adjustable Length"],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
    stockCount: 3,
    isFeatured: true,
    occasion: ["Statement", "Festive"],
  },
  {
    id: "3",
    name: "Moonstone Drop Earrings",
    slug: "moonstone-drop-earrings",
    price: 8500,
    category: "Jewelry",
    subcategory: "Earrings",
    metalType: "925 Sterling Silver",
    stoneType: "Moonstone",
    weight: "8g",
    shortDescription: "Delicate drop earrings with rainbow moonstone that shimmer with an ethereal blue glow.",
    description: "Delicate drop earrings featuring rainbow moonstone cabochons that shimmer with an ethereal blue glow. Perfect for adding a touch of mystique to any outfit.",
    features: ["925 Certified Sterling Silver", "Handcrafted Design", "Natural Rainbow Moonstone", "Secure Hook Closure", "Lightweight & Comfortable"],
    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
    stockCount: 8,
    isNew: true,
    occasion: ["Everyday Wear", "Office"],
  },
  {
    id: "4",
    name: "Garnet Pendant",
    slug: "garnet-pendant",
    price: 9500,
    category: "Jewelry",
    subcategory: "Pendants",
    metalType: "925 Sterling Silver",
    stoneType: "Garnet",
    weight: "10g",
    shortDescription: "Rich red garnet pendant in elegant silver bezel. Perfect January birthstone piece.",
    description: "A rich red garnet pendant set in an elegant silver bezel. This January birthstone piece radiates warmth and passion.",
    features: ["925 Certified Sterling Silver", "Handcrafted Bezel Setting", "Natural Red Garnet", "Chain Included", "January Birthstone"],
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
    stockCount: 12,
    occasion: ["Everyday Wear", "Festive"],
  },
  {
    id: "5",
    name: "Natural Amethyst Crystal",
    slug: "natural-amethyst-crystal",
    price: 4500,
    category: "Gemstones",
    metalType: "N/A",
    stoneType: "Amethyst",
    weight: "25g",
    shortDescription: "Beautiful natural amethyst crystal point from the Himalayan region.",
    description: "A beautiful natural amethyst crystal point sourced from the Himalayan region. Perfect for collectors or crystal enthusiasts.",
    features: ["Natural Himalayan Amethyst", "Ethically Sourced", "Certificate of Authenticity", "Unique Formation", "Healing Properties"],
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "6",
    name: "Silver Pooja Thali",
    slug: "silver-pooja-thali",
    price: 35000,
    category: "Lifestyle",
    subcategory: "Pooja Items",
    metalType: "925 Sterling Silver",
    weight: "150g",
    shortDescription: "Exquisite handcrafted pooja thali with traditional Nepali patterns and accessories.",
    description: "An exquisite handcrafted pooja thali set featuring traditional Nepali patterns. Includes diya holder and small containers for kumkum and rice.",
    features: ["925 Certified Sterling Silver", "Handcrafted Traditional Design", "Complete Pooja Set", "Includes Diya Holder", "Premium Gift Packaging"],
    images: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
    stockCount: 4,
    isFeatured: true,
  },
  {
    id: "7",
    name: "Oxidized Silver Cuff",
    slug: "oxidized-silver-cuff",
    price: 15000,
    comparePrice: 18000,
    discountType: "percentage",
    discountValue: 17,
    category: "Jewelry",
    subcategory: "Bracelets",
    metalType: "Oxidized Silver",
    weight: "35g",
    shortDescription: "Bold oxidized silver cuff with hand-carved tribal patterns inspired by ancient Nepali art.",
    description: "A bold oxidized silver cuff bracelet featuring intricate hand-carved tribal patterns inspired by ancient Nepali art.",
    features: ["925 Certified Silver", "Handcrafted & Hand-Carved", "Oxidized Finish", "Adjustable Size", "Ancient Tribal Design"],
    images: [
      "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
    stockCount: 7,
    occasion: ["Statement", "Everyday Wear"],
  },
  {
    id: "8",
    name: "Peridot Stud Earrings",
    slug: "peridot-stud-earrings",
    price: 6500,
    category: "Jewelry",
    subcategory: "Earrings",
    rating: 4.5,
    metalType: "925 Sterling Silver",
    stoneType: "Peridot",
    weight: "4g",
    shortDescription: "Classic stud earrings with vibrant green peridot. August birthstone symbolizing strength.",
    description: "Classic stud earrings featuring vibrant green peridot gemstones. August's birthstone symbolizing strength and balance.",
    features: ["925 Certified Sterling Silver", "Handcrafted Design", "Natural Peridot Stones", "Secure Push-Back Closure", "August Birthstone"],
    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
    stockCount: 10,
    isNew: true,
    occasion: ["Everyday Wear", "Office"],
  },
];

export const categories = [
  { name: "All", value: "all" },
  { name: "Rings", value: "rings" },
  { name: "Necklaces", value: "necklaces" },
  { name: "Earrings", value: "earrings" },
  { name: "Pendants", value: "pendants" },
  { name: "Bracelets", value: "bracelets" },
  { name: "Gemstones", value: "gemstones" },
  { name: "Pooja Items", value: "pooja-items" },
];

export const metalTypes = [
  { name: "All", value: "all" },
  { name: "925 Sterling Silver", value: "925-sterling-silver" },
  { name: "Oxidized Silver", value: "oxidized-silver" },
  { name: "Gold-Plated Silver", value: "gold-plated-silver" },
];

export const stoneTypes = [
  { name: "All", value: "all" },
  { name: "Amethyst", value: "amethyst" },
  { name: "Turquoise", value: "turquoise" },
  { name: "Moonstone", value: "moonstone" },
  { name: "Garnet", value: "garnet" },
  { name: "Peridot", value: "peridot" },
  { name: "No Stone", value: "no-stone" },
];

export const occasions = [
  { name: "All", value: "all" },
  { name: "Everyday Wear", value: "everyday-wear" },
  { name: "Festive", value: "festive" },
  { name: "Office", value: "office" },
  { name: "Statement", value: "statement" },
];
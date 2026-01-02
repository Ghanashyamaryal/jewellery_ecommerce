export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  category: string;
  subcategory?: string;
  metalType: string;
  stoneType?: string;
  weight: string;
  rating?: number;
  description: string;
  features: string[];
  images: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  occasion?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Himalayan Amethyst Ring",
    slug: "himalayan-amethyst-ring",
    price: 1250000,
    comparePrice: 15000,
    category: "Jewelry",
    subcategory: "Rings",
    metalType: "925 Sterling Silver",
    stoneType: "Amethyst",
    weight: "12g",
    description: "A stunning handcrafted ring featuring a deep purple Himalayan amethyst set in intricate 925 sterling silver filigree work. The design draws inspiration from traditional Nepali motifs.",
    features: ["925 Certified", "Handcrafted", "Natural Stone", "Certificate Included"],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    occasion: ["Everyday Wear", "Festive"],
  },
  {
    id: "2",
    name: "Turquoise Statement Necklace",
    slug: "turquoise-statement-necklace",
    price: 280000,
    comparePrice: 15000,
    category: "Jewelry",
    subcategory: "Necklaces",
    metalType: "925 Sterling Silver",
    stoneType: "Turquoise",
    weight: "45g",
    description: "An elegant statement necklace featuring genuine Tibetan turquoise stones, handcrafted with traditional silversmithing techniques passed down through generations.",
    features: ["925 Certified", "Handcrafted", "Natural Stone", "Ethically Sourced"],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
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
    description: "Delicate drop earrings featuring rainbow moonstone cabochons that shimmer with an ethereal blue glow. Perfect for adding a touch of mystique to any outfit.",
    features: ["925 Certified", "Handcrafted", "Natural Stone"],
    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
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
    description: "A rich red garnet pendant set in an elegant silver bezel. This January birthstone piece radiates warmth and passion.",
    features: ["925 Certified", "Handcrafted", "Natural Stone"],
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
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
    description: "A beautiful natural amethyst crystal point sourced from the Himalayan region. Perfect for collectors or crystal enthusiasts.",
    features: ["Natural", "Ethically Sourced", "Certificate Included"],
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80",
    ],
    inStock: true,
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
    description: "An exquisite handcrafted pooja thali set featuring traditional Nepali patterns. Includes diya holder and small containers for kumkum and rice.",
    features: ["925 Certified", "Handcrafted", "Traditional Design"],
    images: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",

    ],
    inStock: true,
    isFeatured: true,
  },
  {
    id: "7",
    name: "Oxidized Silver Cuff",
    slug: "oxidized-silver-cuff",
    price: 15000,
    category: "Jewelry",
    subcategory: "Bracelets",
    metalType: "Oxidized Silver",
    weight: "35g",
    description: "A bold oxidized silver cuff bracelet featuring intricate hand-carved tribal patterns inspired by ancient Nepali art.",
    features: ["925 Certified", "Handcrafted", "Oxidized Finish"],
    images: [
      "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",

    ],
    inStock: true,
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
    description: "Classic stud earrings featuring vibrant green peridot gemstones. August's birthstone symbolizing strength and balance.",
    features: ["925 Certified", "Handcrafted", "Natural Stone"],
    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop&q=80",

    ],
    inStock: true,
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

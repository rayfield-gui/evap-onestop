export type Flavor = { code: string; name: string; shopeeImage?: string };

export type Product = {
  slug: string;
  category: string;
  name: string;
  subtitle?: string;
  price: string;
  priceValue: number;
  image: string;
  listingImage?: string;
  shopeeUrl: string;
  flavors: Flavor[];
};

export const SHOPEE_STORE = "https://shopee.ph/blackpanther349";

const SHOPEE = "https://shopee.ph/product/1896790461";

function f(list: string[]): Flavor[] {
  return list.map((entry) => {
    const i = entry.indexOf(" - ");
    return { code: entry.slice(0, i), name: entry.slice(i + 3) };
  });
}

const raw: Omit<Product, "category" | "image">[] = [
  {
    slug: "x-ultra",
    name: "X-Ultra",
    price: "₱229",
    priceValue: 229,
    shopeeUrl: `${SHOPEE}/44183747176/`,
    flavors: f([
      "Pink5 - Morning Garden",
      "Purple5 - Summer Dew",
      "Blue5 - Bubble Dream",
      "Green5 - Cold Breeze",
      "Yellow5 - Cloud Spring",
    ]),
  },
  {
    slug: "escobars",
    name: "Escobars",
    price: "₱259",
    priceValue: 259,
    shopeeUrl: `${SHOPEE}/49618697417/`,
    flavors: f([
      "Purple9 - Berry Snow",
      "Brown9 - Bahama Mama",
      "Blue9 - Bubble Berry",
      "Yellow9 - Honey Mango",
      "White9 - Whipp'd",
      "Peach9 - Peach Watermelon",
      "Black9 - Black Dragon Ice",
      "Pink9 - Pixie Dust",
      "OBlue9 - Ocean Mist",
      "Orange9 - Citrus Circus",
    ]),
  },
  {
    slug: "xblack-elite-v1-8k",
    name: "XBlack Elite V1 8K",
    price: "₱279",
    priceValue: 279,
    shopeeUrl: `${SHOPEE}/45366441120/`,
    flavors: f([
      "Orange2 - Very More",
      "LightGreen2 - Very Baguio",
      "Pink2 - Sparkle Squeeze",
      "Red2 - Red Pulp",
      "Maroon2 - Red Cannon",
      "Green2 - Green Tokyo",
      "Yellow2 - Cheer Blast",
      "Blue2 - Blue Freeze",
      "DarkGreen2 - Bacteria Monster",
    ]),
  },
  {
    slug: "vnsn-12k",
    name: "VNSN 12K",
    price: "₱259",
    priceValue: 259,
    shopeeUrl: `${SHOPEE}/55466406723/`,
    flavors: f([
      "IBlue10 - Lush Ice",
      "Pink10 - Pink Lemonade",
      "Red10 - Strawberry",
      "Purple10 - Grapes Ice",
      "RedY10 - Blueberry Razz Lemonade",
      "Peach10 - Peach Mango",
      "Yellow10 - Mango Strawberry Ice",
      "Green10 - Double Apple",
      "Violet10 - Aloe Grape",
      "Blue10 - Blueberry Ice",
      "BPeach10 - Peach Ice",
      "RedB10 - Bad Bull",
    ]),
  },
  {
    slug: "vkup-25k",
    name: "VKUP 25K",
    price: "₱259",
    priceValue: 259,
    shopeeUrl: `${SHOPEE}/47566431747/`,
    flavors: f([
      "Red11 - Strawberry Party Punch",
      "YGreen11 - Apple Duo Ice",
      "Peach11 - Peach Ice",
      "BRed11 - Crunch Watermelon Ocean",
      "MGreen11 - Verry Berry Mint",
      "Blue11 - Blue Bubble Yum",
      "BlueI11 - Very Berry Ice",
      "BlueR11 - Blue Razz Zing",
      "Orange11 - Honey Loupe Burst",
      "PRed11 - Cherry Berry Bomb",
      "Yellow11 - Zesty Lemon Mint",
      "Purple11 - Velvet Grape Mint",
      "Green11 - Minty Sweet Twist",
      "YellowB11 - Exotic Mango Ice",
      "NGreen11 - Winter Green",
    ]),
  },
  {
    slug: "xblack-elite-v2-12k",
    name: "XBlack Elite V2 12K",
    price: "₱320",
    priceValue: 320,
    shopeeUrl: `${SHOPEE}/54066402747/`,
    flavors: f([
      "Red4 - Red Pulp",
      "Black4 - Black Wave",
      "Pink4 - Green Tokyo",
      "Purple4 - Bacteria Monster",
      "Orange4 - Rainbow Punch",
      "Yellow4 - Green Apple",
      "Blue4 - Mixed Berries",
      "NavyG4 - Lemon Lime",
      "Green4 - Very Baguio",
    ]),
  },
  {
    slug: "relx-infinity-pod-pro-2",
    name: "Relx Pod Pro V2",
    price: "₱300",
    priceValue: 300,
    shopeeUrl: `${SHOPEE}/26945593743/`,
    flavors: f([
      "Red6 - Fresh Red",
      "Green6 - Garden Heart",
      "Black6 - Dark Sparkle",
      "Blue6 - Tangy Purple",
      "YGreen6 - Crisp Green",
      "White6 - White Freeze",
      "Pink6 - Fragrant Burst",
      "Purple6 - Purple Snow",
      "Brown6 - Tobacco",
    ]),
  },
  {
    slug: "uwell-prime-bg-12k",
    name: "Uwell Prime BG 12K",
    price: "₱259",
    priceValue: 259,
    shopeeUrl: `${SHOPEE}/27195603677/`,
    flavors: f([
      "Green13 - Miami Mint",
      "Red13 - Strawberry Kiwi Pom",
      "GreenR13 - Watermelon",
      "RedP13 - Strawberry",
      "Pink13 - Dragon Fruit Raspberry",
      "Blue13 - Blueberry Cherry Raspberry",
      "WBlue13 - Watermelon Breeze",
      "RedR13 - Apple Raspberry",
      "Purple13 - Lush Ice Berry",
      "White13 - Strazzberry",
      "Peach13 - Peach Pear Candy",
    ]),
  },
  {
    slug: "lightrise-tb-18k",
    name: "Lightrise TB 18K",
    price: "₱459",
    priceValue: 459,
    shopeeUrl: `${SHOPEE}/53366415173/`,
    flavors: f([
      "Pink14 - Berry Starburst",
      "Orange14 - Mango Shake",
      "LBlue14 - Blue Cotton Candy",
      "LGreen14 - Cool Mint",
      "BBlue14 - Blue Mint",
      "Black14 - Dou Black Ice",
      "Red14 - Watermelon Ice",
    ]),
  },
  {
    slug: "nasty-px-15k",
    name: "Nasty PX 15K",
    price: "₱259",
    priceValue: 259,
    shopeeUrl: `${SHOPEE}/50466420332/`,
    flavors: f([
      "Purple15 - Enigma",
      "Yellow15 - Merage",
      "Blue15 - Illusion",
      "Red15 - Cryptik",
    ]),
  },
  {
    slug: "antbar-bh-12k",
    name: "Antbar BH 12K",
    price: "₱259",
    priceValue: 259,
    shopeeUrl: `${SHOPEE}/53316402466/`,
    flavors: f([
      "Red16 - Strawberry Watermelon",
      "Ice16 - Lush Ice",
      "Green16 - Crisp Apple",
      "Purple16 - Purple Bomb",
      "Yellow16 - Tropical Mango",
      "Orange16 - Mango Bomb",
      "Blue16 - Blueberry Jam",
      "Cyan16 - Mighty Mint",
    ]),
  },
  {
    slug: "instabar-5k",
    name: "Instabar 5K",
    price: "₱259",
    priceValue: 259,
    shopeeUrl: `${SHOPEE}/45466440170/`,
    flavors: f([
      "Purple16 - Aloe Grapes",
      "Blue16 - Chill Menthol",
      "Cyan16 - Lemon Mint",
      "Orange16 - Mexican Mango",
      "Maroon16 - Quadberry Fusion",
      "YGreen16 - Sour Apple Ice",
      "Yellow16 - Strawberry Banana",
      "Green16 - Strawberry Kiwi",
      "Pink16 - Watermelon Bubblegum",
    ]),
  },
  {
    slug: "blck-35k",
    name: "BLCK 35K",
    price: "₱359",
    priceValue: 359,
    shopeeUrl: `${SHOPEE}/53416515645/`,
    flavors: f([
      "Black27 - Dark Bloom",
      "Gold27 - Golden Rush",
      "Orange27 - Mango Graham",
      "Lavender27 - Purple Mist",
      "RedOrange27 - Res Splash",
      "Rose27 - Rose Drop",
      "Red27 - Scarlet Kiss",
      "White27 - Shirota",
      "Magenta27 - Stre Ry4",
      "Pink27 - Sugar Rush",
      "Teal27 - Tropic Silk",
      "Violet27 - Very Mixed",
    ]),
  },
  {
    slug: "vanguard-chillax-12k",
    name: "Vanguard Chillax 12K",
    subtitle: "Set — Pods & Battery",
    price: "₱269 – ₱279",
    priceValue: 269,
    shopeeUrl:
      "https://shopee.ph/NEXVO-TYPE-C-CORD-CHLX-i.1896790461.54167684770?extraParams=%7B%22display_model_id%22%3A316498997665%2C%22model_selection_logic%22%3A3%7D",
    flavors: f([
      "28Red - Watermelon - Red Ice",
      "28Black - Black Currant - Black Ice",
      "28Blue - Cotton Candy - Red Bomb",
      "28Pink - Strawberry - Pink Ice",
      "28White - Yakult - Shirota",
      "28Yellow - Bubble Gum - Bubble Bomb",
      "28Purple - Mixed Berries - Mixed Garden",
      "28Green - Mint",
      "28Orange - Blueberry Ice - Blue Ice",
      "28Brown - Grapes - Violet Ice",
    ]),
  },
];

const CATEGORY: Record<string, string> = {
  "x-ultra": "Prefilled Pods",
  "xblack-elite-v1-8k": "Prefilled Pods",
  "xblack-elite-v2-12k": "Prefilled Pods",
  "relx-infinity-pod-pro-2": "Prefilled Pods",
  "nasty-px-15k": "Prefilled Pods",
  "blck-35k": "Prefilled Pods",
  "vanguard-chillax-12k": "Pod Systems",
};

// Panther listing images from scripts/compose-products.mjs, keyed by product slug.
const LISTING: Record<string, string> = {
  "x-ultra": "x-ultra-cold-breeze",
  escobars: "escobars",
  "xblack-elite-v1-8k": "xblack-elite-v1-8k",
  "xblack-elite-v2-12k": "xblack-elite-v2-12k",
  "vnsn-12k": "vnsn-12k",
  "vkup-25k": "vkup-25k",
  "relx-infinity-pod-pro-2": "relx-infinity-pod-pro-2",
  "uwell-prime-bg-12k": "uwell-prime-bg-12k",
  "lightrise-tb-18k": "lightrise-tb-18k",
  "nasty-px-15k": "nasty-px-15k",
  "antbar-bh-12k": "antbar-bh-12k",
  "instabar-5k": "instabar-5k",
  "blck-35k": "blck-35k",
  "vanguard-chillax-12k": "chillax-set",
};

// Each listed product's Shopee variation photos are saved per flavor code in /products/shopee/<slug>/<code>.webp.
const listed: Product[] = raw.map((p) => ({
  ...p,
  category: CATEGORY[p.slug] ?? "Disposables",
  image: `/products/listing/${LISTING[p.slug]}.webp`,
  listingImage: `/products/shopee/${p.slug}.webp`,
  flavors: p.flavors.map((fl) => ({ ...fl, shopeeImage: `/products/shopee/${p.slug}/${fl.code.toLowerCase()}.webp` })),
}));

// Photographed products not on the old site: no flavor list or own Shopee link yet, so they point to the store.
// Prices are the selling prices from the pricing sheet; 0 means not on the sheet yet.
function pending(
  slug: string,
  name: string,
  category: string,
  image: string,
  priceValue: number,
  flavors: string[] = [],
): Product {
  return {
    slug,
    name,
    category,
    price: priceValue ? `₱${priceValue}` : "",
    priceValue,
    image: `/products/listing/${image}.webp`,
    shopeeUrl: SHOPEE_STORE,
    flavors: f(flavors),
  };
}

const unlisted: Product[] = [
  pending("x-ultra-prime", "X-Ultra Prime", "Prefilled Pods", "x-ultra-a", 430, ["Purple - Purple Mist"]),
  pending("x-slimbar-pod", "X-Slimbar Pod", "Prefilled Pods", "x-vape-other", 430, ["Yellow - Yellow Tropic"]),
  pending("x-aero", "X-Aero", "Disposables", "x-aero", 580, ["Yellow - Yellow Freeze"]),
  pending("black-elite", "Black Elite", "Prefilled Pods", "black-elite", 0, ["Yellow - Very More"]),
  pending("chillax-infinite", "Chillax Infinite Pod", "Prefilled Pods", "chillax-infinite", 450, ["Green - Summer Craze"]),
  pending("kaizer-clear-pod", "Kaizer Pods", "Prefilled Pods", "kaizer-b", 500, ["Purple - Nrgy Gem"]),
  pending("kaizer-clear", "Kaizer Battery", "Pod Systems", "kaizer-a", 350),
  pending("x-slimbar", "X-Slimbar Device", "Pod Systems", "x-slimbar", 0, ["Black - Space Gray"]),
  pending("vanguard-go", "Vanguard Go x 2.0", "Pod Systems", "vanguard-go", 0),
  pending("vanguard-refillable-pod", "Vanguard Refillable Pod 2ml", "Cartridges", "vanguard-pods", 0),
  pending("oxva-nexlim-cartridge", "OXVA NeXlim Cartridge", "Cartridges", "nexlim-cartridge", 260),
  pending("oxva-xlim-cartridge", "OXVA Xlim Cartridge", "Cartridges", "oxva-xlim-cartridge", 260),
  pending("the-cloner", "The Cloner Juice", "E-Liquids", "the-cloner", 450, ["Red - Strawberry RY4"]),
  pending("black-pod-formula", "Black Pod Formula", "E-Liquids", "black-tall", 450, ["Green - Green Tokyo"]),
  pending("flava", "Flava E-Juice", "E-Liquids", "flava", 400),
];

export const products: Product[] = [...listed, ...unlisted];

const SWATCHES: [string, string][] = [
  ["rbow", "conic-gradient(#ef4444,#f97316,#facc15,#22c55e,#3b82f6,#a855f7,#ef4444)"],
  ["lavender", "#b794f4"],
  ["magenta", "#d946ef"],
  ["maroon", "#881337"],
  ["navy", "#1e3a8a"],
  ["teal", "#14b8a6"],
  ["rose", "#fb7185"],
  ["gold", "#d4a72c"],
  ["peach", "#fdba8c"],
  ["cyan", "#22d3ee"],
  ["violet", "#a78bfa"],
  ["purple", "#9333ea"],
  ["pink", "#ec4899"],
  ["orange", "#f97316"],
  ["yellow", "#facc15"],
  ["green", "#22c55e"],
  ["blue", "#3b82f6"],
  ["brown", "#92400e"],
  ["black", "#0b0b0f"],
  ["white", "#f4f4f5"],
  ["red", "#ef4444"],
  ["ice", "#bae6fd"],
  ["gum", "#60a5fa"],
];

export function swatch(code: string): string {
  const c = code.toLowerCase();
  return SWATCHES.find(([k]) => c.includes(k))?.[1] ?? "#8b5cf6";
}

export function puffs(name: string): string | null {
  const m = name.match(/(\d+(?:\.\d+)?K)\b/i) ?? name.match(/\b(\d{4,5})\b/);
  return m ? m[1].toUpperCase() : null;
}

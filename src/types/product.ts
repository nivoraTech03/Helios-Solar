export type ProductCategory =
  | "solar-panels"
  | "lithium-batteries"
  | "inverter-batteries"
  | "ev-batteries"
  | "solar-inverters"
  | "solar-kits"
  | "charge-controllers"
  | "accessories";

export interface SpecificationItem {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: ProductCategory | string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  price: number;
  mrp: number;
  currency: string;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  featured: boolean;
  bestSeller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  applications: string[];
  wattage?: number;
  capacity?: string;
  voltage?: number | string;
  warranty: string;
  compatibility?: string;
  specifications: SpecificationItem[];
  features?: string[];
  boxIncludes?: string[];
  attributes?: Record<string, any>;
}

export interface CategoryInfo {
  id: ProductCategory | string;
  slug: string;
  name: string;
  description: string;
  tagline?: string;
  image: string;
  productCount: number;
  iconName?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  productName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  category: string;
  answer: string;
}

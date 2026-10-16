export const siteConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || "Helios Solar & Power",
  tagline: process.env.NEXT_PUBLIC_BRAND_TAGLINE || "Power Your Future. The Smarter Way.",
  description:
    "India's premier destination for high-efficiency solar panels, lithium energy storage, EV batteries, solar inverters, and hybrid rooftop solutions.",
  market: "India",
  currency: {
    code: "INR",
    symbol: "₹",
  },
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 98765 43210",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@heliossolar.in",
    address:
      process.env.NEXT_PUBLIC_ADDRESS ||
      "Sector 62, Electronic City, Noida, Uttar Pradesh 201309, India",
    workingHours: "Mon - Sat: 9:00 AM - 7:30 PM IST",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  social: {
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"}`,
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  mainNav: [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/shop" },
    { label: "Solar Panels", href: "/category/solar-panels" },
    { label: "Lithium Batteries", href: "/category/lithium-batteries" },
    { label: "Inverters", href: "/category/solar-inverters" },
    { label: "EV Batteries", href: "/category/ev-batteries" },
    { label: "Solar Kits", href: "/category/solar-kits" },
    { label: "Get Quote", href: "/quote" },
  ],
  announcement: {
    message: "⚡ Government Rooftop Solar Subsidy Eligible Systems Available | Fast Pan-India Dispatch",
    actionText: "Check Subsidy",
    actionHref: "/quote",
  },
};

/**
 * Builds a direct, URL-encoded WhatsApp link with prefilled message
 */
export function getWhatsAppUrl(message: string, customNumber?: string): string {
  const number = customNumber || siteConfig.contact.whatsappNumber;
  const cleanNumber = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Helper to build product enquiry WhatsApp message
 */
export function getProductEnquiryUrl(product: {
  name: string;
  model: string;
  price?: number;
  slug: string;
}): string {
  const priceText = product.price
    ? `Price: ₹${product.price.toLocaleString("en-IN")}`
    : "Price: On Request";
  const url = `${siteConfig.url}/product/${product.slug}`;
  const message = `Hello ${siteConfig.name}! I am interested in:
• Product: ${product.name}
• Model/SKU: ${product.model}
• ${priceText}
• Product Link: ${url}

Please share availability, delivery estimate, and best quotation.`;
  return getWhatsAppUrl(message);
}

# Helios Solar & Power — Premium E-Commerce Website

A production-ready, mobile-responsive e-commerce platform engineered for solar panels, lithium (LiFePO4) energy storage, EV batteries, hybrid inverters, and renewable energy products.

---

## ⚡ Tech Stack & Architecture

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom solar theme (Emerald green, forest dark, solar amber/lime)
- **Icons:** Lucide React
- **State Management:** React Context API with LocalStorage persistence for Cart, Wishlist, and Comparison
- **Communication & Conversion:** Direct WhatsApp enquiry links, timed consultation modal, and quote builder

---

## 🚀 Key Features

### 1. High-Converting Product Discovery
- **Home Hero Section:** Engaging visuals, PM Surya Ghar subsidy notifications, and direct engineer chat.
- **8 Dedicated Product Categories:**
  1. Solar Panels (TOPCon, Mono-PERC, Polycrystalline, Bifacial)
  2. Lithium Batteries (LiFePO4 5.12kWh Wall, 2.56kWh Drop-in, 10.24kWh Server Rack)
  3. Inverter Batteries (Heavy Tall Tubular 150Ah & 220Ah)
  4. EV Batteries (AIS-156 Amendment III certified 60V scooter & 48V e-rickshaw packs)
  5. Solar Inverters (Hybrid dual MPPT, On-grid 3-phase, Off-grid pure sine wave)
  6. Turnkey Solar Kits (3kW & 5kW complete rooftop kits)
  7. MPPT Charge Controllers (60A auto voltage)
  8. Solar Cables & Accessories (4mm² copper tinned, IP68 MC4 connectors)
- **Interactive Solar Solution Finder:** Calculates home/business requirements and recommends matching products with direct WhatsApp export.
- **Category-Adaptive Filtering & Sorting:** Dynamic sidebar filters that adjust according to category (e.g. wattage, battery chemistry, voltage, inverter phase).
- **Live Search with Autocomplete:** Instant product suggestions with thumbnails and pricing.
- **Quick View Modal:** Full product preview without leaving the catalog page.

### 2. Multi-Product Technical Comparison
- Compare up to 4 solar or battery products side-by-side.
- Technical parameters compared: Rated Wattage, Voltage, Storage Capacity, Cycle Life, Warranties, Dimensions, and Compatibility.
- Floating bottom compare dock with one-click access.

### 3. Integrated WhatsApp Enquiry & Quoting System
- **Single Configurable Number:** Centrally maintained in `.env` and `src/config/site.ts`.
- **Pre-filled Dynamic Messages:** Formats product name, SKU, price, and customer requirements automatically into standard URL-encoded `wa.me` links.
- **Enquiry Modal:** Non-intrusive popup trigger (15s after initial visit or manually via CTAs) with Indian mobile number validation and direct WhatsApp routing.
- **Dedicated Request a Quote Page:** Comprehensive rooftop sizing questionnaire for customers needing formal subsidy guidance.

### 4. Shopping Cart & Proforma Invoice Drawer
- Add to cart with quantity management.
- Cart drawer with one-click **"Order / Quote via WhatsApp"** formatting the full bill of materials, quantities, and subtotal.

---

## 🛠️ Setup & Local Development

### 1. Prerequisites
- Node.js 18.17+ or 20+
- npm 9+

### 2. Configuration (`.env.local`)
Copy `.env.example` to `.env.local` or adjust:
```bash
NEXT_PUBLIC_BRAND_NAME="Helios Solar & Power"
NEXT_PUBLIC_BRAND_TAGLINE="Power Your Future. The Smarter Way."
NEXT_PUBLIC_WHATSAPP_NUMBER="919876543210" # International format without '+' or spaces
NEXT_PUBLIC_CONTACT_EMAIL="support@heliossolar.in"
NEXT_PUBLIC_CONTACT_PHONE="+91 98765 43210"
NEXT_PUBLIC_ADDRESS="Sector 62, Electronic City, Noida, Uttar Pradesh 201309, India"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Install & Run
```bash
# Install dependencies
npm install

# Start local development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📱 Mobile-First Responsive Design

Tested and optimized across all major breakpoints:
- **Mobile (320px - 480px):** Smooth drawer navigation, touch-friendly filter bottom drawer, stacked action buttons, non-intrusive floating WhatsApp action.
- **Tablets (768px):** 2-column product grids, responsive specs tables.
- **Laptops & Desktops (1024px - 1440px+):** Sticky header, 4-column product displays, side-by-side comparison matrix, sticky filter sidebar.

---

## 🔒 Policies & Compliance Included
- **Warranty Terms:** `src/app/warranty/page.tsx`
- **Shipping & Freight:** `src/app/shipping-policy/page.tsx`
- **Return & Refund:** `src/app/return-policy/page.tsx`
- **Privacy Policy:** `src/app/privacy-policy/page.tsx`
- **Terms & Conditions:** `src/app/terms/page.tsx`
- **Search Engine Optimization:** `sitemap.ts` and `robots.ts`

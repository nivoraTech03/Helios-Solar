"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { faqs } from "@/data/faqs";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { SolarSolutionFinder } from "@/components/SolarSolutionFinder";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SafeImage } from "@/components/SafeImage";
import { Product } from "@/types/product";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import {
  Sun,
  Zap,
  ShieldCheck,
  Truck,
  Headphones,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
  Battery,
  Flame,
  PackageCheck,
  Activity,
  Layers,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<"featured" | "bestseller" | "lithium" | "kits">("featured");
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].id);
  const [heroUnit, setHeroUnit] = useState<"panel" | "battery" | "kit">("panel");

  // Curated collections
  const featuredProducts = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.bestSeller);
  const lithiumProducts = products.filter((p) => p.category === "lithium-batteries");
  const solarKits = products.filter((p) => p.category === "solar-kits");

  const heroWaUrl = getWhatsAppUrl(
    `Hello ${siteConfig.name}! I would like to get a quote for a solar rooftop / battery system.`
  );

  // Active showcase products based on tab
  const getTabProducts = () => {
    switch (activeTab) {
      case "bestseller":
        return { items: bestSellers.slice(0, 4), viewAllHref: "/shop?sort=bestseller", title: "Best Selling Systems" };
      case "lithium":
        return { items: lithiumProducts.slice(0, 4), viewAllHref: "/category/lithium-batteries", title: "Smart LiFePO4 Energy Storage" };
      case "kits":
        return { items: solarKits.slice(0, 4), viewAllHref: "/category/solar-kits", title: "Turnkey Rooftop Solar Packages" };
      case "featured":
      default:
        return { items: featuredProducts.slice(0, 4), viewAllHref: "/shop?filter=featured", title: "Handpicked Premium Systems" };
    }
  };

  const currentShowcase = getTabProducts();

  // Hero Interactive Hardware Studio definitions
  const heroUnits = {
    panel: {
      id: "sp-550-bifacial",
      tabLabel: "550W TOPCon Panel",
      tabIcon: Sun,
      categoryLabel: "Tier-1 Bifacial PV Module",
      badge: "Tier-1 Dual-Glass Bifacial",
      name: "Helios 550W N-Type Dual-Glass TOPCon",
      highlight: "22.8% Cell Efficiency • Up to +30% Rear Gain",
      price: 15400,
      mrp: 18500,
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
      slug: "helios-550w-bifacial-topcon-solar-panel",
      tagline: "30-Year Linear Power Warranty",
      telemetryTop: "Live Simulation: 4.85 kW Peak",
      telemetryBottom: "Zero Degradation N-Type Silicon",
      specs: [
        { label: "Cell Type", value: "N-Type TOPCon" },
        { label: "Efficiency", value: "22.8% Peak" },
        { label: "Warranty", value: "30 Years" },
        { label: "Subsidy", value: "Direct DBT Ready" },
      ],
    },
    battery: {
      id: "bat-48v-100ah-wall",
      tabLabel: "5.12kWh LiFePO4 Vault",
      tabIcon: Battery,
      categoryLabel: "Smart Energy Storage",
      badge: "AIS-156 EV-Grade LiFePO4",
      name: "Helios PowerVault 5.12kWh 48V Storage",
      highlight: "6,000+ Deep Cycles • Smart LCD Touchscreen BMS",
      price: 112000,
      mrp: 135000,
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80",
      slug: "helios-powerwall-512kwh-lifepo4-battery",
      tagline: "10-Year Replacement Guarantee",
      telemetryTop: "SOC: 98% (Off-Grid Ready)",
      telemetryBottom: "Thermal Runaway Proof Chemistry",
      specs: [
        { label: "Capacity", value: "5.12 kWh (100Ah)" },
        { label: "Cycle Life", value: "6,000+ Deep Cycles" },
        { label: "Safety", value: "AIS-156 Certified" },
        { label: "Protocols", value: "CAN / RS485 Bus" },
      ],
    },
    kit: {
      id: "kit-3kw-rooftop",
      tabLabel: "3kW Rooftop Package",
      tabIcon: Zap,
      categoryLabel: "Turnkey Rooftop System",
      badge: "PM Surya Ghar Subsidy Ready",
      name: "Helios 3kW Turnkey On-Grid Rooftop System",
      highlight: "Generates 12-14 Units/Day • Direct Bank DBT",
      price: 145000,
      mrp: 172000,
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1000&q=80",
      slug: "helios-3kw-on-grid-rooftop-solar-kit-subsidy-ready",
      tagline: "Slashes Monthly Electricity Bills to ₹0",
      telemetryTop: "Subsidy Disbursal: ₹78,000 Direct",
      telemetryBottom: "Insured Pallet Transit Pan-India",
      specs: [
        { label: "Daily Output", value: "12-14 Units/Day" },
        { label: "Govt Subsidy", value: "Save ₹78,000" },
        { label: "Inverter", value: "Dual MPPT On-Grid" },
        { label: "Mounting", value: "Elevated Aluminum" },
      ],
    },
  };

  const currentHeroUnit = heroUnits[heroUnit];
  const activeHeroProduct = products.find((p) => p.id === currentHeroUnit.id);
  const heroUnitDiscount = calculateDiscount(currentHeroUnit.price, currentHeroUnit.mrp);

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-16">
      {/* =========================================================================
          1. HERO SECTION (High-Tech Clean Energy Cockpit)
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#060a12] via-[#0b1220] to-[#070b14] text-white pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-800/80">
        {/* Subtle Tech Grid mesh & Ambient Glow */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.45) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: High-Impact Messaging & Action Row */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Subsidy Announcement Ribbon */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/15 via-blue-500/10 to-amber-500/15 border border-blue-400/30 text-xs font-semibold backdrop-blur-xl max-w-full">
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-amber-300 font-bold shrink-0">PM Surya Ghar Yojana:</span>
                <span className="text-slate-200 truncate">
                  Direct DBT Subsidy up to <strong className="text-white font-extrabold">₹78,000</strong>
                </span>
                <Link
                  href="#solar-calculator"
                  className="hidden sm:inline-flex items-center gap-1 text-blue-300 hover:text-white font-bold ml-1 transition shrink-0"
                >
                  <span>Calculate Savings</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-blue-400 flex items-center justify-center lg:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tier-1 Clean Energy Systems & Storage</span>
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-white">
                  Ultra-High Efficiency Solar.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                    Zero Electricity Bills.
                  </span>
                </h1>
              </div>

              {/* Supporting Value Proposition */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Direct factory pricing on N-Type TOPCon dual-glass bifacial modules, 6,000-cycle smart LiFePO4 battery vaults, and turnkey hybrid systems. Officially backed by up to 30-year linear warranties and pan-India insured freight transit.
              </p>

              {/* High-Converting Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1">
                <Link
                  href="/shop"
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-400 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2 transition active:scale-95 group"
                >
                  <span>Explore Catalog (18+ Systems)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="#solar-calculator"
                  className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700/90 text-white font-bold text-sm rounded-xl border border-slate-700 hover:border-slate-500 backdrop-blur-md flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Calculate Rooftop Savings</span>
                </Link>

                <a
                  href={heroWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition active:scale-95 group"
                  title="Direct WhatsApp with our solar engineer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Engineer Chat</span>
                </a>
              </div>

              {/* Three Credibility Signals */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-5 sm:gap-6 text-xs text-slate-300 flex-wrap">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  100% Grade-A Cells Only
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  Up to 30 Yrs Warranty
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  Insured Freight Transit
                </span>
              </div>
            </div>

            {/* Right Column: Helios Interactive Hardware Studio */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Showcase Container Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-500/30 bg-slate-900/90 backdrop-blur-xl p-3.5 sm:p-4 space-y-3.5">
                  {/* Segmented Unit Selector Tabs */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
                    {(
                      [
                        { key: "panel", label: "550W Panel", icon: Sun },
                        { key: "battery", label: "LiFePO4 Vault", icon: Battery },
                        { key: "kit", label: "3kW Rooftop", icon: Zap },
                      ] as const
                    ).map((t) => {
                      const IconComp = t.icon;
                      const isSelected = heroUnit === t.key;
                      return (
                        <button
                          key={t.key}
                          onClick={() => setHeroUnit(t.key)}
                          className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            isSelected
                              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                          }`}
                        >
                          <IconComp className={`w-3.5 h-3.5 ${isSelected ? "text-amber-300" : "text-slate-400"}`} />
                          <span className="truncate">{t.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Unit Interactive Stage */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/11] bg-slate-950 border border-slate-800 group">
                    <SafeImage
                      src={currentHeroUnit.image}
                      alt={currentHeroUnit.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent" />

                    {/* Top Floating Telemetry Pills */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {currentHeroUnit.telemetryTop}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-[11px] font-black text-amber-300 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        4.95 Rating
                      </span>
                    </div>

                    {/* Bottom Info Bar inside image */}
                    <div className="absolute bottom-3 left-3 right-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                          {currentHeroUnit.badge}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                        {currentHeroUnit.name}
                      </h3>
                      <div className="flex items-center justify-between pt-0.5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-black text-white">
                            {formatPrice(currentHeroUnit.price)}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            {formatPrice(currentHeroUnit.mrp)}
                          </span>
                          {heroUnitDiscount && (
                            <span className="text-[10px] font-extrabold text-amber-300 bg-amber-500/20 border border-amber-400/30 px-1.5 py-0.2 rounded">
                              {heroUnitDiscount}% OFF
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-blue-300 font-semibold hidden sm:inline">
                          {currentHeroUnit.tagline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Micro Specs Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {currentHeroUnit.specs.map((s, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2 text-center"
                      >
                        <p className="text-[10px] text-slate-400 font-medium truncate">{s.label}</p>
                        <p className="text-xs font-bold text-white mt-0.5 truncate">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quick Action Footer */}
                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href={`/product/${currentHeroUnit.slug}`}
                      className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md shadow-blue-600/30"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {activeHeroProduct && (
                      <button
                        onClick={() => setQuickViewProduct(activeHeroProduct)}
                        className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition active:scale-95 border border-slate-700"
                        title="Quick View Details"
                      >
                        Quick Preview
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credibility & Official Compliance Matrix */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 backdrop-blur-md hover:border-blue-500/40 transition group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Tier-1 BloombergNEF</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Grade-A Dual-Glass TOPCon</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 backdrop-blur-md hover:border-amber-500/40 transition group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">₹78,000 DBT Subsidy</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">PM Surya Ghar Portal Ready</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 backdrop-blur-md hover:border-blue-500/40 transition group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                  <Battery className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">AIS-156 Certified</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">6,000+ Cycles LiFePO4</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 backdrop-blur-md hover:border-blue-500/40 transition group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Insured Freight Transit</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Palletized Pan-India Dispatch</p>
                </div>
              </div>
            </div>
          </div>

          {/* Official Standards Ribbon */}
          <div className="mt-6 pt-5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-slate-300">Official Compliance & Quality Standards:</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-[11px] font-bold text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
                MNRE Registered
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
                ALMM Approved
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
                BIS Certified (IS 14286)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
                ISO 9001:2015
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
                CE & IEC 61215
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. QUICK CATEGORY PILLS (Fast 1-Click Access)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-950/5 border border-slate-200/80 p-2 sm:p-3 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold transition-all border border-transparent hover:border-blue-200 flex items-center gap-2 shrink-0 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-125 transition-transform" />
                <span>{cat.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">({cat.productCount})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE TABBED PRODUCT SHOWCASE (Compact & Engaging)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header with collection tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-1.5">
              <Award className="w-3.5 h-3.5 text-blue-700" />
              <span>Verified Clean-Tech Hardware</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              {currentShowcase.title}
            </h2>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: "featured", label: "Featured", icon: Sparkles },
              { id: "bestseller", label: "Best Sellers", icon: Flame },
              { id: "lithium", label: "LiFePO4 Storage", icon: Battery },
              { id: "kits", label: "Complete Kits", icon: PackageCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                    isActive
                      ? "bg-white text-blue-700 shadow-sm shadow-slate-300"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentShowcase.items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Quick View All Link */}
        <div className="text-center pt-2">
          <Link
            href={currentShowcase.viewAllHref}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-full transition border border-blue-200"
          >
            <span>View Full {activeTab === "kits" ? "Solar Kits" : activeTab === "lithium" ? "Battery" : "Catalog"} Range</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          4. SHOP BY CATEGORY (Curated 8 Categories with Verified CDN Images)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Clean Energy Systems
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-0.5">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-blue-600 hover:text-blue-900 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. SMART SOLAR SOLUTION ESTIMATOR (Side-by-side Configurator)
         ========================================================================= */}
      <SolarSolutionFinder />

      {/* =========================================================================
          6. WHY CHOOSE HELIOS (4-Pillar Advantage Matrix)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Engineered For Reliability
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-1">
            Why System Owners & Installers Rely on {siteConfig.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
            Verified Grade-A hardware, transparent linear warranties, and direct solar engineer consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Grade-A Certified Cells</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every PV module and lithium pack is supplied with authentic factory flash test reports and zero micro-cracks.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Headphones className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Direct Engineer Consultation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Confirm string voltages, cable gauges, and battery compatibility directly over WhatsApp with our solar engineers.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Insured Freight Transit</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Reinforced wooden crates with doorstep insured pallet freight delivery across tier-1, tier-2, and rural Indian PINs.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Subsidy & Portal Assistance</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Direct paperwork guidance for PM Surya Ghar portal uploads, net-metering DISCOM sanctions, and DCR panels.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. PROOF & REPUTATION (Verified Reviews & FAQ in Compact Hub)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: 3 Customer Reviews Spotlight */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Real Owners</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                Verified Customer Reviews
              </h2>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                    <span className="text-[10px] text-slate-400">• {rev.location}</span>
                  </div>
                  {rev.verifiedPurchase && (
                    <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/50">
                      ✓ Verified Buyer
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
                <span className="text-[11px] font-semibold text-blue-800 block truncate">
                  Purchased: {rev.productName}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Compact FAQ Hub */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Quick Answers</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <Link href="/faq" className="text-xs font-bold text-blue-600 hover:underline">
              View All FAQs →
            </Link>
          </div>

          <div className="space-y-2.5">
            {faqs.slice(0, 4).map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 transition"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. HIGH-IMPACT ENERGY INDEPENDENCE CTA
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#090d16] via-[#0f172a] to-[#1e293b] text-white p-8 sm:p-10 relative overflow-hidden shadow-2xl border border-blue-500/30">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Clean Energy Independence
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Ready to Slash Your Electric Bills to Zero?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Talk directly with our solar engineers to confirm module compatibility, string voltages, and subsidy paperwork.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs sm:text-sm rounded-xl text-center transition active:scale-95 shadow-md"
              >
                Explore Products
              </Link>
              <Link
                href="/quote"
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 text-center transition active:scale-95"
              >
                Request Custom Quote
              </Link>
              <a
                href={heroWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-200 border border-[#25D366]/40 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>Instant WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

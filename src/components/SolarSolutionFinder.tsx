"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { products } from "@/data/products";
import {
  Sun,
  Home,
  Building2,
  Tractor,
  Zap,
  BatteryCharging,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { SafeImage } from "@/components/SafeImage";

type ApplicationChoice = "home" | "business" | "farm" | "ev" | "backup";

export function SolarSolutionFinder() {
  const [application, setApplication] = useState<ApplicationChoice>("home");
  const [monthlyBill, setMonthlyBill] = useState<string>("3000-6000");
  const [powerNeed, setPowerNeed] = useState<string>("3kw");

  // Derive live recommendation
  const getRecommendation = () => {
    if (application === "ev") {
      const prod = products.find((p) => p.id === "ev-60v-30ah-scooter") || products[0];
      return {
        title: "Electric Mobility Lithium Pack",
        subtitle: "60V / 48V AIS-156 Certified Pack",
        product: prod,
        dailyBenefit: "75-85 km range per charge with 3.5 hr fast recharge",
        savingsEst: "Saves ~₹3,500/mo vs petrol",
        subsidyEligible: false,
      };
    }
    if (application === "backup") {
      const prod = products.find((p) => p.id === "bat-48v-100ah-wall") || products[1];
      return {
        title: "Zero-Blackout LiFePO4 PowerVault",
        subtitle: "5.12 kWh Wall Storage + Hybrid Setup",
        product: prod,
        dailyBenefit: "Runs 1.5-ton AC, fridge & lighting seamlessly during cuts",
        savingsEst: "6,000+ deep cycles (10+ yr life)",
        subsidyEligible: false,
      };
    }
    if (application === "business") {
      const prod = products.find((p) => p.id === "inv-10kw-on-grid") || products[0];
      return {
        title: "Commercial High-Yield Solar Array",
        subtitle: "10kW Three-Phase On-Grid System",
        product: prod,
        dailyBenefit: "Produces 40-45 units/day, cutting peak tariff rates",
        savingsEst: "Saves ~₹12,000 - ₹18,000/mo",
        subsidyEligible: false,
      };
    }
    if (application === "farm") {
      const prod = products.find((p) => p.id === "sp-330-poly") || products[0];
      return {
        title: "Agricultural Solar Water Pumping System",
        subtitle: "Rugged High-Yield Solar PV Setup",
        product: prod,
        dailyBenefit: "Uninterrupted daytime water pumping without diesel fuel",
        savingsEst: "Zero diesel costs (PM-KUSUM ready)",
        subsidyEligible: true,
      };
    }
    // Default Home
    if (monthlyBill === "above-10000" || powerNeed === "5kw") {
      const prod = products.find((p) => p.id === "kit-5kw-hybrid-storage") || products[0];
      return {
        title: "5kW Hybrid Solar & PowerVault Kit",
        subtitle: "5kWp Bifacial Array + 5.12kWh LiFePO4",
        product: prod,
        dailyBenefit: "Generates ~22-25 units/day with full overnight backup",
        savingsEst: "Saves ~₹5,000 - ₹7,500/mo",
        subsidyEligible: true,
      };
    }
    const prod = products.find((p) => p.id === "kit-3kw-rooftop") || products[0];
    return {
      title: "3kW On-Grid Rooftop Solar Package",
      subtitle: "3.3kWp TOPCon Bifacial + Smart Inverter",
      product: prod,
      dailyBenefit: "Generates ~12-15 units/day, slashing home bills to ₹0",
      savingsEst: "Up to ₹78,000 PM Surya Ghar Subsidy",
      subsidyEligible: true,
    };
  };

  const rec = getRecommendation();

  const handleWhatsAppEnquiry = () => {
    const msg = `*Solar Solution Recommendation Enquiry*
Application: ${application.toUpperCase()}
Monthly Bill Bracket: ${monthlyBill}
Power Need: ${powerNeed}
Recommended System: ${rec.title} (${rec.product.name})

Please verify feasibility and provide quotation.`;
    const url = getWhatsAppUrl(msg);
    window.open(url, "_blank");
  };

  return (
    <section id="solar-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#1e293b] text-white p-6 sm:p-8 lg:p-10 border border-blue-500/30 shadow-2xl">
        {/* Subtle mesh glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Configurator Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-200 text-xs font-bold tracking-wide mb-2 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Smart Solar Sizing Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Find Your Ideal Energy System in Seconds
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Select your power requirements for instant hardware recommendations & savings.
              </p>
            </div>

            {/* Application Pills */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-300 block">
                1. Select Application
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: "home", label: "Home Rooftop", icon: Home },
                  { id: "business", label: "Commercial", icon: Building2 },
                  { id: "farm", label: "Farm / Pump", icon: Tractor },
                  { id: "ev", label: "EV Battery", icon: Zap },
                  { id: "backup", label: "Power Cut", icon: BatteryCharging },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = application === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setApplication(item.id as ApplicationChoice)}
                      className={`p-3 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition-all text-xs font-bold border ${
                        active
                          ? "bg-gradient-to-b from-blue-600 to-blue-500 text-white border-blue-400 shadow-lg shadow-blue-900/40 scale-[1.02]"
                          : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? "text-amber-300" : "text-blue-400"}`} />
                      <span className="truncate w-full text-[11px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bill / Size Selector Pills */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-300 block">
                2. Average Monthly Power Bill
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "under-2500", label: "< ₹2,500/mo" },
                  { id: "3000-6000", label: "₹3,000 - ₹6,000" },
                  { id: "6000-10000", label: "₹6,000 - ₹10,000" },
                  { id: "above-10000", label: "> ₹10,000/mo" },
                ].map((item) => {
                  const active = monthlyBill === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMonthlyBill(item.id)}
                      className={`py-2 px-3 rounded-xl text-center text-xs font-bold transition border ${
                        active
                          ? "bg-blue-600/30 text-amber-300 border-amber-400/60 shadow-sm"
                          : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                Zero Site Visit Fee
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                Tier-1 Components Only
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                Pan-India Transit
              </span>
            </div>
          </div>

          {/* Right Live Recommendation Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/40 text-[10px] font-extrabold uppercase tracking-wider">
                  Recommended System
                </span>
                {rec.subsidyEligible && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-black">
                    Govt. Subsidy Ready
                  </span>
                )}
              </div>

              {/* Product preview */}
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-blue-500/30">
                  <SafeImage
                    src={rec.product.images[0]}
                    alt={rec.title}
                    category={rec.product.category}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-white text-base leading-snug line-clamp-1">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-blue-300/80 font-medium truncate mt-0.5">
                    {rec.subtitle}
                  </p>
                  <p className="text-lg font-black text-white mt-1">
                    {formatPrice(rec.product.price)}
                  </p>
                </div>
              </div>

              {/* Benefit & savings pill */}
              <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 text-xs space-y-1">
                <p className="text-slate-200 font-medium">
                  ⚡ <strong>Expected Yield:</strong> {rec.dailyBenefit}
                </p>
                <p className="text-amber-400 font-bold">
                  💰 {rec.savingsEst}
                </p>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#22c35e] text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950 stroke-none" />
                  <span>Get Feasibility & Quote on WhatsApp</span>
                </button>
                <Link
                  href={`/product/${rec.product.slug}`}
                  className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center justify-center gap-1.5 transition text-center"
                >
                  <span>View Technical Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { Scale, X, ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";

export function CompareDrawer() {
  const { compareList, removeFromCompare, clearCompare, totalCompareItems } = useCompare();

  if (totalCompareItems === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl bg-slate-950/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700/80 p-3 sm:p-4 animate-slide-up print:hidden">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Indicator & Thumbnails */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-solar-amber uppercase tracking-wider shrink-0">
            <Scale className="w-4 h-4" />
            <span>Compare ({totalCompareItems}/4)</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {compareList.map((product) => (
              <div
                key={product.id}
                className="relative group w-10 h-10 rounded-lg overflow-hidden bg-white shrink-0 border border-slate-700"
              >
                <SafeImage
                  src={product.images[0]}
                  alt={product.name}
                  category={product.category}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute inset-0 bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
                  aria-label={`Remove ${product.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 transition"
          >
            Clear
          </button>
          <Link
            href="/compare"
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition active:scale-95"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { categories } from "@/data/categories";
import { ProductCategory } from "@/types/product";
import { RotateCcw, X, SlidersHorizontal, Check } from "lucide-react";

export interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  inStockOnly: boolean;
  panelTech: string;
  batteryChemistry: string;
  voltage: string;
  inverterType: string;
  phase: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  availableBrands: string[];
  activeCategory?: ProductCategory | string;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

export function ProductFilters({
  filters,
  setFilters,
  onReset,
  availableBrands,
  activeCategory,
  isMobileDrawer = false,
  onCloseMobile,
}: ProductFiltersProps) {
  const currentCategory = activeCategory || (filters.category as ProductCategory);

  return (
    <div className={`space-y-6 ${isMobileDrawer ? "p-5" : ""}`}>
      {/* Mobile Drawer Header */}
      {isMobileDrawer && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-gray-900 text-base">Filter Catalogue</h3>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Clear Filters Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Refine Results
        </span>
        <button
          onClick={onReset}
          className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Category Filter (if not on specific category page) */}
      {!activeCategory && (
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:border-emerald-600 outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 2. Brand Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
          Brand
        </label>
        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, brand: "" }))}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
              filters.brand === ""
                ? "bg-emerald-50 text-emerald-800 font-bold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span>All Brands</span>
            {filters.brand === "" && <Check className="w-3.5 h-3.5 text-emerald-700" />}
          </button>
          {availableBrands.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, brand: b }))}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                filters.brand === b
                  ? "bg-emerald-50 text-emerald-800 font-bold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{b}</span>
              {filters.brand === b && <Check className="w-3.5 h-3.5 text-emerald-700" />}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Price Range */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
          Max Price: ₹{filters.maxPrice.toLocaleString("en-IN")}
        </label>
        <input
          type="range"
          min={500}
          max={350000}
          step={2000}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
          }
          className="w-full accent-emerald-700 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-gray-400">
          <span>₹500</span>
          <span>₹3,50,000+</span>
        </div>
      </div>

      {/* 4. Adaptive Filters: Solar Panels */}
      {(!currentCategory || currentCategory === "solar-panels") && (
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Panel Technology
          </label>
          <div className="flex flex-wrap gap-1.5">
            {["", "TOPCon", "Mono-PERC", "Polycrystalline"].map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, panelTech: tech }))}
                className={`px-2.5 py-1 text-xs rounded-lg border transition ${
                  filters.panelTech === tech
                    ? "bg-emerald-700 text-white border-emerald-700 font-bold"
                    : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
                }`}
              >
                {tech || "Any"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5. Adaptive Filters: Batteries & EV */}
      {(!currentCategory ||
        currentCategory === "lithium-batteries" ||
        currentCategory === "inverter-batteries" ||
        currentCategory === "ev-batteries") && (
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Battery Chemistry
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["", "LiFePO4", "Tubular Lead-Acid", "Lithium-ion"].map((chem) => (
                <button
                  key={chem}
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, batteryChemistry: chem }))
                  }
                  className={`px-2.5 py-1 text-xs rounded-lg border transition ${
                    filters.batteryChemistry === chem
                      ? "bg-emerald-700 text-white border-emerald-700 font-bold"
                      : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  {chem || "Any"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Voltage
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["", "12", "24", "48", "60"].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, voltage: v }))}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition ${
                    filters.voltage === v
                      ? "bg-emerald-700 text-white border-emerald-700 font-bold"
                      : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  {v ? `${v}V` : "Any"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Adaptive Filters: Inverters */}
      {(!currentCategory || currentCategory === "solar-inverters") && (
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Inverter Type
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["", "Hybrid / Storage Ready", "On-Grid / Grid-Tie", "Off-Grid Pure Sine Wave"].map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, inverterType: type }))}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition text-left ${
                      filters.inverterType === type
                        ? "bg-emerald-700 text-white border-emerald-700 font-bold"
                        : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
                    }`}
                  >
                    {type ? type.split("/")[0].trim() : "Any"}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. Stock status toggle */}
      <div className="pt-2 border-t border-gray-100">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
            }
            className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 border-gray-300"
          />
          <span className="text-xs font-medium text-gray-700">
            Show In-Stock Products Only
          </span>
        </label>
      </div>

      {isMobileDrawer && (
        <button
          onClick={onCloseMobile}
          className="w-full py-3 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters, FilterState } from "@/components/ProductFilters";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Product } from "@/types/product";
import {
  ChevronRight,
  Home,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sun,
  ShieldCheck,
} from "lucide-react";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const initialFilters: FilterState = {
    category: category.slug,
    brand: "",
    minPrice: 0,
    maxPrice: 350000,
    rating: 0,
    inStockOnly: false,
    panelTech: "",
    batteryChemistry: "",
    voltage: "",
    inverterType: "",
    phase: "",
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Available brands in this category
  const availableBrands = useMemo(() => {
    const brands = new Set(
      products.filter((p) => p.category === category.id).map((p) => p.brand)
    );
    return Array.from(brands);
  }, [category.id]);

  // Filtered products for this category
  const categoryProducts = useMemo(() => {
    return products
      .filter((p) => p.category === category.id)
      .filter((p) => {
        if (filters.brand && p.brand !== filters.brand) return false;
        if (p.price > filters.maxPrice) return false;
        if (filters.inStockOnly && p.stockStatus !== "in-stock") return false;
        if (filters.panelTech && p.attributes?.panelTech !== filters.panelTech) return false;
        if (filters.batteryChemistry && p.attributes?.chemistry !== filters.batteryChemistry) return false;
        if (filters.voltage && String(p.voltage) !== filters.voltage) return false;
        if (filters.inverterType && p.attributes?.inverterType !== filters.inverterType) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [category.id, filters, sortBy]);

  return (
    <div className="space-y-10 pb-16">
      {/* Category Hero Banner */}
      <div className="relative bg-gradient-to-r from-emerald-950 via-forest-deep to-slate-950 text-white py-14 lg:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url(${category.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-emerald-300/80 font-medium">
            <Link href="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
            <Link href="/shop" className="hover:text-white">
              Catalogue
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-white font-semibold">{category.name}</span>
          </nav>

          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-solar-lime text-xs font-bold uppercase tracking-wider">
            {category.tagline}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {category.name}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-28">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              onReset={() => setFilters(initialFilters)}
              availableBrands={availableBrands}
              activeCategory={category.id}
            />
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header Toolbar */}
            <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-2 bg-white rounded-xl border border-gray-200 font-bold text-gray-700 flex items-center gap-1.5 shadow-sm"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
                <span>Filters</span>
              </button>

              <span className="text-gray-500 font-medium">
                Showing <strong>{categoryProducts.length}</strong> items in {category.name}
              </span>

              <div className="flex items-center gap-3 ml-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white rounded-xl border border-gray-200 font-semibold text-gray-800 outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>

                <div className="flex items-center bg-white rounded-xl border border-gray-200 p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === "grid"
                        ? "bg-emerald-700 text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === "list"
                        ? "bg-emerald-700 text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products List */}
            {categoryProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {categoryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-3">
                <h3 className="font-bold text-gray-900 text-base">No products match selected filters</h3>
                <p className="text-xs text-gray-500">
                  Try adjusting the price range or technology filter.
                </p>
                <button
                  onClick={() => setFilters(initialFilters)}
                  className="px-5 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed top-0 bottom-0 left-0 w-5/6 max-w-sm bg-white shadow-2xl z-50 flex flex-col overflow-y-auto">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              onReset={() => setFilters(initialFilters)}
              availableBrands={availableBrands}
              activeCategory={category.id}
              isMobileDrawer
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

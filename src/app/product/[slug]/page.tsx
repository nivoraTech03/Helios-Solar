"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { getProductEnquiryUrl } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import {
  Star,
  ShieldCheck,
  Truck,
  MessageCircle,
  ShoppingCart,
  Heart,
  Scale,
  Plus,
  Minus,
  CheckCircle2,
  ChevronRight,
  Home,
  Zap,
  Battery,
  Award,
  Sparkles,
  FileText,
  HelpCircle,
} from "lucide-react";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "warranty" | "inclusions">("specs");

  const discount = calculateDiscount(product.price, product.mrp);
  const waUrl = getProductEnquiryUrl(product);
  const isWish = isInWishlist(product.id);
  const isComp = isInCompare(product.id);

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link href="/shop" className="hover:text-blue-600 transition">
            Catalog
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link href={`/category/${product.category}`} className="hover:text-blue-600 capitalize transition">
            {product.category.replace("-", " ")}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Main Product Section: Gallery + Purchasing Desk */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Gallery (5 cols) */}
          <div className="lg:col-span-5">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product Details & Buying Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badges + Model + SKU */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider border border-blue-200/60">
                  {product.brand}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Model: <strong className="text-slate-700">{product.model}</strong>
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  SKU: {product.id}
                </span>
                {product.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                    ★ Premium Tier
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 pt-0.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-900">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} verified reviews)</span>
                  <span className="text-blue-600 font-bold ml-2">✓ Grade-A Certified</span>
                </div>
              )}
            </div>

            {/* Pricing Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/80 space-y-1.5">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black text-slate-950">
                  {formatPrice(product.price)}
                </span>
                {product.mrp && (
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(product.mrp)}
                  </span>
                )}
                {discount && (
                  <span className="bg-blue-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-sm">
                    Save {discount}% ({formatPrice(product.mrp! - product.price)} OFF)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                *All taxes included. GST invoice provided for commercial tax input credit.
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {product.shortDescription}
            </p>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {product.wattage && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Power Rating</span>
                    <span className="text-xs font-black text-slate-900">{product.wattage} Watts</span>
                  </div>
                </div>
              )}
              {product.capacity && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Battery className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Capacity</span>
                    <span className="text-xs font-black text-slate-900 truncate block">{product.capacity}</span>
                  </div>
                </div>
              )}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Warranty</span>
                  <span className="text-xs font-black text-slate-900 truncate block">{product.warranty.split("/")[0]}</span>
                </div>
              </div>
            </div>

            {/* Stock status indicator */}
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50/80 border border-emerald-200/60 p-2.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>In Stock & Ready for Insured Pan-India Pallet Freight Dispatch</span>
            </div>

            {/* Purchasing Controls: Quantity + Add to Cart + WhatsApp */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 px-2 py-1.5 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-white transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-black text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-white transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="w-full sm:flex-1 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2 transition active:scale-95 shadow-md shadow-blue-600/25"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart ({quantity})</span>
                </button>

                {/* Wishlist & Compare Toggles */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isWish
                        ? "bg-red-50 text-red-500 border-red-200"
                        : "bg-white text-slate-600 border-slate-200 hover:text-red-500 hover:bg-slate-50"
                    }`}
                    aria-label="Wishlist"
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWish ? "fill-red-500" : ""}`} />
                  </button>

                  <button
                    onClick={() => {
                      if (isComp) removeFromCompare(product.id);
                      else addToCompare(product);
                    }}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isComp
                        ? "bg-amber-400 text-slate-950 border-amber-400 font-bold"
                        : "bg-white text-slate-600 border-slate-200 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                    aria-label="Compare"
                    title="Compare specifications"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* WhatsApp Direct Engineer Enquiry */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba5c] text-white font-black text-sm rounded-xl flex items-center justify-center gap-2.5 transition active:scale-95 shadow-md shadow-[#25D366]/25"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                <span>Talk with Solar Engineer on WhatsApp</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <Link href="/quote" className="text-blue-600 font-bold hover:underline">
                  Need custom string sizing or rooftop quotation?
                </Link>
                <span>⚡ WhatsApp response in ~5-10 mins</span>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="border-t border-slate-200/80 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-[11px] font-semibold">Insured Pallet Transit</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-[11px] font-semibold">Official Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-[11px] font-semibold">Subsidy Eligible</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-[11px] font-semibold">100% Genuine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specifications, Features, Warranty, Box Inclusions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            {[
              { id: "specs", label: "Technical Specifications" },
              { id: "features", label: "Key Features & Benefits" },
              { id: "warranty", label: "Warranty & Support" },
              { id: "inclusions", label: "Package Inclusions" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Technical Specs */}
          {activeTab === "specs" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs"
                  >
                    <span className="text-slate-500 font-medium">{spec.label}</span>
                    <span className="text-slate-900 font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
              {product.compatibility && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-950 flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Compatibility Note:</strong>
                    <span>{product.compatibility}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Features */}
          {activeTab === "features" && (
            <div className="space-y-3 animate-fade-in">
              {product.features && product.features.length > 0 ? (
                product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">{product.fullDescription}</p>
              )}
              <div className="pt-2 text-xs text-slate-600 leading-relaxed">
                {product.fullDescription}
              </div>
            </div>
          )}

          {/* Tab 3: Warranty */}
          {activeTab === "warranty" && (
            <div className="space-y-4 animate-fade-in text-xs sm:text-sm text-slate-700">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Manufacturer Warranty Coverage</h4>
                <p>{product.warranty}</p>
                <p className="text-slate-500 text-xs">
                  Includes barcode serialized manufacturer guarantee. Supported by authorized service centers across all Indian states.
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: Inclusions */}
          {activeTab === "inclusions" && (
            <div className="space-y-2.5 animate-fade-in">
              {product.boxIncludes && product.boxIncludes.length > 0 ? (
                product.boxIncludes.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">Includes complete standard manufacturer hardware, instruction manual, and warranty registration card.</p>
              )}
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Complete Your Setup</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  Related Energy Systems
                </h2>
              </div>
              <Link
                href={`/category/${product.category}`}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>View All In Category</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { getProductEnquiryUrl } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { SafeImage } from "@/components/SafeImage";
import {
  Heart,
  Scale,
  Eye,
  ShoppingCart,
  MessageCircle,
  Star,
  CheckCircle,
  Zap,
  Battery,
  Shield,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  viewMode?: "grid" | "list";
}

export function ProductCard({
  product,
  onQuickView,
  viewMode = "grid",
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();

  const discount = calculateDiscount(product.price, product.mrp);
  const waUrl = getProductEnquiryUrl(product);
  const isWish = isInWishlist(product.id);
  const isComp = isInCompare(product.id);

  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-blue-500 shadow-sm hover:shadow-premium-hover transition-all duration-300 p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-center">
        {/* Image */}
        <div className="relative w-full md:w-56 h-48 md:h-44 rounded-xl overflow-hidden bg-slate-900/5 shrink-0 border border-slate-100">
          <SafeImage
            src={product.images[0]}
            alt={product.name}
            category={product.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount && (
            <span className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-extrabold tracking-wider uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
              {product.brand}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              SKU: {product.model}
            </span>
            {product.rating && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {product.rating} ({product.reviewCount})
              </span>
            )}
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quick Specs */}
          <div className="flex items-center gap-2 text-xs text-slate-600 flex-wrap">
            {product.wattage && (
              <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md font-medium text-slate-700">
                <Zap className="w-3 h-3 text-blue-600" /> {product.wattage}W
              </span>
            )}
            {product.capacity && (
              <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md font-medium text-slate-700">
                <Battery className="w-3 h-3 text-blue-600" /> {product.capacity}
              </span>
            )}
            <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md font-medium text-slate-700">
              <Shield className="w-3 h-3 text-blue-600" /> {product.warranty}
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="w-full md:w-56 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 md:pl-5 pt-4 md:pt-0 gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-950">
                {formatPrice(product.price)}
              </span>
              {product.mrp && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.mrp)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
              <CheckCircle className="w-3 h-3" /> In Stock & Ready to Ship
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => addToCart(product)}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md shadow-blue-600/20"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-emerald-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition border border-[#25D366]/30"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode (Default)
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-blue-500 shadow-sm hover:shadow-premium-hover transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <SafeImage
            src={product.images[0]}
            alt={product.name}
            category={product.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discount && (
            <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md tracking-wider">
              {discount}% OFF
            </span>
          )}
          {product.featured && (
            <span className="bg-slate-950/90 text-amber-300 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow tracking-wider border border-white/10">
              Featured
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
              isWish
                ? "bg-red-50 text-red-500 border border-red-200"
                : "bg-white/95 text-slate-600 hover:text-red-500 hover:bg-white"
            }`}
            aria-label={isWish ? "Remove from wishlist" : "Add to wishlist"}
            title="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWish ? "fill-red-500" : ""}`} />
          </button>

          {/* Compare */}
          <button
            onClick={() => {
              if (isComp) removeFromCompare(product.id);
              else addToCompare(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
              isComp
                ? "bg-amber-400 text-slate-950 font-bold"
                : "bg-white/95 text-slate-600 hover:text-blue-600 hover:bg-white"
            }`}
            aria-label="Compare"
            title="Compare specifications"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          {/* Quick View */}
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="w-8 h-8 rounded-full bg-white/95 text-slate-600 hover:text-blue-600 hover:bg-white flex items-center justify-center shadow-md transition-all"
              aria-label="Quick View"
              title="Quick preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold uppercase tracking-wider text-blue-700 text-[10px] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/50">
              {product.brand}
            </span>
            {product.rating && (
              <span className="flex items-center gap-1 font-semibold text-slate-700 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating}
                <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-blue-600 transition">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Key Spec Badges */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {product.wattage && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                <Zap className="w-3 h-3 text-blue-600" />
                {product.wattage}W
              </span>
            )}
            {product.capacity && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                <Battery className="w-3 h-3 text-blue-600" />
                {product.capacity}
              </span>
            )}
            {product.attributes?.chemistry && (
              <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/50">
                {product.attributes.chemistry}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTAs */}
        <div className="pt-2.5 border-t border-slate-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-extrabold text-slate-950">
                {formatPrice(product.price)}
              </span>
              {product.mrp && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.mrp)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
              In Stock
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product)}
              className="py-2.5 px-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-600/20"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 active:scale-95 text-emerald-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all border border-[#25D366]/40"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

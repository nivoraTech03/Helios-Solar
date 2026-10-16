"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { getProductEnquiryUrl } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { SafeImage } from "@/components/SafeImage";
import {
  X,
  ShoppingCart,
  MessageCircle,
  Star,
  CheckCircle,
  Zap,
  Battery,
  Shield,
  ArrowRight,
} from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const discount = calculateDiscount(product.price, product.mrp);
  const waUrl = getProductEnquiryUrl(product);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/95 text-slate-500 hover:text-slate-900 flex items-center justify-center shadow-md transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gallery Left */}
        <div className="w-full md:w-1/2 p-6 bg-slate-50 flex flex-col justify-between shrink-0">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
            <SafeImage
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              category={product.category}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                    selectedImage === idx
                      ? "border-emerald-600 ring-2 ring-emerald-100"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <SafeImage src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Right */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                  {product.brand}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-mono text-[11px]">SKU: {product.model}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-950 mt-1.5 leading-snug">
                {product.name}
              </h2>

              {product.rating && (
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-slate-700">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span>{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} verified reviews)</span>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl font-black text-slate-950">
                {formatPrice(product.price)}
              </span>
              {product.mrp && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.mrp)}
                </span>
              )}
              {discount && (
                <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2 py-0.5 rounded-full">
                  {discount}% OFF
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Key Specs Pills */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
              {product.wattage && (
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Power Rating</span>
                  <span className="font-semibold text-slate-900">{product.wattage} Watts</span>
                </div>
              )}
              {product.capacity && (
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Capacity</span>
                  <span className="font-semibold text-slate-900">{product.capacity}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Warranty</span>
                <span className="font-semibold text-slate-900">{product.warranty}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 space-y-2.5">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition active:scale-95 shadow-md shadow-emerald-700/20"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba5c] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition active:scale-95 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                <span>WhatsApp</span>
              </a>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center justify-center gap-1 w-full py-1.5"
            >
              <span>View full technical specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

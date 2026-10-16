"use client";

import React, { useState } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const currentImage = images[selectedIndex] || images[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-900/5 border border-slate-200/80 group shadow-sm">
        <SafeImage
          src={currentImage}
          alt={`${productName} view ${selectedIndex + 1}`}
          className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
          onClick={() => setIsZoomOpen(true)}
        />

        {/* Zoom trigger icon */}
        <button
          onClick={() => setIsZoomOpen(true)}
          className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-800 p-2.5 rounded-full shadow-lg transition active:scale-90"
          aria-label="Enlarge image"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Navigation Arrows for Multiple Images */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow transition"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition shrink-0 ${
                selectedIndex === idx
                  ? "border-emerald-600 ring-2 ring-emerald-100 shadow-md scale-102"
                  : "border-slate-200 opacity-70 hover:opacity-100"
              }`}
            >
              <SafeImage src={img} alt="Thumb" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Zoom Lightbox */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition"
            aria-label="Close zoomed view"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-4xl max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeImage
              src={currentImage}
              alt={productName}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

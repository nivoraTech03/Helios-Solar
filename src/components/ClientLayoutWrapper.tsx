"use client";

import React, { useState, useEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { EnquiryModal } from "@/components/EnquiryModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CompareDrawer } from "@/components/CompareDrawer";

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");
  const [enquiryCategory, setEnquiryCategory] = useState("");

  // 12-18 second auto-trigger once per session (Requirement 6)
  useEffect(() => {
    try {
      const hasTriggered = sessionStorage.getItem("helios_enquiry_shown");
      if (!hasTriggered) {
        const timer = setTimeout(() => {
          setIsEnquiryModalOpen(true);
          sessionStorage.setItem("helios_enquiry_shown", "true");
        }, 15000); // 15 seconds

        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  // Listen for custom trigger events across pages
  useEffect(() => {
    const handleOpenEnquiry = (e: CustomEvent) => {
      if (e.detail?.product) setEnquiryProduct(e.detail.product);
      if (e.detail?.category) setEnquiryCategory(e.detail.category);
      setIsEnquiryModalOpen(true);
    };

    window.addEventListener("open-enquiry-modal", handleOpenEnquiry as EventListener);
    return () => {
      window.removeEventListener("open-enquiry-modal", handleOpenEnquiry as EventListener);
    };
  }, []);

  return (
    <CartProvider>
      <WishlistProvider>
        <CompareProvider>
          <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-200 selection:text-blue-950">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
            <CartDrawer />
            <CompareDrawer />
            <EnquiryModal
              isOpen={isEnquiryModalOpen}
              onClose={() => setIsEnquiryModalOpen(false)}
              initialProduct={enquiryProduct}
              initialCategory={enquiryCategory}
            />
          </div>
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

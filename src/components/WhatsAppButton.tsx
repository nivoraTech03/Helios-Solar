"use client";

import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMessage = `Hello ${siteConfig.name}! I am browsing your solar and battery catalog. I have a query regarding products and rooftop solutions.`;
  const url = getWhatsAppUrl(defaultMessage);

  return (
    <div
      className="fixed bottom-6 right-5 z-40 flex items-center gap-3 print:hidden"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <div
        className={`hidden md:block bg-gray-900 text-white text-xs font-medium py-1.5 px-3 rounded-xl shadow-lg transition-all duration-300 pointer-events-none whitespace-nowrap ${
          showTooltip
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <span>Need Help? Chat on WhatsApp</span>
      </div>

      {/* Floating Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with our solar experts on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#20ba5c] to-[#2ce373] text-white rounded-full shadow-xl shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        {/* Subtle Ping Animation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-25 animate-ping -z-10" />

        <MessageCircle className="w-7 h-7 fill-white stroke-none group-hover:rotate-12 transition-transform duration-300" />
      </a>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { X, Send, PhoneCall, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { validateIndianMobile } from "@/lib/utils";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
  initialCategory?: string;
}

export function EnquiryModal({
  isOpen,
  onClose,
  initialProduct = "",
  initialCategory = "",
}: EnquiryModalProps) {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [category, setCategory] = useState(initialCategory || "solar-panels");
  const [productOfInterest, setProductOfInterest] = useState(initialProduct || "");
  const [cityOrPin, setCityOrPin] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLink, setSubmittedLink] = useState<string | null>(null);

  // Sync initial props
  useEffect(() => {
    if (initialProduct) setProductOfInterest(initialProduct);
    if (initialCategory) setCategory(initialCategory);
  }, [initialProduct, initialCategory]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }
    if (!mobile.trim()) {
      newErrors.mobile = "Please enter your 10-digit mobile number.";
    } else if (!validateIndianMobile(mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit Indian mobile number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const waText = `*New Solar & Battery Solution Enquiry*
----------------------------------------
👤 *Name:* ${fullName.trim()}
📱 *Mobile:* ${mobile.trim()}
🏷️ *Category:* ${category}
${productOfInterest ? `📦 *Product/Model:* ${productOfInterest.trim()}` : ""}
${cityOrPin ? `📍 *City / PIN:* ${cityOrPin.trim()}` : ""}
${message ? `📝 *Requirement:* ${message.trim()}` : ""}
----------------------------------------
_Sent from ${siteConfig.name} Website_`;

    const waUrl = getWhatsAppUrl(waText);
    setSubmittedLink(waUrl);

    // Open WhatsApp in a new tab
    const win = window.open(waUrl, "_blank");
    if (!win) {
      // Pop-up blocked fallback
      window.location.href = waUrl;
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-emerald-900/10">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-forest-deep to-emerald-800 text-white p-6 relative">
          <button
            onClick={onClose}
            aria-label="Close enquiry popup"
            className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-2">
            <PhoneCall className="w-3.5 h-3.5" /> Direct WhatsApp Consultation
          </div>
          <h2 id="enquiry-modal-title" className="text-xl md:text-2xl font-bold tracking-tight">
            Looking for the Right Solar or Battery Solution?
          </h2>
          <p className="text-sm text-emerald-100/90 mt-1">
            Tell us what you need. Our team can help you explore suitable options.
          </p>
        </div>

        {/* Form Body */}
        {submittedLink ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Connecting to WhatsApp...</h3>
            <p className="text-sm text-gray-600">
              We have pre-filled your enquiry details. If WhatsApp did not open automatically, please click below:
            </p>
            <a
              href={submittedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20ba5c] transition shadow-md shadow-emerald-700/20"
            >
              <Send className="w-4 h-4" /> Open WhatsApp Chat
            </a>
            <button
              onClick={() => {
                setSubmittedLink(null);
                onClose();
              }}
              className="text-xs text-gray-500 hover:text-gray-800 pt-2 block mx-auto underline"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: "" });
                }}
                placeholder="e.g. Ramesh Patel"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition ${
                  errors.fullName
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-100"
                }`}
              />
              {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                WhatsApp Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm font-medium text-gray-500">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/[^0-9]/g, ""));
                    if (errors.mobile) setErrors({ ...errors, mobile: "" });
                  }}
                  placeholder="9876543210"
                  className={`w-full pl-12 pr-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition ${
                    errors.mobile
                      ? "border-red-400 focus:ring-red-200"
                      : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-100"
                  }`}
                />
              </div>
              {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
            </div>

            {/* Category & Product */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Product Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  City or PIN Code (Optional)
                </label>
                <input
                  type="text"
                  value={cityOrPin}
                  onChange={(e) => setCityOrPin(e.target.value)}
                  placeholder="e.g. Jaipur or 302001"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Product of interest */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Specific Model or Capacity (Optional)
              </label>
              <input
                type="text"
                value={productOfInterest}
                onChange={(e) => setProductOfInterest(e.target.value)}
                placeholder="e.g. 5kW Hybrid or 5.12kWh LiFePO4 Battery"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Requirement / Message (Optional)
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. Monthly bill is ₹5,000. Want rooftop setup with subsidy guidance."
                className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 resize-none"
              />
            </div>

            {/* Privacy note */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>We respect your privacy. No spam — direct reply on WhatsApp.</span>
            </div>

            {/* Submit & Close */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-700/20 active:scale-95 transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Connecting..." : "Send Enquiry on WhatsApp"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

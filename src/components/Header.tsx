"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { SafeImage } from "@/components/SafeImage";
import {
  Search,
  ShoppingCart,
  Heart,
  Scale,
  Menu,
  X,
  MessageCircle,
  Sun,
  ChevronDown,
  ArrowRight,
  Zap,
  Battery,
  ShieldCheck,
  PackageCheck,
  Building2,
  Home,
  HelpCircle,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { totalCompareItems } = useCompare();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dropdown states
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) {
        setCompanyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const searchResults = searchQuery.trim()
    ? products
        .filter((p) =>
          [p.name, p.brand, p.model, p.category, ...p.tags]
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const waUrl = getWhatsAppUrl(
    `Hello ${siteConfig.name}! I need guidance on solar systems & batteries.`
  );

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-3 lg:gap-6">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sun className="w-5 h-5 text-amber-300 animate-spin-slow" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 leading-none block">
                {siteConfig.name.split(" ")[0]}
                <span className="text-blue-600">
                  {" "}{siteConfig.name.split(" ").slice(1).join(" ")}
                </span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 block -mt-0.5">
                Clean Tech Store
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation with Submenus */}
          <nav className="hidden lg:flex items-center gap-1.5 ml-2">
            {/* 1. Products Dropdown */}
            <div
              ref={productsRef}
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                onClick={() => setProductsOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold rounded-xl transition-all ${
                  productsOpen
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Submenu Dropdown Panel */}
              {productsOpen && (
                <div className="absolute top-full left-0 pt-2 w-[520px] z-50 animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-4 grid grid-cols-2 gap-2">
                    <Link
                      href="/category/solar-panels"
                      onClick={() => setProductsOpen(false)}
                      className="p-3 rounded-xl hover:bg-blue-50/70 transition flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                        <Sun className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Solar Panels</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">TOPCon & Bifacial Grade-A Modules</p>
                      </div>
                    </Link>

                    <Link
                      href="/category/lithium-batteries"
                      onClick={() => setProductsOpen(false)}
                      className="p-3 rounded-xl hover:bg-blue-50/70 transition flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                        <Battery className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Lithium Storage</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">LiFePO4 Wall & Rack PowerVault</p>
                      </div>
                    </Link>

                    <Link
                      href="/category/solar-inverters"
                      onClick={() => setProductsOpen(false)}
                      className="p-3 rounded-xl hover:bg-blue-50/70 transition flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Solar Inverters</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">Hybrid & On-Grid Smart Inverters</p>
                      </div>
                    </Link>

                    <Link
                      href="/category/solar-kits"
                      onClick={() => setProductsOpen(false)}
                      className="p-3 rounded-xl hover:bg-blue-50/70 transition flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                        <PackageCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Complete Kits</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">3kW - 10kW Turnkey Packages</p>
                      </div>
                    </Link>

                    <Link
                      href="/category/ev-batteries"
                      onClick={() => setProductsOpen(false)}
                      className="p-3 rounded-xl hover:bg-blue-50/70 transition flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">EV Batteries</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">AIS-156 2W & 3W Lithium Packs</p>
                      </div>
                    </Link>

                    <Link
                      href="/category/inverter-batteries"
                      onClick={() => setProductsOpen(false)}
                      className="p-3 rounded-xl hover:bg-blue-50/70 transition flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                        <Battery className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Inverter Batteries</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">Heavy Tall Tubular Power Backup</p>
                      </div>
                    </Link>

                    {/* Bottom All Products Bar */}
                    <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs px-2">
                      <Link
                        href="/shop"
                        onClick={() => setProductsOpen(false)}
                        className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        Browse Full 18+ Hardware Catalog <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[11px] text-slate-400">PM Surya Ghar Subsidy Ready</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Solutions Dropdown */}
            <div
              ref={solutionsRef}
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                onClick={() => setSolutionsOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold rounded-xl transition-all ${
                  solutionsOpen
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-3 space-y-1">
                    <Link
                      href="/category/solar-kits"
                      onClick={() => setSolutionsOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-blue-50 flex items-center gap-2.5 group"
                    >
                      <Home className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Home Rooftop Solar</p>
                        <p className="text-[10px] text-slate-400">Slash electric bills to zero</p>
                      </div>
                    </Link>
                    <Link
                      href="/category/solar-inverters"
                      onClick={() => setSolutionsOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-blue-50 flex items-center gap-2.5 group"
                    >
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Commercial Solar</p>
                        <p className="text-[10px] text-slate-400">Three-phase 10kW+ installations</p>
                      </div>
                    </Link>
                    <Link
                      href="/category/lithium-batteries"
                      onClick={() => setSolutionsOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-blue-50 flex items-center gap-2.5 group"
                    >
                      <Battery className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Zero Blackout Backup</p>
                        <p className="text-[10px] text-slate-400">6000+ cycle LiFePO4 wall packs</p>
                      </div>
                    </Link>
                    <Link
                      href="/category/ev-batteries"
                      onClick={() => setSolutionsOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-blue-50 flex items-center gap-2.5 group"
                    >
                      <Zap className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">EV Fleet & Scooters</p>
                        <p className="text-[10px] text-slate-400">AIS-156 compliant replacement</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Solar Calculator / Quote (Direct Link) */}
            <Link
              href="/quote"
              className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Solar Calculator</span>
            </Link>

            {/* 4. Support & Company Dropdown */}
            <div
              ref={companyRef}
              className="relative"
              onMouseEnter={() => setCompanyOpen(true)}
              onMouseLeave={() => setCompanyOpen(false)}
            >
              <button
                onClick={() => setCompanyOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold rounded-xl transition-all ${
                  companyOpen
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <span>Support</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${companyOpen ? "rotate-180" : ""}`} />
              </button>

              {companyOpen && (
                <div className="absolute top-full left-0 pt-2 w-56 z-50 animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-2 space-y-1">
                    <Link
                      href="/faq"
                      onClick={() => setCompanyOpen(false)}
                      className="p-2 rounded-lg hover:bg-blue-50 text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-2"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                      <span>FAQs & Subsidies</span>
                    </Link>
                    <Link
                      href="/warranty"
                      onClick={() => setCompanyOpen(false)}
                      className="p-2 rounded-lg hover:bg-blue-50 text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Warranty & Service</span>
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setCompanyOpen(false)}
                      className="p-2 rounded-lg hover:bg-blue-50 text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-2"
                    >
                      <Sun className="w-3.5 h-3.5 text-blue-600" />
                      <span>About Helios</span>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setCompanyOpen(false)}
                      className="p-2 rounded-lg hover:bg-blue-50 text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-2"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                      <span>Contact Desk</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Quick Search Bar */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative mx-2">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search solar, battery, inverters..."
                  className="w-full pl-9 pr-8 py-2 text-xs font-medium rounded-xl bg-slate-100/80 border border-slate-200/80 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fade-in">
                {searchResults.length > 0 ? (
                  <div className="py-1">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => { setIsSearchFocused(false); setSearchQuery(""); }}
                        className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-blue-50/70 transition"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          <SafeImage
                            src={product.images[0]}
                            alt={product.name}
                            category={product.category}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{product.name}</p>
                          <p className="text-[10px] text-slate-400">{product.brand}</p>
                        </div>
                        <span className="text-xs font-black text-blue-600 shrink-0">{formatPrice(product.price)}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-xs text-slate-500 text-center">
                    No products found for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons + WhatsApp CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            {/* Compare */}
            <Link
              href="/compare"
              className="relative p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
              aria-label="Compare"
              title="Compare specifications"
            >
              <Scale className="w-4 h-4" />
              {totalCompareItems > 0 && (
                <span className="absolute top-1 right-1 bg-amber-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCompareItems}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              href="/shop?filter=wishlist"
              className="relative p-2.5 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart className="w-4 h-4" />
              {totalWishlistItems > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* WhatsApp CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] font-bold text-xs border border-[#25D366]/30 transition active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
              <span>Solar Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white p-5 overflow-y-auto space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-extrabold text-slate-900 text-base">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-xl font-bold text-sm text-slate-900 hover:bg-blue-50 hover:text-blue-600"
              >
                All Products Catalog
              </Link>
              <Link
                href="/category/solar-panels"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50"
              >
                Solar Panels
              </Link>
              <Link
                href="/category/lithium-batteries"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50"
              >
                Lithium Batteries (LiFePO4)
              </Link>
              <Link
                href="/category/solar-inverters"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50"
              >
                Solar Inverters
              </Link>
              <Link
                href="/category/solar-kits"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50"
              >
                Turnkey Solar Kits
              </Link>
              <Link
                href="/category/ev-batteries"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50"
              >
                EV Batteries
              </Link>
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-xl text-sm font-bold text-blue-600 bg-blue-50 mt-2"
              >
                Solar Calculator & Sizing
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50"
              >
                PM Surya Ghar FAQ & Subsidies
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50"
              >
                Contact Support Desk
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

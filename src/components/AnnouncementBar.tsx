"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { useState } from "react";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-slate-200 text-xs md:text-sm py-2 px-4 transition-all relative border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 mx-auto text-center truncate">
          <span className="hidden sm:inline-flex p-1 bg-amber-400/20 text-amber-300 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="font-medium truncate">{siteConfig.announcement.message}</span>
          <Link
            href={siteConfig.announcement.actionHref}
            className="inline-flex items-center gap-1 font-bold text-amber-300 hover:text-amber-200 hover:underline underline-offset-2 shrink-0 ml-1"
          >
            {siteConfig.announcement.actionText}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-0.5 rounded transition shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

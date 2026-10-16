import Link from "next/link";
import { CategoryInfo } from "@/types/product";
import { ArrowUpRight } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";

export function CategoryCard({ category }: { category: CategoryInfo }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 hover:border-blue-500 shadow-sm hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
    >
      {/* Background Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <SafeImage
          src={category.image}
          alt={category.name}
          category={category.id}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

        {/* Floating Arrow Pill */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 group-hover:bg-blue-600 group-hover:text-white text-slate-800 flex items-center justify-center transition-all duration-300 shadow-md">
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>

        {/* Title over image bottom */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-300 block mb-0.5">
            {category.productCount} Products Available
          </span>
          <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-blue-300 transition-colors">
            {category.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <div className="p-3.5 sm:p-4 bg-white flex-1 flex flex-col justify-between">
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {category.tagline}
        </p>
      </div>
    </Link>
  );
}

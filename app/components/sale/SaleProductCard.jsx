"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "./saleUtils";

export default function SaleProductCard({ product }) {
  return (
    <Link
      href={product.saleHref}
      className="group overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
    >
      <div className="relative overflow-hidden bg-[#f1f3f8]">
        <div className="absolute left-4 top-4 z-10 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
          -{product.discountPercent}%
        </div>

        <div className="flex items-center justify-center px-5 pb-5 pt-10">
          <img
            src={product.image}
            alt={product.name}
            className="h-[220px] w-full max-w-[260px] object-contain transition duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-600/80">
          {product.brand}
        </p>

        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-[#111] sm:text-xl">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-sm font-semibold text-rose-500">
            Save {product.discountPercent}%
          </p>
        </div>

        <div className="mt-5 flex items-end gap-3">
          <p className="text-2xl font-bold text-[#111]">
            {formatPrice(product.salePrice)}
          </p>
          <p className="text-sm font-medium text-gray-400 line-through">
            {formatPrice(product.originalPrice)}
          </p>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
          View Deal
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
"use client";

import Link from "next/link";
import { formatPrice } from "./saleUtils";

export default function SaleTopDeals({ products = [] }) {
  return (
    <div className="mt-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Top Deals</h2>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">
            Featured products with the highest discounts.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={`featured-${product.id}`}
            href={product.saleHref}
            className="group overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
          >
            <div className="relative overflow-hidden bg-gradient-to-b from-[#eef2f8] to-[#f7f8fc]">
              <div className="absolute left-4 top-4 z-10 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
                -{product.discountPercent}%
              </div>

              <div className="flex items-center justify-center px-6 py-10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[220px] w-full max-w-[280px] object-contain transition duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-600/80">
                {product.brand}
              </p>

              <h3 className="mt-2 line-clamp-2 text-xl font-semibold text-[#111]">
                {product.name}
              </h3>

              <div className="mt-4 flex items-end gap-3">
                <p className="text-2xl font-bold text-[#111]">
                  {formatPrice(product.salePrice)}
                </p>
                <p className="text-sm font-medium text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
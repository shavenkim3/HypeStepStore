"use client";

import { SlidersHorizontal } from "lucide-react";
import SaleProductCard from "./SaleProductCard";

export default function SaleProductGrid({
  products = [],
  total = 0,
  onOpenFilters,
}) {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            All Sale Products
          </h2>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">
            Browse all discounted sneakers and open any item to view more
            details.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="text-sm text-gray-500">
            Showing <span className="font-semibold text-[#111]">{total}</span>{" "}
            items
          </div>

          <button
            type="button"
            onClick={onOpenFilters}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#111] shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 xl:hidden"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <SaleProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-black/5 bg-white px-6 py-14 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-[#111]">
            No sale products found
          </h3>
          <p className="mt-2 text-gray-600">
            Try changing or clearing some filters.
          </p>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { Heart, Star, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  if (!product) return null;

  return (
    <div className="group overflow-hidden rounded-[28px] border border-black/5 bg-[#f6f7fb] shadow-none transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-[#f1f3f8]">
        {/* Like Button */}
        <button
          type="button"
          onClick={() => setLiked((prev) => !prev)}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105"
        >
          <Heart
            size={18}
            className={`transition ${
              liked ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </button>

        {/* Product Image */}
        <div className="relative flex items-center justify-center px-4 pb-4 pt-8 sm:px-6 sm:pb-5 sm:pt-10">
          <div className="absolute bottom-6 h-5 w-32 rounded-full bg-black/10 blur-2xl sm:w-40" />

          <img
            src={product.image}
            alt={product.name}
            className="
              relative z-10
              h-[220px] w-full max-w-[260px]
              object-contain
              transition duration-500
              group-hover:scale-110
              sm:h-[260px] sm:max-w-[300px]
              lg:h-[300px] lg:max-w-[340px]
            "
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-600/80">
              {product.brand}
            </p>

            <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-[#111] sm:text-xl">
              {product.name}
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-semibold sm:text-sm">
              {product.rating}
            </span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
            Price
          </p>
          <p className="mt-1 text-2xl font-bold text-[#111] sm:text-[28px]">
            {product.price}
          </p>
        </div>

        <button
          type="button"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 sm:text-base"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
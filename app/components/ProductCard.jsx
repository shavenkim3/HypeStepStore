"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Star, ShoppingBag } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!product?.id) return;

    const existingItems = JSON.parse(
      localStorage.getItem("followItems") || "[]"
    );
    const alreadyExists = existingItems.some((item) => item.id === product.id);
    setLiked(alreadyExists);
  }, [product]);

  if (!product) return null;

  const detailHref = `/best-sellers/${product.id}`;

  const handleFollow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.id) return;

    const followItem = {
      id: product.id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      color: product.color,
      colors: product.colors,
      rating: product.rating,
      reviews: product.reviews,
      isNew: product.isNew,
    };

    const existingItems = JSON.parse(
      localStorage.getItem("followItems") || "[]"
    );
    const alreadyExists = existingItems.some((item) => item.id === product.id);

    if (!alreadyExists) {
      const updatedItems = [...existingItems, followItem];
      localStorage.setItem("followItems", JSON.stringify(updatedItems));
      window.dispatchEvent(new Event("followUpdated"));
      setLiked(true);
      return;
    }

    const updatedItems = existingItems.filter((item) => item.id !== product.id);
    localStorage.setItem("followItems", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("followUpdated"));
    setLiked(false);
  };

  return (
    <div className="group overflow-hidden rounded-[30px] border border-black/5 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="relative">
        <button
          type="button"
          onClick={handleFollow}
          aria-label={liked ? "Remove from follow" : "Add to follow"}
          className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full shadow-sm backdrop-blur transition hover:scale-105 ${
            liked
              ? "bg-red-50 text-red-500"
              : "bg-white/90 text-gray-500 hover:bg-red-50 hover:text-red-500"
          }`}
        >
          <Heart size={18} className={liked ? "fill-current" : ""} />
        </button>

        <Link href={detailHref} className="block">
          <div className="relative overflow-hidden bg-gradient-to-b from-[#eef2f8] to-[#f7f8fc]">
            <div className="absolute left-5 top-5 z-10 inline-flex items-center rounded-full bg-[#111] px-3 py-1 text-xs font-semibold text-white">
              Best Seller
            </div>

            <div className="relative flex items-center justify-center px-4 pb-5 pt-12 sm:px-6 sm:pb-6 sm:pt-14">
              <div className="absolute bottom-7 h-6 w-40 rounded-full bg-black/10 blur-2xl sm:w-48" />

              <img
                src={product.image}
                alt={product.name}
                className="relative z-10 h-[220px] w-full max-w-[260px] object-contain transition duration-500 group-hover:scale-110 sm:h-[260px] sm:max-w-[300px] lg:h-[300px] lg:max-w-[340px]"
              />
            </div>
          </div>

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
                  {product.rating ?? "4.8"}
                </span>
                <span className="text-xs text-gray-400">
                  ({product.reviews ?? "120"})
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {product.category || "Sneakers"}
              </p>
              <p className="text-sm text-gray-500">
                {product.colors ? `${product.colors} Colors` : ""}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                Price
              </p>
              <p className="mt-1 text-2xl font-bold text-[#111] sm:text-[28px]">
                {typeof product.price === "number"
                  ? `$${product.price}`
                  : product.price}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="px-5 pb-5 sm:px-6">
        <div className="flex items-center gap-2">
          <Link
            href={detailHref}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[#111] transition hover:bg-gray-100 sm:text-base"
          >
            View Details
          </Link>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 sm:text-base"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";

import * as React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function BrandProductCard({
  product,
  brandSlug,
  onAddToCart,
}) {
  const [isFollowed, setIsFollowed] = React.useState(false);

  React.useEffect(() => {
    const existingItems = JSON.parse(localStorage.getItem("followItems") || "[]");
    const alreadyExists = existingItems.some((item) => item.id === product.id);
    setIsFollowed(alreadyExists);
  }, [product.id]);

  const handleFollow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const followItem = {
      id: product.id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      color: product.color,
      colors: product.colors,
    };

    const existingItems = JSON.parse(localStorage.getItem("followItems") || "[]");
    const alreadyExists = existingItems.some((item) => item.id === product.id);

    if (!alreadyExists) {
      localStorage.setItem(
        "followItems",
        JSON.stringify([...existingItems, followItem])
      );
      window.dispatchEvent(new Event("followUpdated"));
      setIsFollowed(true);
      return;
    }

    localStorage.setItem(
      "followItems",
      JSON.stringify(existingItems.filter((item) => item.id !== product.id))
    );
    window.dispatchEvent(new Event("followUpdated"));
    setIsFollowed(false);
  };

  const detailHref = `/brands/${brandSlug}/${product.id}`;

  return (
    <div className="group overflow-hidden rounded-[28px] border border-black/5 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="relative">
        <button
          type="button"
          onClick={handleFollow}
          aria-label={isFollowed ? "Remove from follow" : "Add to follow"}
          className={`absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition ${
            isFollowed
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "bg-white/95 text-[#111] hover:bg-red-50 hover:text-red-500"
          }`}
        >
          <Heart size={20} fill={isFollowed ? "currentColor" : "none"} />
        </button>

        <Link href={detailHref} className="block">
          <div className="relative overflow-hidden bg-[#f1f3f8]">
            <div className="flex items-center justify-center px-4 pb-4 pt-10 sm:px-6 sm:pt-12">
              <img
                src={product.image}
                alt={product.name}
                className="h-[220px] w-full max-w-[260px] object-contain transition duration-500 group-hover:scale-110 sm:h-[250px] sm:max-w-[300px] lg:h-[280px] lg:max-w-[330px]"
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

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm text-gray-500">{product.colors} Colors</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="px-5 pb-5 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-[#111]">${product.price}</p>

          <div className="flex gap-2">
            <Link
              href={detailHref}
              className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#111] transition hover:bg-gray-100"
            >
              View
            </Link>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              className="rounded-full bg-[#111] px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
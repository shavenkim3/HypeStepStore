"use client";

import { BadgePercent } from "lucide-react";

export default function SaleHero({ totalItems = 0 }) {
  return (
    <>
      <p className="text-sm text-gray-500">
        Home <span className="mx-2 text-gray-300">/</span> Sale
      </p>

      <div className="mt-4 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600">
            <BadgePercent size={16} />
            Limited Time Offers
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Sneaker Sale
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Explore discounted sneakers from top brands. Filter by gender,
            brand, color, price, and shoe type to find the best deal faster.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="rounded-full bg-[#111] px-5 py-2 text-sm font-semibold text-white">
              Up to 35% Off
            </div>

            <div className="rounded-full bg-[#eef2ff] px-5 py-2 text-sm font-semibold text-indigo-600">
              {totalItems} Sale Items
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[28px] bg-[#111] p-6 text-white shadow-sm">
            <p className="text-sm font-semibold text-rose-300">Top Offer</p>
            <h2 className="mt-3 text-2xl font-bold">
              Save more on selected pairs
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Discover the biggest markdowns across lifestyle, football,
              running, and everyday sneakers.
            </p>
          </div>

          <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-indigo-600">
              Quick Summary
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#111]">
              Easy filtering, faster shopping
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Narrow down sale products by category, color, gender, brand,
              and price range in one place.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { brands, allProducts, slugifyBrand } from "../data/products";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function BrandsPage() {
  const [activeLetter, setActiveLetter] = useState("ALL");

  const groupedBrands = useMemo(() => {
    const counts = allProducts.reduce((acc, product) => {
      acc[product.brand] = (acc[product.brand] || 0) + 1;
      return acc;
    }, {});

    const sortedBrands = [...brands].sort((a, b) => a.localeCompare(b));

    return alphabet.reduce((acc, letter) => {
      acc[letter] = sortedBrands
        .filter((brand) => brand.charAt(0).toUpperCase() === letter)
        .map((brand) => ({
          name: brand,
          slug: slugifyBrand(brand),
          count: counts[brand] || 0,
        }));
      return acc;
    }, {});
  }, []);

  const availableLetters = useMemo(() => {
    return alphabet.filter((letter) => groupedBrands[letter]?.length > 0);
  }, [groupedBrands]);

  const visibleBrands = useMemo(() => {
    if (activeLetter === "ALL") {
      return [...brands]
        .sort((a, b) => a.localeCompare(b))
        .map((brand) => {
          const count = allProducts.filter((product) => product.brand === brand).length;

          return {
            name: brand,
            slug: slugifyBrand(brand),
            count,
          };
        });
    }

    return groupedBrands[activeLetter] || [];
  }, [activeLetter, groupedBrands]);

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar />

      <section className="px-4 pt-6 pb-8 sm:px-6 lg:px-10 lg:pt-8 lg:pb-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-sm text-gray-500">
            Home <span className="mx-2 text-gray-300">/</span> Brands
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Explore Sneaker Brands
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            Discover brands from A to Z and explore their sneaker collections
            easily. Designed for fast browsing on both desktop and mobile.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-px w-10 bg-black/10" />
            <div className="rounded-full bg-[#eef2ff] px-4 py-1.5 text-sm font-semibold text-indigo-600">
              {brands.length} Brands Available
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-10 lg:pb-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="rounded-[28px] border border-black/5 bg-white p-4 shadow-sm sm:p-6">
            <div className="-mx-1 overflow-x-auto">
              <div className="flex min-w-max gap-2 px-1">
                <button
                  type="button"
                  onClick={() => setActiveLetter("ALL")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeLetter === "ALL"
                      ? "bg-[#111] text-white"
                      : "bg-[#f3f4f6] hover:text-indigo-600"
                  }`}
                >
                  All
                </button>

                {alphabet.map((letter) => {
                  const enabled = availableLetters.includes(letter);
                  const active = activeLetter === letter;

                  return (
                    <button
                      key={letter}
                      type="button"
                      disabled={!enabled}
                      onClick={() => enabled && setActiveLetter(letter)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? "bg-[#111] text-white"
                          : enabled
                          ? "bg-[#f3f4f6] hover:text-indigo-600"
                          : "cursor-not-allowed bg-gray-100 text-gray-300"
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-600">
              {activeLetter === "ALL" ? "A-Z" : activeLetter}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {activeLetter === "ALL" ? "All Brands" : `Brands - ${activeLetter}`}
              </h2>
              <p className="text-sm text-gray-500">
                {visibleBrands.length} brands
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group rounded-[24px] border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs uppercase tracking-widest text-indigo-500">
                  Brand
                </p>

                <h3 className="mt-3 text-lg font-semibold group-hover:text-indigo-600">
                  {brand.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {brand.count} items
                </p>

                <div className="mt-5 text-sm font-semibold text-gray-400 group-hover:text-indigo-600">
                  View →
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-black/5 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">All Brand Index</h2>

            <div className="mt-6 space-y-5">
              {alphabet.map((letter) => {
                const items = groupedBrands[letter];
                if (!items.length) return null;

                return (
                  <div key={letter} className="rounded-2xl bg-[#f8f9fc] p-4">
                    <p className="mb-3 font-bold">{letter}</p>

                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {items.map((brand) => (
                        <Link
                          key={brand.slug}
                          href={`/brands/${brand.slug}`}
                          className="text-sm text-gray-600 hover:text-indigo-600"
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
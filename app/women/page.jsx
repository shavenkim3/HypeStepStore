"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, X, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterPanel from "../components/new/FilterPanel";
import { allProducts, slugifyBrand } from "../data/products";

function getProductHref(product) {
  if (product.routePath) return product.routePath;

  if (product.isBestSeller) {
    return `/best-sellers/${product.id}`;
  }

  return `/brands/${slugifyBrand(product.brand)}/${product.id}`;
}

function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`;
}

export default function WomenPage() {
  const [selectedGenders, setSelectedGenders] = useState(["Women"]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedShoeTypes, setSelectedShoeTypes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const womenProducts = useMemo(() => {
    return allProducts
      .filter((product) => product.gender === "Women")
      .map((product) => ({
        ...product,
        href: getProductHref(product),
      }));
  }, []);

  const filteredProducts = useMemo(() => {
    return womenProducts.filter((product) => {
      const matchesGender =
        selectedGenders.length === 0 || selectedGenders.includes(product.gender);

      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const matchesColor =
        selectedColors.length === 0 || selectedColors.includes(product.color);

      const matchesType =
        selectedShoeTypes.length === 0 ||
        selectedShoeTypes.includes(product.category);

      const price = Number(product.price) || 0;
      const matchesPrice = price >= minPrice && price <= maxPrice;

      return (
        matchesGender &&
        matchesBrand &&
        matchesColor &&
        matchesType &&
        matchesPrice
      );
    });
  }, [
    womenProducts,
    selectedGenders,
    selectedBrands,
    selectedColors,
    selectedShoeTypes,
    minPrice,
    maxPrice,
  ]);

  const featuredProducts = useMemo(() => {
    return womenProducts.slice(0, 3);
  }, [womenProducts]);

  const clearAllFilters = () => {
    setSelectedGenders(["Women"]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedShoeTypes([]);
    setMinPrice(0);
    setMaxPrice(300);
  };

  const filterPanelProps = {
    selectedGenders,
    setSelectedGenders,
    selectedBrands,
    setSelectedBrands,
    selectedColors,
    setSelectedColors,
    selectedShoeTypes,
    setSelectedShoeTypes,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    onClear: clearAllFilters,
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar />

      <section className="px-4 pt-6 pb-8 sm:px-6 lg:px-10 lg:pt-8 lg:pb-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-sm text-gray-500">
            Home <span className="mx-2 text-gray-300">/</span> Women
          </p>

          <div className="mt-4 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-pink-100/60 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-indigo-100/50 blur-3xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
                  Women's Collection
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Women's Sneakers
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                  Explore women's sneakers across lifestyle, running,
                  basketball, and more. Use filters to quickly find the style,
                  brand, color, and price range that matches your everyday look.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="rounded-full bg-[#111] px-5 py-2 text-sm font-semibold text-white">
                    Style Meets Comfort
                  </div>

                  <div className="rounded-full bg-pink-50 px-5 py-2 text-sm font-semibold text-pink-600">
                    {womenProducts.length} Products
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[28px] bg-[#111] p-6 text-white shadow-sm">
                <p className="text-sm font-semibold text-pink-300">
                  Popular Categories
                </p>
                <h2 className="mt-3 text-2xl font-bold">
                  Lifestyle, running, training and more
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  Browse versatile styles designed for daily wear, movement, and
                  comfort.
                </p>
              </div>

              <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-pink-600">
                  Quick Browse
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#111]">
                  Filter faster, shop easier
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Narrow down women's sneakers by brand, color, category, and
                  price in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">Featured Picks</h2>
                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                  Highlighted pairs from the women's collection.
                </p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <Link
                  key={`featured-${product.id}`}
                  href={product.href}
                  className="group overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative overflow-hidden bg-gradient-to-b from-[#eef2f8] to-[#f7f8fc]">
                    <div className="flex items-center justify-center px-6 py-10">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-[220px] w-full max-w-[280px] object-contain transition duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-pink-600/80">
                      {product.brand}
                    </p>

                    <h3 className="mt-2 line-clamp-2 text-xl font-semibold text-[#111]">
                      {product.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="text-sm text-gray-500">{product.gender}</p>
                    </div>

                    <div className="mt-5 flex items-end gap-3">
                      <p className="text-2xl font-bold text-[#111]">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
            <div className="hidden xl:block">
              <FilterPanel {...filterPanelProps} />
            </div>

            <div>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    All Women's Products
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 sm:text-base">
                    Browse all women's sneakers and open any item to view more
                    details.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <div className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-[#111]">
                      {filteredProducts.length}
                    </span>{" "}
                    items
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#111] shadow-sm transition hover:border-pink-200 hover:text-pink-600 xl:hidden"
                  >
                    <SlidersHorizontal size={18} />
                    Filters
                  </button>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={product.href}
                      className="group overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                    >
                      <div className="relative overflow-hidden bg-[#f1f3f8]">
                        <div className="flex items-center justify-center px-5 pb-5 pt-10">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-[220px] w-full max-w-[260px] object-contain transition duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-pink-600/80">
                          {product.brand}
                        </p>

                        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-[#111] sm:text-xl">
                          {product.name}
                        </h3>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <p className="text-sm text-gray-500">{product.category}</p>
                          <p className="text-sm text-gray-500">{product.color}</p>
                        </div>

                        <div className="mt-5 flex items-end gap-3">
                          <p className="text-2xl font-bold text-[#111]">
                            {formatPrice(product.price)}
                          </p>
                        </div>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pink-600">
                          View Product
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-[28px] border border-black/5 bg-white px-6 py-14 text-center shadow-sm">
                  <h3 className="text-xl font-semibold text-[#111]">
                    No products found
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Try changing or clearing some filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] xl:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/35"
            aria-label="Close filters overlay"
          />

          <div className="absolute right-0 top-0 h-full w-full max-w-[360px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <h2 className="text-xl font-semibold text-[#111]">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#111] transition hover:text-pink-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="h-[calc(100%-76px)] overflow-y-auto p-4">
              <FilterPanel {...filterPanelProps} />

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
              >
                View Results
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
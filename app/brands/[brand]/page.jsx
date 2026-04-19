"use client";

import * as React from "react";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FilterPanel from "../../components/new/FilterPanel";
import MobileFilterDrawer from "../../components/new/MobileFilterDrawer";
import BrandProductCard from "../../components/brands/BrandProductCard";
import {
  allProducts,
  getBrandNameFromSlug,
  slugifyBrand,
} from "../../data/products";

const PRICE_MIN = 0;
const PRICE_MAX = 300;

export default function BrandPage({ params }) {
  const { brand } = React.use(params);
  const brandName = getBrandNameFromSlug(brand);

  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedGenders, setSelectedGenders] = React.useState([]);
  const [selectedBrands, setSelectedBrands] = React.useState([]);
  const [selectedColors, setSelectedColors] = React.useState([]);
  const [selectedShoeTypes, setSelectedShoeTypes] = React.useState([]);
  const [minPrice, setMinPrice] = React.useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = React.useState(PRICE_MAX);
  const [sortBy, setSortBy] = React.useState("newest");

  React.useEffect(() => {
    if (brandName) {
      setSelectedBrands([brandName]);
    }
  }, [brandName]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenders([]);
    setSelectedBrands(brandName ? [brandName] : []);
    setSelectedColors([]);
    setSelectedShoeTypes([]);
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
    setSortBy("newest");
  };

  const brandProducts = React.useMemo(() => {
    return allProducts.filter((product) => product.brand === brandName);
  }, [brandName]);

  const filteredProducts = React.useMemo(() => {
    let result = [...brandProducts];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (normalizedSearch) {
      result = result.filter((product) => {
        const searchableText = [
          product.name,
          product.brand,
          product.category,
          product.gender,
          product.color,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedSearch);
      });
    }

    if (selectedGenders.length > 0) {
      result = result.filter((product) =>
        selectedGenders.includes(product.gender)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((product) =>
        selectedColors.includes(product.color)
      );
    }

    if (selectedShoeTypes.length > 0) {
      result = result.filter((product) =>
        selectedShoeTypes.includes(product.category)
      );
    }

    result = result.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    if (sortBy === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "brand-a-z") {
      result.sort((a, b) => a.brand.localeCompare(b.brand));
    }

    return result;
  }, [
    brandProducts,
    searchTerm,
    selectedGenders,
    selectedBrands,
    selectedColors,
    selectedShoeTypes,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const handleAddToCart = (product) => {
    const defaultSize = product.sizes?.[0] || "";

    const cartItem = {
      cartId: `${product.id}-${defaultSize || "default"}`,
      id: product.id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      color: product.color,
      size: defaultSize,
      quantity: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const existingIndex = existingCart.findIndex(
      (item) => item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!brandName) {
    return (
      <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
        <Navbar />
        <section className="px-4 py-12 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1200px] rounded-[32px] border border-black/5 bg-white p-8 text-center shadow-sm">
            <h1 className="text-3xl font-bold">Brand not found</h1>
            <p className="mt-3 text-gray-600">This brand does not exist.</p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              Back to Home
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <section className="w-full px-4 pb-10 pt-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Home <span className="mx-2 text-gray-300">/</span> {brandName}
              </p>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#111] sm:text-4xl lg:text-5xl">
                {brandName}
              </h1>
            </div>

            <div className="text-sm text-gray-600 sm:text-base">
              Showing{" "}
              <span className="font-semibold text-[#111]">
                {filteredProducts.length}
              </span>{" "}
              products
            </div>
          </div>

          <div className="mb-6 flex justify-end">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#111] shadow-sm lg:hidden"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-full border border-black/10 bg-white px-4 py-3 pr-10 text-sm font-semibold text-[#111] shadow-sm outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="brand-a-z">Brand: A-Z</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
            <div className="hidden lg:block">
              <FilterPanel
                selectedGenders={selectedGenders}
                setSelectedGenders={setSelectedGenders}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                selectedShoeTypes={selectedShoeTypes}
                setSelectedShoeTypes={setSelectedShoeTypes}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                onClear={clearFilters}
              />
            </div>

            <div>
              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <BrandProductCard
                      key={product.id}
                      product={product}
                      brandSlug={slugifyBrand(brandName)}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-black/5 bg-white px-6 py-14 text-center shadow-sm">
                  <h2 className="text-2xl font-semibold text-[#111]">
                    No products found
                  </h2>
                  <p className="mt-3 text-gray-600">
                    Try changing your search or filters to see more products.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        selectedGenders={selectedGenders}
        setSelectedGenders={setSelectedGenders}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        selectedShoeTypes={selectedShoeTypes}
        setSelectedShoeTypes={setSelectedShoeTypes}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        onClear={clearFilters}
      />

      <Footer />
    </main>
  );
}
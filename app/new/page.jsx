"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterPanel from "../components/new/FilterPanel";
import ProductCard from "../components/new/ProductCard";
import MobileFilterDrawer from "../components/new/MobileFilterDrawer";

const products = [
  {
    id: 1,
    brand: "Nike",
    name: "Nike Air Force 1 '07",
    price: 144,
    image: "/images/airforce1.png",
    category: "Lifestyle",
    gender: "Men",
    color: "White",
    isNew: true,
    colors: 3,
  },
  {
    id: 2,
    brand: "Adidas",
    name: "Adidas Samba OG",
    price: 105,
    image: "/images/samba.png",
    category: "Lifestyle",
    gender: "Unisex",
    color: "White",
    isNew: true,
    colors: 2,
  },
  {
    id: 3,
    brand: "Jordan",
    name: "Air Jordan 1 Low",
    price: 115,
    image: "/images/jordan1.png",
    category: "Basketball",
    gender: "Men",
    color: "Red",
    isNew: true,
    colors: 4,
  },
  {
    id: 4,
    brand: "Nike",
    name: "Nike Dunk Low Retro",
    price: 125,
    image: "/images/airforce1.png",
    category: "Lifestyle",
    gender: "Women",
    color: "Black",
    isNew: true,
    colors: 5,
  },
  {
    id: 5,
    brand: "Puma",
    name: "Puma Velocity Nitro",
    price: 129,
    image: "/images/jordan1.png",
    category: "Running",
    gender: "Men",
    color: "Yellow",
    isNew: true,
    colors: 2,
  },
  {
    id: 6,
    brand: "New Balance",
    name: "New Balance 9060",
    price: 159,
    image: "/images/samba.png",
    category: "Lifestyle",
    gender: "Unisex",
    color: "Brown",
    isNew: true,
    colors: 3,
  },
  {
    id: 7,
    brand: "Asics",
    name: "Asics GEL-Kayano 14",
    price: 150,
    image: "/images/airforce1.png",
    category: "Running",
    gender: "Women",
    color: "Grey",
    isNew: true,
    colors: 3,
  },
  {
    id: 8,
    brand: "Vans",
    name: "Vans Knu Skool",
    price: 89,
    image: "/images/jordan1.png",
    category: "Skateboarding",
    gender: "Kids",
    color: "Blue",
    isNew: true,
    colors: 4,
  },
  {
    id: 9,
    brand: "Adidas",
    name: "Adidas Adizero SL",
    price: 135,
    image: "/images/samba.png",
    category: "Running",
    gender: "Men",
    color: "Green",
    isNew: true,
    colors: 2,
  },
];

export default function NewPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedShoeTypes, setSelectedShoeTypes] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);

  const [sortBy, setSortBy] = useState("newest");

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenders([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedShoeTypes([]);
    setMinPrice(0);
    setMaxPrice(300);
    setSortBy("newest");
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
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
    searchTerm,
    selectedGenders,
    selectedBrands,
    selectedColors,
    selectedShoeTypes,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <section className="w-full px-4 pt-6 pb-10 sm:px-6 lg:px-10 lg:pt-8 lg:pb-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Home <span className="mx-2 text-gray-300">/</span> New Arrivals
              </p>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#111] sm:text-4xl lg:text-5xl">
                New Arrivals
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
                    <ProductCard key={product.id} product={product} />
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
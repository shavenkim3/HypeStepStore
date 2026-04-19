"use client";

import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BrandSection from "./components/BrandSection";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      brand: "Jordan",
      name: "Air Jordan 1 Low",
      price: "$115",
      image: "/images/jordan1.png",
      rating: 5,
      reviews: 5,
    },
    {
      brand: "Nike",
      name: "Nike Air Force 1 '07",
      price: "$144",
      image: "/images/airforce1.png",
      rating: 4,
      reviews: 7,
    },
    {
      brand: "Adidas",
      name: "Adidas Samba OG",
      price: "$105",
      image: "/images/samba.png",
      rating: 5,
      reviews: 5,
    },
    {
      brand: "Adidas",
      name: "Adidas Campus 00s",
      price: "$105",
      image: "/images/samba.png",
      rating: 5,
      reviews: 5,
    },
    {
      brand: "Nike",
      name: "Nike Dunk Low",
      price: "$105",
      image: "/images/airforce1.png",
      rating: 5,
      reviews: 5,
    },
  ];

  const filteredProducts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) return products;

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword)
      );
    });
  }, [searchTerm]);

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <HeroSection />
      <BrandSection />

      <section className="w-full bg-[#f6f7fb] px-4 pb-14 pt-2 sm:px-6 lg:px-10 lg:pb-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#111] sm:text-3xl lg:text-4xl">
              Best Sellers
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              Discover our most popular sneaker picks, chosen for comfort,
              style, and everyday wear.
            </p>
          </div>

          {searchTerm.trim() && (
            <p className="mb-6 text-sm text-gray-600 sm:text-base">
              Search results for:{" "}
              <span className="font-semibold text-[#111]">{searchTerm}</span>
            </p>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-black/5 bg-white px-6 py-12 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-[#111]">
                No products found
              </h3>
              <p className="mt-2 text-gray-600">
                Try searching for another sneaker name or brand.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
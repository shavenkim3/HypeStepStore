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
      id: 1,
      brand: "Jordan",
      name: "Air Jordan 1 Low",
      price: 115,
      image: "/images/jordan1.png",
      rating: 5,
      reviews: 128,
      category: "Basketball",
      color: "Red",
      colors: 4,
      gallery: [
        "/images/jordan1.png",
        "/images/jordan1.png",
        "/images/jordan1.png",
        "/images/jordan1.png",
      ],
      description:
        "A bestseller loved for its timeless Jordan DNA, clean profile, and easy everyday styling.",
      highlights: [
        "Low-cut silhouette",
        "Cushioned comfort",
        "Classic Jordan heritage",
        "Street-ready versatility",
      ],
    },
    {
      id: 2,
      brand: "Nike",
      name: "Nike Air Force 1 '07",
      price: 144,
      image: "/images/airforce1.png",
      rating: 4.8,
      reviews: 214,
      category: "Lifestyle",
      color: "White",
      colors: 3,
      gallery: [
        "/images/airforce1(1).png",
        "/images/airforce1(2).png",
        "/images/airforce1(3).png",
        "/images/airforce1(4).png",
      ],
      description:
        "One of the most iconic sneakers ever made, loved for premium comfort and clean all-day style.",
      highlights: [
        "Premium leather upper",
        "Soft cushioning",
        "Clean classic design",
        "Daily wear essential",
      ],
    },
    {
      id: 3,
      brand: "Adidas",
      name: "Adidas Samba OG",
      price: 105,
      image: "/images/samba.png",
      rating: 5,
      reviews: 176,
      category: "Lifestyle",
      color: "White",
      colors: 2,
      gallery: [
        "/images/samba.png",
        "/images/samba.png",
        "/images/samba.png",
        "/images/samba.png",
      ],
      description:
        "An all-time favorite that mixes football heritage with modern streetwear appeal.",
      highlights: [
        "Retro indoor style",
        "Gum sole finish",
        "Slim easy-to-style profile",
        "Everyday comfort",
      ],
    },
    {
      id: 4,
      brand: "Nike",
      name: "Luka 77 “Chicago” PF",
      price: 116,
      image: "/images/Luka(1).png",
      rating: 4.9,
      reviews: 92,
      category: "Basketball",
      color: "White",
      colors: 1,
      gallery: [
        "/images/Luka(1).png",
        "/images/Luka(1).png",
        "/images/Luka(1).png",
        "/images/Luka(1).png",
      ],
      description:
        "A chunky retro-inspired silhouette with laid-back street style and a bold 2000s feel.",
      highlights: [
        "Chunkier proportions",
        "Soft suede look",
        "Streetwear favorite",
        "Casual styling staple",
      ],
    },
    {
      id: 5,
      brand: "Puma",
      name: "Puma Speedcat OG",
      price: 119,
      image: "/images/Speedcat(1).png",
      rating: 8.9,
      reviews: 147,
      category: "Lifestyle",
      color: "Brown",
      colors: 1,
      gallery: [
        "/images/Speedcat(1).png",
        "/images/Speedcat(2).png",
        "/images/Speedcat(3).png",
        "/images/Speedcat(4).png",
      ],
      description:
        "A modern bestseller with basketball roots, sharp color blocking, and easy everyday wear.",
      highlights: [
        "Basketball-inspired design",
        "Popular low-top shape",
        "Comfortable fit",
        "Versatile styling",
      ],
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
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111] sm:text-3xl lg:text-4xl">
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
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  href={`/best-sellers/${product.id}`}
                />
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
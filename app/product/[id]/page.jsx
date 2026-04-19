"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const products = [
  {
    id: 1,
    brand: "Nike",
    name: "Nike Air Force 1 '07",
    price: 144,
    category: "Lifestyle",
    gender: "Men",
    color: "White",
    isNew: true,
    colors: 3,
    description:
      "A timeless classic with clean lines, premium comfort, and everyday versatility.",
    gallery: [
      { src: "/images/airforce1(1).png", alt: "Nike Air Force 1 '07 side view" },
      { src: "/images/airforce1(2).png", alt: "Nike Air Force 1 '07 front view" },
      { src: "/images/airforce1(3).png", alt: "Nike Air Force 1 '07 back view" },
      { src: "/images/airforce1(4).png", alt: "Nike Air Force 1 '07 top view" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
  },
  {
    id: 2,
    brand: "Adidas",
    name: "Adidas Samba OG",
    price: 105,
    category: "Lifestyle",
    gender: "Unisex",
    color: "White",
    isNew: true,
    colors: 2,
    description:
      "An iconic streetwear staple with retro football roots and effortless style.",
    gallery: [
      { src: "/images/samba.png", alt: "Adidas Samba OG side view" },
      { src: "/images/samba.png", alt: "Adidas Samba OG front view" },
      { src: "/images/samba.png", alt: "Adidas Samba OG back view" },
      { src: "/images/samba.png", alt: "Adidas Samba OG top view" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
  },
  {
    id: 3,
    brand: "Jordan",
    name: "Air Jordan 1 Low",
    price: 115,
    category: "Basketball",
    gender: "Men",
    color: "Red",
    isNew: true,
    colors: 4,
    description:
      "Low-cut comfort and legendary Jordan design for on-court and off-court wear.",
    gallery: [
      { src: "/images/jordan1.png", alt: "Air Jordan 1 Low side view" },
      { src: "/images/jordan1.png", alt: "Air Jordan 1 Low front view" },
      { src: "/images/jordan1.png", alt: "Air Jordan 1 Low back view" },
      { src: "/images/jordan1.png", alt: "Air Jordan 1 Low top view" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
  },
  {
    id: 4,
    brand: "Nike",
    name: "Nike Dunk Low Retro",
    price: 125,
    category: "Lifestyle",
    gender: "Women",
    color: "Black",
    isNew: true,
    colors: 5,
    description:
      "Bold, clean, and easy to style. A modern favorite inspired by basketball heritage.",
    gallery: [
      { src: "/images/airforce1.png", alt: "Nike Dunk Low Retro side view" },
      { src: "/images/airforce1.png", alt: "Nike Dunk Low Retro front view" },
      { src: "/images/airforce1.png", alt: "Nike Dunk Low Retro back view" },
      { src: "/images/airforce1.png", alt: "Nike Dunk Low Retro top view" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
  },
  {
    id: 5,
    brand: "Puma",
    name: "Puma Velocity Nitro",
    price: 129,
    category: "Running",
    gender: "Men",
    color: "Yellow",
    isNew: true,
    colors: 2,
    description:
      "Responsive cushioning and lightweight energy return for everyday runs.",
    gallery: [
      { src: "/images/jordan1.png", alt: "Puma Velocity Nitro side view" },
      { src: "/images/jordan1.png", alt: "Puma Velocity Nitro front view" },
      { src: "/images/jordan1.png", alt: "Puma Velocity Nitro back view" },
      { src: "/images/jordan1.png", alt: "Puma Velocity Nitro top view" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
  },
  {
    id: 6,
    brand: "New Balance",
    name: "New Balance 9060",
    price: 159,
    category: "Lifestyle",
    gender: "Unisex",
    color: "Brown",
    isNew: true,
    colors: 3,
    description:
      "Chunky futuristic styling paired with premium comfort and standout proportions.",
    gallery: [
      { src: "/images/samba.png", alt: "New Balance 9060 side view" },
      { src: "/images/samba.png", alt: "New Balance 9060 front view" },
      { src: "/images/samba.png", alt: "New Balance 9060 back view" },
      { src: "/images/samba.png", alt: "New Balance 9060 top view" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
  },
  {
    id: 7,
    brand: "Asics",
    name: "Asics GEL-Kayano 14",
    price: 150,
    category: "Running",
    gender: "Women",
    color: "Grey",
    isNew: true,
    colors: 3,
    description:
      "Performance-inspired cushioning meets a sleek retro runner aesthetic.",
    gallery: [
      { src: "/images/airforce1.png", alt: "Asics GEL-Kayano 14 side view" },
      { src: "/images/airforce1.png", alt: "Asics GEL-Kayano 14 front view" },
      { src: "/images/airforce1.png", alt: "Asics GEL-Kayano 14 back view" },
      { src: "/images/airforce1.png", alt: "Asics GEL-Kayano 14 top view" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
  },
  {
    id: 8,
    brand: "Vans",
    name: "Vans Knu Skool",
    price: 89,
    category: "Skateboarding",
    gender: "Kids",
    color: "Blue",
    isNew: true,
    colors: 4,
    description:
      "Puffy 90s-inspired design with classic Vans attitude and daily comfort.",
    gallery: [
      { src: "/images/jordan1.png", alt: "Vans Knu Skool side view" },
      { src: "/images/jordan1.png", alt: "Vans Knu Skool front view" },
      { src: "/images/jordan1.png", alt: "Vans Knu Skool back view" },
      { src: "/images/jordan1.png", alt: "Vans Knu Skool top view" },
    ],
    sizes: ["30", "31", "32", "33", "34", "35"],
  },
  {
    id: 9,
    brand: "Adidas",
    name: "Adidas Adizero SL",
    price: 135,
    category: "Running",
    gender: "Men",
    color: "Green",
    isNew: true,
    colors: 2,
    description:
      "Fast, light, and versatile running shoes built for speed and comfort.",
    gallery: [
      { src: "/images/samba.png", alt: "Adidas Adizero SL side view" },
      { src: "/images/samba.png", alt: "Adidas Adizero SL front view" },
      { src: "/images/samba.png", alt: "Adidas Adizero SL back view" },
      { src: "/images/samba.png", alt: "Adidas Adizero SL top view" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
  },
];

function ProductGallery({ product }) {
  const gallery = useMemo(() => {
    if (!product) return [];
    if (product.gallery?.length) return product.gallery;
    return [];
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(0);

  React.useEffect(() => {
    setSelectedImage(0);
  }, [product.id]);

  const currentImage = gallery[selectedImage] || gallery[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[110px_minmax(0,1fr)] xl:grid-cols-[120px_minmax(0,1fr)]">
      <div className="order-2 lg:order-1">
        <div className="grid grid-cols-4 gap-3 lg:grid-cols-1">
          {gallery.map((image, index) => {
            const isActive = selectedImage === index;

            return (
              <button
                key={`${image.alt}-${index}`}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-[24px] border bg-white p-2 shadow-sm transition ${
                  isActive
                    ? "border-indigo-600 ring-2 ring-indigo-100"
                    : "border-black/5 hover:border-indigo-200"
                }`}
              >
                <div className="flex h-[84px] items-center justify-center rounded-[18px] bg-[#eef2f8] p-2 sm:h-[92px] lg:h-[100px]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-[58px] w-full max-w-[90px] object-contain sm:h-[66px] lg:h-[72px]"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="order-1 lg:order-2 overflow-hidden rounded-[32px] border border-black/5 bg-white p-4 shadow-sm sm:p-5">
        <div className="relative flex items-center justify-center rounded-[28px] bg-[#eef2f8] px-6 py-8 sm:px-8 sm:py-10 lg:min-h-[540px] lg:px-10 lg:py-12 xl:min-h-[600px]">
          {product.isNew && (
            <span className="absolute left-5 top-5 rounded-full bg-[#111] px-3 py-1 text-xs font-semibold text-white">
              New
            </span>
          )}

          <img
            src={currentImage?.src}
            alt={currentImage?.alt || product.name}
            className="h-[260px] w-full max-w-[620px] object-contain sm:h-[320px] lg:h-[430px] xl:h-[480px]"
          />
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }) {
  const { id } = React.use(params);
  const productId = Number(id);
  const product = products.find((item) => item.id === productId);

  const [selectedSize, setSelectedSize] = useState("");

React.useEffect(() => {
  setSelectedSize("");
}, [productId]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      alert("Please select a size first");
      return;
    }

    const cartItem = {
      cartId: `${product.id}-${selectedSize}`,
      id: product.id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.gallery?.[0]?.src || "",
      category: product.category,
      color: product.color,
      size: selectedSize,
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

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
        <Navbar />
        <section className="px-4 py-10 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1200px] rounded-[32px] border border-black/5 bg-white p-8 text-center shadow-sm">
            <h1 className="text-3xl font-bold text-[#111]">Product not found</h1>
            <p className="mt-3 text-gray-600">
              The product you are looking for does not exist.
            </p>
            <Link
              href="/new"
              className="mt-6 inline-flex rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              Back to New Arrivals
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar />

      <section className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-indigo-600">
              Home
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link href="/new" className="transition hover:text-indigo-600">
              New Arrivals
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-[#111]">{product.name}</span>
          </div>

          <div className="grid items-start gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <ProductGallery product={product} />

            <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  {product.brand}
                </p>

                {product.isNew && (
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                    New Arrival
                  </span>
                )}
              </div>

              <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-600">
                <span className="rounded-full bg-[#f6f7fb] px-4 py-2">
                  {product.category}
                </span>
                <span className="rounded-full bg-[#f6f7fb] px-4 py-2">
                  {product.gender}
                </span>
                <span className="rounded-full bg-[#f6f7fb] px-4 py-2">
                  {product.color}
                </span>
                <span className="rounded-full bg-[#f6f7fb] px-4 py-2">
                  {product.colors} Colors
                </span>
              </div>

              <div className="mt-6 flex items-end gap-3">
                <p className="text-3xl font-bold text-[#111]">${product.price}</p>
                <span className="pb-1 text-sm text-gray-500">
                  Free shipping over $100
                </span>
              </div>

              <div className="mt-6 border-t border-black/5 pt-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Product Details
                </h2>
                <p className="mt-3 leading-7 text-gray-600">
                  {product.description}
                </p>
              </div>

              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Available Sizes
                  </h2>

                  <span className="text-sm font-medium text-gray-500">
                    {selectedSize ? `Selected: ${selectedSize}` : "Select a size"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                            : "border-black/10 bg-white text-[#111] hover:border-indigo-600 hover:text-indigo-600"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 rounded-full bg-[#111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  className="flex-1 rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-[#111] transition hover:border-indigo-600 hover:text-indigo-600"
                >
                  Buy Now
                </button>
              </div>

              <div className="mt-8 grid gap-3 border-t border-black/5 pt-6 text-sm text-gray-600">
                <div className="rounded-2xl bg-[#f8f9fc] px-4 py-3">
                  Free standard shipping on orders over $100.
                </div>
                <div className="rounded-2xl bg-[#f8f9fc] px-4 py-3">
                  Easy returns within 14 days.
                </div>
                <div className="rounded-2xl bg-[#f8f9fc] px-4 py-3">
                  Authentic products from top sneaker brands.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
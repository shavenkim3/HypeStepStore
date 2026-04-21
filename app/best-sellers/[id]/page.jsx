"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const bestSellerProducts = [
  {
    id: 1,
    brand: "Jordan",
    name: "Air Jordan 1 Low",
    price: 115,
    category: "Basketball",
    gender: "Men",
    color: "Red",
    isBestSeller: true,
    colors: 4,
    description:
      "A best-selling Jordan silhouette with iconic style, everyday comfort, and versatile wearability for both on-court and off-court looks.",
    gallery: [
      { src: "/images/jordan1(1).png", alt: "Air Jordan 1 Low side view" },
      { src: "/images/jordan1(2).png", alt: "Air Jordan 1 Low front view" },
      { src: "/images/jordan1(3).png", alt: "Air Jordan 1 Low back view" },
      { src: "/images/jordan1(4).png", alt: "Air Jordan 1 Low top view" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
  },
  {
    id: 2,
    brand: "Nike",
    name: "Nike Air Force 1 '07",
    price: 144,
    category: "Lifestyle",
    gender: "Men",
    color: "White",
    isBestSeller: true,
    colors: 3,
    description:
      "One of the most popular sneakers of all time, combining timeless design, premium comfort, and effortless styling.",
    gallery: [
      { src: "/images/airforce1(1).png", alt: "Nike Air Force 1 '07 side view" },
      { src: "/images/airforce1(2).png", alt: "Nike Air Force 1 '07 front view" },
      { src: "/images/airforce1(3).png", alt: "Nike Air Force 1 '07 back view" },
      { src: "/images/airforce1(4).png", alt: "Nike Air Force 1 '07 top view" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
  },
  {
    id: 3,
    brand: "Adidas",
    name: "Adidas Samba OG",
    price: 105,
    category: "Lifestyle",
    gender: "Unisex",
    color: "White",
    isBestSeller: true,
    colors: 2,
    description:
      "A true best seller with retro football DNA, sleek proportions, and streetwear appeal that never goes out of style.",
    gallery: [
      { src: "/images/Samba(1).png", alt: "Adidas Samba OG side view" },
      { src: "/images/Samba(2).png", alt: "Adidas Samba OG front view" },
      { src: "/images/Samba(3).png", alt: "Adidas Samba OG back view" },
      { src: "/images/Samba(4).png", alt: "Adidas Samba OG top view" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
  },
  {
    id: 4,
    brand: "Nike",
    name: "Luka 77 “Chicago” PF",
    price: 116,
    category: "Basketball",
    gender: "Men",
    color: "White",
    isBestSeller: true,
    colors: 1,
    description:
      "A standout best seller featuring bold proportions, premium comfort, and modern styling for everyday rotation.",
    gallery: [
      { src: "/images/Luka(1).png", alt: "Luka 77 Chicago PF view 1" },
      { src: "/images/Luka(2).png", alt: "Luka 77 Chicago PF view 2" },
      { src: "/images/Luka(3).png", alt: "Luka 77 Chicago PF view 3" },
      { src: "/images/Luka(4).png", alt: "Luka 77 Chicago PF view 4" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
  },
  {
    id: 5,
    brand: "Puma",
    name: "Puma Speedcat OG",
    price: 119,
    category: "Lifestyle",
    gender: "Men",
    color: "Brown",
    isBestSeller: true,
    colors: 1,
    description:
      "A standout best seller featuring bold proportions, premium comfort, and modern styling for everyday rotation.",
    gallery: [
      { src: "/images/Speedcat(1).png", alt: "Puma Speedcat OG view 1" },
      { src: "/images/Speedcat(2).png", alt: "Puma Speedcat OG view 2" },
      { src: "/images/Speedcat(3).png", alt: "Puma Speedcat OG view 3" },
      { src: "/images/Speedcat(4).png", alt: "Puma Speedcat OG view 4" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
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
  }, [product?.id]);

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

      <div className="order-1 overflow-hidden rounded-[32px] border border-black/5 bg-white p-4 shadow-sm sm:p-5 lg:order-2">
        <div className="relative flex items-center justify-center rounded-[28px] bg-[#eef2f8] px-6 py-8 sm:px-8 sm:py-10 lg:min-h-[540px] lg:px-10 lg:py-12 xl:min-h-[600px]">
          {product.isBestSeller && (
            <span className="absolute left-5 top-5 rounded-full bg-[#111] px-3 py-1 text-xs font-semibold text-white">
              Best Seller
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

export default function BestSellerDetailPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { id } = React.use(params);
  const productId = Number(id);
  const product = bestSellerProducts.find((item) => item.id === productId);

  const initialSizeFromQuery = searchParams.get("size") || "";
  const fromCart = searchParams.get("from") === "cart";

  const [selectedSize, setSelectedSize] = useState("");

  React.useEffect(() => {
    if (product?.sizes?.includes(initialSizeFromQuery)) {
      setSelectedSize(initialSizeFromQuery);
    } else {
      setSelectedSize("");
    }
  }, [productId, initialSizeFromQuery, product]);

  const createCartItem = () => {
    if (!product || !selectedSize) return null;

    return {
      cartId: `${product.id}-${selectedSize}`,
      id: product.id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.gallery?.[0]?.src || "",
      category: product.category,
      color: product.color,
      colors: product.colors,
      gender: product.gender,
      size: selectedSize,
      quantity: 1,
      source: "best-sellers",
      routePath: `/best-sellers/${product.id}`,
    };
  };

  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      alert("Please select a size first");
      return;
    }

    const cartItem = createCartItem();
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const existingIndex = existingCart.findIndex(
      (item) => item.id === cartItem.id && item.size === cartItem.size
    );

    let updatedCart = [...existingCart];

    if (existingIndex !== -1) {
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: (updatedCart[existingIndex].quantity || 1) + 1,
        source: "best-sellers",
        routePath: `/best-sellers/${product.id}`,
      };
    } else {
      updatedCart.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    router.push("/cart");
  };

  const handleBuyNow = () => {
    if (!product || !selectedSize) {
      alert("Please select a size first");
      return;
    }

    const checkoutItem = {
      ...createCartItem(),
      source: "best-sellers",
      routePath: `/best-sellers/${product.id}`,
    };

    localStorage.setItem("checkoutItems", JSON.stringify([checkoutItem]));
    router.push("/checkout");
  };

  const handleBackLink = () => {
    if (fromCart) {
      router.push("/cart");
      return;
    }

    router.push("/");
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
      <Navbar />

      <section className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-6 text-sm text-gray-500">
            <button
              type="button"
              onClick={handleBackLink}
              className="transition hover:text-indigo-600"
            >
              {fromCart ? "Cart" : "Home"}
            </button>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-[#111]">Best Sellers</span>
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

                {product.isBestSeller && (
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                    Best Seller
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
                <p className="text-3xl font-bold text-[#111]">
                  ${Number(product.price).toFixed(2)}
                </p>
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
                  className="flex-1 rounded-full bg-[#111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
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
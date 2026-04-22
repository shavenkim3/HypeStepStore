"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const products = [
  {
    id: 1,
    brand: "Nike",
    name: "Air Jordan 1 Low",
    price: 133,
    category: "Lifestyle",
    gender: "Women",
    color: "Pink",
    isNew: true,
    colors: 1,
    description:
      "A timeless classic with clean lines, premium comfort, and everyday versatility.",
    gallery: [
      { src: "/NewArrivals/JordanPink(1).png", alt: "" },
      { src: "/NewArrivals/JordanPink(2).png", alt: "" },
      { src: "/NewArrivals/JordanPink(3).png", alt: "" },
      { src: "/NewArrivals/JordanPink(4).png", alt: "" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
  },
  {
    id: 2,
    brand: "Nike",
    name: "Nike Dunk Low WNBA 30th",
    price: 152,
    category: "Lifestyle",
    gender: "Unisex",
    color: "Red",
    isNew: true,
    colors: 2,
    description:
      "An iconic streetwear staple with retro football roots and effortless style.",
    gallery: [
      { src: "/NewArrivals/WNBA(1).png", alt: "" },
      { src: "/NewArrivals/WNBA(2).png", alt: "" },
      { src: "/NewArrivals/WNBA(3).png", alt: "" },
      { src: "/NewArrivals/WNBA(4).png", alt: "" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
  },
  {
    id: 3,
    brand: "Nike",
    name: "Nike SB Dunk Low Pro",
    price: 133,
    category: "Skateboarding",
    gender: "Men",
    color: "Mineral Slate/Particle Rose/Silt Red/Dark Raisin",
    isNew: true,
    colors: 3,
    description:
      "Low-cut comfort and legendary Jordan design for on-court and off-court wear.",
    gallery: [
      { src: "/NewArrivals/SB1.png", alt: "Air Jordan 1 Low side view" },
      { src: "/NewArrivals/SB2.png", alt: "Air Jordan 1 Low front view" },
      { src: "/NewArrivals/SB3.png", alt: "Air Jordan 1 Low back view" },
      { src: "/NewArrivals/SB4.png", alt: "Air Jordan 1 Low top view" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
  },
  {
    id: 4,
    brand: "Puma",
    name: "ST Miler Rose",
    price: 65,
    category: "Lifestyle",
    gender: "Women",
    color: "Pink",
    isNew: true,
    colors: 1,
    description:
      "Bold, clean, and easy to style. A modern favorite inspired by basketball heritage.",
    gallery: [
      { src: "/NewArrivals/Miler1.png", alt: "Nike Dunk Low Retro side view" },
      { src: "/NewArrivals/Miler2.png", alt: "Nike Dunk Low Retro front view" },
      { src: "/NewArrivals/Miler3.png", alt: "Nike Dunk Low Retro back view" },
      { src: "/NewArrivals/Miler4.png", alt: "Nike Dunk Low Retro top view" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
  },
  {
    id: 5,
    brand: "Puma",
    name: "FUTURE 7 Match FG/AG",
    price: 103,
    category: "Football",
    gender: "Men",
    color: "White/Pink",
    isNew: true,
    colors: 1,
    description:
      "Responsive cushioning and lightweight energy return for everyday runs.",
    gallery: [
      { src: "/NewArrivals/Match1.png", alt: "Puma Velocity Nitro side view" },
      { src: "/NewArrivals/Match2.png", alt: "Puma Velocity Nitro front view" },
      { src: "/NewArrivals/Match3.png", alt: "Puma Velocity Nitro back view" },
      { src: "/NewArrivals/Match4.png", alt: "Puma Velocity Nitro top view" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
  },
  {
    id: 6,
    brand: "Adidas",
    name: "MEGARIDE AG Shoes",
    price: 218,
    category: "Lifestyle",
    gender: "Women",
    color: "Real Magenta / Pulse Magenta / Core Black",
    isNew: true,
    colors: 3,
    description:
      "Chunky futuristic styling paired with premium comfort and standout proportions.",
    gallery: [
      { src: "/NewArrivals/MEGARIDE1.png", alt: "New Balance 9060 side view" },
      { src: "/NewArrivals/MEGARIDE2.png", alt: "New Balance 9060 front view" },
      { src: "/NewArrivals/MEGARIDE3.png", alt: "New Balance 9060 back view" },
      { src: "/NewArrivals/MEGARIDE4.png", alt: "New Balance 9060 top view" },
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const { id } = React.use(params);
  const productId = Number(id);
  const product = products.find((item) => item.id === productId);

  const initialSizeFromQuery = searchParams.get("size") || "";
  const fromCart = searchParams.get("from") === "cart";
  const fromSale = searchParams.get("from") === "sale";
  const saleEnabled = searchParams.get("sale") === "1";

  const salePriceFromQuery = Number(searchParams.get("salePrice"));
  const originalPriceFromQuery = Number(searchParams.get("originalPrice"));
  const discountPercentFromQuery = Number(searchParams.get("discount"));

  const hasSalePrice =
    saleEnabled &&
    Number.isFinite(salePriceFromQuery) &&
    salePriceFromQuery > 0 &&
    Number.isFinite(originalPriceFromQuery) &&
    originalPriceFromQuery > 0;

  const displayPrice = hasSalePrice
    ? salePriceFromQuery
    : Number(product?.price || 0);

  const displayOriginalPrice = hasSalePrice
    ? originalPriceFromQuery
    : Number(product?.price || 0);

  const displayDiscountPercent = hasSalePrice
    ? discountPercentFromQuery
    : 0;

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
      price: displayPrice,
      originalPrice: hasSalePrice ? displayOriginalPrice : undefined,
      discountPercent: hasSalePrice ? displayDiscountPercent : undefined,
      image: product.gallery?.[0]?.src || "",
      category: product.category,
      color: product.color,
      colors: product.colors,
      gender: product.gender,
      size: selectedSize,
      quantity: 1,
      source: "product",
      routePath: `/product/${product.id}`,
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
        price: displayPrice,
        originalPrice: hasSalePrice ? displayOriginalPrice : undefined,
        discountPercent: hasSalePrice ? displayDiscountPercent : undefined,
        source: "product",
        routePath: `/product/${product.id}`,
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

    const checkoutItem = createCartItem();
    localStorage.setItem("checkoutItems", JSON.stringify([checkoutItem]));
    router.push("/checkout");
  };

  const handleBackLink = () => {
    if (fromCart) {
      router.push("/cart");
      return;
    }

    if (fromSale) {
      router.push("/sale");
      return;
    }

    router.push("/new");
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

            <button
              type="button"
              onClick={handleBackLink}
              className="transition hover:text-indigo-600"
            >
              {fromCart ? "Cart" : fromSale ? "Sale" : "New Arrivals"}
            </button>

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

                {hasSalePrice && (
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                    -{displayDiscountPercent}% Sale
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

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <p className="text-3xl font-bold text-[#111]">
                  ${Number(displayPrice).toFixed(2)}
                </p>

                {hasSalePrice && (
                  <p className="pb-1 text-base font-medium text-gray-400 line-through">
                    ${Number(displayOriginalPrice).toFixed(2)}
                  </p>
                )}

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
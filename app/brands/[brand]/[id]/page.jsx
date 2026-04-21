"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import {
  allProducts,
  getBrandNameFromSlug,
  slugifyBrand,
} from "../../../data/products";

function ProductGallery({ product }) {
  const gallery =
    Array.isArray(product.gallery) && product.gallery.length > 0
      ? product.gallery
      : [{ src: product.image, alt: product.name }];

  const [selectedImage, setSelectedImage] = React.useState(0);

  React.useEffect(() => {
    setSelectedImage(0);
  }, [product.id]);

  const currentImage = gallery[selectedImage] || gallery[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[100px_minmax(0,1fr)] xl:grid-cols-[110px_minmax(0,1fr)]">
      <div className="order-2 lg:order-1">
        <div className="grid grid-cols-4 gap-3 lg:grid-cols-1">
          {gallery.map((image, index) => {
            const isActive = selectedImage === index;

            return (
              <button
                key={`${product.id}-${index}`}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-[22px] border bg-white p-2 shadow-sm transition ${
                  isActive
                    ? "border-indigo-600 ring-2 ring-indigo-100"
                    : "border-black/5 hover:border-indigo-200"
                }`}
              >
                <div className="flex h-[84px] items-center justify-center rounded-[18px] bg-[#eef2f8] p-2 sm:h-[92px] lg:h-[100px]">
                  <img
                    src={image.src}
                    alt={image.alt || product.name}
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
          <img
            src={currentImage.src}
            alt={currentImage.alt || product.name}
            className="h-[260px] w-full max-w-[620px] object-contain sm:h-[320px] lg:h-[430px] xl:h-[480px]"
          />
        </div>
      </div>
    </div>
  );
}

export default function BrandProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const brand = Array.isArray(params.brand) ? params.brand[0] : params.brand;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const brandName = getBrandNameFromSlug(brand || "");
  const productId = Number(id);

  const product = allProducts.find(
    (item) =>
      item.id === productId &&
      item.brand === brandName &&
      slugifyBrand(item.brand) === brand
  );

  const initialSizeFromQuery = searchParams.get("size") || "";
  const fromCart = searchParams.get("from") === "cart";

  const [selectedSize, setSelectedSize] = React.useState("");

  React.useEffect(() => {
    if (product?.sizes?.includes(initialSizeFromQuery)) {
      setSelectedSize(initialSizeFromQuery);
    } else {
      setSelectedSize("");
    }
  }, [product, productId, initialSizeFromQuery]);

  const createCartItem = () => {
    if (!product || !selectedSize) return null;

    const primaryImage =
      Array.isArray(product.gallery) && product.gallery.length > 0
        ? product.gallery[0]?.src || product.image
        : product.image;

    return {
      cartId: `${product.id}-${selectedSize}`,
      id: product.id,
      brand: product.brand,
      name: product.name,
      price:
        typeof product.price === "number"
          ? product.price
          : Number(String(product.price).replace(/[^0-9.]/g, "")) || 0,
      image: primaryImage,
      category: product.category,
      color: product.color,
      colors: product.colors,
      gender: product.gender,
      size: selectedSize,
      quantity: 1,
      brandSlug: brand,
      source: "brand",
      routePath: `/brands/${brand}/${product.id}`,
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
        brandSlug: brand,
        source: "brand",
        routePath: `/brands/${brand}/${product.id}`,
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
      brandSlug: brand,
      source: "brand",
      routePath: `/brands/${brand}/${product.id}`,
    };

    localStorage.setItem("checkoutItems", JSON.stringify([checkoutItem]));
    router.push("/checkout");
  };

  const handleBackLink = () => {
    if (fromCart) {
      router.push("/cart");
      return;
    }

    router.push(`/brands/${brand}`);
  };

  if (!product || !brandName) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] text-[#111]">
        <Navbar />

        <main className="min-h-[calc(100vh-160px)]">
          <section className="px-4 py-12 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-[1200px] rounded-[32px] border border-black/5 bg-white p-8 text-center shadow-sm">
              <h1 className="text-3xl font-bold">Product not found</h1>
              <p className="mt-3 text-gray-600">
                This product does not exist in this brand.
              </p>
              <Link
                href={`/brands/${brand || ""}`}
                className="mt-6 inline-flex rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                Back to Brand
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar />

      <main>
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
                {fromCart ? "Cart" : brandName}
              </button>

              <span className="mx-2 text-gray-300">/</span>
              <span className="text-[#111]">{product.name}</span>
            </div>

            <div className="grid items-start gap-8 xl:grid-cols-[1.05fr_0.95fr]">
              <ProductGallery product={product} />

              <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                    {product.brand}
                  </p>

                  <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                    {product.name}
                  </h1>
                </div>

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
                      {selectedSize
                        ? `Selected: ${selectedSize}`
                        : "Select a size"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {(product.sizes || []).map((size) => {
                      const isSelected = selectedSize === size;

                      return (
                        <button
                          key={`${product.id}-${size}`}
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
      </main>

      <Footer />
    </div>
  );
}
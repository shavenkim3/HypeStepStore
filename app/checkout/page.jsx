"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  PencilLine,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const normalizedCart = Array.isArray(savedCart)
      ? savedCart.map((item) => ({
          ...item,
          quantity: Math.max(1, Number(item.quantity) || 1),
          price:
            typeof item.price === "number"
              ? item.price
              : Number(String(item.price).replace(/[^0-9.]/g, "")) || 0,
        }))
      : [];

    setCartItems(normalizedCart);
    localStorage.setItem("cartItems", JSON.stringify(normalizedCart));
  }, []);

  const updateCartStorage = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemoveItem = (id, size) => {
    const updatedItems = cartItems.filter(
      (item) => !(item.id === id && item.size === size)
    );
    updateCartStorage(updatedItems);
  };

  const handleIncreaseQty = (id, size) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    updateCartStorage(updatedItems);
  };

  const handleDecreaseQty = (id, size) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
        : item
    );
    updateCartStorage(updatedItems);
  };

  const handleCheckout = () => {
    localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
    window.location.href = "/checkout";
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [cartItems]);

  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar />

      <section className="w-full px-4 pt-6 pb-10 sm:px-6 lg:px-10 lg:pt-8 lg:pb-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Home <span className="mx-2 text-gray-300">/</span> Cart
              </p>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#111] sm:text-4xl lg:text-5xl">
                Shopping Cart
              </h1>
            </div>

            <div className="text-sm text-gray-600 sm:text-base">
              Cart Items{" "}
              <span className="font-semibold text-[#111]">{totalItems}</span>
            </div>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="rounded-[28px] border border-black/5 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <Link
                        href={`/best-sellers/${item.id}?size=${encodeURIComponent(
                          item.size || ""
                        )}&from=cart`}
                        className="flex h-[190px] w-full items-center justify-center rounded-[24px] bg-[#eef2f8] p-3 sm:h-[180px] sm:w-[200px] sm:flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain transition duration-500 hover:scale-105"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium uppercase tracking-[0.22em] text-indigo-500">
                              {item.brand}
                            </p>

                            <h2 className="mt-2 text-lg font-semibold leading-snug text-[#111] sm:text-xl">
                              {item.name}
                            </h2>

                            <div className="mt-4 flex flex-wrap items-center gap-2">
                              {item.category ? (
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 sm:text-sm">
                                  {item.category}
                                </span>
                              ) : null}

                              {item.color ? (
                                <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600 sm:text-sm">
                                  {item.color}
                                </span>
                              ) : null}

                              {item.colors ? (
                                <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 sm:text-sm">
                                  {item.colors} Colors
                                </span>
                              ) : null}

                              {item.size ? (
                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 sm:text-sm">
                                  Size {item.size}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="flex items-start gap-3 sm:ml-4">
                            <div className="sm:text-right">
                              <p className="text-sm text-gray-500">Unit Price</p>
                              <p className="mt-1 text-2xl font-bold text-[#111]">
                                ${Number(item.price).toFixed(2)}
                              </p>
                            </div>

                            <Link
                              href={`/best-sellers/${item.id}?size=${encodeURIComponent(
                                item.size || ""
                              )}&from=cart`}
                              aria-label="Edit item"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#111] transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                            >
                              <PencilLine size={16} />
                            </Link>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="inline-flex w-fit items-center rounded-full border border-black/10 bg-white">
                            <button
                              type="button"
                              onClick={() => handleDecreaseQty(item.id, item.size)}
                              className="flex h-11 w-11 items-center justify-center text-[#111] transition hover:bg-gray-50"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>

                            <span className="min-w-[44px] text-center text-sm font-semibold">
                              {item.quantity || 1}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleIncreaseQty(item.id, item.size)}
                              className="flex h-11 w-11 items-center justify-center text-[#111] transition hover:bg-gray-50"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id, item.size)}
                            className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#111] transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="sticky top-24 rounded-[28px] border border-black/5 bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="text-xl font-semibold text-[#111]">
                    Order Summary
                  </h2>

                  <div className="mt-6 space-y-4 text-sm sm:text-base">
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Items</span>
                      <span className="font-medium text-[#111]">
                        {totalItems}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#111]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium text-[#111]">
                        ${shipping.toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t border-black/10 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-[#111]">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-[#111]">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    Checkout
                    <ArrowRight size={16} />
                  </button>

                  <Link
                    href="/"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-[#111] transition hover:border-indigo-200 hover:text-indigo-600"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[32px] border border-black/5 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <ShoppingCart size={30} />
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-[#111]">
                Your cart is empty
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-gray-600">
                Add your favorite sneakers to your cart and they will appear
                here.
              </p>

              <Link
                href="/"
                className="mt-8 inline-flex rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                Explore Products
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FollowPage() {
  const [followItems, setFollowItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("followItems") || "[]");
    setFollowItems(savedItems);
  }, []);

  const handleRemove = (id) => {
    const updatedItems = followItems.filter((item) => item.id !== id);
    setFollowItems(updatedItems);
    localStorage.setItem("followItems", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("followUpdated"));
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar />

      <section className="w-full px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Home <span className="mx-2 text-gray-300">/</span> Follow
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Heart size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-[#111] sm:text-4xl lg:text-5xl">
                    Follow
                  </h1>
                  <p className="mt-1 text-sm text-gray-600 sm:text-base">
                    Your saved sneakers in one place.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 sm:text-base">
              Saved{" "}
              <span className="font-semibold text-[#111]">
                {followItems.length}
              </span>{" "}
              items
            </div>
          </div>

          {followItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {followItems.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative overflow-hidden bg-[#eef2f8] p-5">
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#111] shadow-sm transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>

                    <Link
                      href={`/product/${item.id}`}
                      className="flex min-h-[280px] items-center justify-center rounded-[24px] bg-[#eef2f8] p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-[200px] w-full max-w-[260px] object-contain transition duration-500 hover:scale-105"
                      />
                    </Link>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-600/80">
                      {item.brand}
                    </p>

                    <h2 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-[#111] sm:text-xl">
                      {item.name}
                    </h2>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-sm text-gray-500">{item.color}</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <p className="text-2xl font-bold text-[#111]">
                        ${item.price}
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#111] transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        >
                          Remove
                        </button>

                        <Link
                          href={`/product/${item.id}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[#111] px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
                        >
                          <ShoppingBag size={16} />
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[32px] border border-black/5 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Heart size={30} />
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-[#111]">
                No saved items yet
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-gray-600">
                Tap the heart icon on any product to save it here and come back
                later whenever you want.
              </p>

              <Link
                href="/new"
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
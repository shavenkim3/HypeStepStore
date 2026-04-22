"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, PackageCheck, CreditCard, Truck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}

export default function OrderSuccessPage() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const latestOrder = JSON.parse(localStorage.getItem("latestOrder") || "null");
    setOrderData(latestOrder);
  }, []);

  if (!orderData) {
    return (
      <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
        <Navbar />

        <section className="px-4 py-10 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[900px] rounded-[32px] border border-black/5 bg-white p-8 text-center shadow-sm sm:p-10">
            <h1 className="text-3xl font-bold sm:text-4xl">
              No recent order found
            </h1>
            <p className="mt-4 text-gray-600">
              We could not find your latest order information.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
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

      <section className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm sm:p-10">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={40} />
              </div>

              <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
                Order Confirmed
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                Thank you for your order. Your purchase has been placed
                successfully and is now being prepared for shipment.
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#eef2ff] px-5 py-2 text-sm font-semibold text-indigo-600">
                Order ID: {orderData.orderId}
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] bg-[#f8f9fc] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <PackageCheck size={20} />
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-500">
                  Items Ordered
                </p>
                <p className="mt-2 text-2xl font-bold text-[#111]">
                  {orderData.totalItems}
                </p>
              </div>

              <div className="rounded-[24px] bg-[#f8f9fc] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <CreditCard size={20} />
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-500">
                  Payment Method
                </p>
                <p className="mt-2 text-lg font-bold text-[#111]">
                  {orderData.paymentMethod === "card"
                    ? "Credit / Debit Card"
                    : "Cash on Delivery"}
                </p>
              </div>

              <div className="rounded-[24px] bg-[#f8f9fc] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Truck size={20} />
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-500">
                  Order Total
                </p>
                <p className="mt-2 text-2xl font-bold text-[#111]">
                  {formatPrice(orderData.total)}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[28px] border border-black/5 bg-[#f8f9fc] p-5">
                <h2 className="text-xl font-semibold text-[#111]">
                  Delivery Information
                </h2>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold text-[#111]">Name:</span>{" "}
                    {orderData.customer.firstName} {orderData.customer.lastName}
                  </p>
                  <p>
                    <span className="font-semibold text-[#111]">Email:</span>{" "}
                    {orderData.customer.email}
                  </p>
                  <p>
                    <span className="font-semibold text-[#111]">Phone:</span>{" "}
                    {orderData.customer.phone}
                  </p>
                  <p>
                    <span className="font-semibold text-[#111]">Address:</span>{" "}
                    {orderData.customer.address}, {orderData.customer.city},{" "}
                    {orderData.customer.province} {orderData.customer.zipCode}
                  </p>
                  {orderData.customer.notes ? (
                    <p>
                      <span className="font-semibold text-[#111]">Notes:</span>{" "}
                      {orderData.customer.notes}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="rounded-[28px] border border-black/5 bg-[#f8f9fc] p-5">
                <h2 className="text-xl font-semibold text-[#111]">
                  Order Summary
                </h2>

                <div className="mt-4 space-y-3">
                  {orderData.items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex items-center gap-3 rounded-[20px] bg-white p-3"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-[16px] bg-[#eef2f8] p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#111] line-clamp-1">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Size {item.size} • Qty {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-bold text-[#111]">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3 border-t border-black/10 pt-4 text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#111]">
                      {formatPrice(orderData.subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-[#111]">
                      {formatPrice(orderData.shipping)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#111]">Total</span>
                    <span className="text-xl font-bold text-[#111]">
                      {formatPrice(orderData.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                Back to Home
              </Link>

              <Link
                href="/brands"
                className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-[#111] transition hover:border-indigo-200 hover:text-indigo-600"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
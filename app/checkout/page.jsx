"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}

export default function CheckoutPage() {
  const router = useRouter();

  const [checkoutItems, setCheckoutItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    notes: "",
  });

  useEffect(() => {
    const savedCheckout = JSON.parse(
      localStorage.getItem("checkoutItems") || "[]"
    );

    const normalizedItems = Array.isArray(savedCheckout)
      ? savedCheckout.map((item) => ({
          ...item,
          quantity: Math.max(1, Number(item.quantity) || 1),
          price:
            typeof item.price === "number"
              ? item.price
              : Number(String(item.price).replace(/[^0-9.]/g, "")) || 0,
          originalPrice:
            typeof item.originalPrice === "number"
              ? item.originalPrice
              : Number(String(item.originalPrice || "").replace(/[^0-9.]/g, "")) ||
                undefined,
          discountPercent:
            typeof item.discountPercent === "number"
              ? item.discountPercent
              : Number(
                  String(item.discountPercent || "").replace(/[^0-9.]/g, "")
                ) || undefined,
        }))
      : [];

    setCheckoutItems(normalizedItems);
  }, []);

  const subtotal = useMemo(() => {
    return checkoutItems.reduce((total, item) => {
      return total + (Number(item.price) || 0) * (item.quantity || 1);
    }, 0);
  }, [checkoutItems]);

  const totalItems = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [checkoutItems]);

  const shipping = checkoutItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (checkoutItems.length === 0) return;

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "province",
      "zipCode",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => !formData[field].trim()
    );

    if (hasEmptyField) {
      alert("Please complete all required fields.");
      return;
    }

    const orderId = `HS-${Date.now().toString().slice(-6)}`;

    const orderData = {
      orderId,
      items: checkoutItems,
      totalItems,
      subtotal,
      shipping,
      total,
      paymentMethod,
      customer: formData,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    localStorage.removeItem("checkoutItems");
    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event("cartUpdated"));

    router.push("/order-success");
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar />

      <section className="px-4 pt-6 pb-10 sm:px-6 lg:px-10 lg:pt-8 lg:pb-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Home <span className="mx-2 text-gray-300">/</span> Cart
                <span className="mx-2 text-gray-300">/</span> Checkout
              </p>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#111] sm:text-4xl lg:text-5xl">
                Checkout
              </h1>

              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                Complete your shipping and payment details to place your order.
              </p>
            </div>

            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-indigo-600"
            >
              <ArrowLeft size={16} />
              Back to Cart
            </Link>
          </div>

          {checkoutItems.length === 0 ? (
            <div className="rounded-[32px] border border-black/5 bg-white px-6 py-16 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-[#111]">
                No items ready for checkout
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-600">
                Your checkout is empty. Add products to cart first before
                continuing to payment.
              </p>

              <Link
                href="/cart"
                className="mt-8 inline-flex rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                Go to Cart
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handlePlaceOrder}
              className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]"
            >
              <div className="space-y-6">
                <div className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <Truck size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#111]">
                        Shipping Information
                      </h2>
                      <p className="text-sm text-gray-500">
                        Enter your delivery details.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 sm:col-span-2"
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 sm:col-span-2"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 sm:col-span-2"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City / District"
                      value={formData.city}
                      onChange={handleChange}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      name="province"
                      placeholder="Province"
                      value={formData.province}
                      onChange={handleChange}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP code"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 sm:col-span-2"
                    />
                    <textarea
                      name="notes"
                      placeholder="Additional notes (optional)"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 sm:col-span-2"
                    />
                  </div>
                </div>

                <div className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#111]">
                        Payment Method
                      </h2>
                      <p className="text-sm text-gray-500">
                        Choose how you want to pay.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <label className="flex cursor-pointer items-start gap-3 rounded-[24px] border border-black/10 p-4 transition hover:border-indigo-200">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold text-[#111]">Credit / Debit Card</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Pay securely using your card at checkout.
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-[24px] border border-black/10 p-4 transition hover:border-indigo-200">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold text-[#111]">Cash on Delivery</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Pay when your order arrives at your address.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="sticky top-24 rounded-[28px] border border-black/5 bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="text-xl font-semibold text-[#111]">
                    Order Summary
                  </h2>

                  <div className="mt-5 space-y-4">
                    {checkoutItems.map((item) => {
                      const hasSale =
                        Number.isFinite(Number(item.discountPercent)) &&
                        Number(item.discountPercent) > 0 &&
                        Number.isFinite(Number(item.originalPrice)) &&
                        Number(item.originalPrice) > 0;

                      return (
                        <div
                          key={`${item.id}-${item.size}`}
                          className="flex gap-3 rounded-[20px] bg-[#f8f9fc] p-3"
                        >
                          <div className="flex h-20 w-20 items-center justify-center rounded-[18px] bg-[#eef2f8] p-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
                              {item.brand}
                            </p>
                            <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-[#111]">
                              {item.name}
                            </h3>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {item.size ? (
                                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
                                  Size {item.size}
                                </span>
                              ) : null}

                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                                Qty {item.quantity || 1}
                              </span>
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                              <p className="text-sm font-bold text-[#111]">
                                {formatPrice(item.price)}
                              </p>
                              {hasSale ? (
                                <p className="text-xs text-gray-400 line-through">
                                  {formatPrice(item.originalPrice)}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 space-y-4 border-t border-black/10 pt-5 text-sm sm:text-base">
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Items</span>
                      <span className="font-medium text-[#111]">
                        {totalItems}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#111]">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium text-[#111]">
                        {formatPrice(shipping)}
                      </span>
                    </div>

                    <div className="border-t border-black/10 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-[#111]">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-[#111]">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    Place Order
                  </button>

                  <div className="mt-4 rounded-[20px] bg-[#f8f9fc] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                        <ShieldCheck size={18} />
                      </div>

                      <div>
                        <p className="font-semibold text-[#111]">
                          Secure checkout
                        </p>
                        <p className="mt-1 text-sm leading-6 text-gray-500">
                          Your order information is protected and processed
                          securely.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
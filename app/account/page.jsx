"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Package,
  PencilLine,
  Save,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AccountPage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Ranwasa Tan",
    email: "ranwasa@example.com",
    phone: "+66 81 234 5678",
  });

  const [address, setAddress] = useState({
    line1: "123 Main Street",
    city: "Hua Hin",
    province: "Prachuap Khiri Khan",
    postalCode: "77110",
    country: "Thailand",
  });

  const [payment, setPayment] = useState({
    cardName: "Ranwasa Tan",
    cardNumber: "**** **** **** 2481",
    expiry: "08/27",
  });

  const recentOrders = [
    {
      id: "HS-10248",
      item: "Nike Air Force 1 '07",
      date: "21 Apr 2026",
      status: "Delivered",
      total: "$144.00",
    },
    {
      id: "HS-10231",
      item: "Adidas Samba OG",
      date: "17 Apr 2026",
      status: "Shipped",
      total: "$105.00",
    },
    {
      id: "HS-10214",
      item: "Puma Speedcat OG",
      date: "12 Apr 2026",
      status: "Processing",
      total: "$119.00",
    },
  ];

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    alert("Profile updated successfully!");
  };

  const handleSaveAddress = () => {
    setIsEditingAddress(false);
    alert("Address updated successfully!");
  };

  const handleSavePayment = () => {
    setIsEditingPayment(false);
    alert("Payment method updated successfully!");
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar />

      <section className="w-full px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8">
            <p className="text-sm text-gray-500">
              Home <span className="mx-2 text-gray-300">/</span> Account
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#111] sm:text-4xl lg:text-5xl">
              My Account
            </h1>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Manage your personal information, address, payment methods, and
              recent orders.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
            <div className="space-y-6">
              <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <User size={38} />
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-[#111]">
                    {profile.fullName}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">{profile.email}</p>

                  <div className="mt-6 w-full space-y-3 text-left">
                    <div className="flex items-center gap-3 rounded-2xl bg-[#f8f9fc] px-4 py-3 text-sm text-gray-700">
                      <Mail size={18} className="text-indigo-600" />
                      <span>{profile.email}</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-[#f8f9fc] px-4 py-3 text-sm text-gray-700">
                      <Phone size={18} className="text-indigo-600" />
                      <span>{profile.phone}</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-[#f8f9fc] px-4 py-3 text-sm text-gray-700">
                      <MapPin size={18} className="text-indigo-600" />
                      <span>
                        {address.city}, {address.province}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="text-xl font-semibold text-[#111]">
                  Quick Actions
                </h3>

                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href="/cart"
                    className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[#111] transition hover:border-indigo-200 hover:text-indigo-600"
                  >
                    View Cart
                  </Link>

                  <Link
                    href="/follow"
                    className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[#111] transition hover:border-indigo-200 hover:text-indigo-600"
                  >
                    Saved Items
                  </Link>

                  <Link
                    href="/new"
                    className="inline-flex items-center justify-center rounded-full bg-[#111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#111]">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Update your account details here.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      isEditingProfile
                        ? handleSaveProfile()
                        : setIsEditingProfile(true)
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-[#111] transition hover:border-indigo-200 hover:text-indigo-600"
                  >
                    {isEditingProfile ? <Save size={16} /> : <PencilLine size={16} />}
                    {isEditingProfile ? "Save" : "Edit"}
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#111]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-[#f8f9fc]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#111]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-[#f8f9fc]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-[#111]">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-[#f8f9fc]"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#111]">
                      Shipping Address
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Manage your default delivery address.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      isEditingAddress
                        ? handleSaveAddress()
                        : setIsEditingAddress(true)
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-[#111] transition hover:border-indigo-200 hover:text-indigo-600"
                  >
                    {isEditingAddress ? <Save size={16} /> : <PencilLine size={16} />}
                    {isEditingAddress ? "Save" : "Edit"}
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-[#111]">
                      Address Line
                    </label>
                    <input
                      type="text"
                      name="line1"
                      value={address.line1}
                      onChange={handleAddressChange}
                      disabled={!isEditingAddress}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-[#f8f9fc]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#111]">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      disabled={!isEditingAddress}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-[#f8f9fc]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#111]">
                      Province
                    </label>
                    <input
                      type="text"
                      name="province"
                      value={address.province}
                      onChange={handleAddressChange}
                      disabled={!isEditingAddress}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-[#f8f9fc]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#111]">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={address.postalCode}
                      onChange={handleAddressChange}
                      disabled={!isEditingAddress}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-[#f8f9fc]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#111]">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={address.country}
                      onChange={handleAddressChange}
                      disabled={!isEditingAddress}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-[#f8f9fc]"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#111]">
                      Payment Method
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Update your saved payment information.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      isEditingPayment
                        ? handleSavePayment()
                        : setIsEditingPayment(true)
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-[#111] transition hover:border-indigo-200 hover:text-indigo-600"
                  >
                    {isEditingPayment ? <Save size={16} /> : <PencilLine size={16} />}
                    {isEditingPayment ? "Save" : "Edit"}
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-[#111]">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={payment.cardName}
                      onChange={handlePaymentChange}
                      disabled={!isEditingPayment}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-[#f8f9fc]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#111]">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={payment.cardNumber}
                      onChange={handlePaymentChange}
                      disabled={!isEditingPayment}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-[#f8f9fc]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#111]">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={payment.expiry}
                      onChange={handlePaymentChange}
                      disabled={!isEditingPayment}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-[#f8f9fc]"
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f8f9fc] px-4 py-4 text-sm text-gray-700">
                  <CreditCard size={18} className="text-indigo-600" />
                  <span>Default card saved for faster checkout</span>
                </div>
              </div>

              <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#111]">
                      Recent Orders
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Review your latest purchases and order status.
                    </p>
                  </div>

                  <Link
                    href="/orders"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-[#111] transition hover:border-indigo-200 hover:text-indigo-600"
                  >
                    <Package size={16} />
                    View All
                  </Link>
                </div>

                <div className="mt-6 space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-[24px] border border-black/5 bg-[#f8f9fc] p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-[#111]">
                            {order.id}
                          </p>
                          <h3 className="mt-1 text-base font-medium text-gray-800">
                            {order.item}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Ordered on {order.date}
                          </p>
                        </div>

                        <div className="flex flex-col items-start gap-2 sm:items-end">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              order.status === "Delivered"
                                ? "bg-emerald-50 text-emerald-600"
                                : order.status === "Shipped"
                                ? "bg-indigo-50 text-indigo-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {order.status}
                          </span>

                          <p className="text-lg font-bold text-[#111]">
                            {order.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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
"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] =
    useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      alert("Please fill in all login fields.");
      return;
    }

    alert("Login successful!");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (
      !registerForm.fullName ||
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.confirmPassword
    ) {
      alert("Please fill in all registration fields.");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Registration successful!");
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
              Account Access
            </h1>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Sign in to your account or create a new membership to continue.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-[32px] border border-black/5 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#312e81] p-8 text-white shadow-sm">
              <div className="max-w-md">
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                  Welcome to HYPESTEP
                </span>

                <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
                  Join the sneaker community built for style and comfort
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                  Save your favorite products, manage your cart, and enjoy a
                  smoother shopping experience every time you visit.
                </p>

                <div className="mt-8 grid gap-3 text-sm text-white/85">
                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    Save and organize your favorite sneakers
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    Faster checkout and easy account management
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    Access your cart and product history anytime
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-black/5 bg-white p-5 shadow-sm sm:p-8">
              <div className="mb-8 inline-flex rounded-full bg-[#f3f4f6] p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition sm:px-6 ${
                    activeTab === "login"
                      ? "bg-[#111] text-white"
                      : "text-[#111] hover:text-indigo-600"
                  }`}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition sm:px-6 ${
                    activeTab === "register"
                      ? "bg-[#111] text-white"
                      : "text-[#111] hover:text-indigo-600"
                  }`}
                >
                  Register
                </button>
              </div>

              {activeTab === "login" ? (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#111]">
                      Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                      Enter your details to continue shopping.
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#111]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        placeholder="Enter your email"
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#111]">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          placeholder="Enter your password"
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowLoginPassword((prev) => !prev)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-indigo-600"
                        >
                          {showLoginPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-black/20"
                        />
                        Remember me
                      </label>

                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#111]">
                      Create a new account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                      Register to save favorites and shop more easily.
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#111]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={registerForm.fullName}
                        onChange={handleRegisterChange}
                        placeholder="Enter your full name"
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#111]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                        placeholder="Enter your email"
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#111]">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showRegisterPassword ? "text" : "password"}
                          name="password"
                          value={registerForm.password}
                          onChange={handleRegisterChange}
                          placeholder="Create a password"
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowRegisterPassword((prev) => !prev)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-indigo-600"
                        >
                          {showRegisterPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#111]">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={
                            showRegisterConfirmPassword ? "text" : "password"
                          }
                          name="confirmPassword"
                          value={registerForm.confirmPassword}
                          onChange={handleRegisterChange}
                          placeholder="Confirm your password"
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowRegisterConfirmPassword((prev) => !prev)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-indigo-600"
                        >
                          {showRegisterConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-black/20"
                      />
                      <span>
                        I agree to the Terms & Conditions and Privacy Policy.
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                      Create Account
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
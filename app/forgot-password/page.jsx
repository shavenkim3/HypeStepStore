"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Mail,
  ShieldCheck,
  Lock,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DEMO_CODE = "123456";

function StepBadge({ step, currentStep, label }) {
  const isActive = step === currentStep;
  const isDone = step < currentStep;

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
          isDone
            ? "bg-emerald-500 text-white"
            : isActive
            ? "bg-[#111] text-white"
            : "bg-[#eceff5] text-gray-500"
        }`}
      >
        {isDone ? "✓" : step}
      </div>
      <span
        className={`text-sm font-semibold ${
          isActive || isDone ? "text-[#111]" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(DEMO_CODE);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const passwordChecks = useMemo(() => {
    return {
      minLength: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
    };
  }, [newPassword]);

  const isPasswordStrong = Object.values(passwordChecks).every(Boolean);

  const resetMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    resetMessages();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const nextCode = DEMO_CODE;
    setGeneratedCode(nextCode);
    setSuccessMessage(
      `Verification code sent to ${trimmedEmail}. Demo code: ${nextCode}`
    );
    setStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    resetMessages();

    if (!verificationCode.trim()) {
      setErrorMessage("Please enter the verification code.");
      return;
    }

    if (verificationCode.trim() !== generatedCode) {
      setErrorMessage("The verification code is incorrect.");
      return;
    }

    setSuccessMessage("Code verified successfully.");
    setStep(3);
  };

  const handleResendCode = () => {
    resetMessages();
    const nextCode = DEMO_CODE;
    setGeneratedCode(nextCode);
    setSuccessMessage(`A new code has been sent. Demo code: ${nextCode}`);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    resetMessages();

    if (!newPassword || !confirmPassword) {
      setErrorMessage("Please complete both password fields.");
      return;
    }

    if (!isPasswordStrong) {
      setErrorMessage("Your new password is not strong enough.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setSuccessMessage("Your password has been reset successfully.");
    setStep(4);
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar />

      <section className="px-4 pt-6 pb-10 sm:px-6 lg:px-10 lg:pt-8 lg:pb-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8">
            <p className="text-sm text-gray-500">
              Home <span className="mx-2 text-gray-300">/</span> Login
              <span className="mx-2 text-gray-300">/</span> Forgot Password
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#111] sm:text-4xl lg:text-5xl">
              Forgot Password
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
              Recover access to your account by verifying your email and setting
              a new password.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-semibold text-[#111]">
                  Recovery Steps
                </h2>

                <div className="mt-6 space-y-5">
                  <StepBadge
                    step={1}
                    currentStep={step}
                    label="Enter email address"
                  />
                  <StepBadge
                    step={2}
                    currentStep={step}
                    label="Verify code"
                  />
                  <StepBadge
                    step={3}
                    currentStep={step}
                    label="Create new password"
                  />
                  <StepBadge
                    step={4}
                    currentStep={step}
                    label="Password updated"
                  />
                </div>
              </div>

              <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-semibold text-[#111]">
                  Helpful Notes
                </h2>

                <div className="mt-5 space-y-3 text-sm text-gray-600">
                  <div className="rounded-2xl bg-[#f8f9fc] px-4 py-3">
                    Use the email address linked to your account.
                  </div>
                  <div className="rounded-2xl bg-[#f8f9fc] px-4 py-3">
                    For this demo page, the verification code is shown after you
                    submit your email.
                  </div>
                  <div className="rounded-2xl bg-[#f8f9fc] px-4 py-3">
                    Choose a strong password with letters and numbers.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
              {step === 1 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <Mail size={22} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[#111]">
                        Enter Your Email
                      </h2>
                      <p className="text-sm text-gray-500">
                        We will send a verification code to your email.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSendCode} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#111]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500"
                      />
                    </div>

                    {errorMessage ? (
                      <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {errorMessage}
                      </p>
                    ) : null}

                    {successMessage ? (
                      <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
                        {successMessage}
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                      Send Verification Code
                    </button>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[#111]">
                        Verify Your Code
                      </h2>
                      <p className="text-sm text-gray-500">
                        Enter the 6-digit code sent to your email.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleVerifyCode} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#111]">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="Enter 6-digit code"
                        value={verificationCode}
                        onChange={(e) =>
                          setVerificationCode(
                            e.target.value.replace(/\D/g, "").slice(0, 6)
                          )
                        }
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 tracking-[0.3em] outline-none transition focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleResendCode}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[#111] transition hover:border-indigo-200 hover:text-indigo-600"
                      >
                        <RefreshCw size={16} />
                        Resend Code
                      </button>

                      <button
                        type="submit"
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                      >
                        Verify Code
                      </button>
                    </div>

                    {errorMessage ? (
                      <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {errorMessage}
                      </p>
                    ) : null}

                    {successMessage ? (
                      <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
                        {successMessage}
                      </p>
                    ) : null}
                  </form>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                      <Lock size={22} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[#111]">
                        Create New Password
                      </h2>
                      <p className="text-sm text-gray-500">
                        Set a new secure password for your account.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleResetPassword} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#111]">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 pr-12 outline-none transition focus:border-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#111]">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 pr-12 outline-none transition focus:border-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-[24px] bg-[#f8f9fc] p-4 text-sm">
                      <p className="font-semibold text-[#111]">
                        Password Requirements
                      </p>
                      <div className="mt-3 space-y-2">
                        <p
                          className={
                            passwordChecks.minLength
                              ? "text-emerald-600"
                              : "text-gray-500"
                          }
                        >
                          • At least 8 characters
                        </p>
                        <p
                          className={
                            passwordChecks.uppercase
                              ? "text-emerald-600"
                              : "text-gray-500"
                          }
                        >
                          • At least 1 uppercase letter
                        </p>
                        <p
                          className={
                            passwordChecks.lowercase
                              ? "text-emerald-600"
                              : "text-gray-500"
                          }
                        >
                          • At least 1 lowercase letter
                        </p>
                        <p
                          className={
                            passwordChecks.number
                              ? "text-emerald-600"
                              : "text-gray-500"
                          }
                        >
                          • At least 1 number
                        </p>
                      </div>
                    </div>

                    {errorMessage ? (
                      <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {errorMessage}
                      </p>
                    ) : null}

                    {successMessage ? (
                      <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
                        {successMessage}
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
              )}

              {step === 4 && (
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={40} />
                  </div>

                  <h2 className="mt-6 text-3xl font-bold text-[#111]">
                    Password Updated
                  </h2>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                    Your password has been reset successfully. You can now log
                    in with your new password.
                  </p>

                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                      Back to Login
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setEmail("");
                        setVerificationCode("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setErrorMessage("");
                        setSuccessMessage("");
                      }}
                      className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-[#111] transition hover:border-indigo-200 hover:text-indigo-600"
                    >
                      Start Again
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-8 border-t border-black/5 pt-6">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-indigo-600"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "New Collection 2026",
    title: "Step Into Your Style",
    description:
      "Discover premium sneakers designed for comfort, confidence, and everyday street style.",
    image: "/images/hero-shoe-1.png",
    primaryButton: "Shop Now",
    secondaryButton: "Explore Collection",
    features: ["Authentic Products", "Fast Shipping", "Limited Drops"],
    background:
      "bg-[radial-gradient(circle_at_75%_30%,rgba(99,102,241,0.16),transparent_24%),radial-gradient(circle_at_68%_58%,rgba(37,99,235,0.12),transparent_28%),linear-gradient(90deg,#020308_0%,#090d16_42%,#151c2c_100%)]",
  },
  {
    id: 2,
    tag: "Exclusive Drop",
    title: "Own The Street Look",
    description:
      "Upgrade your rotation with bold silhouettes, clean details, and standout sneaker energy.",
    image: "/images/hero-shoe-2.png",
    primaryButton: "Shop Limited",
    secondaryButton: "View New Arrivals",
    features: ["Top Brands", "Secure Payment", "Streetwear Ready"],
    background:
      "bg-[radial-gradient(circle_at_78%_30%,rgba(59,130,246,0.18),transparent_24%),radial-gradient(circle_at_68%_58%,rgba(99,102,241,0.12),transparent_28%),linear-gradient(90deg,#07111f_0%,#0f1f3a_42%,#243b63_100%)]",
  },
  {
    id: 3,
    tag: "Best Sellers",
    title: "Comfort Meets Hype",
    description:
      "Find everyday pairs that combine comfort, premium materials, and modern streetwear appeal.",
    image: "/images/hero-shoe-3.png",
    primaryButton: "Browse Best Sellers",
    secondaryButton: "See All Products",
    features: ["Easy Returns", "Best Prices", "Trending Styles"],
    background:
      "bg-[radial-gradient(circle_at_76%_34%,rgba(245,158,11,0.16),transparent_24%),radial-gradient(circle_at_66%_58%,rgba(251,191,36,0.10),transparent_28%),linear-gradient(90deg,#16110d_0%,#2a1d14_42%,#5a3a21_100%)]",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const activeSlide = slides[currentSlide];

  return (
    <section className="w-full">
      <div
        className={`relative min-h-[78vh] w-full overflow-hidden text-white transition-all duration-700 ${activeSlide.background}`}
      >
        <div className="grid min-h-[78vh] items-center gap-10 px-6 py-12 sm:px-8 md:px-12 lg:grid-cols-2 lg:px-20 lg:py-16">
          {/* Left Content */}
          <div className="order-2 flex max-w-2xl flex-col justify-center lg:order-1">
            <span className="mb-4 inline-flex w-fit items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/90 backdrop-blur sm:text-sm">
              {activeSlide.tag}
            </span>

            <h1 className="max-w-[620px] text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {activeSlide.title}
            </h1>

            <p className="mt-5 max-w-[560px] text-base leading-7 text-white/80 sm:text-lg">
              {activeSlide.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-gray-100 sm:px-8 sm:text-base">
                {activeSlide.primaryButton}
              </button>

              <button className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-8 sm:text-base">
                {activeSlide.secondaryButton}
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-white/70 sm:gap-6 sm:text-sm">
              {activeSlide.features.map((feature, index) => (
                <div key={feature} className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      index === 0
                        ? "bg-green-400"
                        : index === 1
                        ? "bg-indigo-400"
                        : "bg-yellow-400"
                    }`}
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="relative flex w-full max-w-[760px] items-center justify-center transition-all duration-700">
              <div className="absolute h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl transition-all duration-700 sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]" />

              <div className="absolute h-[260px] w-[260px] rounded-full bg-indigo-500/20 blur-[90px] transition-all duration-700 sm:h-[360px] sm:w-[360px] lg:h-[440px] lg:w-[440px]" />

              <div className="absolute h-[180px] w-[180px] -translate-x-10 translate-y-10 rounded-full bg-blue-900/20 blur-[80px] transition-all duration-700 sm:h-[240px] sm:w-[240px] lg:h-[300px] lg:w-[300px]" />

              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="
                  relative z-10 h-auto w-full object-contain transition-all duration-700
                  max-h-[380px] max-w-[480px]
                  sm:max-h-[500px] sm:max-w-[620px]
                  lg:max-h-[620px] lg:max-w-[780px]
                  xl:max-h-[680px] xl:max-w-[860px]
                  scale-110
                  drop-shadow-[0_60px_120px_rgba(0,0,0,0.9)]
                  animate-float-subtle
                  hover:scale-[1.14]
                "
              />

              <div className="absolute bottom-8 h-[36px] w-[260px] rounded-full bg-black/45 blur-2xl sm:bottom-10 sm:h-[42px] sm:w-[320px] lg:h-[52px] lg:w-[380px]" />
            </div>
          </div>
        </div>

        {/* Left Button */}
        <button
          onClick={goToPrevSlide}
          className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition hover:bg-white/20 sm:left-5 sm:h-12 sm:w-12"
          aria-label="Previous slide"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Right Button */}
        <button
          onClick={goToNextSlide}
          className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition hover:bg-white/20 sm:right-5 sm:h-12 sm:w-12"
          aria-label="Next slide"
        >
          <ArrowRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-7">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const brands = [
  { name: "Nike", logo: "/brands/Nike.png" },
  { name: "Adidas", logo: "/brands/Adidas.png" },
  { name: "Puma", logo: "/brands/Puma.png" },
  { name: "New Balance", logo: "/brands/New.png" },
  { name: "Vans", logo: "/brands/Vans.png" },
  { name: "Converse", logo: "/brands/converse.png" },
  { name: "Jordan", logo: "/brands/Jordan.png" },
  { name: "Asics", logo: "/brands/Asics.png" },
  { name: "Reebok", logo: "/brands/Reebok.png" },
  { name: "Skechers", logo: "/brands/Skechers.png" },
  { name: "Fila", logo: "/brands/Fila.png" },
  { name: "Under Armour", logo: "/brands/Under.png" },
];

function slugifyBrand(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function BrandItem({ brand, isDragging }) {
  return (
    <Link
      href={`/brands/${slugifyBrand(brand.name)}`}
      className={`group flex flex-col items-center text-center ${
        isDragging ? "pointer-events-none" : ""
      }`}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-black/5 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-indigo-100 group-hover:shadow-lg sm:h-24 sm:w-24 lg:h-28 lg:w-28">
        <div className="flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12 lg:h-14 lg:w-14">
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            draggable="false"
          />
        </div>
      </div>

      <p className="mt-3 text-xs font-semibold text-[#111] sm:mt-4 sm:text-sm lg:text-base">
        {brand.name}
      </p>
    </Link>
  );
}

export default function BrandSection() {
  const scrollRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragData = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const handleToggleBrands = () => {
    if (showAll && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }

    setShowAll((prev) => !prev);
  };

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;

    dragData.current.isDown = true;
    dragData.current.startX = e.pageX - scrollRef.current.offsetLeft;
    dragData.current.scrollLeft = scrollRef.current.scrollLeft;
    dragData.current.hasMoved = false;

    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragData.current.isDown || !scrollRef.current) return;

    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - dragData.current.startX) * 1.2;

    if (Math.abs(walk) > 5) {
      dragData.current.hasMoved = true;
      setIsDragging(true);
    }

    scrollRef.current.scrollLeft = dragData.current.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    dragData.current.isDown = false;

    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  const handleMouseLeave = () => {
    dragData.current.isDown = false;
    setIsDragging(false);
  };

  return (
    <section className="w-full bg-[#f6f7fb] px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#111] sm:text-3xl lg:text-4xl">
              Top Sneaker Brands
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Explore the world’s most popular sneaker brands. Scroll to browse,
              or view all brands at once.
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleBrands}
            className="inline-flex w-fit items-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-[#111] shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md sm:px-6 sm:py-3 sm:text-base"
          >
            {showAll ? "Show Less Brands" : "View All Brands"}
          </button>
        </div>

        {showAll ? (
          <div className="grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-6">
            {brands.map((brand) => (
              <BrandItem key={brand.name} brand={brand} isDragging={false} />
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="min-w-[96px] flex-shrink-0 sm:min-w-[110px] lg:min-w-[132px]"
              >
                <BrandItem brand={brand} isDragging={isDragging} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
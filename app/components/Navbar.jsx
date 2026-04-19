"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const megaMenus = {
  men: {
    brands: [
      { label: "Nike", href: "/men/brands/nike" },
      { label: "Adidas", href: "/men/brands/adidas" },
      { label: "Puma", href: "/men/brands/puma" },
      { label: "New Balance", href: "/men/brands/new-balance" },
      { label: "Vans", href: "/men/brands/vans" },
      { label: "Converse", href: "/men/brands/converse" },
      { label: "Jordan", href: "/men/brands/jordan" },
      { label: "Asics", href: "/men/brands/asics" },
      { label: "Reebok", href: "/men/brands/reebok" },
    ],
    shoes: [
      { label: "All Shoes", href: "/men" },
      { label: "Lifestyle", href: "/men/lifestyle" },
      { label: "Skateboarding", href: "/men/skateboarding" },
      { label: "Running", href: "/men/running" },
      { label: "Football", href: "/men/football" },
      { label: "Basketball", href: "/men/basketball" },
      { label: "Training and Gym", href: "/men/training-gym" },
    ],
  },
  women: {
    brands: [
      { label: "Nike", href: "/women/brands/nike" },
      { label: "Adidas", href: "/women/brands/adidas" },
      { label: "Puma", href: "/women/brands/puma" },
      { label: "New Balance", href: "/women/brands/new-balance" },
      { label: "Vans", href: "/women/brands/vans" },
      { label: "Converse", href: "/women/brands/converse" },
      { label: "Jordan", href: "/women/brands/jordan" },
      { label: "Asics", href: "/women/brands/asics" },
      { label: "Reebok", href: "/women/brands/reebok" },
    ],
    shoes: [
      { label: "All Shoes", href: "/women" },
      { label: "Lifestyle", href: "/women/lifestyle" },
      { label: "Running", href: "/women/running" },
      { label: "Walking", href: "/women/walking" },
      { label: "Basketball", href: "/women/basketball" },
      { label: "Training and Gym", href: "/women/training-gym" },
    ],
  },
};

const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "New", href: "/new" },
  { label: "Brands", href: "/brands" },
  { label: "Sale", href: "/sale" },
];

function isActivePath(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ href, children, className = "", onClick }) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`transition ${
        active ? "text-indigo-600" : "hover:text-indigo-600"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

function MegaMenu({ type, onNavigate }) {
  const menu = megaMenus[type];

  return (
    <div className="absolute left-0 top-full z-50 w-full border-t border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-0 md:grid-cols-[1.1fr_1.5fr_1.2fr_1.2fr]">
        <div className="border-r border-black/5 px-6 py-6 lg:px-8">
          <h3 className="mb-3 text-xl font-semibold text-[#111]">Brands</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            {menu.brands.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className="text-[15px] text-gray-700 transition hover:text-indigo-600"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-r border-black/5 px-6 py-6 lg:px-8">
          <h3 className="mb-3 text-xl font-semibold text-[#111]">Shoes</h3>
          <div className="flex flex-col gap-1">
            {menu.shoes.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className="text-[15px] text-gray-700 transition hover:text-indigo-600"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 py-4 lg:px-6 lg:py-5">
          <Link
            href={type === "men" ? "/men" : "/women"}
            onClick={onNavigate}
            className="flex h-full min-h-[132px] items-center justify-center rounded-2xl bg-[#d9d9d9] text-lg font-semibold text-gray-700 transition hover:bg-[#cfcfcf]"
          >
            Shop {type === "men" ? "Men" : "Women"}
          </Link>
        </div>

        <div className="px-4 py-4 lg:px-6 lg:py-5">
          <Link
            href={type === "men" ? "/sale/men" : "/sale/women"}
            onClick={onNavigate}
            className="flex h-full min-h-[132px] items-center justify-center rounded-2xl bg-[#d9d9d9] text-lg font-semibold text-gray-700 transition hover:bg-[#cfcfcf]"
          >
            {type === "men" ? "Men's Sale" : "Women's Sale"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Navbar({ searchTerm = "", onSearchChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const pathname = usePathname();

  const closeAllMenus = () => {
    setIsOpen(false);
    setActiveMegaMenu(null);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="flex w-full items-center justify-between px-4 py-4 lg:px-10">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-indigo-600 sm:text-3xl"
        >
          HYPESTEP
        </Link>

        <nav className="hidden items-center gap-8 text-lg font-semibold lg:flex">
          {mainNavLinks.slice(0, 2).map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu("men")}
          >
            <button
              type="button"
              className={`flex items-center gap-1 transition ${
                pathname.startsWith("/men") || activeMegaMenu === "men"
                  ? "text-indigo-600"
                  : "hover:text-indigo-600"
              }`}
            >
              Men <ChevronDown size={18} />
            </button>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu("women")}
          >
            <button
              type="button"
              className={`flex items-center gap-1 transition ${
                pathname.startsWith("/women") || activeMegaMenu === "women"
                  ? "text-indigo-600"
                  : "hover:text-indigo-600"
              }`}
            >
              Women <ChevronDown size={18} />
            </button>
          </div>

          {mainNavLinks.slice(2).map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="flex items-center gap-1"
            >
              {item.label}
              {item.label === "Brands" ? <ChevronDown size={18} /> : null}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center rounded-full bg-[#f2f2f2] px-4 py-2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm || ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-44 bg-transparent text-sm outline-none"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          <Link href="/account" className="transition hover:text-indigo-600">
            <User size={24} />
          </Link>
          <Link href="/follow" className="transition hover:text-indigo-600">
            <Heart size={24} />
          </Link>
          <Link href="/cart" className="transition hover:text-indigo-600">
            <ShoppingCart size={24} />
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button type="button" className="transition hover:text-indigo-600">
            <Search size={22} />
          </button>

          <Link href="/cart" className="transition hover:text-indigo-600">
            <ShoppingCart size={22} />
          </Link>

          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {activeMegaMenu && (
        <MegaMenu type={activeMegaMenu} onNavigate={closeAllMenus} />
      )}

      {isOpen && (
        <div className="border-t border-black/10 bg-white lg:hidden">
          <div className="px-4 py-4">
            <div className="mb-4 flex items-center rounded-full bg-[#f2f2f2] px-4 py-3">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm || ""}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
              <Search size={18} className="text-gray-500" />
            </div>

            <nav className="flex flex-col gap-4 text-lg font-semibold">
              <NavLink href="/" onClick={closeAllMenus}>
                Home
              </NavLink>

              <NavLink href="/new" onClick={closeAllMenus}>
                New
              </NavLink>

              <details>
                <summary
                  className={`cursor-pointer list-none transition ${
                    pathname.startsWith("/men")
                      ? "text-indigo-600"
                      : "hover:text-indigo-600"
                  }`}
                >
                  Men
                </summary>
                <div className="mt-3 ml-2 flex flex-col gap-2 text-base font-medium text-gray-700">
                  <Link
                    href="/men"
                    onClick={closeAllMenus}
                    className="hover:text-indigo-600"
                  >
                    All Shoes
                  </Link>
                  {megaMenus.men.shoes.slice(1).map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeAllMenus}
                      className="hover:text-indigo-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>

              <details>
                <summary
                  className={`cursor-pointer list-none transition ${
                    pathname.startsWith("/women")
                      ? "text-indigo-600"
                      : "hover:text-indigo-600"
                  }`}
                >
                  Women
                </summary>
                <div className="mt-3 ml-2 flex flex-col gap-2 text-base font-medium text-gray-700">
                  <Link
                    href="/women"
                    onClick={closeAllMenus}
                    className="hover:text-indigo-600"
                  >
                    All Shoes
                  </Link>
                  {megaMenus.women.shoes.slice(1).map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeAllMenus}
                      className="hover:text-indigo-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>

              <NavLink href="/brands" onClick={closeAllMenus}>
                Brands
              </NavLink>

              <NavLink href="/sale" onClick={closeAllMenus}>
                Sale
              </NavLink>
            </nav>

            <div className="mt-6 flex items-center gap-5 border-t border-black/10 pt-4">
              <Link href="/account" onClick={closeAllMenus}>
                <User size={22} />
              </Link>
              <Link href="/follow" onClick={closeAllMenus}>
                <Heart size={22} />
              </Link>
              <Link href="/cart" onClick={closeAllMenus}>
                <ShoppingCart size={22} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
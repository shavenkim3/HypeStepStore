"use client";

import { useEffect, useRef, useState } from "react";
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
  LogIn,
  Settings,
  ArrowRight,
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
    shopCard: {
      title: "Shop Men",
      subtitle: "Lifestyle, running, football, and more",
      href: "/men",
      image: "/images/airforce1.png",
      badge: "New Season",
    },
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
    shopCard: {
      title: "Shop Women",
      subtitle: "Discover versatile everyday pairs",
      href: "/women",
      image: "/NewArrivals/JordanPink(1).png",
      badge: "Trending",
    },
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

function PromoCard({ card, onNavigate }) {
  return (
    <Link
      href={card.href}
      onClick={onNavigate}
      className="group relative flex min-h-[210px] overflow-hidden rounded-[28px] border border-black/5 bg-gradient-to-br from-[#f7f8fc] to-[#eef2f8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="relative z-10 flex max-w-[58%] flex-col">
        <span className="inline-flex w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm">
          {card.badge}
        </span>

        <h3 className="mt-4 text-2xl font-bold leading-tight text-[#111]">
          {card.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {card.subtitle}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#111] transition group-hover:text-indigo-600">
          Explore Now
          <ArrowRight size={16} />
        </span>
      </div>

      <div className="absolute bottom-0 right-0 flex h-full w-[52%] items-end justify-end">
        <div className="absolute bottom-6 right-8 h-16 w-28 rounded-full bg-black/10 blur-2xl" />
        <img
          src={card.image}
          alt={card.title}
          className="relative z-10 h-[170px] w-auto max-w-[220px] object-contain transition duration-500 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}

function MegaMenu({ type, onNavigate }) {
  const menu = megaMenus[type];

  return (
    <div className="absolute left-0 top-full z-50 w-full border-t border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 md:grid-cols-[1fr_1.15fr_1.25fr]">
        <div className="border-r border-black/5 px-6 py-7 lg:px-8">
          <h3 className="mb-4 text-2xl font-bold text-[#111]">Brands</h3>
          <div className="grid grid-cols-2 gap-x-10 gap-y-2">
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

        <div className="border-r border-black/5 px-6 py-7 lg:px-8">
          <h3 className="mb-4 text-2xl font-bold text-[#111]">Shoes</h3>
          <div className="flex flex-col gap-2">
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

        <div className="px-5 py-5 lg:px-6 lg:py-6">
          <PromoCard card={menu.shopCard} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

function DesktopMegaTrigger({
  label,
  href,
  type,
  pathname,
  activeMegaMenu,
  onOpen,
  onClose,
}) {
  const isActive = pathname.startsWith(href) || activeMegaMenu === type;

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => onOpen(type)}
    >
      <Link
        href={href}
        className={`transition ${
          isActive ? "text-indigo-600" : "hover:text-indigo-600"
        }`}
      >
        {label}
      </Link>

      <button
        type="button"
        aria-label={`Open ${label} menu`}
        onMouseEnter={() => onOpen(type)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (activeMegaMenu === type) {
            onClose();
          } else {
            onOpen(type);
          }
        }}
        className={`ml-1 inline-flex items-center transition ${
          isActive ? "text-indigo-600" : "hover:text-indigo-600"
        }`}
      >
        <ChevronDown size={18} />
      </button>
    </div>
  );
}

export default function Navbar({ searchTerm = "", onSearchChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const pathname = usePathname();
  const accountMenuRef = useRef(null);

  const closeAllMenus = () => {
    setIsOpen(false);
    setActiveMegaMenu(null);
    setAccountMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setAccountMenuOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

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

          <DesktopMegaTrigger
            label="Men"
            href="/men"
            type="men"
            pathname={pathname}
            activeMegaMenu={activeMegaMenu}
            onOpen={setActiveMegaMenu}
            onClose={() => setActiveMegaMenu(null)}
          />

          <DesktopMegaTrigger
            label="Women"
            href="/women"
            type="women"
            pathname={pathname}
            activeMegaMenu={activeMegaMenu}
            onOpen={setActiveMegaMenu}
            onClose={() => setActiveMegaMenu(null)}
          />

          {mainNavLinks.slice(2).map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="flex items-center gap-1"
            >
              {item.label}
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

          <div className="relative" ref={accountMenuRef}>
            <button
              type="button"
              onClick={() => setAccountMenuOpen((prev) => !prev)}
              className={`flex items-center gap-1 transition ${
                accountMenuOpen ? "text-indigo-600" : "hover:text-indigo-600"
              }`}
            >
              <User size={24} />
              <ChevronDown size={16} />
            </button>

            {accountMenuOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                <div className="border-b border-black/5 px-4 py-3">
                  <p className="text-sm font-semibold text-[#111]">Account</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Access your account options
                  </p>
                </div>

                <div className="p-2">
                  <Link
                    href="/login"
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#111] transition hover:bg-[#f6f7fb] hover:text-indigo-600"
                  >
                    <LogIn size={18} />
                    Sign In
                  </Link>

                  <Link
                    href="/account"
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#111] transition hover:bg-[#f6f7fb] hover:text-indigo-600"
                  >
                    <Settings size={18} />
                    Manage Account
                  </Link>
                </div>
              </div>
            )}
          </div>

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

            <div className="mt-6 border-t border-black/10 pt-4">
              <div className="mb-3">
                <p className="text-sm font-semibold text-[#111]">Account</p>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#111] transition hover:bg-[#f6f7fb] hover:text-indigo-600"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>

                <Link
                  href="/account"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#111] transition hover:bg-[#f6f7fb] hover:text-indigo-600"
                >
                  <Settings size={18} />
                  Manage Account
                </Link>

                <Link
                  href="/follow"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#111] transition hover:bg-[#f6f7fb] hover:text-indigo-600"
                >
                  <Heart size={18} />
                  Follow
                </Link>

                <Link
                  href="/cart"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#111] transition hover:bg-[#f6f7fb] hover:text-indigo-600"
                >
                  <ShoppingCart size={18} />
                  Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
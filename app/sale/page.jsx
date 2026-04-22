"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterPanel from "../components/new/FilterPanel";
import SaleHero from "../components/sale/SaleHero";
import SaleTopDeals from "../components/sale/SaleTopDeals";
import SaleProductGrid from "../components/sale/SaleProductGrid";
import MobileFilterDrawer from "../components/sale/MobileFilterDrawer";
import {
  buildSaleProducts,
  filterSaleProducts,
} from "../components/sale/saleUtils";
import { allProducts } from "../data/products";

export default function SalePage() {
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedShoeTypes, setSelectedShoeTypes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const saleProducts = useMemo(() => buildSaleProducts(allProducts), []);

  const featuredDeals = useMemo(() => {
    return [...saleProducts]
      .sort((a, b) => b.discountPercent - a.discountPercent)
      .slice(0, 3);
  }, [saleProducts]);

  const filteredProducts = useMemo(() => {
    return filterSaleProducts(saleProducts, {
      selectedGenders,
      selectedBrands,
      selectedColors,
      selectedShoeTypes,
      minPrice,
      maxPrice,
    });
  }, [
    saleProducts,
    selectedGenders,
    selectedBrands,
    selectedColors,
    selectedShoeTypes,
    minPrice,
    maxPrice,
  ]);

  const clearAllFilters = () => {
    setSelectedGenders([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedShoeTypes([]);
    setMinPrice(0);
    setMaxPrice(300);
  };

  const filterPanelProps = {
    selectedGenders,
    setSelectedGenders,
    selectedBrands,
    setSelectedBrands,
    selectedColors,
    setSelectedColors,
    selectedShoeTypes,
    setSelectedShoeTypes,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    onClear: clearAllFilters,
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#111]">
      <Navbar />

      <section className="px-4 pt-6 pb-8 sm:px-6 lg:px-10 lg:pt-8 lg:pb-10">
        <div className="mx-auto max-w-[1500px]">
          <SaleHero totalItems={saleProducts.length} />

          <SaleTopDeals products={featuredDeals} />

          <div className="mt-12 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
            <div className="hidden xl:block">
              <FilterPanel {...filterPanelProps} />
            </div>

            <SaleProductGrid
              products={filteredProducts}
              total={filteredProducts.length}
              onOpenFilters={() => setMobileFiltersOpen(true)}
            />
          </div>
        </div>
      </section>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <FilterPanel {...filterPanelProps} />
      </MobileFilterDrawer>

      <Footer />
    </main>
  );
}
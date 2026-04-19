import { X } from "lucide-react";
import FilterPanel from "./FilterPanel";

export default function MobileFilterDrawer({
  open,
  onClose,
  selectedGenders = [],
  setSelectedGenders = () => {},
  selectedBrands = [],
  setSelectedBrands = () => {},
  selectedColors = [],
  setSelectedColors = () => {},
  selectedShoeTypes = [],
  setSelectedShoeTypes = () => {},
  minPrice = 0,
  maxPrice = 300,
  setMinPrice = () => {},
  setMaxPrice = () => {},
  onClear = () => {},
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 lg:hidden">
      <div className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-[#f6f7fb] p-4 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#111]">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <X size={18} />
          </button>
        </div>

        <FilterPanel
          selectedGenders={selectedGenders}
          setSelectedGenders={setSelectedGenders}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedShoeTypes={selectedShoeTypes}
          setSelectedShoeTypes={setSelectedShoeTypes}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          onClear={onClear}
        />

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-full bg-[#111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
        >
          Show Results
        </button>
      </div>
    </div>
  );
}
const genders = ["Men", "Women", "Unisex", "Kids"];

const brands = [
  "Nike",
  "Adidas",
  "Jordan",
  "Puma",
  "New Balance",
  "Asics",
  "Vans",
];

const colors = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Brown",
  "Grey",
  "Yellow",
];

const shoeTypes = [
  "Lifestyle",
  "Running",
  "Basketball",
  "Skateboarding",
  "Training",
  "Football",
];

const colorMap = {
  Black: "bg-black",
  White: "bg-white border border-gray-300",
  Red: "bg-red-500",
  Blue: "bg-blue-500",
  Green: "bg-green-500",
  Brown: "bg-amber-700",
  Grey: "bg-gray-400",
  Yellow: "bg-yellow-400",
};

const PRICE_MIN = 0;
const PRICE_MAX = 300;
const PRICE_STEP = 5;

export default function FilterPanel({
  selectedGenders = [],
  setSelectedGenders = () => {},
  selectedBrands = [],
  setSelectedBrands = () => {},
  selectedColors = [],
  setSelectedColors = () => {},
  selectedShoeTypes = [],
  setSelectedShoeTypes = () => {},
  minPrice = PRICE_MIN,
  maxPrice = PRICE_MAX,
  setMinPrice = () => {},
  setMaxPrice = () => {},
  onClear = () => {},
}) {
  const toggleSelection = (value, selected, setter) => {
    setter((prev = []) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleMinPriceChange = (event) => {
    const value = Number(event.target.value);
    if (value <= maxPrice - PRICE_STEP) {
      setMinPrice(value);
    } else {
      setMinPrice(maxPrice - PRICE_STEP);
    }
  };

  const handleMaxPriceChange = (event) => {
    const value = Number(event.target.value);
    if (value >= minPrice + PRICE_STEP) {
      setMaxPrice(value);
    } else {
      setMaxPrice(minPrice + PRICE_STEP);
    }
  };

  const minPercent = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-28">
      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <h2 className="text-base font-semibold text-[#111] sm:text-lg">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-medium text-indigo-600 transition hover:text-indigo-500"
        >
          Clear all
        </button>
      </div>

      <div className="mt-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 sm:text-sm">
          Gender
        </h3>
        <div className="space-y-3">
          {genders.map((gender) => (
            <label key={gender} className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={selectedGenders.includes(gender)}
                onChange={() =>
                  toggleSelection(gender, selectedGenders, setSelectedGenders)
                }
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />
              <span className="text-sm text-[#111]">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 sm:text-sm">
          Brand
        </h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() =>
                  toggleSelection(brand, selectedBrands, setSelectedBrands)
                }
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />
              <span className="text-sm text-[#111]">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 sm:text-sm">
          Color
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((color) => {
            const isSelected = selectedColors.includes(color);

            return (
              <button
                key={color}
                type="button"
                onClick={() =>
                  toggleSelection(color, selectedColors, setSelectedColors)
                }
                className={`flex flex-col items-center gap-2 rounded-2xl border p-2 transition ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-black/5 hover:border-indigo-200"
                }`}
              >
                <span
                  className={`h-6 w-6 rounded-full ${colorMap[color] || "bg-gray-200"}`}
                />
                <span className="text-[11px] font-medium text-[#111] sm:text-xs">
                  {color}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 sm:text-sm">
          Price
        </h3>

        <div className="rounded-2xl border border-black/5 bg-[#f8f9fc] p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">
                Min
              </p>
              <p className="mt-1 text-sm font-semibold text-[#111]">${minPrice}</p>
            </div>

            <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">
                Max
              </p>
              <p className="mt-1 text-sm font-semibold text-[#111]">${maxPrice}</p>
            </div>
          </div>

          <div className="relative py-4">
            <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-gray-200" />

            <div
              className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-indigo-600"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            />

            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={minPrice}
              onChange={handleMinPriceChange}
              className="range-thumb pointer-events-none absolute left-0 top-1/2 z-20 h-2 w-full -translate-y-1/2 appearance-none bg-transparent"
            />

            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="range-thumb pointer-events-none absolute left-0 top-1/2 z-30 h-2 w-full -translate-y-1/2 appearance-none bg-transparent"
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>${PRICE_MIN}</span>
            <span>${PRICE_MAX}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 sm:text-sm">
          Shoes
        </h3>
        <div className="space-y-3">
          {shoeTypes.map((shoe) => (
            <label key={shoe} className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={selectedShoeTypes.includes(shoe)}
                onChange={() =>
                  toggleSelection(shoe, selectedShoeTypes, setSelectedShoeTypes)
                }
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />
              <span className="text-sm text-[#111]">{shoe}</span>
            </label>
          ))}
        </div>
      </div>

      <style jsx>{`
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto;
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: white;
          border: 2px solid #4f46e5;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }

        .range-thumb::-moz-range-thumb {
          pointer-events: auto;
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: white;
          border: 2px solid #4f46e5;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
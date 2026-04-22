import { slugifyBrand } from "../../data/products";

export const saleConfig = {
  3: 5,
  4: 5,
  6: 5,
  9: 22,
  10: 35,
  11: 20,
  12: 15,
  13: 28,
  15: 18,
  18: 25,
  19: 20,
  20: 15,
};

export function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}

export function getProductBaseRoute(product) {
  if (product.routePath) return product.routePath;

  if (product.isBestSeller) {
    return `/best-sellers/${product.id}`;
  }

  return `/brands/${slugifyBrand(product.brand)}/${product.id}`;
}

export function getSaleDetailHref(product) {
  const basePath = getProductBaseRoute(product);

  const params = new URLSearchParams({
    sale: "1",
    salePrice: String(product.salePrice),
    originalPrice: String(product.originalPrice),
    discount: String(product.discountPercent),
    from: "sale",
  });

  return `${basePath}?${params.toString()}`;
}

export function buildSaleProducts(products = []) {
  return products
    .filter((product) => saleConfig[product.id])
    .map((product) => {
      const discountPercent = saleConfig[product.id];
      const originalPrice = Number(product.price) || 0;
      const salePrice = Number(
        (originalPrice * (1 - discountPercent / 100)).toFixed(2)
      );

      return {
        ...product,
        discountPercent,
        originalPrice,
        salePrice,
        saleHref: getSaleDetailHref({
          ...product,
          discountPercent,
          originalPrice,
          salePrice,
        }),
      };
    });
}

export function filterSaleProducts(products = [], filters) {
  const {
    selectedGenders = [],
    selectedBrands = [],
    selectedColors = [],
    selectedShoeTypes = [],
    minPrice = 0,
    maxPrice = 300,
  } = filters;

  return products.filter((product) => {
    const matchesGender =
      selectedGenders.length === 0 || selectedGenders.includes(product.gender);

    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    const matchesColor =
      selectedColors.length === 0 || selectedColors.includes(product.color);

    const matchesType =
      selectedShoeTypes.length === 0 ||
      selectedShoeTypes.includes(product.category);

    const matchesPrice =
      product.salePrice >= minPrice && product.salePrice <= maxPrice;

    return (
      matchesGender &&
      matchesBrand &&
      matchesColor &&
      matchesType &&
      matchesPrice
    );
  });
}
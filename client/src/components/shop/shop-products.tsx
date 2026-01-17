import { useMemo } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";
import { ShopHeader } from "./shop-header";

interface Product {
  id: number;
  name: string;
  description?: string;
  price?: number;
  image_url?: string;
}

interface ShopProductsProps {
  products: Product[];
  sortBy: string;
  setSortBy: (value: string) => void;
  loading?: boolean;
}

export const ShopProducts = ({
  products,
  sortBy,
  setSortBy,
  loading = false,
}: ShopProductsProps) => {
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "name-asc":
          return (a.name || "").localeCompare(b.name || "");
        case "name-desc":
          return (b.name || "").localeCompare(a.name || "");
        default:
          return 0;
      }
    });
  }, [products, sortBy]);

  if (loading) {
    return (
      <div className="flex w-full flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <div className="h-5 bg-gray-100 rounded w-32 animate-pulse" />
          <div className="h-10 bg-gray-100 rounded w-[180px] animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-gray-900">No products found</p>
        <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <ShopHeader
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalProducts={sortedProducts.length}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  ">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={
              product.image_url ||
              "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
            }
            price={product.price ? `$${product.price}` : "$0"}
            title={product.name}
          />
        ))}
      </div>
    </div>
  );
};

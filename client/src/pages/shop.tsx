import { useState, useMemo } from "react";
import { ShopFilters } from "@/components/shop/shop-filters";
import { ShopProducts } from "@/components/shop/shop-products";
import type { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axios";

const Shop = () => {
  const [category, setCategory] = useState("All");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState("newest");

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await client.get<Product[]>("/products");
      return Array.isArray(data)
        ? data.map((product) => ({
            ...product,
            image_url: product.image_url ?? product.image,
          }))
        : [];
    },
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesPrice = (product.price || 0) <= priceRange;
      return matchesCategory && matchesPrice;
    });
  }, [category, priceRange, products]);

  return (
    <main className="max-w-5xl mx-auto py-8 md:py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <ShopFilters
          category={category}
          setCategory={setCategory}
          color={color}
          setColor={setColor}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <div className="flex w-full flex-col gap-4">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error instanceof Error ? error.message : "Failed to load products"}
            </div>
          ) : null}
          <ShopProducts
            products={filteredProducts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            loading={isLoading}
          />
        </div>
      </div>
    </main>
  );
};

export default Shop;

import { useState, useMemo, useEffect } from "react";
import { ShopFilters } from "@/components/shop/shop-filters";
import { ShopProducts } from "@/components/shop/shop-products";
import { mockProducts } from "@/constants";

const Shop = () => {
  const [category, setCategory] = useState("All");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesCategory =
        category === "All" ||
        (category === "Men" &&
          ["Sneakers", "Jacket", "Jeans", "Sweater", "T-Shirt", "Shoes"].some(
            (n) => product.name.includes(n),
          )) ||
        (category === "Women" &&
          ["Dress", "Jeans", "Sweater", "T-Shirt", "Sunglasses"].some((n) =>
            product.name.includes(n),
          )) ||
        (category === "Accessories" &&
          ["Watch", "Sunglasses"].some((n) => product.name.includes(n)));
      const matchesPrice = (product.price || 0) <= priceRange;
      return matchesCategory && matchesPrice;
    });
  }, [category, priceRange]);

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
        <ShopProducts
          products={filteredProducts}
          sortBy={sortBy}
          setSortBy={setSortBy}
          loading={loading}
        />
      </div>
    </main>
  );
};

export default Shop;

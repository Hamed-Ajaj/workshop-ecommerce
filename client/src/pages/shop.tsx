import { useState, useMemo, useEffect } from "react";
import { ShopFilters } from "@/components/shop/shop-filters";
import { ShopProducts } from "@/components/shop/shop-products";

const mockProducts = [
  {
    id: 1,
    name: "Classic Sneakers",
    description: "Comfortable everyday shoes",
    price: 79,
    image_url:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
  },
  {
    id: 2,
    name: "Leather Jacket",
    description: "Premium leather jacket",
    price: 199,
    image_url:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
  },
  {
    id: 3,
    name: "Denim Jeans",
    description: "Classic blue jeans",
    price: 69,
    image_url:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
  },
  {
    id: 4,
    name: "Summer Dress",
    description: "Light and breezy dress",
    price: 89,
    image_url:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
  },
  {
    id: 5,
    name: "Wool Sweater",
    description: "Warm winter sweater",
    price: 59,
    image_url:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
  },
  {
    id: 6,
    name: "Casual T-Shirt",
    description: "Basic cotton t-shirt",
    price: 29,
    image_url:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
  },
  {
    id: 7,
    name: "Running Shoes",
    description: "Lightweight runners",
    price: 119,
    image_url:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
  },
  {
    id: 8,
    name: "Watch",
    description: "Elegant timepiece",
    price: 249,
    image_url:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
  },
  {
    id: 9,
    name: "Sunglasses",
    description: "UV protection",
    price: 49,
    image_url:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
  },
];

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

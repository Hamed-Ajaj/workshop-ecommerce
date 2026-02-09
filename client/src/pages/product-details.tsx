import { useCartStore } from "@/stores/useCartStore";
import type { Product } from "@/types/product";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

const colorOptions = [
  { name: "White", value: "#ffffff" },
  { name: "Blue", value: "#2563eb" },
  { name: "Green", value: "#16a34a" },
  { name: "Black", value: "#0f172a" },
];

const sizeOptions = ["S", "M", "L", "XL"];

export default function ProductDetails() {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[1]);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const productId = Number(id);
  const addProduct = useCartStore((state) => state.addItem);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    enabled: Number.isFinite(productId) && productId > 0,
    queryFn: async () => {
      const { data } = await client.get<Product>(`/products/${productId}`);
      return {
        ...data,
        image_url: data.image_url ?? data.image,
      };
    },
  });

  if (isLoading) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-lg text-slate-600">Loading product...</p>
      </main>
    );
  }

  if (!product || error) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-lg text-slate-600">
          {error instanceof Error ? error.message : "Product not found."}
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
        <section className="grid gap-4">
          <div className="relative overflow-hidden rounded-3xl bg-slate-100">
            <img
              src={
                product.image_url ||
                product.image ||
                "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
              }
              alt={product.name}
              className="h-[420px] w-full object-cover"
            />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Product Details
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 text-slate-700">
              <span className="text-2xl font-semibold">${product.price}</span>
              <span className="text-sm text-slate-500">USD</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
              <span className="font-medium text-slate-700">4.8</span>
              <span>(128 reviews)</span>
            </div>
          </div>

          <p className="text-base leading-7 text-slate-600">
            {product.description}. Designed with premium materials and a clean
            silhouette, this piece transitions easily from daily wear to special
            moments.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-slate-800">Colors</h2>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      aria-label={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-sm transition ${
                        isSelected
                          ? "border-slate-900 ring-2 ring-slate-300"
                          : "border-slate-200 hover:scale-105"
                      }`}
                    >
                      <span
                        className="h-7 w-7 rounded-full border border-slate-200"
                        style={{ backgroundColor: color.value }}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500">
                Selected: {selectedColor.name}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-slate-800">Size</h2>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isSelected
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500">Selected: {selectedSize}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-slate-800">Quantity</h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  className="text-lg text-slate-500 transition hover:text-slate-700 disabled:cursor-not-allowed disabled:text-slate-300"
                >
                  -
                </button>
                <input
                  min={1}
                  readOnly
                  value={quantity}
                  className="w-12 appearance-none bg-transparent text-center text-base font-semibold text-slate-800 focus:outline-none "
                />
                <button
                  type="button"
                  className="text-lg text-slate-500 transition hover:text-slate-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="flex-1 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800"
                onClick={() => {
                  if (!token) {
                    toast.error("Sign in to add items to your cart");
                    navigate("/sign-in");
                    return;
                  }

                  addProduct(
                    {
                      id: `${product.id}-${selectedColor.name}-${selectedSize}`,
                      name: product.name,
                      price: product.price,
                      image:
                        product.image_url ||
                        product.image ||
                        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
                      color: selectedColor.name.toLowerCase(),
                      size: selectedSize,
                    },
                    quantity,
                  );
                  toast.success("Added to cart");
                }}
              >
                Add to cart ({quantity} item{quantity === 1 ? "" : "s"})
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

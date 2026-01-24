import { mockProducts } from "@/constants";
import { useCartStore } from "@/stores/useCartStore";
import { useState } from "react";
import { useParams } from "react-router-dom";

// const colorOptions = [
//   { name: "Onyx", value: "#0f172a" },
//   { name: "Sand", value: "#d4b8a8" },
//   { name: "Forest", value: "#14532d" },
//   { name: "Crimson", value: "#b91c1c" },
// ];

export default function ProductDetails() {
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams();
  const productId = Number(id);
  const product = mockProducts.find((item) => item.id === productId);
  const addProduct = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-lg text-slate-600">Product not found.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
        <section className="grid gap-4">
          <div className="relative overflow-hidden rounded-3xl bg-slate-100">
            <img
              src={product.image_url}
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

          {/* <div className="flex flex-col gap-3"> */}
          {/*   <h2 className="text-sm font-semibold text-slate-800">Colors</h2> */}
          {/*   <div className="flex flex-wrap gap-3"> */}
          {/*     {colorOptions.map((color) => ( */}
          {/*       <button */}
          {/*         key={color.name} */}
          {/*         type="button" */}
          {/*         aria-label={color.name} */}
          {/*         className="h-10 w-10 rounded-full border-2 border-slate-200 shadow-sm transition hover:scale-105" */}
          {/*         style={{ backgroundColor: color.value }} */}
          {/*       /> */}
          {/*     ))} */}
          {/*   </div> */}
          {/* </div> */}

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
                onClick={() =>
                  addProduct({
                    id: String(product.id),
                    name: product.name,
                    price: product.price,
                    image: product.image_url,
                  })
                }
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

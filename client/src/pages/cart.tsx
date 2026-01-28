import { useCartStore } from "@/stores/useCartStore";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = items.length > 0 ? 10 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const formatPrice = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-700"
      >
        <ArrowLeft size={16} />
        Continue Shopping
      </Link>

      <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-slate-900">
        Shopping Cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-start">
        <section className="flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center text-slate-600 shadow-sm">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-between">
                  <div className="flex min-w-[240px] flex-1 items-center gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded-2xl bg-slate-100">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-base font-semibold text-slate-800">
                        {item.name}
                      </h2>
                      <p className="text-sm text-slate-500">
                        Size: {item.size || "M"} | Color:{" "}
                        {item.color || "default"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="Remove item"
                    className="rounded-full p-2 text-rose-500 transition hover:bg-rose-50"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2">
                    <button
                      type="button"
                      className="text-slate-500 transition hover:text-slate-700"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-base font-semibold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="text-slate-500 transition hover:text-slate-700"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-slate-800">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-sm text-slate-400">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        <aside className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Order Summary
          </h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-slate-700">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium text-slate-700">
                {formatPrice(shipping)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax (10%)</span>
              <span className="font-medium text-slate-700">
                {formatPrice(tax)}
              </span>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span className="text-blue-600">{formatPrice(total)}</span>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500"
          >
            Proceed to Checkout
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">
            Secure checkout powered by Stripe
          </p>
        </aside>
      </div>
    </main>
  );
}

interface ShopFiltersProps {
  category: string;
  setCategory: (category: string) => void;
  color: string;
  setColor: (color: string) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
}

const categories = [
  { value: "All", label: "All" },
  { value: "Men", label: "Men" },
  { value: "Women", label: "Women" },
  { value: "Accessories", label: "Accessories" },
];

const colors = [
  { name: "Red", value: "Red", className: "bg-red-500" },
  { name: "White", value: "White", className: "bg-white border border-gray-200" },
  { name: "Blue", value: "Blue", className: "bg-blue-500" },
  { name: "Green", value: "Green", className: "bg-green-500" },
  { name: "Black", value: "Black", className: "bg-black" },
];

export const ShopFilters = ({
  category,
  setCategory,
  color,
  setColor,
  priceRange,
  setPriceRange,
}: ShopFiltersProps) => {
  return (
    <aside className="flex flex-col gap-6 lg:gap-8 w-full lg:w-64 shrink-0">
      <div>
        <h1 className="font-bold text-xl md:text-2xl mb-6">Shop</h1>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-semibold text-sm md:text-base">Categories</span>
        <ul className="flex flex-col gap-1">
          {categories.map((cat) => (
            <li key={cat.value}>
              <button
                onClick={() => setCategory(cat.value)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 text-sm md:text-base ${
                  category === cat.value
                    ? "bg-blue-50 text-blue-500 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-semibold text-sm md:text-base">Price Range</span>
        <div>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>$0</span>
            <span className="font-medium text-gray-900">${priceRange}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-semibold text-sm md:text-base">Colors</span>
        <div className="flex flex-wrap gap-2">
          {colors.map((col) => (
            <button
              key={col.value}
              onClick={() => setColor(color === col.value ? "" : col.value)}
              className={`${col.className} cursor-pointer w-8 h-8 rounded-full transition-all duration-200 ${
                color === col.value
                  ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                  : "hover:scale-105"
              }`}
              title={col.name}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

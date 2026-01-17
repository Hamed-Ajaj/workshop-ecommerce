interface ShopHeaderProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  totalProducts: number;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
];

export const ShopHeader = ({
  sortBy,
  setSortBy,
  totalProducts,
}: ShopHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
      <p className="text-sm md:text-base text-gray-600">
        Showing <span className="font-medium text-gray-900">{totalProducts}</span> products
      </p>
      <div className="flex items-center gap-3">
        <span className="text-sm md:text-base text-gray-600 hidden sm:inline">
          Sort By
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-[180px] md:w-[200px] px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

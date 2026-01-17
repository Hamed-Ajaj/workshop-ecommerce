export const ProductCardSkeleton = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm animate-pulse">
      <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden bg-gray-100" />
      <div className="p-4 md:p-5 space-y-3">
        <div className="h-5 bg-gray-100 rounded w-3/4" />
        <div className="h-5 bg-gray-100 rounded w-1/4" />
      </div>
    </div>
  );
};

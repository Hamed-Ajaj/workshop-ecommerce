export const ProductCard = ({
  image,
  title,
  price,
}: {
  image: string;
  title: string;
  price: string;
}) => {
  return (
    <div className="group w-full rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ease-out">
      {/* Image wrapper */}
      <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-end justify-center
          bg-gradient-to-t from-black/40 via-transparent to-transparent
          opacity-0 group-hover:opacity-100
          transition-all duration-300"
        >
          <button
            className="mb-4 translate-y-4 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-300 ease-out
            bg-white text-gray-900 px-5 py-2.5 rounded-full
            text-sm font-medium hover:bg-gray-100 shadow-lg
            transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 space-y-1.5">
        <h3 className="text-gray-900 font-medium text-base md:text-lg truncate group-hover:text-blue-500 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-500 text-base md:text-lg font-semibold">
          {price}
        </p>
      </div>
    </div>
  );
};

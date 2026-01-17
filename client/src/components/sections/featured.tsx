import { FeaturedCard } from "../featured-card";

export const FeaturedCategories = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-8 items-center py-6 md:py-8 px-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-blue-400">
          Featured Categories
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-20 items-center justify-center">
        <FeaturedCard title="MEN" href="/men" />
        <FeaturedCard title="WOMEN" href="/women" />
        <FeaturedCard title="ACCESSORIES" href="/accessories" />
      </div>
    </div>
  );
};

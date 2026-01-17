import { ArrowRight } from "lucide-react";
import { ProductCard } from "../product-card";
import { Link } from "react-router-dom";

export const Trending = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-10 w-full mx-auto items-center py-6 md:py-8 px-4">
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold ">Trendings</h1>
        </div>
        <Link to="/shop">
          <div className="flex gap-1 items-center">
            <span className="text-sm md:text-md">View all</span>
            <ArrowRight size={12} className="md:w-4" />
          </div>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 md:gap-10 w-full justify-center">
        <ProductCard
          image="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg
 "
          price="$25"
          title="title"
        />
        <ProductCard
          image="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg
 "
          price="$25"
          title="title"
        />
        <ProductCard
          image="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg
 "
          price="$25"
          title="title"
        />
      </div>
    </div>
  );
};

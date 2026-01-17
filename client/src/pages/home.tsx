import { FeaturedCategories } from "@/components/sections/featured";
import { Hero } from "@/components/sections/hero";
import { Trending } from "@/components/sections/trending";

const HomePage = () => {
  return (
    <>
      <div className="w-full mb-10">
        <Hero />
      </div>
      <main className="w-full flex flex-col gap-6 md:gap-12 max-w-5xl mx-auto px-4 md:px-6">
        <FeaturedCategories />
        <Trending />
      </main>
    </>
  );
};

export default HomePage;

import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedLaptops from "@/components/home/FeaturedLaptops";
import SpecsComparison from "@/components/home/SpecsComparison";

const HomePage = () => {
  return (
    <>
      <Hero />
      <CategorySection isHome />
      <FeaturedLaptops />
      <SpecsComparison />
    </>
  );
};
export default HomePage;

import { useEffect } from "react";
import { useSearchParams } from "react-router";

import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedLaptops from "@/components/home/FeaturedLaptops";
import SpecsComparison from "@/components/home/SpecsComparison";
import toast from "react-hot-toast";

const HomePage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handlePaymentSuccess = () => {
      if (searchParams.get("payment_success")) {
        window.history.replaceState({}, "", window.location.pathname);
        toast.success("Payment successful!");
      }
    };

    handlePaymentSuccess();
  }, [searchParams]);

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

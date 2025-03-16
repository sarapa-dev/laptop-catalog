import { useState, useEffect } from "react";
import LaptopCard from "../laptop/LaptopCard";
import { LaptopType } from "@/types/laptop";
import { axiosInstance } from "@/lib/axios";
import { Link } from "react-router";

const FeaturedLaptops = () => {
  const [laptops, setLaptops] = useState<LaptopType[]>([]);

  useEffect(() => {
    const getFeaturedLaptops = async () => {
      const res = await axiosInstance("/laptop/featured");
      setLaptops(res.data);
    };

    getFeaturedLaptops();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Laptops</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our selection of top-rated laptops from leading manufacturers.
            </p>
          </div>
          <Link to="laptops" className="text-primary hover:underline font-medium">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {laptops?.map((laptop) => (
            <LaptopCard key={laptop.laptop_id} laptop={laptop} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLaptops;

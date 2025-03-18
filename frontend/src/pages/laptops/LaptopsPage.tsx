import LaptopCard from "@/components/laptop/LaptopCard";
import LaptopCardSkeleton from "@/components/loaders/LaptopCardSkeleton";
import { axiosInstance } from "@/lib/axios";
import { LaptopType } from "@/types/laptop";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const LaptopsPage = () => {
  const { data: laptops, isLoading } = useQuery<LaptopType[]>({
    queryKey: ["laptop"],
    queryFn: async () => {
      const res = await axiosInstance.get(`laptop`);
      const laptops: LaptopType[] = res.data.data;
      return laptops;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl p-2">All Laptops</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => <LaptopCardSkeleton key={i} />)
          : laptops?.map((laptop) => <LaptopCard key={laptop.laptop_id} laptop={laptop} />)}
      </div>
    </section>
  );
};
export default LaptopsPage;

import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { LaptopType } from "@/types/laptop";
import { ArrowLeft } from "lucide-react";
import LaptopHero from "@/components/laptop/LaptopHero";
import LaptopSpecifications from "@/components/laptop/LaptopSpecifications";

const LaptopDetailPage = () => {
  const { id: laptopId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [laptopId]);

  const { data: laptop, isLoading } = useQuery<LaptopType>({
    queryKey: ["laptop", laptopId],
    queryFn: async () => {
      const res = await axiosInstance.get<LaptopType>(`laptop/${laptopId}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (!laptop) return <div>Laptop not found</div>;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        <Link
          to="/laptops"
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all laptops
        </Link>

        <LaptopHero laptop={laptop} />
        <LaptopSpecifications laptop={laptop} />
      </div>
    </div>
  );
};

export default LaptopDetailPage;

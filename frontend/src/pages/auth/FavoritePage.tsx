import LaptopCard from "@/components/laptop/LaptopCard";
import { axiosInstance } from "@/lib/axios";
import { LaptopType } from "@/types/laptop";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface FavoriteLaptop extends LaptopType {
  favorite_id: number;
}

const FavoritePage = () => {
  const [favorites, setFavorites] = useState<FavoriteLaptop[]>([]);

  const fetchFavorites = async () => {
    try {
      const res = await axiosInstance.get<FavoriteLaptop[]>("/favorite");
      setFavorites(res.data);
    } catch (error) {
      toast.error("Failed to load favorites");
    }
  };

  useEffect(() => {
    fetchFavorites();
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="max-w-7xl mx-auto p-4">
      {favorites.length === 0 ? (
        <p>You don't have any favorite laptops yet.</p>
      ) : (
        <>
          <h1 className="text-2xl p-2">Your Favorite Laptops</h1>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favorites.map((laptop) => (
              <LaptopCard key={laptop.favorite_id} laptop={laptop} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default FavoritePage;

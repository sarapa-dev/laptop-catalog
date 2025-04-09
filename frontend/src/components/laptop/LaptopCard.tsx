import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { LaptopType } from "@/types/laptop";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "@/types/user";
import { Heart } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

type LaptopCardProps = {
  laptop: LaptopType;
};

const LaptopCard = ({ laptop }: LaptopCardProps) => {
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });
  const [isFavorite, setIsFavorite] = useState(laptop.isFavorite);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(laptop.isFavorite);
  }, [laptop.isFavorite]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!authUser || isLoading) return;

    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    setIsLoading(true);

    try {
      if (newFavoriteState) {
        await axiosInstance.post("/favorite", { laptop_id: laptop.laptop_id });
      } else {
        await axiosInstance.delete(`/favorite/${laptop.laptop_id}`);
      }
    } catch (error) {
      setIsFavorite(!newFavoriteState);
      toast.error("Failed to update favorite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden relative">
      {authUser?.status === "NORMAL" && (
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 cursor-pointer z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          disabled={isLoading}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`size-5 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "fill-none text-muted-foreground hover:text-foreground"
            } transition-colors`}
          />
        </button>
      )}

      <CardHeader className="p-4">
        <img
          src={laptop?.image_url || "/placeholder.webp"}
          alt={laptop?.name}
          className="w-full h-48 object-contain mb-4 transition-transform hover:scale-105"
        />
        <CardTitle className="text-lg">{laptop?.name}</CardTitle>
        <p className="text-muted-foreground">{laptop?.manufacturer.name}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Processor:</span>
            <span className="text-muted-foreground">{laptop?.processor.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">GPU:</span>
            <span className="text-muted-foreground">{laptop?.gpu.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Display:</span>
            <span className="text-muted-foreground">{laptop?.display.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Storage:</span>
            <span className="text-muted-foreground">{laptop?.storage.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Price:</span>
            <span className="text-primary font-semibold">${(laptop?.price / 100).toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Button className="w-full">
          <Link to={`/laptops/${laptop.laptop_id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LaptopCard;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { LaptopType } from "@/types/laptop";
import { UserType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { Microchip, Cpu, HardDrive, Monitor, Share2, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

type LaptopHeroProps = {
  laptop: LaptopType;
};

const LaptopHero = ({ laptop }: LaptopHeroProps) => {
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });
  const { addItem } = useCartStore();

  const handleAddItem = () => {
    addItem(laptop);
    toast.success(`Product has been added to your cart.`);
  };

  return (
    <section className="max-w-7xl mx-auto p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-8 flex items-center justify-center">
          <img
            src={laptop.image_url || "/placeholder.webp"}
            alt={laptop.name}
            className="max-h-[400px] object-contain"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-normal">
                {laptop.category.name}
              </Badge>
              <Badge variant="outline" className="text-xs font-normal">
                {laptop.manufacturer.name}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{laptop.name}</h1>
            <p className="text-muted-foreground mb-6">
              {laptop.manufacturer.name} {laptop.name} with {laptop.processor.name} and{" "}
              {laptop.gpu.name}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-2">
                <Cpu className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Processor</p>
                  <p className="text-sm text-muted-foreground">{laptop.processor.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Monitor className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Display</p>
                  <p className="text-sm text-muted-foreground">
                    {laptop.display.size}" {laptop.display.type} ({laptop.display.width}x
                    {laptop.display.height})
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Microchip className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Graphics</p>
                  <p className="text-sm text-muted-foreground">
                    {laptop.gpu.name} {laptop.gpu.vram}GB
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <HardDrive className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Storage</p>
                  <p className="text-sm text-muted-foreground">{laptop.storage.name}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 mb-6">
              <span className="text-2xl font-bold">Price:</span>
              <span className="text-2xl font-bold text-primary">
                ${(laptop.price / 100).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 cursor-pointer"
              disabled={!authUser || authUser.status === "ADMIN"}
              onClick={handleAddItem}
            >
              <ShoppingCart className="mr-2 size-4" />
              Add to cart
            </Button>
            <Button
              variant="outline"
              className="flex-1 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
              }}
            >
              <Share2 className="mr-2 size-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaptopHero;

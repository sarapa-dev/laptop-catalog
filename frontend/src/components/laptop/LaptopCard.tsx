import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { LaptopType } from "@/types/laptop";
import { Link } from "react-router";

type LaptopCardProps = {
  laptop: LaptopType;
};

const LaptopCard = ({ laptop }: LaptopCardProps) => {
  return (
    <Card className="overflow-hidden">
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

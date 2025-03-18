import { useState } from "react";
import { Laptop, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { LaptopNamesType } from "@/types/laptop";

type LaptopSelectorProps = {
  laptops: LaptopNamesType[];
  isLoading: boolean;
  selectedLaptop: LaptopNamesType | null;
  onSelectLaptop: (laptop: LaptopNamesType | null) => void;
  label: string;
};

const LaptopSelector = ({
  laptops,
  isLoading,
  selectedLaptop,
  onSelectLaptop,
  label,
}: LaptopSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const MAX_DISPLAYED_LAPTOPS = 12;

  const filteredLaptops = laptops.filter((laptop) =>
    laptop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedLaptops = filteredLaptops.slice(0, MAX_DISPLAYED_LAPTOPS);
  const hasMoreResults = filteredLaptops.length > MAX_DISPLAYED_LAPTOPS;

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {isLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <div className="space-y-2">
          <div className="relative">
            <Input
              placeholder="Search laptops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Select
            value={selectedLaptop ? String(selectedLaptop.laptop_id) : ""}
            onValueChange={(value) => {
              if (value) {
                const laptop = laptops.find((l) => l.laptop_id === parseInt(value));
                if (laptop) onSelectLaptop(laptop);
              } else {
                onSelectLaptop(null);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a laptop" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Laptops</SelectLabel>
                {filteredLaptops.length === 0 ? (
                  <div className="py-2 px-2 text-sm text-muted-foreground">No laptops found</div>
                ) : (
                  <>
                    {displayedLaptops.map((laptop) => (
                      <SelectItem key={laptop.laptop_id} value={String(laptop.laptop_id)}>
                        <div className="flex items-center">
                          <Laptop className="mr-2 h-4 w-4" />
                          {laptop.name}
                        </div>
                      </SelectItem>
                    ))}

                    {hasMoreResults && (
                      <div className="py-2 px-2 text-xs text-muted-foreground border-t">
                        {filteredLaptops.length - MAX_DISPLAYED_LAPTOPS} more results. Refine your
                        search to see more specific options.
                      </div>
                    )}
                  </>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      {selectedLaptop && (
        <Button
          variant="outline"
          size="sm"
          className="self-end text-xs"
          onClick={() => onSelectLaptop(null)}
        >
          Clear selection
        </Button>
      )}
    </div>
  );
};

export default LaptopSelector;

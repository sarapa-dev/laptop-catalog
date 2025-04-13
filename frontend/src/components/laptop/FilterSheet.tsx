import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

type FilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string | null;
  setName: (name: string | null) => void;
  category: string | null;
  setCategory: (category: string | null) => void;
  manufacturer: string | null;
  setManufacturer: (manufacturer: string | null) => void;
  screenSize: string | null;
  setScreenSize: (screenSize: string | null) => void;
  storageType: string | null;
  setStorageType: (storageType: string | null) => void;
  resetFilters: () => void;
  categories: any[];
  manufacturers: string[];
};

const FilterSheet = ({
  open,
  onOpenChange,
  name,
  setName,
  category,
  setCategory,
  manufacturer,
  setManufacturer,
  screenSize,
  setScreenSize,
  storageType,
  setStorageType,
  resetFilters,
  categories,
  manufacturers,
}: FilterSheetProps) => {
  const [localName, setLocalName] = useState(name || "");
  const [localCategory, setLocalCategory] = useState(category || "");
  const [localManufacturer, setLocalManufacturer] = useState(manufacturer || "");
  const [localScreenSize, setLocalScreenSize] = useState(screenSize || "");
  const [localStorageType, setLocalStorageType] = useState(storageType || "");

  useEffect(() => {
    setLocalName(name || "");
    setLocalCategory(category || "");
    setLocalManufacturer(manufacturer || "");
    setLocalScreenSize(screenSize || "");
    setLocalStorageType(storageType || "");
  }, [name, category, manufacturer, screenSize, storageType]);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setLocalName(name || "");
      setLocalCategory(category || "");
      setLocalManufacturer(manufacturer || "");
      setLocalScreenSize(screenSize || "");
      setLocalStorageType(storageType || "");
    }
    onOpenChange(open);
  };

  const applyFilters = () => {
    setName(localName || null);
    setCategory(localCategory || null);
    setManufacturer(localManufacturer || null);
    setScreenSize(localScreenSize || null);
    setStorageType(localStorageType || null);
    onOpenChange(false);
  };

  const handleResetFilters = () => {
    setLocalName("");
    setLocalCategory("");
    setLocalManufacturer("");
    setLocalScreenSize("");
    setLocalStorageType("");
    resetFilters();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto p-2" side="left">
        <SheetHeader className="mb-6">
          <SheetTitle>Filter Laptops</SheetTitle>
          <SheetDescription>
            Adjust the filters to find the perfect laptop for your needs.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Search by name</Label>
            <Input
              id="name"
              placeholder="Search by name..."
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={localCategory}
              onValueChange={(value) => setLocalCategory(value === "all" ? "" : value)}
            >
              <SelectTrigger id="category" className="w-[200px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((cat: any) => (
                  <SelectItem key={cat.category_id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Select
              value={localManufacturer}
              onValueChange={(value) => setLocalManufacturer(value === "all" ? "" : value)}
            >
              <SelectTrigger id="manufacturer" className="w-[200px]">
                <SelectValue placeholder="Select manufacturer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Manufacturers</SelectItem>
                {manufacturers.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="screenSize">Screen Size</Label>
            <Select
              value={localScreenSize}
              onValueChange={(value) => setLocalScreenSize(value === "all" ? "" : value)}
            >
              <SelectTrigger id="screenSize">
                <SelectValue placeholder="Screen size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Size</SelectItem>
                {[14, 15, 16, 17].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}"
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="storageType">Storage Type</Label>
            <Select
              value={localStorageType}
              onValueChange={(value) => setLocalStorageType(value === "all" ? "" : value)}
            >
              <SelectTrigger id="storageType">
                <SelectValue placeholder="Storage type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Type</SelectItem>
                <SelectItem value="M2_SSD">M.2 SSD</SelectItem>
                <SelectItem value="SATA_SSD">SATA SSD</SelectItem>
                <SelectItem value="HDD">HDD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <div className="flex flex-col gap-2 w-full">
            <Button onClick={applyFilters}>Apply Filters</Button>
            <Button variant="outline" onClick={handleResetFilters}>
              <X className="mr-2 size-4" />
              Reset Filters
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;

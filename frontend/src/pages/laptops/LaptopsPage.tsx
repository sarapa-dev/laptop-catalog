import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { X } from "lucide-react";
import LaptopCardSkeleton from "@/components/loaders/LaptopCardSkeleton";
import { axiosInstance } from "@/lib/axios";
import LaptopCard from "@/components/laptop/LaptopCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { LaptopType } from "@/types/laptop";

interface LaptopResponse {
  data: LaptopType[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const LaptopsPage = () => {
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [limit, setLimit] = useQueryState("limit", { defaultValue: "12" });
  const [sort, setSort] = useQueryState("sort", { defaultValue: "name" });
  const [order, setOrder] = useQueryState("order", { defaultValue: "asc" });
  const [name, setName] = useQueryState("name");
  const [category, setCategory] = useQueryState("category");
  const [manufacturer, setManufacturer] = useQueryState("manufacturer");
  const [screenSize, setScreenSize] = useQueryState("screenSize");
  const [storageType, setStorageType] = useQueryState("storageType");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/category");
      return res.data;
    },
  });

  const manufacturers = ["LG", "MSI", "Asus", "Apple", "Lenovo"];

  const { data, isLoading } = useQuery<LaptopResponse>({
    queryKey: [
      "laptops",
      page,
      limit,
      sort,
      order,
      name,
      category,
      manufacturer,
      screenSize,
      storageType,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit,
        sort,
        order,
        ...(name && { name }),
        ...(category && { category }),
        ...(manufacturer && { manufacturer }),
        ...(screenSize && { screenSize }),
        ...(storageType && { storageType }),
      });

      const res = await axiosInstance.get(`/laptop?${params}`);
      return res.data;
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString());
  };

  const resetFilters = () => {
    setName(null);
    setCategory(null);
    setManufacturer(null);
    setScreenSize(null);
    setStorageType(null);
    setSort("name");
    setOrder("asc");
    setPage("1");
  };

  return (
    <section className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl mb-8">All Laptops</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Input
          placeholder="Search by name..."
          value={name || ""}
          onChange={(e) => setName(e.target.value || null)}
          className="w-full sm:max-w-[200px]"
        />

        <Select value={category || ""} onValueChange={(value) => setCategory(value || null)}>
          <SelectTrigger className="w-full sm:max-w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat: any) => (
              <SelectItem key={cat.category_id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={manufacturer || ""}
          onValueChange={(value) => setManufacturer(value || null)}
        >
          <SelectTrigger className="w-full sm:max-w-[200px]">
            <SelectValue placeholder="Select manufacturer" />
          </SelectTrigger>
          <SelectContent>
            {manufacturers.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={screenSize || ""} onValueChange={(value) => setScreenSize(value || null)}>
          <SelectTrigger className="w-full sm:max-w-[200px]">
            <SelectValue placeholder="Screen size" />
          </SelectTrigger>
          <SelectContent>
            {[14, 15, 16, 17].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}"
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={storageType || ""} onValueChange={(value) => setStorageType(value || null)}>
          <SelectTrigger className="w-full sm:max-w-[200px]">
            <SelectValue placeholder="Storage type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="M2_SSD">M.2 SSD</SelectItem>
            <SelectItem value="SATA_SSD">SATA SSD</SelectItem>
            <SelectItem value="HDD">HDD</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" onClick={resetFilters}>
            <X className="mr-2 size-4" />
            Reset Filters
          </Button>

          <Select value={limit} onValueChange={(value) => setLimit(value)}>
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: Number(limit) }).map((_, i) => <LaptopCardSkeleton key={i} />)
        ) : data?.data.length ? (
          data.data.map((laptop) => <LaptopCard key={laptop.laptop_id} laptop={laptop} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No laptops found matching your criteria</p>
          </div>
        )}
      </div>

      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  disabled={data.pagination.currentPage === 1}
                  onClick={() => handlePageChange(data.pagination.currentPage - 1)}
                >
                  <PaginationPrevious />
                </Button>
              </PaginationItem>

              <span className="mx-4 flex items-center text-sm text-muted-foreground">
                Page {data.pagination.currentPage} of {data.pagination.totalPages}
              </span>

              <PaginationItem>
                <Button
                  variant="outline"
                  disabled={data.pagination.currentPage >= data.pagination.totalPages}
                  onClick={() => handlePageChange(data.pagination.currentPage + 1)}
                >
                  <PaginationNext />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};

export default LaptopsPage;

import { useState, useEffect } from "react";
import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { Filter, X } from "lucide-react";
import LaptopCardSkeleton from "@/components/loaders/LaptopCardSkeleton";
import { axiosInstance } from "@/lib/axios";
import LaptopCard from "@/components/laptop/LaptopCard";
import FilterSheet from "@/components/laptop/FilterSheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { LaptopType } from "@/types/laptop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [sort, setSort] = useQueryState("sort", { defaultValue: "price" });
  const [order, setOrder] = useQueryState("order", { defaultValue: "desc" });
  const [name, setName] = useQueryState("name");
  const [category, setCategory] = useQueryState("category");
  const [manufacturer, setManufacturer] = useQueryState("manufacturer");
  const [screenSize, setScreenSize] = useQueryState("screenSize");
  const [storageType, setStorageType] = useQueryState("storageType");

  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const activeFiltersCount = [name, category, manufacturer, screenSize, storageType].filter(
    Boolean
  ).length;

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
    setSort("price");
    setOrder("desc");
    setPage("1");
  };

  const sortOptions = [
    { label: "Price: High to Low", sort: "price", order: "desc" },
    { label: "Price: Low to High", sort: "price", order: "asc" },
    { label: "Name: A to Z", sort: "name", order: "asc" },
    { label: "Name: Z to A", sort: "name", order: "desc" },
  ];

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setFilterSheetOpen(true)} className="relative">
            <Filter className="mr-2 size-4" />
            More Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          {activeFiltersCount > 0 && (
            <Button variant="outline" onClick={resetFilters}>
              <X className="mr-2 size-4" />
              Clear Filters
            </Button>
          )}

          <Select
            value={`${sort}-${order}`}
            onValueChange={(value) => {
              const [newSort, newOrder] = value.split("-");
              setSort(newSort);
              setOrder(newOrder);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem
                  key={`${option.sort}-${option.order}`}
                  value={`${option.sort}-${option.order}`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        name={name}
        setName={setName}
        category={category}
        setCategory={setCategory}
        manufacturer={manufacturer}
        setManufacturer={setManufacturer}
        screenSize={screenSize}
        setScreenSize={setScreenSize}
        storageType={storageType}
        setStorageType={setStorageType}
        resetFilters={resetFilters}
        categories={categories || []}
        manufacturers={manufacturers}
      />

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

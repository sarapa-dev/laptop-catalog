import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import LaptopSelector from "@/components/compare/LaptopSelector";
import ComparisonView from "@/components/compare/ComparisonView";
import { LaptopNamesType, LaptopType } from "@/types/laptop";

const ComparePage = () => {
  const [laptops, setLaptops] = useState<LaptopNamesType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLaptop1, setSelectedLaptop1] = useState<LaptopNamesType | null>(null);
  const [selectedLaptop2, setSelectedLaptop2] = useState<LaptopNamesType | null>(null);
  const [laptopDetails1, setLaptopDetails1] = useState<LaptopType | null>(null);
  const [laptopDetails2, setLaptopDetails2] = useState<LaptopType | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [isLoadingComparison, setIsLoadingComparison] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axiosInstance.get<LaptopNamesType[]>("/laptop/name");
        setLaptops(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching laptops:", error);
        setIsLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  const handleCompare = async () => {
    if (!selectedLaptop1 || !selectedLaptop2) return;

    setIsLoadingComparison(true);
    setIsComparing(true);

    try {
      const [laptop1Response, laptop2Response] = await Promise.all([
        axiosInstance.get<LaptopType>(`/laptop/${selectedLaptop1.laptop_id}`),
        axiosInstance.get<LaptopType>(`/laptop/${selectedLaptop2.laptop_id}`),
      ]);

      setLaptopDetails1(laptop1Response.data);
      setLaptopDetails2(laptop2Response.data);
    } catch (error) {
      console.error("Error fetching laptop details:", error);
    } finally {
      setIsLoadingComparison(false);
    }
  };

  const resetComparison = () => {
    setSelectedLaptop1(null);
    setSelectedLaptop2(null);
    setLaptopDetails1(null);
    setLaptopDetails2(null);
    setIsComparing(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-[1000px]">
      <h1 className="text-3xl font-bold mb-8">Compare Laptops</h1>

      {!isComparing ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
            <LaptopSelector
              laptops={laptops}
              isLoading={isLoading}
              selectedLaptop={selectedLaptop1}
              onSelectLaptop={setSelectedLaptop1}
              label="Select first laptop"
            />
            <LaptopSelector
              laptops={laptops}
              isLoading={isLoading}
              selectedLaptop={selectedLaptop2}
              onSelectLaptop={setSelectedLaptop2}
              label="Select second laptop"
            />
          </div>
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleCompare}
              disabled={
                !selectedLaptop1 ||
                !selectedLaptop2 ||
                selectedLaptop1.laptop_id === selectedLaptop2.laptop_id
              }
            >
              Compare Laptops
            </Button>
          </div>
          {selectedLaptop1 &&
            selectedLaptop2 &&
            selectedLaptop1.laptop_id === selectedLaptop2.laptop_id && (
              <p className="text-center text-destructive">
                Please select two different laptops to compare
              </p>
            )}
        </div>
      ) : (
        <div className="space-y-6">
          {isLoadingComparison ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Comparison Results</h2>
                <Button variant="outline" onClick={resetComparison}>
                  New Comparison
                </Button>
              </div>

              {laptopDetails1 && laptopDetails2 && (
                <ComparisonView laptop1={laptopDetails1} laptop2={laptopDetails2} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ComparePage;

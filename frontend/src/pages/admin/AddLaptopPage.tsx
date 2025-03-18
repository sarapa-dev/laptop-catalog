import { useState } from "react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LaptopForm from "@/components/admin/LaptopForm";
import { axiosInstance } from "@/lib/axios";

const AddLaptopPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);

    try {
      await axiosInstance.post("/laptop", formData);

      toast.success("Laptop added successfully!");

      queryClient.invalidateQueries({ queryKey: ["laptop"] });

      navigate("/laptops");
    } catch (error: any) {
      console.error("Error adding laptop:", error);

      toast.error(error.response?.data?.message || "Failed to add laptop. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-auto py-8 px-4 md:mb-10">
      <Button variant="ghost" className="mb-6 pl-0" onClick={() => navigate("/laptops")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Laptops
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add New Laptop</CardTitle>
          <CardDescription>
            Fill in the details below to add a new laptop to the catalog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LaptopForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLaptopPage;

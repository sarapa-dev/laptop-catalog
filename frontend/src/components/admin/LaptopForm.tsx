import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import SelectField from "./SelectField";

const formSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  image_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  price: z.number().min(100, "Price must be at least 100 dollars"),
  manufacturer_id: z.number({
    required_error: "Please select a manufacturer",
  }),
  storage_id: z.number({
    required_error: "Please select a storage option",
  }),
  processor_id: z.number({
    required_error: "Please select a processor",
  }),
  gpu_id: z.number({
    required_error: "Please select a GPU",
  }),
  display_id: z.number({
    required_error: "Please select a display",
  }),
  category_id: z.number({
    required_error: "Please select a category",
  }),
});

type FormValues = z.infer<typeof formSchema>;

type LaptopFormProps = {
  onSubmit: (data: FormValues) => Promise<void>;
  isSubmitting: boolean;
};

const LaptopForm = ({ onSubmit, isSubmitting }: LaptopFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image_url: "",
      price: 0,
    },
  });

  const { data: manufacturers, isLoading: isLoadingManufacturers } = useQuery({
    queryKey: ["manufacturers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/manufacturer");
      return res.data;
    },
  });

  const { data: storageOptions, isLoading: isLoadingStorage } = useQuery({
    queryKey: ["storage"],
    queryFn: async () => {
      const res = await axiosInstance.get("/storage");
      return res.data;
    },
  });

  const { data: processors, isLoading: isLoadingProcessors } = useQuery({
    queryKey: ["processors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/processor");
      return res.data;
    },
  });

  const { data: gpus, isLoading: isLoadingGpus } = useQuery({
    queryKey: ["gpus"],
    queryFn: async () => {
      const res = await axiosInstance.get("/gpu");
      return res.data;
    },
  });

  const { data: displays, isLoading: isLoadingDisplays } = useQuery({
    queryKey: ["displays"],
    queryFn: async () => {
      const res = await axiosInstance.get("/dispay");
      return res.data;
    },
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/category");
      return res.data;
    },
  });

  const isLoading =
    isLoadingManufacturers ||
    isLoadingStorage ||
    isLoadingProcessors ||
    isLoadingGpus ||
    isLoadingDisplays ||
    isLoadingCategories;

  const handleSubmit = async (values: FormValues) => {
    const formData = { ...values };

    formData.price = Math.round(formData.price * 100);

    if (formData.image_url === "") {
      formData.image_url = undefined;
    }

    await onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Laptop Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter laptop name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter laptop price"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            form={form}
            name="manufacturer_id"
            label="Manufacturer"
            placeholder="Select manufacturer"
            options={manufacturers || []}
            isLoading={isLoadingManufacturers}
            idField="manufacturer_id"
            labelField="name"
          />

          <SelectField
            form={form}
            name="category_id"
            label="Category"
            placeholder="Select category"
            options={categories || []}
            isLoading={isLoadingCategories}
            idField="category_id"
            labelField="name"
          />

          <SelectField
            form={form}
            name="processor_id"
            label="Processor"
            placeholder="Select processor"
            options={processors || []}
            isLoading={isLoadingProcessors}
            idField="processor_id"
            labelField="name"
          />

          <SelectField
            form={form}
            name="gpu_id"
            label="GPU"
            placeholder="Select GPU"
            options={gpus || []}
            isLoading={isLoadingGpus}
            idField="gpu_id"
            labelField="name"
          />

          <SelectField
            form={form}
            name="display_id"
            label="Display"
            placeholder="Select display"
            options={displays || []}
            isLoading={isLoadingDisplays}
            idField="display_id"
            labelField="name"
          />

          <SelectField
            form={form}
            name="storage_id"
            label="Storage"
            placeholder="Select storage"
            options={storageOptions || []}
            isLoading={isLoadingStorage}
            idField="storage_id"
            labelField="name"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Adding Laptop..." : "Add Laptop"}
        </Button>
      </form>
    </Form>
  );
};

export default LaptopForm;

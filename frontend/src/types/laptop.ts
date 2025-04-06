export interface LaptopType {
  laptop_id: number;
  name: string;
  image_url: string;
  price: number;
  category: {
    category_id: number;
    name: string;
  };
  display: {
    display_id: number;
    name: string;
    size: number;
    width: number;
    height: number;
    type: string;
    manufacturer_manufacturer_id: number;
  };
  gpu: {
    gpu_id: number;
    name: string;
    vram: number;
    tdp: number;
    type: string;
    manufacturer_manufacturer_id: number;
  };
  manufacturer: {
    manufacturer_id: number;
    name: string;
    description: string;
  };
  processor: {
    processor_id: number;
    name: string;
    core_count: number;
    tdp: number;
    hyper_thread_count: number;
    manufacturer_manufacturer_id: number;
  };
  storage: {
    storage_id: number;
    name: string;
    type: string;
    manufacturer_manufacturer_id: number;
  };
}

export interface LaptopNamesType {
  laptop_id: number;
  name: string;
}

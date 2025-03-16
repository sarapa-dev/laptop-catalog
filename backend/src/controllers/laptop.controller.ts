import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

// TODO: Implement pagination with filters
export const getAllLaptops = async (req: Request, res: Response) => {
  try {
    const laptops = await prisma.laptop.findMany({
      include: {
        category: true,
        display: true,
        gpu: true,
        manufacturer: true,
        processor: true,
        storage: true,
      },
      omit: {
        manufacturer_manufacturer_id: true,
        storage_storage_id: true,
        processor_processor_id: true,
        gpu_gpu_id: true,
        display_display_id: true,
        category_category_id: true,
      },
    });
    res.json(laptops);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getLaptopById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    const laptop = await prisma.laptop.findUnique({
      where: { laptop_id: parseInt(id) },
      include: {
        category: true,
        display: true,
        gpu: true,
        manufacturer: true,
        processor: true,
        storage: true,
      },
      omit: {
        manufacturer_manufacturer_id: true,
        storage_storage_id: true,
        processor_processor_id: true,
        gpu_gpu_id: true,
        display_display_id: true,
        category_category_id: true,
      },
    });

    res.json(laptop);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getFeaturedLaptops = async (req: Request, res: Response) => {
  try {
    const laptops = await prisma.laptop.findMany({
      where: {
        laptop_id: {
          gte: 28,
          lte: 31,
        },
      },
      include: {
        category: true,
        display: true,
        gpu: true,
        manufacturer: true,
        processor: true,
        storage: true,
      },
      omit: {
        manufacturer_manufacturer_id: true,
        storage_storage_id: true,
        processor_processor_id: true,
        gpu_gpu_id: true,
        display_display_id: true,
        category_category_id: true,
      },
      orderBy: {
        laptop_id: "desc",
      },
    });

    res.json(laptops);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createLaptop = async (
  req: Request<{}, {}, Prisma.laptopCreateManyInput>,
  res: Response
) => {
  const {
    name,
    image_url,
    category_category_id,
    display_display_id,
    gpu_gpu_id,
    manufacturer_manufacturer_id,
    processor_processor_id,
    storage_storage_id,
  } = req.body;

  try {
    if (
      !name ||
      !image_url ||
      !category_category_id ||
      !display_display_id ||
      !gpu_gpu_id ||
      !manufacturer_manufacturer_id ||
      !processor_processor_id ||
      !storage_storage_id
    ) {
      res.status(400).json({ message: "You must fill all fields" });
      return;
    }

    const laptop = await prisma.laptop.create({
      data: {
        name,
        image_url,
        category: { connect: { category_id: category_category_id } },
        display: { connect: { display_id: display_display_id } },
        gpu: { connect: { gpu_id: gpu_gpu_id } },
        manufacturer: { connect: { manufacturer_id: manufacturer_manufacturer_id } },
        processor: { connect: { processor_id: processor_processor_id } },
        storage: { connect: { storage_id: storage_storage_id } },
      },
    });

    res.status(201).json(laptop);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

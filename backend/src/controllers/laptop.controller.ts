import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { display_type, Prisma, user } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

interface LaptopQueryParams {
  page?: string;
  limit?: string;
  price?: string;
  sort?: keyof Prisma.laptopOrderByWithRelationInput;
  order?: "asc" | "desc";
  name?: string;
  category?: string;
  manufacturer?: string;
  gpu?: string;
  cpu?: string;
  storageType?: string;
  screenSize?: string;
  screenType?: string;
}

export const getAllLaptops = async (req: Request<{}, {}, {}, LaptopQueryParams>, res: Response) => {
  const {
    page,
    limit,
    sort = "price",
    order = "desc",
    name,
    price,
    category,
    manufacturer,
    gpu,
    cpu,
    storageType,
    screenSize,
    screenType,
  } = req.query;

  try {
    const token = req.cookies["e-catalog"];
    let user: user | null = null;

    if (token && process.env.JWT_SECRET) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & {
          userId: number;
        };
        user = await prisma.user.findUnique({
          where: { user_id: decoded.userId },
        });
      } catch (error) {}
    }

    const where: Prisma.laptopWhereInput = {
      ...(name && { name: { contains: name } }),
      ...(price && {
        price: {
          equals: parseInt(price),
        },
      }),
      ...(category && { category: { name: { equals: category } } }),
      ...(manufacturer && {
        manufacturer: { name: { equals: manufacturer } },
      }),
      ...(gpu && { gpu: { name: { contains: gpu } } }),
      ...(cpu && { processor: { name: { contains: cpu } } }),
      ...(storageType && { storage: { type: storageType as Prisma.Enumstorage_typeFilter } }),
      ...(screenSize && { display: { size: { equals: parseInt(screenSize) } } }),
      ...(screenType && { display: { type: screenType as display_type } }),
    };

    let favoriteLaptopIds: number[] = [];
    if (user?.status === "NORMAL") {
      const favorites = await prisma.favorite.findMany({
        where: { user_id: user.user_id },
        select: { laptop_id: true },
      });
      favoriteLaptopIds = favorites.map((f) => f.laptop_id);
    }

    const processLaptops = (laptops: any[]) =>
      laptops.map((laptop) => ({
        ...laptop,
        isFavorite:
          user?.status === "NORMAL" ? favoriteLaptopIds.includes(laptop.laptop_id) : false,
      }));

    if (page && limit) {
      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);
      const skip = (pageNumber - 1) * limitNumber;

      const [totalCount, laptops] = await prisma.$transaction([
        prisma.laptop.count({ where }),
        prisma.laptop.findMany({
          where,
          include: {
            category: true,
            display: true,
            gpu: true,
            manufacturer: true,
            processor: true,
            storage: true,
          },
          omit: {
            manufacturer_id: true,
            storage_id: true,
            processor_id: true,
            gpu_id: true,
            display_id: true,
            category_id: true,
          },
          skip,
          take: limitNumber,
          orderBy: { [sort]: order },
        }),
      ]);

      res.json({
        data: processLaptops(laptops),
        pagination: {
          currentPage: pageNumber,
          totalPages: Math.ceil(totalCount / limitNumber),
          totalItems: totalCount,
          itemsPerPage: limitNumber,
          hasNextPage: pageNumber < Math.ceil(totalCount / limitNumber),
          hasPreviousPage: pageNumber > 1,
        },
      });
    } else {
      const laptops = await prisma.laptop.findMany({
        where,
        include: {
          category: true,
          display: true,
          gpu: true,
          manufacturer: true,
          processor: true,
          storage: true,
        },
        omit: {
          manufacturer_id: true,
          storage_id: true,
          processor_id: true,
          gpu_id: true,
          display_id: true,
          category_id: true,
        },
        orderBy: { [sort]: order },
      });

      res.json({ data: processLaptops(laptops), pagination: null });
    }
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
        manufacturer_id: true,
        storage_id: true,
        processor_id: true,
        gpu_id: true,
        display_id: true,
        category_id: true,
      },
    });

    res.json(laptop);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllLaptopsNames = async (req: Request, res: Response) => {
  try {
    const laptops = await prisma.laptop.findMany({
      select: {
        laptop_id: true,
        name: true,
      },
    });
    res.json(laptops);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getLaptopsByCategory = async (req: Request<{ category: string }>, res: Response) => {
  const { category } = req.params;

  try {
    const laptops = await prisma.laptop.findMany({
      where: {
        category: {
          name: {
            equals: category,
          },
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
        manufacturer_id: true,
        storage_id: true,
        processor_id: true,
        gpu_id: true,
        display_id: true,
        category_id: true,
      },
    });

    res.json(laptops);
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
        manufacturer_id: true,
        storage_id: true,
        processor_id: true,
        gpu_id: true,
        display_id: true,
        category_id: true,
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
    category_id,
    display_id,
    gpu_id,
    manufacturer_id,
    processor_id,
    storage_id,
  } = req.body;

  try {
    if (
      !name ||
      !image_url ||
      !category_id ||
      !display_id ||
      !gpu_id ||
      !manufacturer_id ||
      !processor_id ||
      !storage_id
    ) {
      res.status(400).json({ message: "You must fill all fields" });
      return;
    }

    const laptop = await prisma.laptop.create({
      data: {
        name,
        image_url,
        category: { connect: { category_id: category_id } },
        display: { connect: { display_id: display_id } },
        gpu: { connect: { gpu_id: gpu_id } },
        manufacturer: { connect: { manufacturer_id: manufacturer_id } },
        processor: { connect: { processor_id: processor_id } },
        storage: { connect: { storage_id: storage_id } },
      },
    });

    res.status(201).json(laptop);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

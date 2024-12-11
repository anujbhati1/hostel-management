import { Request, Response } from "express";
import { prisma } from "../server";

export const createBed = async (req: Request, res: Response) => {
  try {
    const { name, rent } = req.body;
    const { roomId } = req.params;
    const bed = await prisma.bed.create({
      data: {
        name,
        roomId,
        rent,
      },
    });

    res.status(200).json({
      error: false,
      msg: "Bed created successfully.",
      data: bed,
    });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

export const getAllBed = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const rooms = await prisma.bed.findMany({
      where: {
        roomId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json({ error: false, msg: "Success", data: rooms });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

export const getBedDetailsById = async (req: Request, res: Response) => {
  try {
    const { bedId } = req.params;
    const bedDetails = await prisma.bed.findUnique({
      where: {
        id: bedId,
      },
      include: {
        student: true,
      },
    });
    res.status(200).json({ error: false, msg: "Success", data: bedDetails });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

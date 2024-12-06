import { Request, Response } from "express";
import { prisma } from "../server";

export const createHostel = async (req: Request, res: Response) => {
  try {
    const { name, lat, lng, address } = req.body;
    const { id } = req.user;
    const hostel = await prisma.hostel.create({
      data: {
        name,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        address,
        userId: id,
      },
    });

    res.status(200).json({
      error: false,
      msg: "Hostel created successfully.",
      data: hostel,
    });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

export const getAllHostel = async (req: Request, res: Response) => {
  try {
    const hostels = await prisma.hostel.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json({ error: false, msg: "Success", data: hostels });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

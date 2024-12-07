import { Request, Response } from "express";
import { prisma } from "../server";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { hostelId } = req.params;
    const room = await prisma.room.create({
      data: {
        name,
        hostelId,
      },
    });

    res.status(200).json({
      error: false,
      msg: "Room created successfully.",
      data: room,
    });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const { hostelId } = req.params;
    const rooms = await prisma.room.findMany({
      where: {
        hostelId,
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

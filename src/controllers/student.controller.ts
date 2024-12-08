import { Request, Response } from "express";
import { prisma } from "../server";

export const getStudentDetails = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const studentData = await prisma.user.findUnique({
      where: {
        id: studentId,
      },
      include: {
        bed: {
          include: {
            room: {
              include: {
                hostel: true,
              },
            },
          },
        },
      },
    });

    if (!studentData) {
      res.status(200).json({ error: true, msg: "No student found." });
      return;
    }

    res.status(200).json({ error: false, msg: "Success", data: studentData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

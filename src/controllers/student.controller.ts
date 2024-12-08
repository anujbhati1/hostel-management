import { Request, Response } from "express";
import { prisma } from "../server";
import { hashPassword } from "../lib/hashPassword";

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

export const assignNewStudent = async (req: Request, res: Response) => {
  try {
    const { name, mobile, bedId, studentId, password } = req.body;

    const bedData = await prisma.bed.findFirst({ where: { id: bedId } });

    if (bedData?.studentId) {
      res.status(409).json({
        error: true,
        msg: "Already a student is assgined to the bed.",
      });
      return;
    }

    let studentData = await prisma.user.findFirst({
      where: { OR: [{ mobile }, { id: studentId }] },
    });

    if (!studentData) {
      const hashedPassword = hashPassword(password);
      studentData = await prisma.user.create({
        data: {
          mobile,
          name,
          role: "STUDENT",
          password: hashedPassword,
        },
      });
    }

    const updateBed = await prisma.bed.update({
      where: {
        id: bedId,
      },
      data: {
        studentId: studentData.id,
      },
      include: {
        student: true,
      },
    });

    res.status(200).json({
      error: false,
      msg: "Successfully assigned a bed.",
      data: updateBed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

export const removeStudent = async (req: Request, res: Response) => {
  try {
    const { bedId } = req.params;
    const bedData = await prisma.bed.update({
      where: { id: bedId },
      data: {
        studentId: null,
      },
    });

    res.status(200).json({
      error: false,
      msg: "Student removed successfully.",
      data: bedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

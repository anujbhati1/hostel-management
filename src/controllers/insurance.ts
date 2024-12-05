import { Request, Response } from "express";
import { prisma } from "../server";

export const GetAllInsurance = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.user;
    let insurance;
    if (role === "BANK_USER") {
      insurance = await prisma.insurance.findMany({
        where: {
          userId: id,
        },
        select: {
          id: true,
          name: true,
          benefits: true,
          claimAmount: true,
          userId: true,
          validityDate: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      });
    } else {
      insurance = await prisma.insurance.findMany({
        select: {
          id: true,
          name: true,
          benefits: true,
          claimAmount: true,
          userId: true,
          validityDate: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      });
    }
    res
      .status(200)
      .json({ msg: "Insurance get successfully", data: insurance });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

export const GetInsuranceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    const insurance = await prisma.insurance.findUnique({
      where: {
        userId,
        id,
      },
      select: {
        user: true,
        benefits: true,
        claimAmount: true,
        id: true,
        name: true,
        userId: true,
        validityDate: true,
      },
    });

    res.status(200).json({ error: false, msg: "Success", data: insurance });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

export const CreateInsurance = async (req: Request, res: Response) => {
  try {
    const { name, benefits, claimAmount, validityDate } = req.body;
    const data = await req.user;

    const insurance = await prisma.insurance.create({
      data: {
        name,
        benefits,
        claimAmount,
        validityDate,
        userId: data.id,
      },
    });

    res
      .status(200)
      .json({ msg: "Insurance created successfully", data: insurance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

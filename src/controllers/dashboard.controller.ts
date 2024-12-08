import { Request, Response } from "express";
import { prisma } from "../server";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const hostels = await prisma.hostel.findMany({
      where: {
        userId: id,
      },
      include: {
        rooms: {
          include: {
            beds: {
              orderBy: {
                createdAt: "asc",
              },
              include: {
                student: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Prepare dashboard data
    const dashboardData = await Promise.all(
      hostels.map(async (hostel) => {
        const totalRooms = hostel.rooms.length;
        const totalBeds = hostel.rooms.reduce(
          (acc, room) => acc + room.beds.length,
          0
        );
        const totalRent = hostel.rooms.reduce(
          (acc, room) =>
            acc +
            room.beds.reduce((bedAcc, bed) => bedAcc + (bed.rent || 0), 0),
          0
        );
        const emptyBeds = hostel.rooms.reduce(
          (acc, room) =>
            acc + room.beds.filter((bed) => bed.studentId === null).length,
          0
        );
        const emptyRooms = hostel.rooms.filter((room) =>
          room.beds.every((bed) => bed.studentId === null)
        ).length;

        // Get total received rent
        const receivedRent = await prisma.transaction.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            type: "RENT",
            hostelId: hostel.id,
          },
        });

        // Get total hostel expenses
        const hostelExpense = await prisma.transaction.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            type: "EXPENSE",
            hostelId: hostel.id,
          },
        });

        return {
          hostelId: hostel.id,
          hostelName: hostel.name,
          totalRooms,
          totalBeds,
          totalRent,
          emptyBeds,
          emptyRooms,
          receivedRent: receivedRent._sum.amount || 0,
          hostelExpense: hostelExpense._sum.amount || 0,
        };
      })
    );

    res.status(200).json({ error: false, msg: "Success", data: dashboardData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

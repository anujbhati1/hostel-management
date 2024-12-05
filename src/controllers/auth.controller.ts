import { Request, Response } from "express";
import { prisma } from "../server";
import { generateToken } from "../lib/generateJwt";
import { hashPassword } from "../lib/hashPassword";
import { checkPassword } from "../lib/checkPassword";

export const login = async (req: Request, res: Response) => {
  try {
    const { mobile, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        mobile,
      },
    });

    if (!user) {
      res.status(400).json({ error: true, msg: "User not found." });
      return;
    }

    if (!user.password) {
      res.status(400).json({ error: true, msg: "Invalid password!" });
      return;
    }

    const isPassCorrect = checkPassword(password, user.password);
    if (isPassCorrect) {
      res.status(200).json({ msg: "Login successful" });
      return;
    }

    res.status(400).json({ error: true, msg: "Incorrect Password" });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

export const Signup = async (req: Request, res: Response) => {
  try {
    const { name, email, role, password, mobile, city, loginId } = req.body;
    const existingUser = await prisma.user.findFirst({
      where: { mobile },
    });

    if (existingUser) {
      res.status(400).json({ error: true, msg: "User already exists." });
      return;
    }

    const hashedPass = hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPass,
        mobile,
        city,
        loginId,
      },
    });

    const token = generateToken({
      id: user.id,
      name: user.name,
      mobile: user.mobile,
      role: user.role,
    });
    res.status(200).json({ msg: "Sigup successful", data: user, token });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

import { Request, Response } from "express";
import { prisma } from "../server";
import { generateToken } from "../lib/generateJwt";
import { hashPassword } from "../lib/hashPassword";
import { checkPassword } from "../lib/checkPassword";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: true, msg: "User not found." });
    }

    const isPassCorrect = checkPassword(password, user.password);

    if (isPassCorrect) {
      return res.status(200).json({ msg: "Login successful" });
    }

    res.status(400).json({ error: true, msg: "Incorrect Password" });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

export const Signup = async (req: Request, res: Response) => {
  try {
    const { name, email, role, password } = req.body;

    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: true, msg: "User already exists." });
    }

    const hashedPass = hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPass,
      },
    });

    const token = generateToken(user);
    res.status(200).json({ msg: "Sigup successful", data: user, token });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went wrong!" });
  }
};

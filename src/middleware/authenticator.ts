import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "BANK_ADMIN" | "BANK_USER";
}

interface User extends JwtPayload {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "BANK_ADMIN" | "BANK_USER";
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const authenticator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: true, msg: "Unauthorized." });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log("JWT_SECRET not found in the env.");
      return;
    }

    const user = jwt.verify(token, secret) as JwtPayload;
    console.log(user, "user details");
    req.user = user as UserType;
    next();
  } catch (error) {
    res.status(401).json({ error: true, msg: "Unauthorized." });
  }
};

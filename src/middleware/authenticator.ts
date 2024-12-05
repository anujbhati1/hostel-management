import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserType {
  id: string;
  name: string;
  mobile: string;
  role: "ADMIN" | "STUDENT" | "GUEST" | "EMPLOYEE";
}

interface User extends JwtPayload {
  id: string;
  name: string;
  mobile: string;
  role: "ADMIN" | "STUDENT" | "GUEST" | "EMPLOYEE";
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const authenticator =
  ({
    isAdmin = false,
    isEmployee = false,
    isStudent = false,
    isGuest = false,
  }) =>
  async (req: Request, res: Response, next: NextFunction) => {
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
        res.status(500).json({ error: true, msg: "Server error." });
        return;
      }

      const user = jwt.verify(token, secret) as UserType;
      req.user = user as UserType;

      if (isAdmin && user.role === "ADMIN") {
        next();
        return;
      } else if (isEmployee && user.role === "EMPLOYEE") {
        next();
        return;
      } else if (isStudent && user.role === "STUDENT") {
        next();
        return;
      } else if (isGuest && user.role === "GUEST") {
        next();
        return;
      }

      res.status(401).json({ error: true, msg: "Unauthorized." });
    } catch (error) {
      res.status(401).json({ error: true, msg: "Unauthorized." });
    }
  };

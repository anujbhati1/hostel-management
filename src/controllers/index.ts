import { Request, Response } from "express";

export async function getIndex(req: Request, res: Response): Promise<void> {
  res.status(200).json({ msg: "Server is running." });
}

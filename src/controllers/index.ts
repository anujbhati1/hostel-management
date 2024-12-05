import { Request, Response } from "express";

export async function getIndex(req: Request, res: Response): Promise<void> {
  res.send({ msg: "Server is running." });
}

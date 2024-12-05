import "dotenv/config";
import express from "express";
import cors from "cors";
import { getIndex } from "./controllers";
import authRoutes from "./routes/authRoutes";
import insuranceRoutes from "./routes/insuranceRoutes";
import { Prisma, PrismaClient } from "@prisma/client";

const PORT = Number(process.env.PORT) || 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/health-check", getIndex);
app.use("/api", authRoutes);
app.use("/api", insuranceRoutes);

export const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});

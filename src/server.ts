import "dotenv/config";
import express from "express";
import cors from "cors";
import { getIndex } from "./controllers";
import authRoutes from "./routes/authRoutes";
import { PrismaClient } from "@prisma/client";

const PORT = Number(process.env.PORT) || 4000;
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/health-check", getIndex);
app.use("/api/auth", authRoutes);

//DB Connection
export const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
